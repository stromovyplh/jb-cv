import { defineQuery } from 'next-sanity'

export const PROFILE_QUERY = defineQuery(`
  *[_type == "profile"][0] {
    name,
    location,
    roles[] {
      _key,
      title,
      emphasized
    },
    impactMetrics[] {
      _key,
      value,
      label
    },
    intro,
    email,
    "cv": {
      "url": cvFile.asset->url,
      "filename": cvFile.asset->originalFilename
    }
  }
`)
