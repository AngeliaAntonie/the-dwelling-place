import React, { useState } from 'react';
import NavigationHeader from '../components/NavigationHeader';
import MeditationCard from '../components/MeditationCard';
import MeditationModal from '../components/MeditationModal';
import { Sparkles, Calendar } from 'lucide-react';

export default function BlogPostsPage({ onNavigate, allMeditations, bookmarkedIds, toggleBookmark }) {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('August');
  const [selectedMeditation, setSelectedMeditation] = useState(null);

  // Filter posts by year & month
  const filteredPosts = allMeditations.filter(post => {
    return post.date.includes(selectedYear) || post.date.includes(selectedMonth);
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', color: '#2C2825' }}>
      <NavigationHeader currentPage="blog-posts" onNavigate={onNavigate} />

      <main style={{ maxWidth: '1150px', margin: '0 auto', padding: '60px 24px' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="font-serif" style={{ fontSize: '3rem', margin: '0 0 12px 0', color: '#1B1816' }}>
            Blog Posts
          </h1>
          <p style={{ fontFamily: "'Century Gothic', sans-serif", color: '#6E6862', fontSize: '1rem', letterSpacing: '0.04em' }}>
            Browse monthly meditations and scripture reflections by year and month
          </p>
        </div>

        {/* Year & Month Selection Controls */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px 32px',
          border: '1px solid #E6DFD3',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Calendar size={22} style={{ color: '#B8860B' }} />
            <div>
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: '#B8860B', textTransform: 'uppercase', fontWeight: 600 }}>
                Selected Archive
              </span>
              <h3 className="font-serif" style={{ margin: 0, fontSize: '1.4rem' }}>
                {selectedMonth} {selectedYear}
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Year Selector */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #E6DFD3',
                backgroundColor: '#FAF7F2',
                fontFamily: "'Century Gothic', sans-serif",
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <option value="2026">Year 2026</option>
            </select>

            {/* Month Selector */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #E6DFD3',
                backgroundColor: '#FAF7F2',
                fontFamily: "'Century Gothic', sans-serif",
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <option value="August">August</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {filteredPosts.map(meditation => (
            <MeditationCard 
              key={meditation.id}
              meditation={meditation}
              onSelect={(m) => setSelectedMeditation(m)}
              isBookmarked={bookmarkedIds.includes(meditation.id)}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      </main>

      {/* Reader Modal */}
      {selectedMeditation && (
        <MeditationModal 
          meditation={selectedMeditation}
          onClose={() => setSelectedMeditation(null)}
          isBookmarked={bookmarkedIds.includes(selectedMeditation.id)}
          onToggleBookmark={toggleBookmark}
        />
      )}
    </div>
  );
}
