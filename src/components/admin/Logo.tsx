import React from 'react'

export default function Logo() {
  return (
    <div style={{
      background: 'linear-gradient(to right, #FBBF24, #D97706)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: '900',
      fontSize: '2.2rem',
      textTransform: 'uppercase',
      letterSpacing: '-0.05em',
      lineHeight: '1',
      filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.3))',
      fontFamily: 'system-ui, sans-serif'
    }}>
      CAPIBARA
      <span style={{ 
        display: 'block', 
        fontSize: '0.9rem', 
        WebkitTextFillColor: '#a1a1aa', 
        fontWeight: 'bold', 
        letterSpacing: '0.3em',
        marginTop: '0.25rem'
      }}>ADMIN VIP</span>
    </div>
  )
}
