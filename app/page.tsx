import { client } from '@/src/sanity/client'
import { HeroRoles } from '@/app/components/HeroRoles/HeroRoles'
import { IProfile } from '@/app/types/profile'

const PROFILE_QUERY = `
*[
  _type == "profile"
][0]{name, roles[] {
_key,
title,
emphasized
}}
`

const options = { next: { revalidate: 30 } }

export default async function HomePage() {
  const profile = await client.fetch<IProfile | null>(PROFILE_QUERY, {}, options)
  console.log(profile)

  return (
    <>
      <section className="hero" id="top" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span></span> Slovakia, EU
          </p>
          {profile && (
            <>
              <h1 id="page-title">{profile.name}</h1>
              <HeroRoles roles={profile.roles} />
            </>
          )}
          <p className="hero-intro">
            I build accessible, high-traffic web applications and the frontend systems that keep
            them maintainable.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="mailto:jozef.balint@gmail.com">
              Start a conversation
            </a>
            <a
              className="button button-secondary"
              href="/assets/Jozef_Balint_CV_FE_Engineer.pdf"
              download
            >
              Download CV
            </a>
          </div>
        </div>
        <aside className="impact-card" aria-label="Career highlights">
          <p className="card-label">Selected impact</p>
          <dl>
            <div>
              <dt>6.5M</dt>
              <dd>portal users served</dd>
            </div>
            <div>
              <dt>14K</dt>
              <dd>relocations supported</dd>
            </div>
            <div>
              <dt>~40%</dt>
              <dd>lower UI latency</dd>
            </div>
            <div>
              <dt>8+</dt>
              <dd>years in frontend</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="intro section-shell" aria-labelledby="profile-title">
        <div className="section-index">01</div>
        <div>
          <p className="section-kicker">Profile</p>
          <h2 id="profile-title">Pragmatic engineering for complex, human-facing products.</h2>
          <p>
            Senior Frontend Engineer with 8+ years of experience building accessible, high-traffic
            web applications with Vue.js, TypeScript, and JavaScript. Experienced in frontend
            architecture, accessibility, and technical leadership across customer portals, B2B
            e-commerce, and healthcare platforms.
          </p>
        </div>
      </section>

      <section className="skills section-shell" id="expertise" aria-labelledby="skills-title">
        <div className="section-index">02</div>
        <div>
          <p className="section-kicker">Core skills</p>
          <h2 id="skills-title">Systems thinking, from semantics to delivery.</h2>
          <div className="skill-grid">
            <article>
              <h3>Frontend</h3>
              <p>JavaScript (ESNext), TypeScript, Vue.js, React, Nuxt.js, HTML5, CSS3/SCSS</p>
            </article>
            <article>
              <h3>Architecture & APIs</h3>
              <p>
                Frontend Architecture, SSR, Server-driven UI, Component-driven Development, REST
                API, Microfrontends
              </p>
            </article>
            <article>
              <h3>Accessibility & Testing</h3>
              <p>
                WCAG 2.1/2.2, ARIA, Semantic HTML, Keyboard Navigation, Vitest, Vue Test Utils, Unit
                & Component Testing, Storybook, Histoire
              </p>
            </article>
            <article>
              <h3>DevOps & Tools</h3>
              <p>
                Azure, Application Insights, Azure DevOps, Bitbucket Pipelines, Git, Claude, GitHub
                Copilot, JetBrains AI Assistant
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="experience section-shell"
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className="section-index">03</div>
        <div>
          <p className="section-kicker">Experience</p>
          <h2 id="experience-title">A decade of shipping and leading.</h2>

          <article className="role featured">
            <div className="role-head">
              <div>
                <h3>Frontend Engineer / Frontend Dev Lead</h3>
                <p>
                  <a href="https://www.nearshore.pt/">Nearshore Portugal</a> · Lisbon, Portugal
                </p>
              </div>
              <time>Apr 2023 — Present</time>
            </div>
            <p>
              Developing high-traffic customer portals for EnBW and Yello within an international
              engineering team, contributing to architecture, delivery, and continuous improvement.
            </p>
            <ul>
              <li>
                Designed accessible, scalable SSR applications with Vue.js, TypeScript, and
                Express.js.
              </li>
              <li>
                Architected a configurable relocation service with dynamic workflows and headless
                CMS content; supported ~14,000 relocations and contributed to an almost 20%
                reduction in related hotline and email contacts.
              </li>
              <li>
                Expanded a server-driven UI platform to support advanced validation and 5+
                previously impossible complex services.
              </li>
              <li>
                Improved Azure DevOps CI/CD, managed releases, documented repeatable processes, and
                diagnosed production issues through Application Insights.
              </li>
              <li>
                Led accessibility improvements aligned with WCAG and the European Accessibility Act.
              </li>
              <li>
                Promoted to Frontend Dev Lead, mentoring engineers, reviewing code, interviewing,
                guiding architecture, and partnering with product teams.
              </li>
            </ul>
          </article>

          <article className="role">
            <div className="role-head">
              <div>
                <h3>Frontend Consultant</h3>
                <p>Institut biostatistiky a analýz · Brno, Czechia</p>
              </div>
              <time>Jan 2023 — May 2024</time>
            </div>
            <ul>
              <li>
                Migrated complex healthcare forms from Knockout.js to Vue.js, reducing interaction
                latency by ~40% in Chrome Performance profiling.
              </li>
              <li>
                Migrated the application from JavaScript to TypeScript, uncovering defects and
                improving reliability.
              </li>
              <li>
                Produced technical documentation and implementation guidelines for consistent
                delivery and knowledge sharing.
              </li>
            </ul>
          </article>

          <article className="role">
            <div className="role-head">
              <div>
                <h3>Frontend Developer</h3>
                <p>Conrad Electronic Linz GmbH | ACTUM Digital · Prague, Czech Republic</p>
              </div>
              <time>Jul 2019 — Nov 2021</time>
            </div>
            <ul>
              <li>
                Delivered Vue and React features across 8 B2B country storefronts with varied legal,
                accessibility, and market requirements.
              </li>
              <li>
                Co-formed a new two-person frontend team and drove modernization from React 15.6 to
                16.8, React Hooks, and Formik.
              </li>
              <li>
                Improved legacy accessibility with semantic HTML, ARIA patterns, and keyboard
                navigation.
              </li>
              <li>
                Supported rollout to 5 additional storefronts, built a Storybook catalogue, and
                assumed team and tech lead responsibilities.
              </li>
            </ul>
          </article>

          <article className="role">
            <div className="role-head">
              <div>
                <h3>Frontend Developer</h3>
                <p>jPower8 · Prague, Czech Republic</p>
              </div>
              <time>
                Jun 2018 — Jun 2019
                <br />
                Dec 2021 — Mar 2023
              </time>
            </div>
            <ul>
              <li>
                Owned frontend delivery as sole frontend engineer for a SaaS PWA with 2 core and 3
                paid add-on services.
              </li>
              <li>
                Co-developed a Vue 2/3 PWA with TypeScript, Vuex, Vite, Tailwind CSS, i18n, and a
                headless WordPress CMS.
              </li>
              <li>
                Built an accessible component library and improved ARIA, semantics, keyboard
                navigation, and screen-reader support.
              </li>
              <li>
                Helped redesign a banking portal into a mobile-first experience using CSS-only
                restyling across two visual skins.
              </li>
            </ul>
          </article>

          <article className="role">
            <div className="role-head">
              <div>
                <h3>Application Developer · Tech Lead</h3>
                <p>IBM | Manpower · Bratislava, Slovakia</p>
              </div>
              <time>Mar 2015 — Feb 2018</time>
            </div>
            <ul>
              <li>
                Created corporate web pages to W3C, WCAG, and IBM standards; trained and mentored
                team members across geographies.
              </li>
              <li>
                Provided first-level Drupal support and contributed to a global Drupal migration.
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="projects section-shell" id="projects" aria-labelledby="projects-title">
        <div className="section-index">04</div>
        <div>
          <p className="section-kicker">Selected project</p>
          <h2 id="projects-title">Independent work, end to end.</h2>
          <article className="project-card">
            <div>
              <p className="card-label">Personal project · Ongoing</p>
              <h3>Favour Flavours</h3>
              <p>
                Artisan bakery portfolio and full-stack website, independently architected,
                implemented, hosted, and deployed.
              </p>
            </div>
            <div>
              <ul>
                <li>Nuxt 4, Vue.js, SSR, and a file-based Node.js backend</li>
                <li>Eight-theme CSS architecture and custom product image management</li>
                <li>
                  Automated Bitbucket CI/CD with 96/100 performance and perfect Lighthouse scores in
                  accessibility, best practices, and SEO
                </li>
              </ul>
              <a className="text-link" href="https://favourflavours.com/" target="_blank">
                Visit favourflavours.com <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="details section-shell" aria-label="Education and languages">
        <div className="section-index">05</div>
        <div className="details-grid">
          <article>
            <p className="section-kicker">Education</p>
            <h2>BSc in Computing, IT and Design</h2>
            <p>
              <strong>The Open University</strong>
              <br />
              UK, Distance Learning · 2011 — 2016
              <br />
              <span>Completed part-time alongside full-time employment.</span>
            </p>
          </article>
          <article>
            <p className="section-kicker">Languages</p>
            <dl className="languages">
              <div>
                <dt>English</dt>
                <dd>Full Professional</dd>
              </div>
              <div>
                <dt>Slovak</dt>
                <dd>Native</dd>
              </div>
              <div>
                <dt>Czech</dt>
                <dd>Full Professional</dd>
              </div>
              <div>
                <dt>Spanish</dt>
                <dd>Beginner</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      <section className="contact" aria-labelledby="contact-title">
        <p className="section-kicker">Contact</p>
        <h2 id="contact-title">Have a frontend problem worth solving?</h2>
        <a href="mailto:jozef.balint@gmail.com">
          jozef.balint@gmail.com <span aria-hidden="true">↗</span>
        </a>
        <div className="contact-links">
          <a href="tel:+351938957716">+351 938 957 716</a>
          <a href="https://www.linkedin.com/in/jozefbalint" target="_blank">
            LinkedIn
          </a>
          <a href="https://thisleafgatherer.com/" target="_blank">
            thisleafgatherer.com
          </a>
        </div>
      </section>
    </>
  )
}
