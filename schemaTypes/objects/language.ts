import {defineField, defineType} from 'sanity'

export const language = defineType({
  name: 'language',
  title: 'Language',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'proficiency',
      type: 'string',
      options: {
        list: [
          {title: 'Native', value: 'native'},
          {title: 'Full professional', value: 'fullProfessional'},
          {title: 'Professional working', value: 'professionalWorking'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Beginner', value: 'beginner'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
  ],
})
