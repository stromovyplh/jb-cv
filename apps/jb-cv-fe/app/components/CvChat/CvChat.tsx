'use client'

import { type SubmitEvent, useEffect, useRef, useState } from 'react'

import styles from './CvChat.module.css'

type Message = {
  id: number
  role: 'visitor' | 'assistant'
  text: string
}

type StreamEvent = {
  type: 'delta' | 'done' | 'error'
  text?: string
}

export interface ICvChat {
  sectionNr: string
}

export const CvChat = ({ sectionNr }: ICvChat) => {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const endRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(0)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, loading, error])

  const ask = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const text = question.trim()
    if (!text || loading) return

    const history = messages.slice(-8).map((message) => ({
      role: message.role === 'visitor' ? ('user' as const) : ('assistant' as const),
      content: message.text,
    }))

    const questionId = nextId.current++
    let answerId: number | undefined

    setMessages((current) => [...current, { id: questionId, role: 'visitor', text }])
    setQuestion('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/cv-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, history }),
      })

      if (!response.ok) {
        const data: { error?: string } = await response.json()
        throw new Error(data.error || 'Could not get an answer.')
      }

      if (!response.body) {
        throw new Error('Streaming is unavailable.')
      }

      answerId = nextId.current++
      const currentAnswerId = answerId

      setMessages((current) => [...current, { id: currentAnswerId, role: 'assistant', text: '' }])

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      let buffer = ''
      let completed = false

      while (true) {
        const { value, done } = await reader.read()

        if (done) break

        buffer += decoder.decode(value, { stream: true })

        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line) continue

          const streamEvent = JSON.parse(line) as StreamEvent

          if (streamEvent.type === 'error') {
            throw new Error('The answer was interrupted. Please try again.')
          }

          if (streamEvent.type === 'done') {
            completed = true
          }

          if (streamEvent.type === 'delta' && streamEvent.text) {
            const delta = streamEvent.text

            setMessages((current) =>
              current.map((message) =>
                message.id === currentAnswerId
                  ? { ...message, text: message.text + delta }
                  : message,
              ),
            )
          }
        }
      }

      if (!completed) {
        throw new Error('The answer was interrupted. Please try again.')
      }
    } catch (cause) {
      setMessages((current) =>
        current.filter((message) => message.id !== questionId && message.id !== answerId),
      )
      setQuestion(text)
      setError(
        cause instanceof Error ? cause.message : 'The CV assistant is temporarily unavailable.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section-shell" aria-labelledby="cv-chat-title">
      <div className="section-index" aria-hidden={true}>
        {sectionNr}
      </div>

      <div className={styles.content}>
        <p className="section-kicker">Ask about my CV</p>
        <h2 id="cv-chat-title">Looking for a particular experience?</h2>

        <div className={styles.chat}>
          <div
            className={styles.messages}
            role="log"
            aria-label="CV conversation"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.length === 0 && (
              <div className={styles.welcome}>
                <p>Ask about my skills, projects, or fit for a role.</p>
                <p>Answers are based on my published CV.</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.role === 'visitor' ? styles.visitor : styles.assistant
                }`}
              >
                <span className={styles.speaker}>
                  {message.role === 'visitor' ? 'You' : 'CV assistant'}
                </span>
                <p>{message.text || (message.role === 'assistant' ? 'Writing…' : '')}</p>
              </div>
            ))}

            {loading && (
              <p className={styles.activity} role="status">
                Generating answer…
              </p>
            )}

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <div ref={endRef} />
          </div>

          <form onSubmit={ask} className={styles.composer}>
            <label className={styles.label} htmlFor="cv-question">
              Ask a question about my CV
            </label>

            <textarea
              id="cv-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about Vue experience or fit for a role…"
              maxLength={1200}
              rows={2}
              disabled={loading}
              required
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault()
                  event.currentTarget.form?.requestSubmit()
                }
              }}
            />

            <button
              className="button button-primary"
              type="submit"
              disabled={loading || !question.trim()}
            >
              Send <span aria-hidden="true">↗</span>
            </button>
          </form>
        </div>

        <p className={styles.hint}>Enter to send · Shift+Enter for a new line</p>
      </div>
    </section>
  )
}
