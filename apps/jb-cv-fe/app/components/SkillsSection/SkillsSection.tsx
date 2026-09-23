import type { TProfileQueryResult } from '@/apps/jb-cv-fe/app/types/profile'

export interface ISkillsSectionProps {
  heading: TProfileQueryResult['skillsSection']
  groups: NonNullable<TProfileQueryResult['skillGroups']>
}

export const SkillsSection = ({ heading, groups }: ISkillsSectionProps) => {
  if (!groups.length) {
    return null
  }

  return (
    <section className="skills section-shell" id="expertise" aria-labelledby="skills-title">
      <div className="section-index" aria-hidden="true">
        02
      </div>

      <div>
        <p className="section-kicker">{heading?.kicker}</p>
        <h2 id="skills-title">{heading?.heading}</h2>

        <div className="skill-grid">
          {groups.map((group) => (
            <article key={group._key}>
              <h3>{group.title}</h3>
              <p>{group.skills?.join(', ')}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
