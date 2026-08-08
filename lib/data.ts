import 'server-only'

import { randomUUID } from 'node:crypto'
import { getDb, withTransaction } from '@/lib/db'
import type {
  BuzzCommand,
  DashboardData,
  Device,
  Farm,
  Plant,
  User,
} from '@/lib/types'
import type {
  deviceSchema,
  deviceUpdateSchema,
  farmSchema,
  farmUpdateSchema,
  plantSchema,
  plantUpdateSchema,
  profileSchema,
} from '@/lib/schemas'
import type { z } from 'zod'

type FarmInput = z.infer<typeof farmSchema>
type FarmUpdate = z.infer<typeof farmUpdateSchema>
type DeviceInput = z.infer<typeof deviceSchema>
type DeviceUpdate = z.infer<typeof deviceUpdateSchema>
type PlantInput = z.infer<typeof plantSchema>
type PlantUpdate = z.infer<typeof plantUpdateSchema>
type ProfileInput = z.infer<typeof profileSchema>

type FarmRow = Omit<Farm, 'isDemo'> & { isDemo: number }
type DeviceRow = Omit<Device, 'supportsBuzzer' | 'isDemo'> & {
  supportsBuzzer: number
  isDemo: number
}
type PlantRow = Omit<Plant, 'isDemo'> & { isDemo: number }
type UserRow = Omit<User, 'products' | 'notifyEmail' | 'notifyWhatsapp'> & {
  products: string
  notifyEmail: number
  notifyWhatsapp: number
}

const userColumns = `
  id, full_name AS fullName, first_name AS firstName, last_name AS lastName,
  email, birth_date AS birthDate, phone, province, municipality,
  producer_role AS producerRole, primary_crop AS primaryCrop, products,
  preferred_contact AS preferredContact, notify_email AS notifyEmail,
  notify_whatsapp AS notifyWhatsapp, created_at AS createdAt, updated_at AS updatedAt
`

const farmColumns = `
  id, name, province, rows_count AS rows, columns_count AS columns,
  is_demo AS isDemo, created_at AS createdAt, updated_at AS updatedAt
`
const deviceColumns = `
  id, farm_id AS farmId, name, serial, model, status, battery, signal,
  supports_buzzer AS supportsBuzzer, is_demo AS isDemo,
  last_seen_at AS lastSeenAt, created_at AS createdAt, updated_at AS updatedAt
`
const plantColumns = `
  id, farm_id AS farmId, device_id AS deviceId, name, crop, variety,
  area_tasks AS areaTasks, row_number AS row, column_number AS column,
  status, humidity, temperature, ph, conductivity, notes,
  is_demo AS isDemo, last_reading_at AS lastReadingAt,
  created_at AS createdAt, updated_at AS updatedAt
`

function mapFarm(row: FarmRow): Farm {
  return { ...row, isDemo: Boolean(row.isDemo) }
}

function mapDevice(row: DeviceRow): Device {
  return { ...row, supportsBuzzer: Boolean(row.supportsBuzzer), isDemo: Boolean(row.isDemo) }
}

function mapPlant(row: PlantRow): Plant {
  return { ...row, isDemo: Boolean(row.isDemo) }
}

function mapUser(row: UserRow): User {
  return {
    ...row,
    products: row.products.split(',').map((item) => item.trim()).filter(Boolean),
    notifyEmail: Boolean(row.notifyEmail),
    notifyWhatsapp: Boolean(row.notifyWhatsapp),
  }
}

export function getUserProfile(id: string): User | null {
  const row = getDb().prepare(`SELECT ${userColumns} FROM users WHERE id = ? LIMIT 1`).get(id) as unknown as UserRow | undefined
  return row ? mapUser(row) : null
}

function readFarm(ownerId: string, id: string): Farm | null {
  const row = getDb().prepare(`SELECT ${farmColumns} FROM farms WHERE id = ? AND owner_id = ?`).get(id, ownerId)
  return row ? mapFarm(row as unknown as FarmRow) : null
}

function readDevice(ownerId: string, id: string): Device | null {
  const row = getDb().prepare(`SELECT ${deviceColumns} FROM devices WHERE id = ? AND owner_id = ?`).get(id, ownerId)
  return row ? mapDevice(row as unknown as DeviceRow) : null
}

