import {defineField, defineType} from 'sanity';

export const impactMetric = defineType({
  name: 'impactMetric',
  title: 'Impact metric',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      type: 'string',
      description: 'For example" 6.5M, ~40%, or 8+',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'label',
      type: 'string',
      validation: rule => rule.required()
    })
  ]
})