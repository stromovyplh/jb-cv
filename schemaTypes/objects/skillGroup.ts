import {defineArrayMember, defineField, defineType} from 'sanity'

export const skillGroup = defineType({
  name: 'skillGroup',
  title: 'Skill group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'skills',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      skills: 'skills',
    },
    prepare: ({title, skills = []}) => ({
      title,
      subtitle: skills.join(', '),
    }),
  },
})