function readPlant(ownerId: string, id: string): Plant | null {
  const row = getDb().prepare(`SELECT ${plantColumns} FROM plants WHERE id = ? AND owner_id = ?`).get(id, ownerId)
  return row ? mapPlant(row as unknown as PlantRow) : null
}

export function findCredentials(email: string): { id: string; passwordHash: string } | null {
  const row = getDb()
    .prepare('SELECT id, password_hash AS passwordHash FROM users WHERE email = ? COLLATE NOCASE LIMIT 1')
    .get(email) as { id: string; passwordHash: string } | undefined
  return row || null
}

export function createAccount(input: {
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  includeDemo: boolean
}): string {
  return withTransaction((database) => {
    const userId = randomUUID()
    database
      .prepare('INSERT INTO users (id, full_name, first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?, ?, ?)')
      .run(userId, `${input.firstName} ${input.lastName}`.trim(), input.firstName, input.lastName, input.email, input.passwordHash)

    const farmId = randomUUID()
    database
      .prepare(`INSERT INTO farms (id, owner_id, name, province, rows_count, columns_count, is_demo)
        VALUES (?, ?, ?, ?, ?, ?, ?)`)
      .run(farmId, userId, input.includeDemo ? 'Finca demostrativa' : 'Mi finca', 'La Vega', 8, 8, input.includeDemo ? 1 : 0)

    if (input.includeDemo) seedDemo(database, userId, farmId)
    return userId
  })
}

