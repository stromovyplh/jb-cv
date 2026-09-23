import './globals.css'

import type { Metadata } from 'next'
import React from 'react'
import { PrintButton } from '@/apps/jb-cv-fe/app/components/PrintButton'

export const metadata: Metadata = {
  title: 'Jozef Balint — Senior Frontend Engineer',
  description:
    'Jozef Balint — Senior Frontend Engineer, Accessibility Specialist, and Frontend Dev Lead based in Lisbon.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="Jozef Balint, home">
            JB<span>.</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#expertise">Expertise</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
          </nav>
          <a className="header-contact" href="mailto:jozef.balint@gmail.com">
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
        </header>
        <main id="main">{children}</main>
        <footer>
          <p>Jozef Balint · Senior Frontend Engineer</p>
          <PrintButton id="print-cv" label="Print this page" />
        </footer>
      </body>
    </html>
  )
}
