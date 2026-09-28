import { NextRequest, NextResponse } from 'next/server'
import { readCryptData, writeCryptKey } from '@/lib/cryptData'
import { checkAccess } from '@/lib/voidAuth'

const MAX_BODY_BYTES = 2_000_000

export async function GET(req: NextRequest) {
  const denied = checkAccess(req)
  if (denied) return denied

  const key = req.nextUrl.searchParams.get('key')
  const { data } = await readCryptData()
  if (!key) return NextResponse.json(data)
  return NextResponse.json({ value: data[key] ?? null })
}

export async function PUT(req: NextRequest) {
  const denied = checkAccess(req)
  if (denied) return denied

  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ error: 'Too large' }, { status: 413 })

  const { key, value } = JSON.parse(raw)
  if (typeof key !== 'string' || !key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })

  const ok = await writeCryptKey(key, value)
  if (ok) return NextResponse.json({ ok: true })
  return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
}
