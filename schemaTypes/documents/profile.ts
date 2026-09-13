import {defineArrayMember, defineField, defineType} from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'roles',
      title: 'Hero roles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'heroRole'
        })
      ],
      validation: rule => rule.required().min(1)
    })
  ]
})