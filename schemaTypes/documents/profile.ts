import {defineArrayMember, defineField, defineType} from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'CV Profile',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'contact', title: 'Contact'},
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'roles',
      title: 'Hero roles',
      group: 'hero',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'heroRole',
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'intro',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'impactMetrics',
      type: 'array',
      group: 'hero',
      of: [
        defineArrayMember({
          type: 'impactMetric',
        }),
      ],
    }),
    defineField({
      name: 'email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'cvFile',
      title: 'CV PDF',
      type: 'file',
      group: 'contact',
      options: {
        accept: 'application/pdf',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'roles.0.title',
    },
  },
})
