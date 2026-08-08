import React, { useState } from 'react';
import { Flame, Heart, Send, Check, Sparkles, Cross } from 'lucide-react';

export default function IntentionsWall() {
  const [candlesLitCount, setCandlesLitCount] = useState(148);
  const [hasLitCandle, setHasLitCandle] = useState(false);
  const [newIntention, setNewIntention] = useState('');
  const [authorName, setAuthorName] = useState('');

  const [intentions, setIntentions] = useState([
    {
      id: 1,
      author: "Maria S.",
      location: "Rome",
      text: "For my mother who is undergoing surgery this week. May Our Lady wrap her in her cloak.",
      prayersCount: 42,
      userPrayed: false,
      time: "2 hours ago"
    },
    {
      id: 2,
      author: "Brother Gabriel",
      location: "Assisi",
      text: "For all readers of The Dwelling Place, that we may find true rest in Christ's Sacred Heart.",
      prayersCount: 89,
      userPrayed: false,
      time: "5 hours ago"
    },
    {
      id: 3,
      author: "An Anonymous Reader",
      location: "Dublin",
      text: "For peace in troubled homes and for those suffering in silence from loneliness.",
      prayersCount: 65,
      userPrayed: false,
      time: "Yesterday"
    }
  ]);

  const handleLightCandle = () => {
    if (!hasLitCandle) {
      setCandlesLitCount(prev => prev + 1);
      setHasLitCandle(true);
    }
  };

  const handleAddIntention = (e) => {
    e.preventDefault();
    if (newIntention.trim()) {
      const created = {
        id: Date.now(),
        author: authorName.trim() || "An Anonymous Friend",
        location: "Global Sanctuary",
        text: newIntention.trim(),
        prayersCount: 1,
        userPrayed: true,
        time: "Just now"
      };
      setIntentions([created, ...intentions]);
      setNewIntention('');
      setAuthorName('');
      if (!hasLitCandle) {
        handleLightCandle();
      }
    }
  };

  const handlePrayForIntention = (id) => {
    setIntentions(intentions.map(item => {
      if (item.id === id) {
        return {
          ...item,
          prayersCount: item.userPrayed ? item.prayersCount - 1 : item.prayersCount + 1,
          userPrayed: !item.userPrayed
        };
      }
      return item;
    }));
  };

  return (
    <section id="intentions-wall" style={{
      padding: '64px 0',
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
          <span className="liturgical-badge gold" style={{ marginBottom: '12px' }}>
            🕯️ THE DEVOTIONAL WALL
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.2rem', color: 'var(--text-heading)', marginBottom: '12px' }}>
            Light a Candle & Share Prayer Intentions
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Join our quiet community of prayer. Light a virtual candle and present your intentions before the Lord.
          </p>

          {/* Candle Lighting Button Counter */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '24px',
            backgroundColor: 'var(--bg-card)',
            padding: '12px 24px',
            borderRadius: '40px',
            border: '1px solid var(--border-gold)',
            boxShadow: 'var(--shadow-soft)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="flame"></span>
              <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--accent-gold)' }}>
                {candlesLitCount}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Candles Burning Today</span>
            </div>

            <button
              onClick={handleLightCandle}
              className="btn-primary"
              disabled={hasLitCandle}
              style={{
                padding: '8px 16px',
                fontSize: '0.85rem',
                backgroundColor: hasLitCandle ? 'var(--accent-gold)' : 'var(--text-heading)',
                borderColor: hasLitCandle ? 'var(--accent-gold)' : 'var(--text-heading)'
              }}
            >
              {hasLitCandle ? (
                <>
                  <Check size={14} />
                  <span>Candle Lit in Prayer</span>
                </>
              ) : (
                <>
                  <Flame size={14} />
                  <span>Light a Devotional Candle</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Two Column Grid: Form & List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Form */}
          <div className="card">
            <h3 className="font-serif" style={{ fontSize: '1.4rem', marginBottom: '8px', color: 'var(--text-heading)' }}>
              Submit a Prayer Intention
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              All intentions are kept in reverent silence and lifted up in our monthly prayers.
            </p>

            <form onSubmit={handleAddIntention}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Your Intention
                </label>
                <textarea
                  value={newIntention}
                  onChange={(e) => setNewIntention(e.target.value)}
                  placeholder="e.g. Please pray for my family's healing and peace..."
                  rows={4}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-sans)',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Name / Initial (Optional)
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Sarah K. or Anonymous"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Send size={15} />
                <span>Place Intention on Altar</span>
              </button>
            </form>
          </div>

          {/* List of Community Intentions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {intentions.map((item) => (
              <div key={item.id} className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent-gold)' }}>
                    {item.author} ({item.location})
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.time}
                  </span>
                </div>

                <p className="font-serif" style={{ fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '16px', lineHeight: 1.5 }}>
                  "{item.text}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => handlePrayForIntention(item.id)}
                    style={{
                      background: item.userPrayed ? 'var(--accent-burgundy-light)' : 'transparent',
                      border: '1px solid',
                      borderColor: item.userPrayed ? 'var(--accent-burgundy)' : 'var(--border-subtle)',
                      color: item.userPrayed ? 'var(--accent-burgundy)' : 'var(--text-muted)',
                      borderRadius: '20px',
                      padding: '4px 12px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Heart size={13} fill={item.userPrayed ? "var(--accent-burgundy)" : "none"} />
                    <span>{item.userPrayed ? "I Prayed for This" : "Pray for this"}</span>
                  </button>

                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {item.prayersCount} prayers offered
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
