import 'server-only'

import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

const schema = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL CHECK (length(full_name) BETWEEN 2 AND 100),
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  password_hash TEXT NOT NULL,
  birth_date TEXT,
  phone TEXT NOT NULL DEFAULT '',
  province TEXT NOT NULL DEFAULT '',
  municipality TEXT NOT NULL DEFAULT '',
  producer_role TEXT NOT NULL DEFAULT 'Propietario o encargado',
  primary_crop TEXT NOT NULL DEFAULT '',
  products TEXT NOT NULL DEFAULT '',
  preferred_contact TEXT NOT NULL DEFAULT 'email',
  notify_email INTEGER NOT NULL DEFAULT 1 CHECK (notify_email IN (0, 1)),
  notify_whatsapp INTEGER NOT NULL DEFAULT 0 CHECK (notify_whatsapp IN (0, 1)),
  legal_version TEXT NOT NULL DEFAULT '',
  legal_accepted_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
) STRICT;

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
) STRICT;

CREATE TABLE IF NOT EXISTS farms (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (length(name) BETWEEN 2 AND 100),
  province TEXT NOT NULL CHECK (length(province) BETWEEN 2 AND 80),
  rows_count INTEGER NOT NULL CHECK (rows_count BETWEEN 1 AND 100),
  columns_count INTEGER NOT NULL CHECK (columns_count BETWEEN 1 AND 100),
  is_demo INTEGER NOT NULL DEFAULT 0 CHECK (is_demo IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
) STRICT;

CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  farm_id TEXT NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (length(name) BETWEEN 2 AND 100),
  serial TEXT NOT NULL CHECK (length(serial) BETWEEN 5 AND 64),
  model TEXT NOT NULL CHECK (model IN ('AgroD Terra 500X', 'AgroD Clima 600X', 'AgroD Nexus 700X')),
  status TEXT NOT NULL DEFAULT 'offline' CHECK (status IN ('online', 'offline', 'maintenance')),
  battery INTEGER CHECK (battery IS NULL OR battery BETWEEN 0 AND 100),
  signal INTEGER CHECK (signal IS NULL OR signal BETWEEN 0 AND 100),
  supports_buzzer INTEGER NOT NULL DEFAULT 1 CHECK (supports_buzzer IN (0, 1)),
  is_demo INTEGER NOT NULL DEFAULT 0 CHECK (is_demo IN (0, 1)),
  last_seen_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (owner_id, serial)
) STRICT;

CREATE TABLE IF NOT EXISTS plants (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  farm_id TEXT NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  device_id TEXT REFERENCES devices(id) ON DELETE SET NULL,
  name TEXT NOT NULL CHECK (length(name) BETWEEN 2 AND 100),
  crop TEXT NOT NULL CHECK (length(crop) BETWEEN 2 AND 100),
  variety TEXT NOT NULL DEFAULT '' CHECK (length(variety) <= 100),
  area_tasks REAL NOT NULL CHECK (area_tasks > 0 AND area_tasks <= 100000),
  row_number INTEGER NOT NULL CHECK (row_number BETWEEN 1 AND 100),
  column_number INTEGER NOT NULL CHECK (column_number BETWEEN 1 AND 100),
  status TEXT NOT NULL DEFAULT 'no_data' CHECK (status IN ('stable', 'attention', 'critical', 'no_data')),
  humidity REAL CHECK (humidity IS NULL OR humidity BETWEEN 0 AND 100),
  temperature REAL CHECK (temperature IS NULL OR temperature BETWEEN -20 AND 80),
  ph REAL CHECK (ph IS NULL OR ph BETWEEN 0 AND 14),
  conductivity REAL CHECK (conductivity IS NULL OR conductivity BETWEEN 0 AND 20),
  notes TEXT NOT NULL DEFAULT '' CHECK (length(notes) <= 2000),
  is_demo INTEGER NOT NULL DEFAULT 0 CHECK (is_demo IN (0, 1)),
  last_reading_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (farm_id, row_number, column_number, name)
) STRICT;

