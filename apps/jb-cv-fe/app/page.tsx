import { client } from '@/apps/jb-cv-fe/src/sanity/client'
import { PROFILE_QUERY } from '@/apps/jb-cv-fe/src/sanity/queries/profile'
import { profileCacheOptions } from '@/apps/jb-cv-fe/src/sanity/cache'
import { notFound } from 'next/navigation'
import { HeroHeader } from '@/apps/jb-cv-fe/app/components/HeroHeader/HeroHeader'
import type { PROFILE_QUERY_RESULT } from '@/apps/jb-cv-fe/src/sanity/sanity.types'
import { ProfileSection } from '@/apps/jb-cv-fe/app/components/ProfileSection/ProfileSection'
import { SkillsSection } from '@/apps/jb-cv-fe/app/components/SkillsSection/SkillsSection'
import { ExperienceSection } from '@/apps/jb-cv-fe/app/components/ExperienceSection/ExperienceSection'
import { ProjectsSection } from '@/apps/jb-cv-fe/app/components/ProjectsSection/ProjectsSection'
import { DetailsSection } from '@/apps/jb-cv-fe/app/components/DetailsSection/DetailsSection'
import { ContactSection } from '@/apps/jb-cv-fe/app/components/ContactSection/ContactSection'

export default async function HomePage() {
  const profile = await client.fetch<PROFILE_QUERY_RESULT | null>(
    PROFILE_QUERY,
    {},
    profileCacheOptions,
  )

  if (!profile) notFound()

  return (
    <>
      <HeroHeader
        id="top"
        location={profile.location}
        name={profile.name}
        roles={profile.roles ?? []}
        impactMetrics={profile.impactMetrics ?? []}
        intro={profile.intro}
        email={profile.email}
        cv={profile.cv}
      />

      <ProfileSection heading={profile.profileSection} body={profile.profileBody} />

      <SkillsSection heading={profile.skillsSection} groups={profile.skillGroups ?? []} />

      <ExperienceSection heading={profile.experienceSection} items={profile.experience ?? []} />

      <ProjectsSection heading={profile.projectsSection} projects={profile.projects ?? []} />

      <DetailsSection education={profile.education ?? []} languages={profile.languages ?? []} />

      <ContactSection
        heading={profile.contactHeading}
        email={profile.email}
        phone={profile.phone}
        links={profile.links ?? []}
      />
    </>
  )
}
