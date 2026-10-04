import {defineArrayMember, defineField, defineType} from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'CV Profile',
  type: 'document',
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'hero', title: 'Hero'},
    {name: 'profile', title: 'Profile'},
    {name: 'skills', title: 'Skills'},
    {name: 'experience', title: 'Experience'},
    {name: 'projects', title: 'Projects'},
    {name: 'details', title: 'Education & languages'},
    {name: 'contact', title: 'Contact'},
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'title',
          title: 'Page title',
          type: 'string',
          description: 'Leave empty to use the default title.',
          validation: (rule) => rule.max(60).warning('Maximum 60 character allowed.'),
        }),
        defineField({
          name: 'description',
          title: 'Meta description',
          type: 'text',
          rows: 3,
          description: 'A concise summary for search results and link previews.',
          validation: (rule) => rule.max(160).warning('Maximum 160 character allowed.'),
        }),
        defineField({
          name: 'image',
          title: 'Social sharing image',
          type: 'image',
          description: 'Used when sharing the page on social platforms.',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
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
      name: 'profileSection',
      type: 'sectionHeading',
      group: 'profile',
    }),
    defineField({
      name: 'profileBody',
      title: 'Profile body',
      type: 'array',
      group: 'profile',
      of: [defineArrayMember({type: 'block'})],
    }),

    defineField({
      name: 'skillsSection',
      type: 'sectionHeading',
      group: 'skills',
    }),
    defineField({
      name: 'skillGroups',
      type: 'array',
      group: 'skills',
      of: [defineArrayMember({type: 'skillGroup'})],
    }),

    defineField({
      name: 'experienceSection',
      type: 'sectionHeading',
      group: 'experience',
    }),
    defineField({
      name: 'experience',
      type: 'array',
      group: 'experience',
      of: [defineArrayMember({type: 'experience'})],
    }),

    defineField({
      name: 'projectsSection',
      type: 'sectionHeading',
      group: 'projects',
    }),
    defineField({
      name: 'projects',
      type: 'array',
      group: 'projects',
      of: [defineArrayMember({type: 'project'})],
    }),

    defineField({
      name: 'education',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'education'})],
    }),
    defineField({
      name: 'languages',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'language'})],
    }),

    defineField({
      name: 'contactHeading',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'links',
      type: 'array',
      group: 'contact',
      of: [defineArrayMember({type: 'externalLink'})],
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
