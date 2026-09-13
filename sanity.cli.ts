import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'sxm7e08p',
    dataset: 'production'
  },
  typegen: {
    schema: './schema.json',
    path: '../jb-cv/src/**/*.{ts,tsx,js,jsx}',
    generates: '../jb-cv/src/sanity/sanity.types.ts'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
