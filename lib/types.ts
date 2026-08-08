export type User = {
  id: string
  fullName: string
  firstName: string
  lastName: string
  email: string
  birthDate: string | null
  phone: string
  province: string
  municipality: string
  producerRole: string
  primaryCrop: string
  products: string[]
  preferredContact: 'email' | 'whatsapp' | 'phone'
  notifyEmail: boolean
  notifyWhatsapp: boolean
  createdAt: string
  updatedAt: string
}

export type Farm = {
  id: string
  name: string
  province: string
  rows: number
  columns: number
  isDemo: boolean
  createdAt: string
  updatedAt: string
}

export type DeviceStatus = 'online' | 'offline' | 'maintenance'
export type DeviceModel =
  | 'AgroD Terra 500X'
  | 'AgroD Clima 600X'
  | 'AgroD Nexus 700X'

export type Device = {
  id: string
  farmId: string
  name: string
  serial: string
  model: DeviceModel
  status: DeviceStatus
  battery: number | null
  signal: number | null
  supportsBuzzer: boolean
  isDemo: boolean
  lastSeenAt: string | null
  createdAt: string
  updatedAt: string
}

export type CropStatus = 'stable' | 'attention' | 'critical' | 'no_data'

export type Plant = {
  id: string
  farmId: string
  deviceId: string | null
  name: string
  crop: string
  variety: string
  areaTasks: number
  row: number
  column: number
  status: CropStatus
  humidity: number | null
  temperature: number | null
  ph: number | null
  conductivity: number | null
  notes: string
  isDemo: boolean
  lastReadingAt: string | null
  createdAt: string
  updatedAt: string
}

export type BuzzCommand = {
  id: string
  deviceId: string
  status: 'simulated' | 'sent' | 'confirmed' | 'failed'
  requestedAt: string
}

export type DashboardData = {
  farms: Farm[]
  devices: Device[]
  plants: Plant[]
  buzzCommands: BuzzCommand[]
}

export type InspectionStop = {
  plant: Plant
  order: number
  score: number
  reason: string
}
