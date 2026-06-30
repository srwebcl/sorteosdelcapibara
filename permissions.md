# permissions.md — Permisos, Seguridad y Límites de IA
## Proyecto: Las Rifas del Capibara

## 1. Manejo de Credenciales Sensibles
* **`FLOW_API_KEY` & `FLOW_SECRET_KEY`:** 🔴 CRÍTICA ABSOLUTA. Si estas llaves se exponen, la pasarela de pagos queda comprometida. Uso exclusivo en Server Actions / API Routes. NUNCA pasarlas a un Client Component.
* **`DATABASE_URL`:** 🔴 CRÍTICA. Uso exclusivo en backend.

## 2. Restricciones del Agente de IA
### ✅ El Agente PUEDE:
* Crear y modificar esquemas de Payload CMS para Rifas, Órdenes y Tickets.
* Desarrollar la integración criptográfica con la API de Flow (firma de parámetros).
* Construir la UI interactiva con Tailwind v4 y framer-motion respetando el esquema Black & Gold.
* Implementar validaciones de formularios con `Zod` (validación estricta de RUT chileno requerida).

### ❌ El Agente NO PUEDE:
* Consumir la API de Flow directamente desde el navegador del cliente. Todo pago se inicializa en el servidor.
* Aprobar una orden o generar tickets si la firma del Webhook de Flow no coincide o si el estado no es "pagado" (`status === 2`).
* Exponer la lista completa de compradores o RUTs en el frontend público por leyes de protección de datos.

## 3. Seguridad Transaccional (Asignación de Tickets)
* **Atomicidad:** La asignación de números correlativos en Vercel Postgres debe realizarse mediante transacciones SQL (`BEGIN`, `COMMIT`, `ROLLBACK`) o bloqueos de fila (`SELECT FOR UPDATE`) para garantizar que bajo ninguna circunstancia de alta concurrencia dos usuarios obtengan el mismo número de ticket.
* **Validación de Identidad:** El RUT y Correo del comprador son llaves primarias para reclamar el premio. El sistema debe normalizar el RUT (sin puntos, con guion) antes de guardar.