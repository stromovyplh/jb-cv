import { HeroRoles } from '@/app/components/HeroRoles/HeroRoles'
import styles from './HeroHeader.module.css'
import type { TProfileQueryResult } from '@/app/types/profile'

interface IHeroHeaderProps {
  id: string
  location: TProfileQueryResult['location']
  name: TProfileQueryResult['name']
  roles: NonNullable<TProfileQueryResult['roles']>
  impactMetrics: NonNullable<TProfileQueryResult['impactMetrics']>
  intro: TProfileQueryResult['intro']
  email: TProfileQueryResult['email']
  cv: TProfileQueryResult['cv']
}

export const HeroHeader = ({
  location,
  name,
  roles,
  impactMetrics,
  intro,
  id,
  email,
  cv,
}: IHeroHeaderProps) => {
  return (
    <section className={styles.hero} id={id} aria-labelledby="page-title">
      <div className="hero-copy">
        {location && (
          <p className={styles.eyebrow}>
            <span></span>
            {location}
          </p>
        )}

        {name && <h1 id="page-title">{name}</h1>}
        <HeroRoles roles={roles} />

        {intro && <p className={styles['hero-intro']}>{intro}</p>}

        <div className={styles['hero-actions']}>
          {email && (
            <a className="button button-primary" href={`mailto:${email}`}>
              Start a conversation
            </a>
          )}

          {cv?.url && (
            <a
              className="button button-secondary"
              href={`${cv.url}?dl=${encodeURIComponent(cv.filename ?? 'Jozef_Balint_CV.pdf')}`}
            >
              Download CV
            </a>
          )}
        </div>
      </div>
      {impactMetrics.length && (
        <aside className="impact-card" aria-label="Career highlights">
          <p className="card-label">Selected impact</p>
          <dl>
            {impactMetrics.map((metric) => (
              <div key={metric._key}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
        </aside>
      )}
    </section>
  )
}
