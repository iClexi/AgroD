import { z } from 'zod'

const shortText = (label: string, max: number) =>
  z.string().trim().min(2, `${label} debe tener al menos 2 caracteres.`).max(max)

const nullableReading = (min: number, max: number) =>
  z.number().finite().min(min).max(max).nullable().optional().default(null)

const passwordSchema = z
  .string()
  .min(10, 'La contraseña debe tener al menos 10 caracteres.')
  .max(128)
  .regex(/[A-Za-z]/, 'Incluye al menos una letra.')
  .regex(/[0-9]/, 'Incluye al menos un número.')

const fullNameFits = (value: { firstName: string; lastName: string }) =>
  `${value.firstName} ${value.lastName}`.trim().length <= 100

export const registerSchema = z.object({
  firstName: shortText('El nombre', 50),
  lastName: shortText('El apellido', 70),
  email: z.string().trim().toLowerCase().email('Escribe un correo válido.').max(160),
  password: passwordSchema,
  includeDemo: z.boolean().optional().default(true),
  acceptedLegal: z.literal(true, { error: 'Debes aceptar los Términos de uso y el Aviso de privacidad.' }),
}).refine(fullNameFits, {
  message: 'El nombre y el apellido juntos no pueden superar 100 caracteres.',
  path: ['lastName'],
})

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(160),
  password: z.string().min(1).max(128),
})

export const profileSchema = z.object({
  firstName: shortText('El nombre', 50),
  lastName: shortText('El apellido', 70),
  email: z.string().trim().toLowerCase().email('Escribe un correo válido.').max(160),
  birthDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Escribe una fecha válida.').nullable(),
  phone: z.string().trim().max(30).refine((value) => !value || /^[+0-9() -]+$/.test(value), 'Escribe un teléfono válido.'),
  province: z.string().trim().max(80),
  municipality: z.string().trim().max(80),
  producerRole: z.enum(['Propietario o encargado', 'Productor', 'Técnico agrícola', 'Agrónomo', 'Colaborador']),
  primaryCrop: z.string().trim().max(100),
  products: z.array(z.string().trim().min(1).max(80)).max(20),
  preferredContact: z.enum(['email', 'whatsapp', 'phone']),
  notifyEmail: z.boolean(),
  notifyWhatsapp: z.boolean(),
})
  .refine(fullNameFits, {
    message: 'El nombre y el apellido juntos no pueden superar 100 caracteres.',
    path: ['lastName'],
  })
  .refine((value) => !value.birthDate || value.birthDate <= new Date().toISOString().slice(0, 10), {
    message: 'La fecha de nacimiento no puede estar en el futuro.',
    path: ['birthDate'],
  })

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1).max(128),
  newPassword: passwordSchema,
}).refine((value) => value.currentPassword !== value.newPassword, {
  message: 'La nueva contraseña debe ser diferente.',
  path: ['newPassword'],
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

export function firstZodError(error: z.ZodError): string {
  return error.issues[0]?.message || 'Revisa los datos enviados.'
}
