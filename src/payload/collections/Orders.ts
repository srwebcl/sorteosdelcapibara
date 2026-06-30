import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Orden de Compra',
    plural: 'Órdenes de Compra',
  },
  access: {
    read: () => false,
  },
  fields: [
    {
      name: 'rut',
      label: 'RUT',
      type: 'text',
      required: true,
    },
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      required: true,
    },
    {
      name: 'total_amount',
      label: 'Monto Total',
      type: 'number',
      required: true,
    },
    {
      name: 'payment_status',
      label: 'Estado del Pago',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
      ],
      required: true,
    },
    {
      name: 'flow_order_id',
      label: 'ID de Transacción Flow',
      type: 'text',
    },
    {
      name: 'raffle_id',
      label: 'Rifa Asociada',
      type: 'relationship',
      relationTo: 'raffles',
    },
    {
      name: 'ticket_quantity',
      label: 'Cantidad de Tickets',
      type: 'number',
    },
  ],
}
