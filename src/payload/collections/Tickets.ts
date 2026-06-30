import { CollectionConfig } from 'payload'

export const Tickets: CollectionConfig = {
  slug: 'tickets',
  labels: {
    singular: 'Ticket',
    plural: 'Tickets',
  },
  access: {
    read: () => false,
  },
  fields: [
    {
      name: 'ticket_number',
      label: 'Número de Ticket',
      type: 'number',
      required: true,
    },
    {
      name: 'raffle_id',
      label: 'Rifa Asociada',
      type: 'relationship',
      relationTo: 'raffles',
      required: true,
    },
    {
      name: 'order_id',
      label: 'Orden Asociada',
      type: 'relationship',
      relationTo: 'orders',
      required: true,
    },
  ],
}
