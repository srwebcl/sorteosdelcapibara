# skill.md — Sistema de Diseño y Habilidades Técnicas
## Proyecto: Las Rifas del Capibara

## 1. Sistema de Colores — "Casino VIP / Black & Gold"
* **Fondos:** Negro absoluto (`#000000`) y Carbón (`#111111`) para destacar los premios iluminados.
* **Marca (Acentos):** Oro / Amarillo Vibrante (`#FBBF24`, `#EAB308`). Este es el color de conversión para los botones de compra.
* **Textos/Detalles:** Blanco puro (`#FFFFFF`) y Gris plata (`#A1A1AA`) para legibilidad.
* **Validación:** Verde Éxito (`#22C55E`) para los checks de pago completado.

## 2. Tipografía y Motivos
* **Títulos y Números (Display):** Tipografía de impacto, pesada y extendida (ej. Montserrat Black o Oswald). Los números de tickets deben sentirse masivos.
* **Cuerpo:** Sans-serif hiper-limpia para el formulario de pago (Inter o Roboto).
* **Textura Visual:** Uso de `glassmorphism` oscuro (`bg-white/5 backdrop-blur-md border border-white/10`) para las tarjetas de selección de tickets.

## 3. Patrones de UI/UX — "Fricción Cero"
* **Split-Screen Desktop:** La pantalla se divide en dos. Lado izquierdo fijo (sticky) mostrando el premio y la barra de progreso. Lado derecho con scroll conteniendo los paquetes de tickets y el formulario de compra.
* **Barra de Progreso:** Elemento visual crítico. Debe mostrar porcentaje "Tickets Vendidos 1.289 / 5.000" con una barra amarilla que se llena animada con Framer Motion.
* **Selección de Paquetes:** Botones masivos tipo "Radio Button" que destacan el paquete más popular ("MÁS POPULAR: $10.000 = 15 Tickets").

## 4. SKILL: Protocolo PageSpeed y Core Web Vitals
* La imagen principal del premio DEBE tener `priority={true}` en Next.js.
* Los scripts de pasarela de pago externos deben cargar con `strategy="lazyOnload"`.
* La UI del formulario de pago debe construirse con validación estricta en tiempo real (Zod + React Hook Form) para que el usuario no envíe formularios incompletos.