import { NextRequest, NextResponse } from 'next/server'
import { readCryptData, writeCryptKey } from '@/lib/cryptData'

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  const { data } = await readCryptData()
  if (!key) return NextResponse.json(data)
  return NextResponse.json({ value: data[key] ?? null })
}

export async function PUT(req: NextRequest) {
  const { key, value } = await req.json()
  if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })

  const ok = await writeCryptKey(key, value)
  if (ok) return NextResponse.json({ ok: true })
  return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
}
