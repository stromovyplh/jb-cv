'use client'

import { type SubmitEvent, useEffect, useRef, useState } from 'react'

import styles from './CvChat.module.css'

type Message = {
  id: number
  role: 'visitor' | 'assistant'
  text: string
}

export const CvChat = () => {
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

    setMessages((current) => [...current, { id: nextId.current++, role: 'visitor', text }])
    setQuestion('')
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/cv-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      })

      const data: { answer?: string; error?: string } = await response.json()

      if (!response.ok || !data.answer) {
        throw new Error(data.error || 'Could not get an answer.')
      }

      setMessages((current) => [
        ...current,
        { id: nextId.current++, role: 'assistant', text: data.answer! },
      ])
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : 'The CV assistant is temporarily unavailable.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section-shell" aria-labelledby="cv-chat-title">
      <div className="section-index">05</div>

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
                <p>{message.text}</p>
              </div>
            ))}

            {loading && (
              <p className={styles.activity} role="status">
                Checking the CV…
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
