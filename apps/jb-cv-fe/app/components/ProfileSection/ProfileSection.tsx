import { PortableText } from 'next-sanity'
import type { TProfileQueryResult } from '@/app/types/profile'

export interface IProfileSectionProps {
  heading: TProfileQueryResult['profileSection']
  body: TProfileQueryResult['profileBody']
}

export const ProfileSection = ({ heading, body }: IProfileSectionProps) => {
  if (!heading && !body?.length) {
    return null
  }

  return (
    <section className="intro section-shell" aria-labelledby="profile-title">
      <div className="section-index" aria-hidden="true">
        01
      </div>

      <div>
        {heading?.kicker && <p className="section-kicker">{heading.kicker}</p>}

        {heading?.heading && <h2 id="profile-title">{heading.heading}</h2>}

        {body && <PortableText value={body} />}
      </div>
    </section>
  )
}
