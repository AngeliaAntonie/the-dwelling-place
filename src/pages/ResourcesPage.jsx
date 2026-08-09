import React, { useState } from 'react';
import NavigationHeader from '../components/NavigationHeader';
import { HeartHandshake, Book, Mic } from 'lucide-react';

export default function ResourcesPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('rest'); // 'rest' | 'books' | 'interviews'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', color: '#2C2825' }}>
      <NavigationHeader currentPage="resources" onNavigate={onNavigate} />

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '60px 24px' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="font-serif" style={{ fontSize: '3rem', margin: '0 0 12px 0', color: '#1B1816' }}>
            Resources
          </h1>
          <p style={{ fontFamily: "'Century Gothic', sans-serif", color: '#6E6862', fontSize: '1rem', letterSpacing: '0.04em' }}>
            Spiritual reading, rest guides, and interviews
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '48px',
          borderBottom: '1px solid #E6DFD3',
          paddingBottom: '16px'
        }}>
          <button
            onClick={() => setActiveTab('rest')}
            style={{
              padding: '10px 24px',
              borderRadius: '24px',
              border: '1px solid',
              borderColor: activeTab === 'rest' ? '#B8860B' : '#E6DFD3',
              backgroundColor: activeTab === 'rest' ? '#B8860B' : '#FFFFFF',
              color: activeTab === 'rest' ? '#FFFFFF' : '#2C2825',
              fontFamily: "'Century Gothic', sans-serif",
              fontSize: '0.9rem',
              letterSpacing: '0.06em',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            Rest
          </button>

          <button
            onClick={() => setActiveTab('books')}
            style={{
              padding: '10px 24px',
              borderRadius: '24px',
              border: '1px solid',
              borderColor: activeTab === 'books' ? '#B8860B' : '#E6DFD3',
              backgroundColor: activeTab === 'books' ? '#B8860B' : '#FFFFFF',
              color: activeTab === 'books' ? '#FFFFFF' : '#2C2825',
              fontFamily: "'Century Gothic', sans-serif",
              fontSize: '0.9rem',
              letterSpacing: '0.06em',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            Books
          </button>

          <button
            onClick={() => setActiveTab('interviews')}
            style={{
              padding: '10px 24px',
              borderRadius: '24px',
              border: '1px solid',
              borderColor: activeTab === 'interviews' ? '#B8860B' : '#E6DFD3',
              backgroundColor: activeTab === 'interviews' ? '#B8860B' : '#FFFFFF',
              color: activeTab === 'interviews' ? '#FFFFFF' : '#2C2825',
              fontFamily: "'Century Gothic', sans-serif",
              fontSize: '0.9rem',
              letterSpacing: '0.06em',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            Interviews
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'rest' && (
          <div style={cardContentStyle}>
            <div style={iconHeaderStyle}>
              <HeartHandshake size={28} style={{ color: '#B8860B' }} />
              <h2 className="font-serif" style={cardTitleStyle}>Rest</h2>
            </div>
            <p style={paragraphStyle}>
              Guides and quiet reflections on entering Sabbath rest, mental stillness, and resting in the divine presence.
            </p>
            <p style={paragraphStyle}>
              Explore practices for interior silence, evening prayer, and creating room for peace in daily life.
            </p>
          </div>
        )}

        {activeTab === 'books' && (
          <div style={cardContentStyle}>
            <div style={iconHeaderStyle}>
              <Book size={28} style={{ color: '#B8860B' }} />
              <h2 className="font-serif" style={cardTitleStyle}>Books</h2>
            </div>
            <p style={paragraphStyle}>
              Recommended spiritual reading, monthly book lists, and classic spiritual devotionals.
            </p>
            <p style={paragraphStyle}>
              Curated titles from church fathers, spiritual classics, and modern Catholic authors.
            </p>
          </div>
        )}

        {activeTab === 'interviews' && (
          <div style={cardContentStyle}>
            <div style={iconHeaderStyle}>
              <Mic size={28} style={{ color: '#B8860B' }} />
              <h2 className="font-serif" style={cardTitleStyle}>Interviews</h2>
            </div>
            <p style={paragraphStyle}>
              Conversations, audio reflections, and interviews with guest writers, directors, and spiritual guides.
            </p>
            <p style={paragraphStyle}>
              Deep dives into prayer habits, creative discipline, and finding quiet joy in ordinary life.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

const cardContentStyle = {
  backgroundColor: '#FFFFFF',
  borderRadius: '16px',
  padding: '40px',
  border: '1px solid #E6DFD3',
  boxShadow: '0 4px 20px rgba(44, 40, 37, 0.04)'
};

const iconHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  marginBottom: '20px'
};

const cardTitleStyle = {
  fontSize: '2rem',
  margin: 0,
  color: '#1B1816'
};

const paragraphStyle = {
  fontSize: '1.1rem',
  color: '#4A5568',
  lineHeight: '1.8',
  marginBottom: '16px'
};
