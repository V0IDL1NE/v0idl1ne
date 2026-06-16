'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function VoidPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentTool, setCurrentTool] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const savedPassword = useRef('')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    savedPassword.current = password
    setAuthed(true)
    setAuthError(false)
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMessage]
    setMessages([...newMessages, { role: 'assistant', content: '' }])
    setInput('')
    setLoading(true)
    setCurrentTool(null)

    try {
      const res = await fetch('/api/void-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          password: savedPassword.current,
        }),
      })

      if (res.status === 401) {
        setAuthed(false)
        setAuthError(true)
        setMessages(messages)
        setLoading(false)
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const data = JSON.parse(line.slice(6))
            if (data.type === 'text') {
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: updated[updated.length - 1].content + data.text,
                }
                return updated
              })
            } else if (data.type === 'tool') {
              setCurrentTool(data.name)
            } else if (data.type === 'done') {
              setCurrentTool(null)
            }
          } catch {}
        }
      }
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"JetBrains Mono", monospace',
      }}>
        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
          <div style={{ color: '#8800ff', fontSize: '11px', letterSpacing: '0.2em' }}>
            V0IDL1NE // ACCESS REQUIRED
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            autoFocus
            style={{
              background: '#0a0a0a',
              border: `1px solid ${authError ? '#ff0088' : '#1a1a1a'}`,
              color: '#c0c0c0',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '14px',
              padding: '12px 16px',
              outline: 'none',
              borderRadius: 0,
              width: '100%',
              boxSizing: 'border-box',
            }}
            onFocus={e => {
              e.target.style.borderColor = '#8800ff'
              e.target.style.boxShadow = '0 0 8px rgba(136,0,255,0.3)'
            }}
            onBlur={e => {
              e.target.style.borderColor = authError ? '#ff0088' : '#1a1a1a'
              e.target.style.boxShadow = 'none'
            }}
          />
          {authError && <div style={{ color: '#ff0088', fontSize: '11px', letterSpacing: '0.1em' }}>DENIED</div>}
          <button
            type="submit"
            style={{
              background: 'linear-gradient(45deg, #8800ff, #ff0088)',
              border: 'none',
              color: '#000',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              fontWeight: 'bold',
              letterSpacing: '0.2em',
              padding: '12px',
              cursor: 'pointer',
              borderRadius: 0,
            }}
          >
            ENTER
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"JetBrains Mono", monospace',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <div style={{
        borderBottom: '1px solid #1a1a1a',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        position: 'sticky',
        top: 0,
        background: '#000',
        zIndex: 10,
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          background: '#8800ff',
          boxShadow: '0 0 8px rgba(136,0,255,0.6)',
          flexShrink: 0,
        }} />
        <span style={{ color: '#8800ff', fontSize: '11px', letterSpacing: '0.2em' }}>
          V0IDL1NE // CLAUDE INTERFACE
        </span>
        {currentTool && (
          <span style={{ color: '#ff0088', fontSize: '10px', letterSpacing: '0.15em', marginLeft: 'auto' }}>
            {`> ${currentTool.replace(/_/g, ' ').toUpperCase()}`}
          </span>
        )}
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        minHeight: 'calc(100vh - 130px)',
      }}>
        {messages.length === 0 && (
          <div style={{ color: '#404040', fontSize: '12px', letterSpacing: '0.1em' }}>
            CONNECTED. WHAT DO YOU NEED.
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{
              fontSize: '10px',
              letterSpacing: '0.25em',
              color: m.role === 'user' ? '#ff0088' : '#8800ff',
            }}>
              {m.role === 'user' ? 'YOU' : 'CLAUDE'}
            </div>
            <div style={{
              color: '#c0c0c0',
              fontSize: '14px',
              lineHeight: '1.75',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {m.content}
              {i === messages.length - 1 && loading && m.role === 'assistant' && (
                <span style={{ color: '#8800ff' }}>▋</span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        borderTop: '1px solid #1a1a1a',
        padding: '16px 24px',
        position: 'sticky',
        bottom: 0,
        background: '#000',
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => {
              setInput(e.target.value)
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px'
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder="what do you need..."
            rows={1}
            style={{
              flex: 1,
              background: '#0a0a0a',
              border: '1px solid #1a1a1a',
              color: '#c0c0c0',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '14px',
              padding: '12px 16px',
              outline: 'none',
              resize: 'none',
              borderRadius: 0,
              minHeight: '44px',
              maxHeight: '200px',
              overflow: 'auto',
            }}
            onFocus={e => {
              e.target.style.borderColor = '#8800ff'
              e.target.style.boxShadow = '0 0 8px rgba(136,0,255,0.3)'
            }}
            onBlur={e => {
              e.target.style.borderColor = '#1a1a1a'
              e.target.style.boxShadow = 'none'
            }}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              background: loading || !input.trim() ? '#0a0a0a' : 'linear-gradient(45deg, #8800ff, #ff0088)',
              border: `1px solid ${loading || !input.trim() ? '#1a1a1a' : 'transparent'}`,
              color: loading || !input.trim() ? '#404040' : '#000',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '11px',
              fontWeight: 'bold',
              letterSpacing: '0.15em',
              padding: '0 20px',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              borderRadius: 0,
              height: '44px',
              flexShrink: 0,
            }}
          >
            SEND
          </button>
        </div>
        <div style={{ marginTop: '8px', color: '#404040', fontSize: '10px', letterSpacing: '0.1em' }}>
          ENTER TO SEND · SHIFT+ENTER FOR NEWLINE
        </div>
      </div>
    </div>
  )
}
