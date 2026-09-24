import { notFound } from 'next/navigation'

import { ContactSection } from '@/app/components/ContactSection/ContactSection'
import { CvChat } from '@/app/components/CvChat/CvChat'
import { DetailsSection } from '@/app/components/DetailsSection/DetailsSection'
import { ExperienceSection } from '@/app/components/ExperienceSection/ExperienceSection'
import { HeroHeader } from '@/app/components/HeroHeader/HeroHeader'
import { ProfileSection } from '@/app/components/ProfileSection/ProfileSection'
import { ProjectsSection } from '@/app/components/ProjectsSection/ProjectsSection'
import { SkillsSection } from '@/app/components/SkillsSection/SkillsSection'
import { profileCacheOptions } from '@/src/sanity/cache'
import { client } from '@/src/sanity/client'
import { PROFILE_QUERY } from '@/src/sanity/queries/profile'
import type { PROFILE_QUERY_RESULT } from '@/src/sanity/sanity.types'

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

      <CvChat />

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
