import {defineField, defineType} from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'object',
  fields: [
    defineField({
      name: 'qualification',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'institution',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'location', type: 'string'}),
    defineField({name: 'startYear', type: 'number'}),
    defineField({name: 'endYear', type: 'number'}),
    defineField({name: 'note', type: 'text', rows: 2}),
  ],
  preview: {
    select: {
      title: 'qualification',
      subtitle: 'institution',
    },
  },
})
