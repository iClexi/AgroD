import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
  const logoFile = await readFile(join(process.cwd(), 'public', 'images', 'brand', 'agrod-logo-original.png'))
  const brandLogo = logoFile.buffer.slice(logoFile.byteOffset, logoFile.byteOffset + logoFile.byteLength) as ArrayBuffer
  return new ImageResponse(
    <div style={{ alignItems: 'center', background: '#ffffff', border: '4px solid #d8e4d8', borderRadius: 42, display: 'flex', height: '180px', justifyContent: 'center', overflow: 'hidden', position: 'relative', width: '180px' }}>
      <img alt="" src={brandLogo as unknown as string} width="645" height="363" style={{ height: '363px', left: '-65px', position: 'absolute', top: '-75px', width: '645px' }} />
    </div>,
    size,
  )
}
