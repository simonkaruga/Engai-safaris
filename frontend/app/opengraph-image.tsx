import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Engai Safaris: Where the Sky Meets the Wild'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0F1C17 0%, #1B7A60 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
        }}
      >
        <div style={{ color: '#F5A623', fontSize: 28, fontWeight: 'bold', letterSpacing: 8, marginBottom: 20, textTransform: 'uppercase' }}>
          Engai Safaris
        </div>
        <div style={{ color: 'white', fontSize: 64, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.1, maxWidth: 900 }}>
          Where the Sky Meets the Wild
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 28, marginTop: 24 }}>
          Kenya&apos;s Premier Safari Experience
        </div>
        <div style={{ position: 'absolute', bottom: 40, color: 'rgba(255,255,255,0.4)', fontSize: 20 }}>
          engaisafaris.com
        </div>
      </div>
    ),
    { ...size }
  )
}
