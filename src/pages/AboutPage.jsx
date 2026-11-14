import React, { useState, useEffect, useRef } from 'react';
import NavigationHeader from '../components/NavigationHeader';

export default function AboutPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('the-blog');

  const blogRef = useRef(null);
  const bloggerRef = useRef(null);
  const patronsRef = useRef(null);

  // IntersectionObserver to dynamically highlight active section's centered accent line
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0.2
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const sectionElements = [blogRef.current, bloggerRef.current, patronsRef.current];
    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const sections = [
    {
      id: 'the-blog',
      label: 'The Blog',
      ref: blogRef,
      content: (
        <>
          <p style={paragraphStyle}>
            My Friend told me to start a blog a couple of years ago and my instant reaction was to laugh it off as I thought to myself, ‘I don’t even know the capitals of most countries and I really don’t like cheese, why would anyone care or trust what I have to say about God and the Catholic Church…’ This Friend of mine was persistent and slowly revealed to me that it is precisely because of my inadequacies, not in spite of them, that He thinks I should start a blog. In doing this blog, I picture myself saying with the Blessed Virgin Mary (though I am sure not so resolutely as Mary), ‘Here I am, the servant of the Lord’ (Lk 1:38). My prayer for you, if you’re reading this and read even one of my posts, is that you come to realise that the Friend who called me to do this, the lovely and beautiful Jesus, is calling you too right now into a relationship with Him. I am aware that this may be a relationship for you that is non existent, a bit marred or even a daunting prospect. May this blog serve as a place that you can dwell with me and hear just how awesome the Lord is once you open yourself to His amazing grace!
          </p>
        </>
      )
    },
    {
      id: 'the-blogger',
      label: 'The Blogger',
      ref: bloggerRef,
      content: (
        <>
          <p style={paragraphStyle}>
            I’m a young woman in my early twenties who has been captivated by the love of Jesus, just can’t help it! I grew up in England and lived and went to school there until university. I have studied my undergrad in South Africa at the University of Cape Town, in Law and Philosophy and soon I’ll be starting a Masters in Theological studies. But in all honesty God only knows what’s truly popping in my life (thank you Beach Boys for the most relatable line). I have a deep curiosity and wonder for philosophy and pondering God’s Goodness, Truth and Beauty. I often find myself in a range of different states in terms of my faith, whether I am exclaiming with St Paul how unsearchable the Lord’s ways are (Rms 11:33), whispering through tears with the centurion about how unworthy I am before the Lords healing touch (Mt 8:8), shouting out in desperation with the the father of the possessed boy ‘Lord, I believe; help my unbelief!’ (Mk 9:24), receiving the Lord joyfully with Zacchaeus (Lk 19:4) or being astonished by how much the Lord knows me and loves me by saying with the Samaritan woman ‘come and see’ to my friends and family about this man who claims to be the ‘Messiah’ (Jn 4:29). The list could really go on but I am sure you understand the picture - I am a work in progress yet simultaneously a creation of the Lord that was made good and should be pondered as a mystery (Ps 139), so I am just like you!
          </p>
        </>
      )
    },
    {
      id: 'the-patrons',
      label: 'Patrons',
      ref: patronsRef,
      content: (
        <>
          <p style={paragraphStyle}>
            I have specifically chosen some epic people of the faith within the Church to help guide and protect this blog and I have selected three to give a nod to the Holy Trinity! Firstly I have chosen St Bernadette because I relate to her so much and we’ve been growing in friendship for a while. Bernadette received the apparitions from Our Lady of Lourdes in France, which has now become a site of pilgrimage for healing purposes. To learn more about what the heck I am talking about{' '}
            <a
              href="https://www.lourdes-france.org/en/"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              press this link
            </a>
            . My friend this past year, whilst on pilgrimage in Lourdes, gave me{' '}
            <a
              href="https://www.goodreads.com/book/show/21048619-bernadette-speaks"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              a little book on St Bernadette’s sayings
            </a>
            , shoutout Cait! I keep it by my bed and I often read it before falling asleep. A lot strikes me in this little book but two sayings from St Bernadette come to mind as I am writing this - ‘early one morning before dawn and her daily commitments commence, Bernadette is insisting a friend to come with her to the Grotto as she just must go say good morning to the Blessed Virgin Mary’, my wonderful friend Alex will understand why I like this saying. And the other one - ‘a priest asked Bernadette if she was scared for the Purssia and her German allies to invade France (this was said around 1870…) and she responded and said “no”. Then the priest said “Bernadette is there anything you are scared of”, and she responded “bad Catholics”, always makes me laugh! St Bernadette, pray for us. The next patron I have chosen is St Josemaria Escriva who was introduced to me by some friends, shoutout to the Ange’s! I got to know him well through a little book my friend gave me whilst on pilgrimage in Rome, shoutout Tyra, and it is also something I keep on my bedside table. St Josemaria’s sense of humour yet straightforwardness is what I love about him. For example… ‘insert funny quote that I right now can’t remember’. St Josemaria Escriva, pray for us. Lastly, and arguably most importantly, I would be honoured to submit this blog to Our Blessed Mother uniquely under a title given to her, Our Lady Mystical Rosa, the Mystical Rose. I discovered this title just recently whilst doing a 30-day consecration to Jesus through Mary (which I never finished…Lord grant me the grace…) and it instantly caught my attention. Such a beautiful title which highlights Mary’s simplicity of spirit, quiet beauty and sturdiness in Gods promises - these being traits we are all called to embody as Mary is the “first disciple of Jesus” (oft stated by Pope Francis). Our Lady Mystical Rosa, pray for us.
          </p>
          <p style={paragraphStyle}>
            Ps, I am aware some people may be reading the above and thinking to themselves, ‘urrrmm don’t you just want to go straight to the money and pray to Jesus???’. Firstly, a totally fair thought and something that is not incorrect, I can most certainly pray directly to Jesus. But by asking our friends to pray for us, who are both in the Church on earth (referred to as the Church Militant) and those who are already in the beatific vision with God in heaven (referred to as the Church Triumphant) we are properly engaging with the economy of salvation that God has gifted us. Devotions to the Saints and to the Blessed Mother are not mandated by the Church, but just imagine a family where the child never speaks to their mother or who doesn’t ever engage with friends, life for this person would be dysfunctional and not a life fully lived. This is just an analogy and I am fully aware that an analogy cannot/will not express the full Truth of what I am saying. Lastly, often in life things are tested and known by their fruits, I can firmly attest to the beauty that has come into my life by engaging with the gifts God has given to His Bride, the Church, the proof is in the pudding!
          </p>

          {/* Three Oval Patron Frames */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '32px',
            marginTop: '44px',
            flexWrap: 'wrap'
          }}>
            {/* Our Lady Mystical Rose */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '160px'
            }}>
              <div style={{
                width: '140px',
                height: '185px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #C8524B',
                boxShadow: '0 0 0 3px #FAF7F2, 0 0 0 5px rgba(200, 82, 75, 0.35), 0 8px 24px rgba(44, 40, 37, 0.1)',
                backgroundColor: '#F3ECE2'
              }}>
                <img
                  src="/images/our_lady_mystical_rose.jpg"
                  alt="Our Lady Mystical Rose"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#1B1816',
                marginTop: '14px',
                textAlign: 'center',
                lineHeight: 1.25
              }}>
                Our Lady<br />
                <span style={{ fontSize: '0.95rem', fontWeight: 400, fontStyle: 'italic', color: '#6E6862' }}>
                  Mystical Rose
                </span>
              </span>
            </div>

            {/* Saint Bernadette Soubirous */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '160px'
            }}>
              <div style={{
                width: '140px',
                height: '185px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #C8524B',
                boxShadow: '0 0 0 3px #FAF7F2, 0 0 0 5px rgba(200, 82, 75, 0.35), 0 8px 24px rgba(44, 40, 37, 0.1)',
                backgroundColor: '#F3ECE2'
              }}>
                <img
                  src="/images/st_bernadette.jpg"
                  alt="St. Bernadette Soubirous"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#1B1816',
                marginTop: '14px',
                textAlign: 'center',
                lineHeight: 1.25
              }}>
                St. Bernadette<br />
                <span style={{ fontSize: '0.95rem', fontWeight: 400, fontStyle: 'italic', color: '#6E6862' }}>
                  Soubirous
                </span>
              </span>
            </div>

            {/* Saint Josemaría Escrivá */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '160px'
            }}>
              <div style={{
                width: '140px',
                height: '185px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #C8524B',
                boxShadow: '0 0 0 3px #FAF7F2, 0 0 0 5px rgba(200, 82, 75, 0.35), 0 8px 24px rgba(44, 40, 37, 0.1)',
                backgroundColor: '#F3ECE2'
              }}>
                <img
                  src="/images/st_josemaria_escriva.jpg"
                  alt="St. Josemaría Escrivá"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#1B1816',
                marginTop: '14px',
                textAlign: 'center',
                lineHeight: 1.25
              }}>
                St. Josemaría<br />
                <span style={{ fontSize: '0.95rem', fontWeight: 400, fontStyle: 'italic', color: '#6E6862' }}>
                  Escrivá
                </span>
              </span>
            </div>
          </div>
        </>
      )
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F2', color: '#2C2825' }}>
      {/* Main Navigation Header */}
      <NavigationHeader currentPage="about" onNavigate={onNavigate} />

      {/* Centered Main Content Stream */}
      <main style={{ maxWidth: '850px', margin: '0 auto', padding: '64px 4vw 40vh', textAlign: 'center' }}>
        {/* Main Hero Page Title — Distinct & Commanding */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.25rem',
            fontStyle: 'italic',
            letterSpacing: '0.02em',
            color: '#C8524B',
            fontWeight: 500,
            display: 'block',
            marginBottom: '12px'
          }}>
            So funny the Holy Spirit lead you here :)
          </span>
          <h1 className="font-serif" style={{
            fontSize: 'clamp(3.4rem, 6.5vw, 4.8rem)',
            fontWeight: 300,
            letterSpacing: '0.06em',
            lineHeight: 1.05,
            margin: 0,
            color: '#1B1816'
          }}>
            About
          </h1>
          <div style={{
            width: '80px',
            height: '2px',
            backgroundColor: '#C8524B',
            margin: '24px auto 0',
            borderRadius: '2px',
            opacity: 0.85
          }} />
        </div>

        {/* Centered Editorial Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '72px' }}>
          {sections.map(({ id, label, ref, content }, index) => {
            const isActive = activeSection === id;

            return (
              <React.Fragment key={id}>
                {index > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    margin: '16px 0'
                  }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E6DFD3', maxWidth: '180px' }} />
                    <span style={{ color: '#C8524B', fontSize: '0.75rem', opacity: 0.7 }}>❖</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#E6DFD3', maxWidth: '180px' }} />
                  </div>
                )}

                <section
                  id={id}
                  ref={ref}
                  style={{
                    scrollMarginTop: '80px',
                    textAlign: 'center'
                  }}
                >
                  {/* Section Title & Wider Dynamic Red Accent Underline */}
                  <div style={{
                    display: 'inline-block',
                    textAlign: 'center',
                    marginBottom: '24px'
                  }}>
                    <h2 className="font-serif" style={{
                      fontSize: '2.1rem',
                      fontWeight: 400,
                      letterSpacing: '0.02em',
                      margin: 0,
                      color: '#1B1816'
                    }}>
                      {label}
                    </h2>
                    
                    {/* Dynamic Red Accent Line — Spans across phrase */}
                    <div style={{
                      width: '100%',
                      minWidth: '160px',
                      height: '2px',
                      backgroundColor: '#C8524B',
                      margin: '10px auto 0',
                      borderRadius: '1px',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0.15)',
                      transformOrigin: 'center center',
                      transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} />
                  </div>
                  
                  <div>
                    {content}
                  </div>
                </section>
              </React.Fragment>
            );
          })}
        </div>
      </main>
    </div>
  );
}

const paragraphStyle = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: '1.35rem',
  color: '#3A3532',
  lineHeight: '1.85',
  marginBottom: '20px',
  fontWeight: 400,
  textAlign: 'center'
};

const linkStyle = {
  color: '#C8524B',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  fontWeight: 500
};

