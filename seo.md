# seo.md — Estrategia SEO & Transparencia
## Proyecto: Las Rifas del Capibara

## 1. Mapeo de Palabras Clave
* 🔴 Alta: "rifas online chile", "sorteos transparentes chile", "ganar auto chile".
* 🟡 Media: "rifas seguras", "comprar tickets de rifa online".

## 2. Metadata Global
```html
<title>Las Rifas del Capibara | Tu Suerte, Tu Premio</title>
<meta name="description" content="Participa en las rifas más transparentes de Chile. Compra tu sticker digital y gana increíbles premios. 100% Seguro, sorteos en vivo y entrega garantizada.">
```

## 3. Trust Signals (Señales de Confianza)
Para combatir el escepticismo natural de las rifas online, el diseño debe integrar constantemente sellos de confianza.
* Uso de íconos SVG: "100% Seguro", "Transparente", "Entrega Garantizada", "Pago Seguro Webpay/Flow".
* Sección permanente de "Ganadores Anteriores" con videos incrustados estilo Reels.

## 4. Schema.org (JSON-LD)
El sitio debe declarar el sorteo como un `Event` (si tiene fecha) o `Product` (venta de stickers).
```json
{
  "@context": "[https://schema.org](https://schema.org)",
  "@type": "Event",
  "name": "Sorteo Refrigerador Samsung Side by Side",
  "startDate": "2024-08-31T20:00:00-04:00",
  "eventAttendanceMode": "[https://schema.org/OnlineEventAttendanceMode](https://schema.org/OnlineEventAttendanceMode)",
  "eventStatus": "[https://schema.org/EventScheduled](https://schema.org/EventScheduled)",
  "location": {
    "@type": "VirtualLocation",
    "url": "[https://rifasdelcapibara.cl/sorteo-en-vivo](https://rifasdelcapibara.cl/sorteo-en-vivo)"
  },
  "offers": {
    "@type": "Offer",
    "price": "2500",
    "priceCurrency": "CLP",
    "availability": "[https://schema.org/InStock](https://schema.org/InStock)",
    "validFrom": "2024-05-01"
  }
}
```