export function updateUserProfile(ownerId: string, input: ProfileInput): User | null {
  const products = input.products.map((item) => item.replaceAll(',', ' ').trim()).filter(Boolean).join(', ')
  const result = getDb().prepare(`
    UPDATE users SET full_name = ?, first_name = ?, last_name = ?, email = ?,
      birth_date = ?, phone = ?, province = ?, municipality = ?, producer_role = ?,
      primary_crop = ?, products = ?, preferred_contact = ?, notify_email = ?,
      notify_whatsapp = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    `${input.firstName} ${input.lastName}`.trim(),
    input.firstName,
    input.lastName,
    input.email,
    input.birthDate,
    input.phone,
    input.province,
    input.municipality,
    input.producerRole,
    input.primaryCrop,
    products,
    input.preferredContact,
    input.notifyEmail ? 1 : 0,
    input.notifyWhatsapp ? 1 : 0,
    ownerId,
  )
  return Number(result.changes) ? getUserProfile(ownerId) : null
}

export function updatePasswordHash(ownerId: string, passwordHash: string): boolean {
  const result = getDb().prepare('UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(passwordHash, ownerId)
  return Number(result.changes) > 0
}

function seedDemo(database: ReturnType<typeof getDb>, ownerId: string, farmId: string): void {
  const suffix = ownerId.replaceAll('-', '').slice(0, 6).toUpperCase()
  const soilDevice = randomUUID()
  const climateDevice = randomUUID()
  const now = new Date().toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '')

  const insertDevice = database.prepare(`
    INSERT INTO devices (
      id, owner_id, farm_id, name, serial, model, status, battery, signal,
      supports_buzzer, is_demo, last_seen_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
  `)
  insertDevice.run(
    soilDevice,
    ownerId,
    farmId,
    'Sensor de suelo Norte',
    `AGD-T500-${suffix}`,
    'AgroD Terra 500X',
    'online',
    82,
    91,
    1,
    now,
  )
  insertDevice.run(
    climateDevice,
    ownerId,
    farmId,
    'Estación climática Central',
    `AGD-C600-${suffix}`,
    'AgroD Clima 600X',
    'online',
    76,
    86,
    1,
    now,
  )

  const insertPlant = database.prepare(`
    INSERT INTO plants (
      id, owner_id, farm_id, device_id, name, crop, variety, area_tasks,
      row_number, column_number, status, humidity, temperature, ph,
      conductivity, notes, is_demo, last_reading_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
  `)
  insertPlant.run(randomUUID(), ownerId, farmId, soilDevice, 'Tomate Norte', 'Tomate', 'Barceló', 6, 2, 2, 'attention', 31, 29, 6.4, 1.3, 'Revisar el riego de la zona.', now)
  insertPlant.run(randomUUID(), ownerId, farmId, climateDevice, 'Plátano Este', 'Plátano', 'FHIA-21', 10, 4, 6, 'stable', 47, 29, 6.7, 1.1, 'Condiciones dentro del rango definido.', now)
  insertPlant.run(randomUUID(), ownerId, farmId, soilDevice, 'Ají Sur', 'Ají cubanela', '', 4, 7, 3, 'critical', 22, 34, 5.8, 1.6, 'Prioridad alta por humedad baja.', now)
}

export function getDashboardData(ownerId: string): DashboardData {
  const database = getDb()
  const farms = (database.prepare(`SELECT ${farmColumns} FROM farms WHERE owner_id = ? ORDER BY updated_at DESC`).all(ownerId) as unknown as FarmRow[]).map(mapFarm)
  const devices = (database.prepare(`SELECT ${deviceColumns} FROM devices WHERE owner_id = ? ORDER BY updated_at DESC`).all(ownerId) as unknown as DeviceRow[]).map(mapDevice)
  const plants = (database.prepare(`SELECT ${plantColumns} FROM plants WHERE owner_id = ? ORDER BY updated_at DESC`).all(ownerId) as unknown as PlantRow[]).map(mapPlant)
  const buzzCommands = (database
    .prepare(`SELECT id, device_id AS deviceId, status, requested_at AS requestedAt
      FROM buzz_commands WHERE owner_id = ? ORDER BY requested_at DESC LIMIT 20`)
    .all(ownerId) as unknown as BuzzCommand[]).map((command) => ({ ...command }))
  return { farms, devices, plants, buzzCommands }
}

export function createFarm(ownerId: string, input: FarmInput): Farm {
  const id = randomUUID()
  getDb()
    .prepare(`INSERT INTO farms (id, owner_id, name, province, rows_count, columns_count)
      VALUES (?, ?, ?, ?, ?, ?)`)
    .run(id, ownerId, input.name, input.province, input.rows, input.columns)
  return readFarm(ownerId, id) as Farm
}

export function updateFarm(ownerId: string, id: string, input: FarmUpdate): Farm | null {
  const current = readFarm(ownerId, id)
  if (!current) return null
  const next = { ...current, ...input }
  const outside = getDb()
    .prepare('SELECT 1 FROM plants WHERE owner_id = ? AND farm_id = ? AND (row_number > ? OR column_number > ?) LIMIT 1')
    .get(ownerId, id, next.rows, next.columns)
  if (outside) throw new Error('FARM_DIMENSIONS_CONFLICT')
  getDb()
    .prepare(`UPDATE farms SET name = ?, province = ?, rows_count = ?, columns_count = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND owner_id = ?`)
    .run(next.name, next.province, next.rows, next.columns, id, ownerId)
  return readFarm(ownerId, id)
}

export function deleteFarm(ownerId: string, id: string): boolean {
  const result = getDb().prepare('DELETE FROM farms WHERE id = ? AND owner_id = ?').run(id, ownerId)
  return Number(result.changes) > 0
}

function validateFarmCoordinates(ownerId: string, farmId: string, row: number, column: number): Farm {
  const farm = readFarm(ownerId, farmId)
  if (!farm) throw new Error('FARM_NOT_FOUND')
  if (row > farm.rows || column > farm.columns) throw new Error('COORDINATES_OUTSIDE_FARM')
  return farm
}

function validateDeviceLink(ownerId: string, farmId: string, deviceId: string | null): void {
  if (!deviceId) return
  const device = readDevice(ownerId, deviceId)
  if (!device || device.farmId !== farmId) throw new Error('DEVICE_LINK_INVALID')
}

export function createPlant(ownerId: string, input: PlantInput): Plant {
  validateFarmCoordinates(ownerId, input.farmId, input.row, input.column)
  validateDeviceLink(ownerId, input.farmId, input.deviceId)
  const id = randomUUID()
  getDb()
    .prepare(`INSERT INTO plants (
      id, owner_id, farm_id, device_id, name, crop, variety, area_tasks,
      row_number, column_number, status, humidity, temperature, ph,
      conductivity, notes, last_reading_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`)
    .run(
      id,
      ownerId,
      input.farmId,
      input.deviceId,
      input.name,
      input.crop,
      input.variety,
      input.areaTasks,
      input.row,
      input.column,
      input.status,
      input.humidity,
      input.temperature,
      input.ph,
      input.conductivity,
      input.notes,
    )
  return readPlant(ownerId, id) as Plant
}

export function updatePlant(ownerId: string, id: string, input: PlantUpdate): Plant | null {
  const current = readPlant(ownerId, id)
  if (!current) return null
  const next = { ...current, ...input }
  validateFarmCoordinates(ownerId, current.farmId, next.row, next.column)
  validateDeviceLink(ownerId, current.farmId, next.deviceId)
  getDb()
    .prepare(`UPDATE plants SET
      device_id = ?, name = ?, crop = ?, variety = ?, area_tasks = ?,
      row_number = ?, column_number = ?, status = ?, humidity = ?, temperature = ?,
      ph = ?, conductivity = ?, notes = ?, updated_at = CURRENT_TIMESTAMP,
      last_reading_at = CURRENT_TIMESTAMP
      WHERE id = ? AND owner_id = ?`)
    .run(
      next.deviceId,
      next.name,
      next.crop,
      next.variety,
      next.areaTasks,
      next.row,
      next.column,
      next.status,
      next.humidity,
      next.temperature,
      next.ph,
      next.conductivity,
      next.notes,
      id,
      ownerId,
    )
  return readPlant(ownerId, id)
}

export function deletePlant(ownerId: string, id: string): boolean {
  return Number(getDb().prepare('DELETE FROM plants WHERE id = ? AND owner_id = ?').run(id, ownerId).changes) > 0
}

export function createDevice(ownerId: string, input: DeviceInput): Device {
  if (!readFarm(ownerId, input.farmId)) throw new Error('FARM_NOT_FOUND')
  const id = randomUUID()
  getDb()
    .prepare(`INSERT INTO devices (
      id, owner_id, farm_id, name, serial, model, status, battery, signal,
      supports_buzzer, last_seen_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`)
    .run(
      id,
      ownerId,
      input.farmId,
      input.name,
      input.serial.toUpperCase(),
      input.model,
      input.status,
      input.battery,
      input.signal,
      input.supportsBuzzer ? 1 : 0,
    )
  return readDevice(ownerId, id) as Device
}

export function updateDevice(ownerId: string, id: string, input: DeviceUpdate): Device | null {
  const current = readDevice(ownerId, id)
  if (!current) return null
  const next = { ...current, ...input }
  getDb()
    .prepare(`UPDATE devices SET
      name = ?, serial = ?, model = ?, status = ?, battery = ?, signal = ?,
      supports_buzzer = ?, updated_at = CURRENT_TIMESTAMP, last_seen_at = CURRENT_TIMESTAMP
      WHERE id = ? AND owner_id = ?`)
    .run(
      next.name,
      next.serial.toUpperCase(),
      next.model,
      next.status,
      next.battery,
      next.signal,
      next.supportsBuzzer ? 1 : 0,
      id,
      ownerId,
    )
  return readDevice(ownerId, id)
}

export function deleteDevice(ownerId: string, id: string): boolean {
  return Number(getDb().prepare('DELETE FROM devices WHERE id = ? AND owner_id = ?').run(id, ownerId).changes) > 0
}

export function createBuzzCommand(ownerId: string, deviceId: string): BuzzCommand | null {
  const device = readDevice(ownerId, deviceId)
  if (!device) return null
  if (!device.supportsBuzzer) throw new Error('BUZZER_UNSUPPORTED')
  const id = randomUUID()
  getDb()
    .prepare("INSERT INTO buzz_commands (id, owner_id, device_id, status) VALUES (?, ?, ?, 'simulated')")
    .run(id, ownerId, deviceId)
  const command = getDb()
    .prepare(`SELECT id, device_id AS deviceId, status, requested_at AS requestedAt
      FROM buzz_commands WHERE id = ? AND owner_id = ?`)
    .get(id, ownerId) as unknown as BuzzCommand
  return { ...command }
}
