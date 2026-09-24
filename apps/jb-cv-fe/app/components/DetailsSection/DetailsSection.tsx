import { proficiencyLabels } from '@/app/constants'
import type { TProfileQueryResult } from '@/app/types/profile'

export interface IDetailsSectionProps {
  education: NonNullable<TProfileQueryResult['education']>
  languages: NonNullable<TProfileQueryResult['languages']>
  sectionNr: string
}

export const DetailsSection = ({ education, languages, sectionNr }: IDetailsSectionProps) => {
  if (education.length === 0 && languages.length === 0) return null

  return (
    <section className="details section-shell" aria-label="Education and languages">
      <div className="section-index" aria-hidden="true">
        {sectionNr}
      </div>

      <div className="details-grid">
        {education.length > 0 && (
          <div>
            <p className="section-kicker">Education</p>

            {education.map((item) => (
              <article key={item._key}>
                <h2>{item.qualification}</h2>

                <p>
                  <strong>{item.institution}</strong>
                  {(item.location || item.startYear || item.endYear) && (
                    <>
                      <br />
                      {item.location}
                      {item.location && (item.startYear || item.endYear) ? ' · ' : ''}
                      {item.startYear}
                      {item.startYear && item.endYear ? ' — ' : ''}
                      {item.endYear}
                    </>
                  )}

                  {item.note && (
                    <>
                      <br />
                      <span>{item.note}</span>
                    </>
                  )}
                </p>
              </article>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <p className="section-kicker">Languages</p>
            <h2>Languages</h2>

            <dl className="languages">
              {languages.map((language) => (
                <div key={language._key}>
                  <dt>{language.name}</dt>
                  <dd>
                    {language.proficiency
                      ? (proficiencyLabels[language.proficiency] ?? language.proficiency)
                      : ''}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  )
}
