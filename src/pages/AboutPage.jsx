import React, { useState } from 'react';
import NavigationHeader from '../components/NavigationHeader';
import { BookOpen, User, ShieldCheck } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('the-blog'); // 'the-blog' | 'the-blogger' | 'the-patrons'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', color: '#2C2825' }}>
      <NavigationHeader currentPage="about" onNavigate={onNavigate} />

      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '60px 24px' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="font-serif" style={{ fontSize: '3rem', margin: 0, color: '#1B1816' }}>
            About
          </h1>
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
            onClick={() => setActiveTab('the-blog')}
            style={{
              padding: '10px 24px',
              borderRadius: '24px',
              border: '1px solid',
              borderColor: activeTab === 'the-blog' ? '#C8524B' : '#E6DFD3',
              backgroundColor: activeTab === 'the-blog' ? '#C8524B' : '#FFFFFF',
              color: activeTab === 'the-blog' ? '#FFFFFF' : '#2C2825',
              fontFamily: "'Century Gothic', sans-serif",
              fontSize: '0.9rem',
              letterSpacing: '0.06em',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            The Blog
          </button>

          <button
            onClick={() => setActiveTab('the-blogger')}
            style={{
              padding: '10px 24px',
              borderRadius: '24px',
              border: '1px solid',
              borderColor: activeTab === 'the-blogger' ? '#C8524B' : '#E6DFD3',
              backgroundColor: activeTab === 'the-blogger' ? '#C8524B' : '#FFFFFF',
              color: activeTab === 'the-blogger' ? '#FFFFFF' : '#2C2825',
              fontFamily: "'Century Gothic', sans-serif",
              fontSize: '0.9rem',
              letterSpacing: '0.06em',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            The Blogger
          </button>

          <button
            onClick={() => setActiveTab('the-patrons')}
            style={{
              padding: '10px 24px',
              borderRadius: '24px',
              border: '1px solid',
              borderColor: activeTab === 'the-patrons' ? '#C8524B' : '#E6DFD3',
              backgroundColor: activeTab === 'the-patrons' ? '#C8524B' : '#FFFFFF',
              color: activeTab === 'the-patrons' ? '#FFFFFF' : '#2C2825',
              fontFamily: "'Century Gothic', sans-serif",
              fontSize: '0.9rem',
              letterSpacing: '0.06em',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            The Patrons
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'the-blog' && (
          <div style={cardContentStyle}>
            <div style={iconHeaderStyle}>
              <BookOpen size={28} style={{ color: '#C8524B' }} />
              <h2 className="font-serif" style={cardTitleStyle}>The Blog</h2>
            </div>
            <p style={paragraphStyle}>
              Welcome to <strong>The Dwelling Place</strong>—a sacred digital sanctuary for monthly meditations, scripture reflections, and quiet prayer.
            </p>
            <p style={paragraphStyle}>
              Here, each month offers a space to pause, abide in God's presence, and reflect on timeless Catholic wisdom and spiritual rest.
            </p>
          </div>
        )}

        {activeTab === 'the-blogger' && (
          <div style={cardContentStyle}>
            <div style={iconHeaderStyle}>
              <User size={28} style={{ color: '#C8524B' }} />
              <h2 className="font-serif" style={cardTitleStyle}>The Blogger</h2>
            </div>
            <p style={paragraphStyle}>
              Written and curated with love, each reflection comes from a personal journey of faith, monthly prayer, and devotion.
            </p>
            <p style={paragraphStyle}>
              Through monthly written reflections, this site is designed to offer encouragement and spiritual quiet in a fast-paced world.
            </p>
          </div>
        )}

        {activeTab === 'the-patrons' && (
          <div style={cardContentStyle}>
            <div style={iconHeaderStyle}>
              <ShieldCheck size={28} style={{ color: '#C8524B' }} />
              <h2 className="font-serif" style={cardTitleStyle}>The Patrons</h2>
            </div>
            <p style={paragraphStyle}>
              Dedicated under the heavenly patronage of <strong>Our Lady, Seat of Wisdom</strong>, and <strong>Saint Joseph</strong>, protector of the holy home.
            </p>
            <p style={paragraphStyle}>
              May their intercession bring peace, quiet faith, and spiritual strength to all who visit this dwelling place.
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
