import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'category', type: 'string'}),
    defineField({name: 'status', type: 'string'}),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 2})],
    }),
    defineField({name: 'url', type: 'url'}),
  ],
})
