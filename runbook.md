# runbook.md — Manual Operacional y Despliegue
## Proyecto: Las Rifas del Capibara

## 1. Setup Inicial
```bash
npm install
npm run dev
```

## 2. Variables de Entorno Requeridas (.env.local)
```bash
# URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Base de Datos (Vercel Postgres)
DATABASE_URL=postgresql://user:password@host:port/capibara_db
PAYLOAD_SECRET=secret_string_generado

# Integración Flow.cl
FLOW_API_KEY=tu_api_key_de_produccion_o_sandbox
FLOW_SECRET_KEY=tu_secret_key
FLOW_API_URL=[https://sandbox.flow.cl/api](https://sandbox.flow.cl/api) # Cambiar en prod

# Correos Transaccionales
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
```

## 3. Flujo de Pruebas Locales (Webhooks)
Flow.cl no puede enviar notificaciones a localhost. Para probar el flujo de compra completo en desarrollo:
1. Instalar Ngrok: `npm install -g ngrok`
2. Exponer el puerto local: `ngrok http 3000`
3. Usar la URL de Ngrok generada y configurarla como `urlConfirmacion` en el objeto de creación de pago de Flow.

## 4. Pipeline de Despliegue (Vercel)
1. Conectar repo a Vercel.
2. Inyectar variables de entorno de producción.
3. Asegurar que `FLOW_API_URL` apunte a `https://www.flow.cl/api`.
4. Configurar el cron job de Next.js (opcional) para cambiar el estado de la rifa a "Finalizada" automáticamente en la fecha del sorteo.