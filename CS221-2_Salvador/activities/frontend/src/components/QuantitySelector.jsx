import React from 'react';

export default function QuantitySelector({ qty, onIncrease, onDecrease, max }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <button 
        onClick={onDecrease}
        style={{ 
          background: '#ef4444', 
          color: 'white', 
          border: 'none', 
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '0.5rem',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'background-color 0.2s, transform 0.1s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
        onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
      >
        -
      </button>
      <div style={{ 
        minWidth: '2rem', 
        textAlign: 'center',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'var(--text)'
      }}>
        {qty}
      </div>
      <button 
        onClick={onIncrease}
        disabled={max !== undefined && qty >= max}
        style={{ 
          background: '#10b981', 
          color: 'white', 
          border: 'none', 
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '0.5rem',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          cursor: max !== undefined && qty >= max ? 'not-allowed' : 'pointer',
          opacity: max !== undefined && qty >= max ? 0.5 : 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'background-color 0.2s, transform 0.1s'
        }}
        onMouseOver={(e) => { if (!(max !== undefined && qty >= max)) e.target.style.backgroundColor = '#059669' }}
        onMouseOut={(e) => { if (!(max !== undefined && qty >= max)) e.target.style.backgroundColor = '#10b981' }}
        onMouseDown={(e) => { if (!(max !== undefined && qty >= max)) e.target.style.transform = 'scale(0.95)' }}
        onMouseUp={(e) => { if (!(max !== undefined && qty >= max)) e.target.style.transform = 'scale(1)' }}
      >
        +
      </button>
    </div>
  );
}