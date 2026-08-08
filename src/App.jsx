import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MeditationCard from './components/MeditationCard';
import MeditationModal from './components/MeditationModal';
import IntentionsWall from './components/IntentionsWall';
import NewsletterModal from './components/NewsletterModal';
import SearchModal from './components/SearchModal';
import AdminPortal from './components/AdminPortal';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { MEDITATIONS, LITURGICAL_SEASONS } from './data/meditations';
import { supabase, isSupabaseConfigured } from './utils/supabase';
import { Bookmark, Sparkles, Filter, Check, Cross } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dwelling_place_theme') || 'light';
  });

  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const saved = localStorage.getItem('dwelling_place_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [adminPortalOpen, setAdminPortalOpen] = useState(false);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');

  // Dynamic posts from Supabase database
  const [dbPosts, setDbPosts] = useState([]);
  const [allMeditations, setAllMeditations] = useState(MEDITATIONS);

  // Fetch posts from Supabase if configured
  const loadSupabasePosts = useCallback(async () => {
    if (!isSupabaseConfigured()) return;
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching Supabase posts:', error);
        return;
      }

      if (data && data.length > 0) {
        // Format DB posts to match Meditation interface
        const formatted = data.map(p => ({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle || '',
          scripture: p.scripture || '',
          author: p.author || 'Dwelling Place Contributor',
          date: p.date,
          readTime: p.read_time || '5 min read',
          liturgicalSeason: p.season || 'ORDINARY TIME',
          featured: Boolean(p.featured),
          tags: Array.isArray(p.tags) ? p.tags : (p.tags ? [p.tags] : ['Meditation']),
          image: p.image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
          paragraphs: typeof p.content === 'string' ? p.content.split('\n\n').filter(Boolean) : [p.content],
          reflectionPrompt: p.reflection_prompt || '',
          isFromDb: true
        }));

        setDbPosts(formatted);
        // Combine DB posts first, then static fallbacks
        setAllMeditations([...formatted, ...MEDITATIONS]);
      }
    } catch (err) {
      console.error('Failed to load database posts:', err);
    }
  }, []);

  useEffect(() => {
    loadSupabasePosts();
  }, [loadSupabasePosts]);

  // Apply Theme Attribute to HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dwelling_place_theme', theme);
  }, [theme]);

  // Persist Bookmarks
  useEffect(() => {
    localStorage.setItem('dwelling_place_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const featuredMeditation = allMeditations.find(m => m.featured) || allMeditations[0];

  // Filter Meditations
  const displayedMeditations = allMeditations.filter(m => {
    if (showOnlyBookmarks && !bookmarkedIds.includes(m.id)) return false;
    if (activeCategoryFilter !== 'ALL' && m.liturgicalSeason.toUpperCase() !== activeCategoryFilter) return false;
    return true;
  });

  const scrollToIntentions = () => {
    const el = document.getElementById('intentions-wall');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Sticky Header */}
      <Header 
        theme={theme}
        setTheme={setTheme}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
        onOpenNewsletter={() => setNewsletterModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenAdmin={() => setAdminPortalOpen(true)}
        currentSeason={LITURGICAL_SEASONS.ORDINARY_TIME}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* Hero Banner Section */}
        {!showOnlyBookmarks && (
          <HeroSection 
            featuredMeditation={featuredMeditation}
            onSelectMeditation={(m) => setSelectedMeditation(m)}
            onScrollToIntentions={scrollToIntentions}
          />
        )}

        {/* Monthly Meditations Catalog Section */}
        <section id="meditations" style={{ padding: '48px 0 64px' }}>
          <div className="container">
            {/* Section Header & Filters */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '36px',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span className="liturgical-badge gold" style={{ marginBottom: '6px' }}>
                    ✦ MONTHLY MEDITATION ARCHIVE
                  </span>
                  <h2 className="font-serif" style={{ fontSize: '2.2rem', color: 'var(--text-heading)', margin: 0 }}>
                    {showOnlyBookmarks ? "Your Bookmarked Reflections" : "Monthly Reflections & Scripture Guides"}
                  </h2>
                </div>

                {/* Filter Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
                    className="btn-outline"
                    style={{
                      borderColor: showOnlyBookmarks ? 'var(--accent-gold)' : 'var(--border-subtle)',
                      backgroundColor: showOnlyBookmarks ? 'var(--accent-gold-light)' : 'transparent',
                      color: showOnlyBookmarks ? 'var(--accent-gold)' : 'var(--text-main)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <Bookmark size={14} fill={showOnlyBookmarks ? "var(--accent-gold)" : "none"} />
                    <span>{showOnlyBookmarks ? "Showing Saved (" + bookmarkedIds.length + ")" : "Saved Meditations"}</span>
                  </button>

                  <button
                    onClick={() => setAdminPortalOpen(true)}
                    className="btn-outline"
                    style={{
                      borderColor: 'var(--accent-gold)',
                      color: 'var(--accent-gold)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <Sparkles size={14} />
                    <span>Writer Portal</span>
                  </button>
                </div>
              </div>

              {/* Season Category Filter Chips */}
              {!showOnlyBookmarks && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '8px' }}>
                  {['ALL', 'ORDINARY TIME', 'ADVENT', 'LENT', 'EASTER'].map(season => (
                    <button
                      key={season}
                      onClick={() => setActiveCategoryFilter(season)}
                      style={{
                        background: activeCategoryFilter === season ? 'var(--accent-gold)' : 'var(--bg-card)',
                        color: activeCategoryFilter === season ? '#FFF' : 'var(--text-main)',
                        border: '1px solid',
                        borderColor: activeCategoryFilter === season ? 'var(--accent-gold)' : 'var(--border-subtle)',
                        borderRadius: '20px',
                        padding: '6px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid of Meditations */}
            {displayedMeditations.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '32px'
              }}>
                {displayedMeditations.map(meditation => (
                  <MeditationCard 
                    key={meditation.id}
                    meditation={meditation}
                    onSelect={(m) => setSelectedMeditation(m)}
                    isBookmarked={bookmarkedIds.includes(meditation.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '64px 24px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '8px',
                border: '1px dashed var(--border-gold)'
              }}>
                <Cross size={32} style={{ color: 'var(--accent-gold)', marginBottom: '12px' }} />
                <h3 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--text-heading)', marginBottom: '8px' }}>
                  No saved meditations yet
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Click the bookmark icon on any meditation card to save it for quiet prayer later.
                </p>
                <button onClick={() => setShowOnlyBookmarks(false)} className="btn-primary">
                  Explore All Meditations
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Intentions & Devotional Candle Wall */}
        <IntentionsWall />

        {/* About Section */}
        <AboutSection />
      </main>

      {/* Reader Modal */}
      {selectedMeditation && (
        <MeditationModal 
          meditation={selectedMeditation}
          onClose={() => setSelectedMeditation(null)}
          isBookmarked={bookmarkedIds.includes(selectedMeditation.id)}
          onToggleBookmark={toggleBookmark}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      {/* Newsletter Subscription Modal */}
      <NewsletterModal 
        isOpen={newsletterModalOpen}
        onClose={() => setNewsletterModalOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal 
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        meditations={allMeditations}
        onSelectMeditation={(m) => setSelectedMeditation(m)}
      />

      {/* Writer / Admin Portal Modal */}
      <AdminPortal 
        isOpen={adminPortalOpen}
        onClose={() => setAdminPortalOpen(false)}
        onPostSaved={loadSupabasePosts}
        liturgicalSeasons={LITURGICAL_SEASONS}
      />

      {/* Footer */}
      <Footer onOpenNewsletter={() => setNewsletterModalOpen(true)} />
    </div>
  );
}
