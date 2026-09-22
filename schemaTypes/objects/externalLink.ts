import {defineField, defineType} from 'sanity'

export const externalLink = defineType({
  name: 'externalLink',
  title: 'External link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
})
