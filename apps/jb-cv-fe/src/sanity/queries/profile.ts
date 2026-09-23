import { defineQuery } from 'next-sanity'

export const PROFILE_QUERY = defineQuery(`
*[_type == "profile"][0] {
    _id,
    name,
    location,
    roles[] {
      _key,
      title,
      emphasized
    },
    intro,
    impactMetrics[] {
      _key,
      value,
      label
    },
    profileSection,
    profileBody,
    skillsSection,
    skillGroups[] {
      _key,
      title,
      skills
    },
    experienceSection,
    experience[] {
      _key,
      role,
      organization,
      organizationUrl,
      location,
      periods,
      summary,
      highlights,
      featured
    },
    projectsSection,
    projects[] {
      _key,
      name,
      category,
      status,
      summary,
      highlights,
      url
    },
    education,
    languages,
    contactHeading,
    email,
    phone,
    links,
    "cv": {
      "url": cvFile.asset->url,
      "filename": cvFile.asset->originalFilename
    }
  }
`)
