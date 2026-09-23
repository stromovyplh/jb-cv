import type { TProfileQueryResult } from '@/apps/jb-cv-fe/app/types/profile'

export interface IContactSectionProps {
  heading: TProfileQueryResult['contactHeading']
  email: TProfileQueryResult['email']
  phone: TProfileQueryResult['phone']
  links: NonNullable<TProfileQueryResult['links']>
}

export const ContactSection = ({ heading, email, phone, links }: IContactSectionProps) => {
  if (!email && !phone && links.length === 0) return null

  return (
    <section className="contact" aria-labelledby="contact-title">
      <p className="section-kicker">Contact</p>
      <h2 id="contact-title">{heading ?? 'Have a frontend problem worth solving?'}</h2>

      {email && (
        <a href={`mailto:${email}`}>
          {email} <span aria-hidden="true">↗</span>
        </a>
      )}

      {(phone || links.length > 0) && (
        <div className="contact-links">
          {phone && <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>}

          {links.map((link) =>
            link.url ? (
              <a key={link._key} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label ?? link.url}
              </a>
            ) : null,
          )}
        </div>
      )}
    </section>
  )
}
