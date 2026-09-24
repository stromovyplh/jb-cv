import type { TProfileQueryResult } from '@/app/types/profile'

export interface IProjectsSectionProps {
  heading: TProfileQueryResult['projectsSection']
  projects: NonNullable<TProfileQueryResult['projects']>
  sectionNr: string
}

export const ProjectsSection = ({ heading, projects, sectionNr }: IProjectsSectionProps) => {
  if (projects.length === 0) return null

  return (
    <section className="projects section-shell" id="projects" aria-labelledby="projects-title">
      <div className="section-index" aria-hidden="true">
        {sectionNr}
      </div>

      <div>
        {heading?.kicker && <p className="section-kicker">{heading.kicker}</p>}
        <h2 id="projects-title">{heading?.heading ?? 'Selected projects'}</h2>

        {projects.map((project) => (
          <article className="project-card" key={project._key}>
            <div>
              {(project.category || project.status) && (
                <p className="card-label">
                  {[project.category, project.status].filter(Boolean).join(' · ')}
                </p>
              )}

              <h3>{project.name}</h3>
              {project.summary && <p>{project.summary}</p>}
            </div>

            <div>
              {project.highlights?.length ? (
                <ul>
                  {project.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              ) : null}

              {project.url && (
                <a
                  className="text-link"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit project <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
