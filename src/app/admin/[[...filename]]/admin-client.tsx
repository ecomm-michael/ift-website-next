'use client'

import { useEffect } from 'react'

export default function AdminClient() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLocalhost =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'

      if (isLocalhost) {
        window.location.href = 'http://localhost:4001/admin'
      }
    }
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B2D45',
        color: '#EDF7F9',
        fontFamily: 'sans-serif',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '480px' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#F5A623',
            marginBottom: '1rem',
          }}
        >
          IFT CMS Admin
        </h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          The TinaCMS admin interface runs as a separate dev server.
        </p>
        <div
          style={{
            background: '#0f3a56',
            borderRadius: '8px',
            padding: '1.25rem',
            textAlign: 'left',
            marginBottom: '1.5rem',
          }}
        >
          <p style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#0099B5' }}>
            To launch the admin:
          </p>
          <code
            style={{
              display: 'block',
              background: '#071f31',
              padding: '0.75rem 1rem',
              borderRadius: '4px',
              fontSize: '0.95rem',
              color: '#00C4CC',
            }}
          >
            npm run tina:dev
          </code>
          <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: '#9bc8d8' }}>
            Then open:{' '}
            <a
              href="http://localhost:4001/admin"
              style={{ color: '#F5A623', textDecoration: 'underline' }}
            >
              http://localhost:4001/admin
            </a>
          </p>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#6aacbf' }}>
          Collections: Pages · Tournaments · Trips · Sponsors · Festival · Team
        </p>
      </div>
    </div>
  )
}
