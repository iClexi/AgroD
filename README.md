# AgroD

Aplicación web de AgroTech Dominicana para presentar AgroD y gestionar fincas, cultivos y dispositivos desde móvil o computadora.

## Funciones incluidas

- Página principal comercial, adaptable y orientada a productores dominicanos.
- Registro, inicio y cierre de sesión con contraseñas protegidas mediante `scrypt`.
- Sesiones opacas en cookies `HttpOnly`, `SameSite=Lax` y `Secure` en producción.
- Base de datos SQLite persistente con separación de datos por propietario.
- Gestión de fincas, cultivos y dispositivos AgroD.
- Vinculación de cada cultivo con un dispositivo.
- Finca virtual con filas, columnas y ruta de inspección priorizada.
- Alertas derivadas de las lecturas registradas.
- Orden de zumbido simulada para localizar equipos compatibles.
- Demo pública interactiva con lecturas, cultivos, dispositivos y alertas de ejemplo.
- Perfil editable con datos personales, agrícolas, preferencias y equipos registrados.

## Requisitos

- Node.js 24 o superior.
- pnpm 11.

## Desarrollo local

```bash
pnpm install
copy .env.example .env.local
pnpm dev
```

La aplicación queda disponible en `http://localhost:3000`. La base de datos se crea automáticamente en la ruta indicada por `DATABASE_PATH`.

## Verificación

```bash
pnpm check
```

El comando ejecuta lint, comprobación de tipos, pruebas y compilación de producción.

## Despliegue con Docker

```bash
docker compose up -d --build
```

El servicio escucha solamente en `127.0.0.1:3010` para colocarlo detrás de un proxy inverso con HTTPS. El volumen `agrod_data` conserva usuarios, fincas, cultivos y dispositivos aunque el contenedor se reconstruya.

Comprueba el servicio con:

```bash
curl http://127.0.0.1:3010/api/health
```

## Integraciones pendientes

- El zumbador registra una orden simulada; falta integrar el firmware y la comunicación con el dispositivo físico.
- Las lecturas se registran manualmente; falta la ingestión automática desde sensores IoT.
- App Store y Google Play aparecen como próximos lanzamientos, no como aplicaciones ya publicadas.
- Las cifras comerciales son referencias del material académico y deben validarse antes de una oferta real.

## Estructura principal

- `app/`: rutas, páginas y API.
- `components/agro/`: portada y componentes de marca.
- `components/panel/`: experiencia privada y formularios.
- `lib/db.ts`: esquema y conexión SQLite.
- `lib/data.ts`: acceso a datos filtrado por usuario.
- `lib/security.ts`: hash de contraseñas y tokens de sesión.
- `.agents/skills/agrod-web-design/`: guía de diseño reutilizable creada para AgroD.
