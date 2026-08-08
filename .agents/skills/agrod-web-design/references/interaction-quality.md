# Interacción y calidad

## Estructura pública

- Mantener navegación corta: Inicio, Cómo funciona, Producto, Beneficios, Equipo, Contacto, Iniciar sesión.
- Conservar una acción primaria visible: Solicitar demostración.
- Usar un menú móvil accesible con botón nombrado, estado expandido y cierre por teclado.
- Construir un hero de pantalla completa o casi completa, con una imagen de finca dominicana y una vista real del producto.
- Variar el ritmo de secciones; no repetir el mismo bloque centrado o la misma cuadrícula de tarjetas.

## Estructura privada

- Priorizar Resumen, Finca virtual, Cultivos, Dispositivos, Alertas y Recomendaciones.
- Mantener texto y acciones grandes, etiquetas persistentes y navegación reconocible.
- En móvil, usar una navegación compacta sin ocultar las tareas principales.
- Mostrar siempre la finca/parcela activa y el estado de conexión de los datos.

## Formularios

- Asociar cada control a un `label` visible.
- Usar ejemplos dominicanos cuando aporten claridad, pero no llenar previamente información personal.
- Validar en cliente para rapidez y en servidor para seguridad.
- Preservar valores tras un error y dirigir el foco al resumen del problema.
- Confirmar acciones destructivas e indicar exactamente qué se eliminará.

## Mapa de finca y rutas

- Usar una cuadrícula o plano táctil con filas, columnas, zonas y marcadores accesibles.
- Permitir selección por lista además del mapa visual.
- Diferenciar estados con texto y forma, no solo color.
- Mostrar el orden recomendado con números reales de secuencia y explicar la prioridad.
- Mantener visible la acción "Hacer sonar" solo en dispositivos compatibles; devolver enviado, confirmado, sin conexión o simulado.

## Responsive

- Probar 375, 414, 768, 1024 y 1440 px.
- Usar bandas `width: 100%` y contenedores fluidos con `max-width` de 1360 a 1440 px para escritorio.
- Evitar un `max-width` global pequeño que desperdicie la pantalla.
- Colapsar composiciones asimétricas a una columna por debajo de 768 px.
- Mantener botones principales a ancho completo en teléfonos cuando mejore la lectura.
- Evitar tablas horizontales sin una alternativa apilada o desplazamiento claramente indicado.

## Accesibilidad

- Mantener contraste WCAG 2.2 AA.
- Usar HTML semántico, un solo `h1`, jerarquía de encabezados y regiones `header`, `nav`, `main`, `aside` y `footer`.
- Hacer visibles los focos con `:focus-visible`.
- Mantener objetivos táctiles mínimos de 44 por 44 px.
- Dar nombres accesibles a iconos de acción y ocultar los meramente decorativos.
- Respetar `prefers-reduced-motion` y `prefers-contrast` cuando sea práctico.

## Rendimiento y verificación

- Optimizar imágenes y declarar tamaños responsive.
- Evitar hidratar secciones estáticas sin necesidad.
- Dividir componentes por responsabilidad y evitar efectos que solo calculen estado derivado.
- Verificar ausencia de overlays de error, errores de consola, enlaces vacíos y botones inertes.
- Recorrer registro, sesión, creación de cultivo, creación de dispositivo, asociación, mapa, ruta, zumbido y cierre de sesión.
- Reiniciar el servidor y confirmar que los datos persistan.