CREATE TABLE IF NOT EXISTS buzz_commands (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('simulated', 'sent', 'confirmed', 'failed')),
  requested_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
) STRICT;

CREATE INDEX IF NOT EXISTS idx_sessions_token_expiry ON sessions(token_hash, expires_at);
CREATE INDEX IF NOT EXISTS idx_farms_owner_updated ON farms(owner_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_devices_owner_farm ON devices(owner_id, farm_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_plants_owner_farm ON plants(owner_id, farm_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_buzz_owner_device ON buzz_commands(owner_id, device_id, requested_at DESC);
`

const globalDatabase = globalThis as typeof globalThis & {
  __agrodDatabase?: DatabaseSync
}

function migrateUsers(database: DatabaseSync): void {
  const existing = new Set(
    (database.prepare('PRAGMA table_info(users)').all() as Array<{ name: string }>).map((column) => column.name),
  )
  const additions = [
    ['first_name', "TEXT NOT NULL DEFAULT ''"],
    ['last_name', "TEXT NOT NULL DEFAULT ''"],
    ['birth_date', 'TEXT'],
    ['phone', "TEXT NOT NULL DEFAULT ''"],
    ['province', "TEXT NOT NULL DEFAULT ''"],
    ['municipality', "TEXT NOT NULL DEFAULT ''"],
    ['producer_role', "TEXT NOT NULL DEFAULT 'Propietario o encargado'"],
    ['primary_crop', "TEXT NOT NULL DEFAULT ''"],
    ['products', "TEXT NOT NULL DEFAULT ''"],
    ['preferred_contact', "TEXT NOT NULL DEFAULT 'email'"],
    ['notify_email', 'INTEGER NOT NULL DEFAULT 1'],
    ['notify_whatsapp', 'INTEGER NOT NULL DEFAULT 0'],
    ['legal_version', "TEXT NOT NULL DEFAULT ''"],
    ['legal_accepted_at', 'TEXT'],
    ['updated_at', "TEXT NOT NULL DEFAULT ''"],
  ] as const
  for (const [name, definition] of additions) {
    if (!existing.has(name)) database.exec(`ALTER TABLE users ADD COLUMN ${name} ${definition}`)
  }
  database.exec(`
    UPDATE users
    SET first_name = CASE WHEN instr(full_name, ' ') > 0 THEN substr(full_name, 1, instr(full_name, ' ') - 1) ELSE full_name END,
        last_name = CASE WHEN instr(full_name, ' ') > 0 THEN trim(substr(full_name, instr(full_name, ' ') + 1)) ELSE '' END
    WHERE first_name = '';
    UPDATE users SET updated_at = created_at WHERE updated_at = '';
  `)
}

export function getDb(): DatabaseSync {
  if (globalDatabase.__agrodDatabase) return globalDatabase.__agrodDatabase

  const configuredPath = process.env.DATABASE_PATH?.trim() || './data/agrod.db'
  const databasePath = resolve(/* turbopackIgnore: true */ process.cwd(), configuredPath)
  mkdirSync(dirname(databasePath), { recursive: true })

  const database = new DatabaseSync(databasePath, {
    timeout: 5_000,
    enableForeignKeyConstraints: true,
    allowExtension: false,
  })
  database.exec('PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;')
  database.exec(schema)
  migrateUsers(database)
  database.exec("DELETE FROM sessions WHERE expires_at <= datetime('now'); PRAGMA optimize;")

  globalDatabase.__agrodDatabase = database
  return database
}

export function withTransaction<T>(operation: (database: DatabaseSync) => T): T {
  const database = getDb()
  database.exec('BEGIN IMMEDIATE')
  try {
    const result = operation(database)
    database.exec('COMMIT')
    return result
  } catch (error) {
    database.exec('ROLLBACK')
    throw error
  }
}
