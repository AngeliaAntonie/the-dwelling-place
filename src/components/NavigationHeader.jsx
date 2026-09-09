import React from 'react';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NavigationHeader({ currentPage, onNavigate, onOpenAdmin }) {
  return (
    <header style={{
      borderBottom: '1px solid #E6DFD3',
      backgroundColor: '#FAF7F2',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)',
      padding: '16px 24px'
    }}>
      <div style={{
        maxWidth: '1150px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo & Back to Home */}
        <button
          onClick={() => onNavigate('home')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            padding: 0
          }}
          title="Back to Home"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#C8524B',
            fontSize: '0.9rem',
            fontWeight: 500,
            fontFamily: "'Century Gothic', sans-serif"
          }}>
            <ArrowLeft size={18} />
          </div>
          <span style={{ color: '#E2E8F0' }}>|</span>
          <span style={{
            fontFamily: "'Century Gothic', 'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: '1.2rem',
            letterSpacing: '0.04em',
            color: '#1B1816'
          }}>
            THE DWELLING PLACE
          </span>
        </button>

        {/* Page Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button
            onClick={() => onNavigate('about')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Century Gothic', sans-serif",
              fontSize: '0.88rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: currentPage === 'about' ? '#C8524B' : '#4A5568',
              fontWeight: currentPage === 'about' ? 600 : 400,
              borderBottom: currentPage === 'about' ? '2px solid #C8524B' : '2px solid transparent',
              paddingBottom: '2px'
            }}
          >
            About
          </button>

          <button
            onClick={() => onNavigate('blog-posts')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Century Gothic', sans-serif",
              fontSize: '0.88rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: currentPage === 'blog-posts' ? '#C8524B' : '#4A5568',
              fontWeight: currentPage === 'blog-posts' ? 600 : 400,
              borderBottom: currentPage === 'blog-posts' ? '2px solid #C8524B' : '2px solid transparent',
              paddingBottom: '2px'
            }}
          >
            Blog Posts
          </button>
        </div>
      </div>
    </header>
  );
}
