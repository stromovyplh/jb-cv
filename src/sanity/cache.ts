export const profileCacheOptions = {
  next: {
    revalidate: 3600,
    tags: ['profile'],
  },
}
