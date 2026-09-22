import {defineField, defineType} from 'sanity'

export const employmentPeriod = defineType({
  name: 'employmentPeriod',
  title: 'Employment period',
  type: 'object',
  fields: [
    defineField({
      name: 'start',
      title: 'Start month',
      type: 'string',
      description: 'YYYY-MM',
      validation: (rule) =>
        rule.required().regex(/^\d{4}-(0[1-9]|1[0-2])$/, {
          name: 'year-month',
          invert: false,
        }),
    }),
    defineField({
      name: 'end',
      title: 'End month',
      type: 'string',
      description: 'YYYY-MM; leave empty when current',
      validation: (rule) =>
        rule.regex(/^\d{4}-(0[1-9]|1[0-2])$/, {
          name: 'year-month',
          invert: false,
        }),
    }),
    defineField({
      name: 'current',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
