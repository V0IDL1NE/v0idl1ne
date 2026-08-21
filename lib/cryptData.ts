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

export async function readCryptData(): Promise<{ data: Record<string, unknown>; sha?: string }> {
  const existing = await githubRequest(`/contents/${DATA_PATH}`)
  if (!existing.content) return { data: {} }
  try {
    const data = JSON.parse(Buffer.from(existing.content, 'base64').toString('utf-8'))
    return { data, sha: existing.sha }
  } catch {
    return { data: {}, sha: existing.sha }
  }
}

export async function writeCryptKey(key: string, value: unknown, message?: string): Promise<boolean> {
  const { data, sha } = await readCryptData()
  data[key] = value

  const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64')
  const result = await githubRequest(`/contents/${DATA_PATH}`, 'PUT', {
    message: message || `Update ${key}`,
    content,
    ...(sha ? { sha } : {}),
  })

  return Boolean(result.commit)
}
