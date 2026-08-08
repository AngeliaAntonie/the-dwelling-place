import React from 'react';

export default function HeroSection() {
  const landingImage = '/landing-page-image.jpg';

  return (
    <section style={{ width: '100%', overflow: 'hidden' }}>
      {/* Pure, un-filtered banner image */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
      }}>
        <img 
          src={landingImage} 
          alt="The Dwelling Place Landing Banner" 
          style={{
            width: '100%',
            maxHeight: '85vh',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block'
          }}
        />
      </div>
    </section>
  );
}
