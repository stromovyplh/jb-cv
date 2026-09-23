import type { QueryOptions } from 'next-sanity'

export const profileCacheOptions: QueryOptions =
    process.env.NODE_ENV === 'development'
        ? {
          cache: 'no-store',
        }
        : {
          next: {
            revalidate: 86400,
            tags: ['profile'],
          },
        }