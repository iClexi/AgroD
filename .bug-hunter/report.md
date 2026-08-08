# Revisión de seguridad de AgroD

Resultado: aprobado para el prototipo autoalojado de una sola instancia. No quedaron hallazgos abiertos de severidad alta o crítica.

## Evidencia

- Una petición sin sesión a `/api/farms` devolvió `401`.
- Un segundo propietario no pudo ver la finca creada por el primero.
- El intento de editar una finca ajena devolvió `404`.
- Una mutación autenticada con origen externo devolvió `403`.
- Las consultas de fincas, plantas, dispositivos y zumbidos incluyen `owner_id`.
- `pnpm audit --json` terminó con cero vulnerabilidades conocidas.
- Las cookies de sesión son `HttpOnly`, `SameSite=Lax` y `Secure` en producción.
- Las contraseñas usan `scrypt`; la base guarda solo el hash del token de sesión.

## Cambios aplicados

- Se normalizó el historial SQLite del zumbador antes de cruzar el límite servidor-cliente.
- Se eliminaron dependencias heredadas y no utilizadas del prototipo v0.
- Se actualizaron dependencias vulnerables y se fijó `brace-expansion` en una versión corregida.
- Se añadieron encabezados defensivos, comparación completa de origen y un límite al número de cubetas del rate limiter.

## Requisitos del servidor

- Publicar solamente el proxy HTTPS; el contenedor debe permanecer enlazado a `127.0.0.1`.
- El proxy debe sobrescribir `Host`, `X-Forwarded-Host`, `X-Forwarded-Proto`, `X-Forwarded-For` y `X-Real-IP`.
- Respaldar el volumen SQLite y restringir sus permisos al usuario del contenedor.
- Mantener una sola réplica mientras el rate limiter y SQLite sean locales.
