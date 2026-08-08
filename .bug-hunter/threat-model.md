# Modelo de amenazas de AgroD

## Alcance y activos

Aplicación Next.js 16 autoalojada, con API del mismo origen y una base SQLite local. Los activos principales son credenciales, tokens de sesión, datos de fincas, cultivos, dispositivos, solicitudes comerciales y la integridad de las órdenes de zumbido.

## Límites de confianza

1. Navegador público hacia el proxy HTTPS y las rutas públicas.
2. Navegador autenticado hacia las rutas `/panel` y `/api/*`.
3. Proceso Node.js hacia el archivo SQLite persistente.
4. Proxy inverso hacia el proceso Node.js enlazado solamente a `127.0.0.1`.
5. Orden simulada hacia una futura integración física IoT, actualmente fuera del alcance.

## Amenazas STRIDE prioritarias

- Suplantación: robo o fijación de sesión. Controles: token aleatorio, hash SHA-256 en base, cookie HttpOnly/Secure/SameSite, renovación al iniciar sesión y expiración.
- Manipulación: edición de recursos ajenos o parámetros fuera de rango. Controles: todas las consultas mutables filtran por `owner_id`, Zod valida entradas y SQLite aplica claves foráneas y restricciones.
- Repudio: acciones sin trazabilidad. El prototipo registra órdenes de zumbido y fechas; para producción faltaría un historial general de auditoría.
- Divulgación: exposición de datos entre usuarios o de la base. Controles: rutas autenticadas, respuestas sin hashes ni tokens, puerto interno y volumen local. El respaldo y permisos del volumen dependen del servidor.
- Denegación: fuerza bruta, solicitudes grandes o abuso del formulario. Controles: límites de tamaño y tasa en memoria; para varias réplicas se requiere un limitador compartido en el proxy o almacén externo.
- Elevación: IDOR en fincas, cultivos o dispositivos. Patrón obligatorio: cada lectura, edición y eliminación debe incluir identificador y `owner_id`; vínculos dispositivo-cultivo deben validar propietario y finca.

## Patrones de revisión

- Consultas `UPDATE`, `DELETE` o `SELECT` por id sin `owner_id`.
- Nuevas rutas mutables sin `rejectCrossSite` ni validación Zod.
- Cookies sin `HttpOnly`, `Secure` en producción o `SameSite`.
- Lectura de `x-forwarded-for` si el puerto de Node queda expuesto directamente.
- Datos devueltos por `node:sqlite` sin normalizar antes de pasar a componentes cliente.
- Registro de contraseñas, tokens o cuerpos completos en logs.

## Riesgo residual

El zumbido y las lecturas IoT son simulaciones. Una integración física futura requiere autenticación mutua del dispositivo, antirrepetición, firma de mensajes, rotación de claves y límites de comandos por equipo.
