import { describe, expect, it } from 'vitest'
import { passwordChangeSchema, profileSchema, registerSchema } from '@/lib/schemas'

describe('registerSchema', () => {
  it('normaliza el correo y acepta una cuenta completa', () => {
    const result = registerSchema.parse({
      firstName: 'María',
      lastName: 'Rodríguez',
      email: '  PRODUCTORA@EJEMPLO.COM ',
      password: 'AgroD2026Segura',
      acceptedLegal: true,
    })

    expect(result.email).toBe('productora@ejemplo.com')
    expect(result.includeDemo).toBe(true)
  })

  it('rechaza contraseñas sin números', () => {
    const result = registerSchema.safeParse({
      firstName: 'María',
      lastName: 'Rodríguez',
      email: 'productora@ejemplo.com',
      password: 'sololetrasseguras',
      acceptedLegal: true,
    })

    expect(result.success).toBe(false)
  })

  it('respeta el límite de nombre completo de la base de datos', () => {
    const result = registerSchema.safeParse({
      firstName: 'A'.repeat(50),
      lastName: 'B'.repeat(51),
      email: 'productora@ejemplo.com',
      password: 'AgroD2026Segura',
      acceptedLegal: true,
    })

    expect(result.success).toBe(false)
  })

  it('rechaza registros sin aceptación legal', () => {
    const result = registerSchema.safeParse({
      firstName: 'María',
      lastName: 'Rodríguez',
      email: 'productora@ejemplo.com',
      password: 'AgroD2026Segura',
    })

    expect(result.success).toBe(false)
  })
})

describe('profileSchema', () => {
  const validProfile = {
    firstName: 'María',
    lastName: 'Rodríguez',
    email: 'productora@ejemplo.com',
    birthDate: '1985-04-12',
    phone: '809 555 0142',
    province: 'La Vega',
    municipality: 'Constanza',
    producerRole: 'Productor' as const,
    primaryCrop: 'Tomate',
    products: ['Tomate', 'Ají'],
    preferredContact: 'whatsapp' as const,
    notifyEmail: true,
    notifyWhatsapp: true,
  }

  it('acepta preferencias y productos del agricultor', () => {
    expect(profileSchema.parse(validProfile).products).toEqual(['Tomate', 'Ají'])
  })

  it('rechaza una fecha de nacimiento futura', () => {
    expect(profileSchema.safeParse({ ...validProfile, birthDate: '2999-01-01' }).success).toBe(false)
  })
})

describe('passwordChangeSchema', () => {
  it('exige una contraseña nueva diferente', () => {
    const result = passwordChangeSchema.safeParse({
      currentPassword: 'AgroD2026Segura',
      newPassword: 'AgroD2026Segura',
    })

    expect(result.success).toBe(false)
  })
})
