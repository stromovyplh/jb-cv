import {defineField, defineType} from 'sanity'

export const heroRole = defineType({
  name: 'heroRole',
  title: 'Hero role',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'emphasized',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      emphasized: 'emphasized',
    },
    prepare: ({ title, emphasized}) => ({
      title, subtitle: emphasized ? 'Emphasized' : undefined
    })
  },
})