import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'sxm7e08p',
  dataset: 'production',
  apiVersion: '2026-05-15',
  useCdn: false,
})
