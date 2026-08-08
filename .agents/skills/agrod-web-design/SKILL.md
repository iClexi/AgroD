---
name: agrod-web-design
description: Diseñar, implementar o revisar landing pages, paneles, formularios y flujos web de AgroTech Dominicana (AgroD). Usar cuando una tarea afecte la marca, el contenido comercial, la experiencia de agricultores, el dashboard, dispositivos, cultivos, parcelas, alertas, mapas de finca o el comportamiento responsive de AgroD.
---

# AgroD Web Design

Construir una experiencia AgriTech dominicana reconocible, accesible y útil. Hacer que la landing venda la propuesta y que la aplicación demuestre el producto con datos y acciones claras.

## Preparar la tarea

1. Leer [brand-product.md](references/brand-product.md) antes de escribir copy, métricas, precios, nombres del equipo o afirmaciones del producto.
2. Leer [interaction-quality.md](references/interaction-quality.md) antes de diseñar componentes, navegación, formularios, mapas, tablas o estados responsive.
3. Identificar el público, la acción principal y si la superficie es pública o privada.
4. Conservar la arquitectura y convenciones del repositorio existente.

## Diseñar

- Tratar la landing como un relato comercial continuo y el panel como una herramienta de trabajo.
- Usar como firma visual surcos o filas de cultivo que se transformen en rutas, señales o líneas de datos.
- Mantener un fondo mayormente blanco o muy claro; reservar verde para agricultura y acciones, y azul oscuro para tecnología, navegación y confianza.
- Usar Manrope para titulares y Atkinson Hyperlegible o Inter para lectura e interfaz.
- Favorecer una imagen agrícola fuerte, un mockup útil y pocos elementos de apoyo.
- Evitar cuadrículas repetitivas de tarjetas, texto excesivo, glassmorphism, brillos genéricos, decoraciones sin función y clichés de hojas.
- No usar emojis en contenido, código, texto alternativo ni datos de demostración. Usar iconos consistentes cuando aclaren una acción.

## Construir

- Escribir copy en español sencillo, directo y respetuoso; nombrar acciones por el resultado que producen.
- Mantener controles principales de al menos 44 por 44 px, foco visible, etiquetas reales y contraste WCAG AA.
- Diferenciar dato medido, inferencia, recomendación, proyección y simulación.
- Implementar estados de carga, vacío, error, confirmación y éxito con una acción de recuperación.
- Proteger en el servidor cada recurso privado y verificar propiedad por usuario.
- Conservar texto y controles como HTML real; no convertir la interfaz en una captura estática.
- Respetar `prefers-reduced-motion` y evitar animaciones continuas que distraigan.

## Validar

1. Ejecutar tipos, lint, pruebas y build disponibles.
2. Probar 375, 414, 768, 1024 y 1440 px; confirmar que no haya desplazamiento horizontal.
3. En 1440 px, usar el ancho de pantalla con bandas de fondo completas y contenido útil de hasta 1360-1440 px, sin comprimir todo en 1152 px.
4. Recorrer registro, inicio/cierre de sesión y los CRUD principales con persistencia real.
5. Probar teclado, foco, etiquetas, mensajes de error y reducción de movimiento.
6. Buscar emojis, placeholders, datos de contacto falsos, métricas sin fuente y promesas no implementadas.
7. Comparar capturas de escritorio y móvil con la dirección aceptada y corregir los desajustes visibles antes de entregar.

