import {defineArrayMember, defineField, defineType} from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'object',
  fields: [
    defineField({
      name: 'role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'organization',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'organizationUrl',
      type: 'url',
    }),
    defineField({
      name: 'location',
      type: 'string',
    }),
    defineField({
      name: 'periods',
      type: 'array',
      of: [defineArrayMember({type: 'employmentPeriod'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 3})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'role',
      organization: 'organization',
    },
    prepare: ({title, organization}) => ({
      title,
      subtitle: organization,
    }),
  },
})
