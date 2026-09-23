import type { TProfileQueryResult } from '@/app/types/profile'
import { formatMonth } from '@/app/utils'

export interface IExperienceSectionProps {
  heading: TProfileQueryResult['experienceSection']
  items: NonNullable<TProfileQueryResult['experience']>
}

export const ExperienceSection = ({ heading, items }: IExperienceSectionProps) => {
  if (items.length === 0) return null

  return (
    <section
      className="experience section-shell"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-index" aria-hidden="true">
        03
      </div>

      <div>
        {heading?.kicker && <p className="section-kicker">{heading.kicker}</p>}
        <h2 id="experience-title">{heading?.heading ?? 'Experience'}</h2>

        {items.map((item) => (
          <article className={item.featured ? 'role featured' : 'role'} key={item._key}>
            <div className="role-head">
              <div>
                <h3>{item.role}</h3>
                <p>
                  {item.organizationUrl ? (
                    <a href={item.organizationUrl}>{item.organization}</a>
                  ) : (
                    item.organization
                  )}
                  {item.location && ` · ${item.location}`}
                </p>
              </div>

              {item.periods?.length ? (
                <div>
                  {item.periods.map((period) => (
                    <div key={period._key}>
                      <time dateTime={period.start ?? undefined}>{formatMonth(period.start)}</time>
                      {' — '}
                      {period.current ? (
                        'Present'
                      ) : (
                        <time dateTime={period.end ?? undefined}>{formatMonth(period.end)}</time>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {item.summary && <p>{item.summary}</p>}

            {item.highlights?.length ? (
              <ul>
                {item.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
