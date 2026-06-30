import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Multimedia',
    plural: 'Multimedia',
  },
  upload: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto Alternativo',
      type: 'text',
      required: true,
    },
  ],
}
