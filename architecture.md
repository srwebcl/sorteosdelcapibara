# architecture.md — Arquitectura Técnica
## Proyecto: Las Rifas del Capibara

## Diagrama de Alto Nivel
1. **Frontend (DOM):** Tailwind CSS + Componentes interactivos (`"use client"`) para la selección de paquetes de tickets (ej. $1.000 x 1, $10.000 x 15).
2. **Backend (Payload Local API):** Gestión de la Rifa Activa, Usuarios y progreso de ventas.
3. **Módulo Transaccional:** Next.js Server Actions para generar la orden de pago en Flow.cl.
4. **Módulo Asíncrono (Webhooks):** Ruta `/api/webhooks/flow` que recibe la confirmación de pago y ejecuta el Algoritmo de Asignación.

## El Algoritmo de Asignación de Tickets (CRÍTICO)
Para evitar el *overbooking* (vender más tickets de los disponibles) cuando hay picos de tráfico:
1. El Webhook de Flow confirma el pago de la Orden X.
2. El sistema inicia una **Transacción SQL** en Postgres.
3. Lee la Rifa actual y el `last_ticket_issued`.
4. Si la compra es de 15 tickets, asigna desde `last_ticket_issued + 1` hasta `last_ticket_issued + 15`.
5. Actualiza el `last_ticket_issued` en la Rifa.
6. Cierra la transacción SQL (Commit). Si algo falla, hace Rollback.
7. Dispara email por Resend con el recibo y los números asignados.

## Estructura de Payload Collections
* `Raffles` (Rifas): Título, Descripción, Premio, Imagen, Total Tickets, Precio base, Fecha Sorteo, Estado (Activa/Finalizada).
* `Orders` (Órdenes): Datos del comprador (RUT, Nombre), Monto, Estado del pago, ID de Transacción Flow.
* `Tickets`: Número correlativo, ID de Rifa, ID de Orden.