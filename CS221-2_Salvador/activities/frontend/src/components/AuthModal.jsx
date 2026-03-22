import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div className="card" style={{ maxWidth: '400px', width: '90%', textAlign: 'center', position: 'relative' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Authentication Required</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--text)', opacity: 0.8 }}>
          Please log in or sign up to add items to your cart.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            onClick={() => {
              onClose();
              navigate('/authPage');
            }}
            style={{ flex: 1, padding: '0.75rem', fontSize: '1rem' }}
          >
            Go to Login
          </button>
          <button 
            onClick={onClose}
            style={{ flex: 1, padding: '0.75rem', fontSize: '1rem', backgroundColor: 'var(--border)', color: 'var(--text)' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}