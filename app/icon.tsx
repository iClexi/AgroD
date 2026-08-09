import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default async function Icon() {
  const logoFile = await readFile(join(process.cwd(), 'public', 'images', 'brand', 'agrod-logo-original.png'))
  const brandLogo = logoFile.buffer.slice(logoFile.byteOffset, logoFile.byteOffset + logoFile.byteLength) as ArrayBuffer
  return new ImageResponse(
    <div style={{ alignItems: 'center', background: '#ffffff', border: '2px solid #d8e4d8', borderRadius: 16, display: 'flex', height: '64px', justifyContent: 'center', overflow: 'hidden', position: 'relative', width: '64px' }}>
      <img alt="" src={brandLogo as unknown as string} width="229" height="129" style={{ height: '129px', left: '-23px', position: 'absolute', top: '-27px', width: '229px' }} />
    </div>,
    size,
  )
}
