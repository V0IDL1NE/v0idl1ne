import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'
import { readCryptData, writeCryptKey } from '@/lib/cryptData'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const DESIGN_KEY = 'crypt-design'

type Element = {
  id: string
  type: 'text' | 'image' | 'rect' | 'circle'
  x: number
  y: number
  width: number
  height: number
  text?: string
  fontSize?: number
  color?: string
  fontWeight?: number
  src?: string
  fill?: string
}

async function getElements(): Promise<Element[]> {
  const { data } = await readCryptData()
  return (data[DESIGN_KEY] as Element[]) || []
}

async function saveElements(elements: Element[], message: string) {
  await writeCryptKey(DESIGN_KEY, elements, message)
}

const tools: Anthropic.Tool[] = [
  {
    name: 'list_elements',
    description: 'List every element currently on the design canvas, with their ids, positions, and properties.',
    input_schema: { type: 'object' as const, properties: {}, required: [] },
  },
  {
    name: 'add_element',
    description: 'Add a new element to the canvas. The canvas is 1200x800px, origin top-left.',
    input_schema: {
      type: 'object' as const,
      properties: {
        type: { type: 'string', enum: ['text', 'image', 'rect', 'circle'] },
        x: { type: 'number' },
        y: { type: 'number' },
        width: { type: 'number' },
        height: { type: 'number' },
        text: { type: 'string', description: 'Text content, for type "text"' },
        fontSize: { type: 'number' },
        color: { type: 'string', description: 'CSS color, for text' },
        fontWeight: { type: 'number' },
        src: { type: 'string', description: 'Image URL or data URI, for type "image"' },
        fill: { type: 'string', description: 'CSS color, for rect/circle' },
      },
      required: ['type', 'x', 'y', 'width', 'height'],
    },
  },
  {
    name: 'update_element',
    description: 'Update properties of an existing element by id. Only send the fields you want changed.',
    input_schema: {
      type: 'object' as const,
      properties: {
        id: { type: 'string' },
        x: { type: 'number' },
        y: { type: 'number' },
        width: { type: 'number' },
        height: { type: 'number' },
        text: { type: 'string' },
        fontSize: { type: 'number' },
        color: { type: 'string' },
        fontWeight: { type: 'number' },
        src: { type: 'string' },
        fill: { type: 'string' },
      },
      required: ['id'],
    },
  },
  {
    name: 'remove_element',
    description: 'Remove an element from the canvas by id.',
    input_schema: {
      type: 'object' as const,
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
]

async function handleTool(name: string, input: Record<string, unknown>) {
  if (name === 'list_elements') {
    return JSON.stringify(await getElements())
  }

  if (name === 'add_element') {
    const elements = await getElements()
    const el: Element = { id: crypto.randomUUID(), ...input } as Element
    elements.push(el)
    await saveElements(elements, `Add ${el.type} element`)
    return JSON.stringify(el)
  }

  if (name === 'update_element') {
    const elements = await getElements()
    const idx = elements.findIndex((e) => e.id === input.id)
    if (idx === -1) return `Error: no element with id ${input.id}`
    elements[idx] = { ...elements[idx], ...input } as Element
    await saveElements(elements, `Update element ${input.id}`)
    return JSON.stringify(elements[idx])
  }

  if (name === 'remove_element') {
    const elements = await getElements()
    const next = elements.filter((e) => e.id !== input.id)
    await saveElements(next, `Remove element ${input.id}`)
    return `Removed ${input.id}`
  }

  return 'Unknown tool'
}

const SYSTEM_PROMPT = `You are Claude, running inside /design on v0idl1ne.com — a visual design canvas Joey's girlfriend can also edit directly with a mouse (drag, resize, add elements via a toolbar). You share the same canvas state she sees live: any change you make appears on her screen, and any change she makes is visible to you via list_elements.

The canvas is 1200x800px, origin top-left. Elements are text, image, rect, or circle, each with x/y/width/height. Keep elements within the canvas bounds and avoid stacking things directly on top of each other unless asked to.

When asked to change the design, actually use the tools to do it — don't just describe what you'd do. Keep responses short; the visual result speaks for itself.`

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
            max_tokens: 4096,
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
            const toolUseBlocks = response.content.filter((b) => b.type === 'tool_use')
            currentMessages = [...currentMessages, { role: 'assistant', content: response.content }]

            const toolResults = []
            for (const toolUse of toolUseBlocks) {
              if (toolUse.type !== 'tool_use') continue
              send({ type: 'tool', name: toolUse.name })
              const result = await handleTool(toolUse.name, toolUse.input as Record<string, unknown>)
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
