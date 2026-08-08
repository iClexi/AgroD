import { z } from 'zod'

const shortText = (label: string, max: number) =>
  z.string().trim().min(2, `${label} debe tener al menos 2 caracteres.`).max(max)

const nullableReading = (min: number, max: number) =>
  z.number().finite().min(min).max(max).nullable().optional().default(null)

export const registerSchema = z.object({
  fullName: shortText('El nombre', 100),
  email: z.string().trim().toLowerCase().email('Escribe un correo válido.').max(160),
  password: z
    .string()
    .min(10, 'La contraseña debe tener al menos 10 caracteres.')
    .max(128)
    .regex(/[A-Za-z]/, 'Incluye al menos una letra.')
    .regex(/[0-9]/, 'Incluye al menos un número.'),
  includeDemo: z.boolean().optional().default(true),
})

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(160),
  password: z.string().min(1).max(128),
})

export const farmSchema = z.object({
  name: shortText('El nombre de la finca', 100),
  province: shortText('La provincia', 80),
  rows: z.number().int().min(1).max(100),
  columns: z.number().int().min(1).max(100),
})

export const farmUpdateSchema = farmSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  'Incluye al menos un campo para actualizar.',
)

export const deviceModels = [
  'AgroD Terra 500X',
  'AgroD Clima 600X',
  'AgroD Nexus 700X',
] as const

export const deviceSchema = z.object({
  farmId: z.string().uuid(),
  name: shortText('El nombre del dispositivo', 100),
  serial: z.string().trim().min(5).max(64).regex(/^[A-Za-z0-9-]+$/, 'Usa letras, números y guiones.'),
  model: z.enum(deviceModels),
  status: z.enum(['online', 'offline', 'maintenance']).default('offline'),
  battery: z.number().int().min(0).max(100).nullable().optional().default(null),
  signal: z.number().int().min(0).max(100).nullable().optional().default(null),
  supportsBuzzer: z.boolean().optional().default(true),
})

export const deviceUpdateSchema = deviceSchema.partial().omit({ farmId: true }).refine(
  (value) => Object.keys(value).length > 0,
  'Incluye al menos un campo para actualizar.',
)

export const plantSchema = z.object({
  farmId: z.string().uuid(),
  deviceId: z.string().uuid().nullable().optional().default(null),
  name: shortText('El nombre de la zona', 100),
  crop: shortText('El cultivo', 100),
  variety: z.string().trim().max(100).optional().default(''),
  areaTasks: z.number().positive().max(100000),
  row: z.number().int().min(1).max(100),
  column: z.number().int().min(1).max(100),
  status: z.enum(['stable', 'attention', 'critical', 'no_data']).default('no_data'),
  humidity: nullableReading(0, 100),
  temperature: nullableReading(-20, 80),
  ph: nullableReading(0, 14),
  conductivity: nullableReading(0, 20),
  notes: z.string().trim().max(2000).optional().default(''),
})

export const plantUpdateSchema = plantSchema.partial().omit({ farmId: true }).refine(
  (value) => Object.keys(value).length > 0,
  'Incluye al menos un campo para actualizar.',
)

export const demoRequestSchema = z.object({
  name: shortText('El nombre', 100),
  phone: z.string().trim().min(7).max(30).regex(/^[+0-9() -]+$/, 'Escribe un teléfono válido.'),
  email: z.string().trim().toLowerCase().email('Escribe un correo válido.').max(160),
  province: shortText('La provincia', 80),
  crop: shortText('El cultivo', 100),
  farmSize: z.string().trim().min(1).max(80),
  message: z.string().trim().max(2000).optional().default(''),
})

export function firstZodError(error: z.ZodError): string {
  return error.issues[0]?.message || 'Revisa los datos enviados.'
}
