import React, { useState } from 'react';
import { X, Search, Clock, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, meditations, onSelectMeditation }) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('ALL');

  const filtered = meditations.filter(m => {
    const matchesQuery = m.title.toLowerCase().includes(query.toLowerCase()) ||
                         m.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                         m.scripture.toLowerCase().includes(query.toLowerCase()) ||
                         m.month.toLowerCase().includes(query.toLowerCase());
    
    const matchesSeason = selectedSeason === 'ALL' || m.liturgicalSeason.toUpperCase() === selectedSeason;

    return matchesQuery && matchesSeason;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 className="font-cinzel" style={{ fontSize: '1.2rem', color: 'var(--text-heading)', margin: 0 }}>
            SEARCH MEDITATIONS ARCHIVE
          </h3>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar Input */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by topic, scripture, or month (e.g. silence, Eucharist, July)..."
            autoFocus
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              borderRadius: '6px',
              border: '1px solid var(--border-gold)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-main)',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)'
            }}
          />
        </div>

        {/* Liturgical Season Quick Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {['ALL', 'ORDINARY TIME', 'ADVENT', 'LENT', 'EASTER'].map(season => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              style={{
                background: selectedSeason === season ? 'var(--accent-gold)' : 'var(--bg-secondary)',
                color: selectedSeason === season ? '#FFF' : 'var(--text-main)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {season}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.length > 0 ? (
            filtered.map(meditation => (
              <div 
                key={meditation.id}
                onClick={() => {
                  onSelectMeditation(meditation);
                  onClose();
                }}
                style={{
                  padding: '16px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-card)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '4px' }}>
                    {meditation.month} {meditation.year} • {meditation.liturgicalSeason}
                  </div>
                  <h4 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-heading)', margin: '0 0 4px 0' }}>
                    {meditation.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    {meditation.excerpt.slice(0, 90)}...
                  </p>
                </div>
                <ArrowRight size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
              No meditations found matching your query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
