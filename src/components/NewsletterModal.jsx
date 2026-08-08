import React, { useState } from 'react';
import { X, Mail, Check, Download, Cross, BookOpen } from 'lucide-react';

export default function NewsletterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px', padding: '36px' }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {!subscribed ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-gold-light)',
              color: 'var(--accent-gold)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Mail size={24} />
            </div>

            <span className="liturgical-badge gold" style={{ marginBottom: '8px' }}>
              ✦ MONTHLY COMPANION
            </span>

            <h3 className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--text-heading)', margin: '8px 0' }}>
              Receive Monthly Meditations
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
              Join thousands of faithful readers. Every first day of the month, we send a quiet meditation, scripture guide, and downloadable prayer journal straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                style={{
                  padding: '12px 16px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-gold)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-sans)',
                  textAlign: 'center'
                }}
              />
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
                <span>Subscribe to Monthly Meditations</span>
              </button>
            </form>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '16px' }}>
              No spam. Unsubscribe anytime with a single click.
            </p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-gold-light)',
              color: 'var(--accent-gold)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Check size={32} />
            </div>

            <h3 className="font-serif" style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '8px' }}>
              Welcome to The Dwelling Place
            </h3>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              We have sent a confirmation email to <strong>{email}</strong>. Below is your download link for this month's Sacred Reflection Booklet.
            </p>

            <a 
              href="/assets/hero.jpg" 
              download="August_2026_Meditation_Guide.jpg"
              className="btn-primary" 
              style={{ display: 'inline-flex', textDecoration: 'none', justifyContent: 'center' }}
            >
              <Download size={16} />
              <span>Download August Meditation Companion (PDF)</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
