import { CollectionConfig } from 'payload'

export const Raffles: CollectionConfig = {
  slug: 'raffles',
  labels: {
    singular: 'Rifa',
    plural: 'Rifas',
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'richText',
    },
    {
      name: 'prizes',
      label: 'Premios del Sorteo',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          label: 'Nombre del Premio',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          label: 'Imagen',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    // --- SECCIÓN HERO ---
    {
      name: 'hero_title',
      label: 'Título del Hero',
      type: 'text',
      required: true,
      defaultValue: '¡TU SUERTE, TU PREMIO!',
    },
    {
      name: 'hero_subtitle',
      label: 'Subtítulo del Hero',
      type: 'text',
      required: true,
    },
    {
      name: 'hero_image',
      label: 'Imagen de Fondo del Hero',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    
    // --- SECCIÓN PRECIOS (2 Opciones) ---
    {
      name: 'ticket_price',
      label: 'Precio de 1 Ticket',
      type: 'number',
      required: true,
    },
    {
      name: 'combo_amount',
      label: 'Cantidad de Tickets en el Combo',
      type: 'number',
      required: true,
    },
    {
      name: 'combo_price',
      label: 'Precio Total del Combo',
      type: 'number',
      required: true,
    },
    {
      name: 'total_tickets',
      label: 'Total de Tickets',
      type: 'number',
      required: true,
    },
    {
      name: 'draw_date',
      label: 'Fecha del Sorteo',
      type: 'date',
      required: true,
    },
    {
      name: 'last_ticket_issued',
      label: 'Último Ticket Emitido',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      defaultValue: 'Activa',
      options: [
        { label: 'Activa', value: 'Activa' },
        { label: 'Finalizada', value: 'Finalizada' },
      ],
      required: true,
    },
  ],
}
