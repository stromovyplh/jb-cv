import {defineField, defineType} from 'sanity'

export const sectionHeading = defineType({
  name: 'sectionHeading',
  title: 'Section heading',
  type: 'object',
  fields: [
    defineField({
      name: 'kicker',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
