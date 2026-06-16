import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO

async function githubRequest(path: string, method = 'GET', body?: object) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}${path}`, {
    method,
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  return res.json()
}

const tools: Anthropic.Tool[] = [
  {
    name: 'list_files',
    description: 'List all files in the repository',
    input_schema: { type: 'object' as const, properties: {}, required: [] },
  },
  {
    name: 'read_file',
    description: 'Read the contents of a file in the repository',
    input_schema: {
      type: 'object' as const,
      properties: { path: { type: 'string', description: 'File path relative to repo root' } },
      required: ['path'],
    },
  },
  {
    name: 'write_file',
    description: 'Create or update a file in the repository. Triggers a Vercel redeployment.',
    input_schema: {
      type: 'object' as const,
      properties: {
        path: { type: 'string', description: 'File path relative to repo root' },
        content: { type: 'string', description: 'Full file content to write' },
        message: { type: 'string', description: 'Commit message' },
      },
      required: ['path', 'content', 'message'],
    },
  },
]

async function handleTool(name: string, input: Record<string, string>) {
  if (name === 'list_files') {
    const data = await githubRequest('/git/trees/main?recursive=1')
    const files = data.tree
      ?.filter((f: { type: string }) => f.type === 'blob')
      .map((f: { path: string }) => f.path)
      .filter((p: string) => !p.startsWith('.next') && !p.includes('node_modules'))
    return JSON.stringify(files)
  }

  if (name === 'read_file') {
    const data = await githubRequest(`/contents/${input.path}`)
    if (data.content) return Buffer.from(data.content, 'base64').toString('utf-8')
    return `Error: ${data.message || 'File not found'}`
  }

  if (name === 'write_file') {
    const existing = await githubRequest(`/contents/${input.path}`)
    const sha = existing.sha
    const content = Buffer.from(input.content).toString('base64')
    const result = await githubRequest(`/contents/${input.path}`, 'PUT', {
      message: input.message || `Update ${input.path}`,
      content,
      ...(sha ? { sha } : {}),
    })
    if (result.commit) return `Written. Commit: ${result.commit.sha?.slice(0, 7)}. Vercel redeploying now.`
    return `Error: ${result.message || 'Unknown error'}`
  }

  return 'Unknown tool'
}

const SYSTEM_PROMPT = `You are Claude, running inside a hidden page of v0idl1ne.com — Joey's personal site. You have full access to read and modify the site's source code via tools. When Joey asks you to change something, do it — read the relevant files, make the change, write it back.

SITE INFO:
- Next.js 16, TypeScript, Tailwind CSS v4, MDX blog posts
- App router in /app/, blog posts in /content/posts/
- Deployed on Vercel — pushes to main auto-redeploy (takes ~30-60s)
- Repo: github.com/V0IDL1NE/v0idl1ne

V0IDL1NE DESIGN SYSTEM:
- Void Black #000000 (all backgrounds)
- Near Black #0a0a0a (secondary surfaces)
- Deep Border #1a1a1a (borders, inactive)
- Silver #c0c0c0 (primary text)
- Void Purple #8800ff (PRIMARY accent — borders, focus, highlights)
- Hot Magenta #ff0088 (SECONDARY accent — gradient partner)
- Cyan #00ffff (tertiary highlight)
- Font: JetBrains Mono everywhere, no exceptions
- ZERO rounded corners — always borderRadius: 0
- Gradients: purple → magenta at 45deg
- Glow on focus: box-shadow 0 0 8px rgba(136,0,255,0.3)

When you make changes: read first, edit minimally, commit with a clear message. Tell Joey what changed and that Vercel is redeploying.`

export async function POST(req: NextRequest) {
  const { messages, password } = await req.json()

  if (password !== process.env.VOID_PASSWORD) {
    return new Response('Unauthorized', { status: 401 })
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))

      let currentMessages = [...messages]

      try {
        while (true) {
          const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 8096,
            system: SYSTEM_PROMPT,
            tools,
            messages: currentMessages,
          })

          for (const block of response.content) {
            if (block.type === 'text') {
              send({ type: 'text', text: block.text })
            }
          }

          if (response.stop_reason === 'end_turn') break

          if (response.stop_reason === 'tool_use') {
            const toolUseBlocks = response.content.filter(b => b.type === 'tool_use')
            currentMessages = [...currentMessages, { role: 'assistant', content: response.content }]

            const toolResults = []
            for (const toolUse of toolUseBlocks) {
              if (toolUse.type !== 'tool_use') continue
              send({ type: 'tool', name: toolUse.name })
              const result = await handleTool(toolUse.name, toolUse.input as Record<string, string>)
              toolResults.push({ type: 'tool_result', tool_use_id: toolUse.id, content: result })
            }

            currentMessages = [...currentMessages, { role: 'user', content: toolResults }]
          } else {
            break
          }
        }
      } catch (err) {
        send({ type: 'text', text: `\n\nError: ${err instanceof Error ? err.message : 'Unknown error'}` })
      }

      send({ type: 'done' })
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
