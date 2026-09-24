import { profileCacheOptions } from '@/src/sanity/cache'
import { client } from '@/src/sanity/client'
import { PROFILE_QUERY } from '@/src/sanity/queries/profile' // adjust to your actual path

export async function getPublishedProfileForAI() {
  const profile = await client
    .withConfig({ perspective: 'published', useCdn: false })
    .fetch(PROFILE_QUERY, {}, profileCacheOptions)

  if (!profile) {
    throw new Error('Published CV profile was not found')
  }

  // Only send fields needed to answer CV questions.
  const {
    name,
    location,
    roles,
    intro,
    impactMetrics,
    profileSection,
    profileBody,
    skillsSection,
    skillGroups,
    experienceSection,
    experience,
    projectsSection,
    projects,
    education,
    languages,
  } = profile

  return {
    name,
    location,
    roles,
    intro,
    impactMetrics,
    profileSection,
    profileBody,
    skillsSection,
    skillGroups,
    experienceSection,
    experience,
    projectsSection,
    projects,
    education,
    languages,
  }
}
