import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO
const DATA_PATH = 'data/crypt-data.json'

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

async function readData(): Promise<{ data: Record<string, unknown>; sha?: string }> {
  const existing = await githubRequest(`/contents/${DATA_PATH}`)
  if (!existing.content) return { data: {} }
  try {
    const data = JSON.parse(Buffer.from(existing.content, 'base64').toString('utf-8'))
    return { data, sha: existing.sha }
  } catch {
    return { data: {}, sha: existing.sha }
  }
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  const { data } = await readData()
  if (!key) return NextResponse.json(data)
  return NextResponse.json({ value: data[key] ?? null })
}

export async function PUT(req: NextRequest) {
  const { key, value } = await req.json()
  if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })

  const { data, sha } = await readData()
  data[key] = value

  const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64')
  const result = await githubRequest(`/contents/${DATA_PATH}`, 'PUT', {
    message: `Update ${key}`,
    content,
    ...(sha ? { sha } : {}),
  })

  if (result.commit) return NextResponse.json({ ok: true })
  return NextResponse.json({ error: result.message || 'Unknown error' }, { status: 500 })
}
