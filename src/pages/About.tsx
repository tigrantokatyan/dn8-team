import { useState } from 'react';
import { useLanguage } from '../i18n';

interface AboutProps {
  isMobile: boolean;
}

export default function About({ isMobile }: AboutProps) {
  const { t } = useLanguage();
  return (
    <div style={{ padding: 'clamp(130px,16vw,170px) clamp(20px,5vw,60px) clamp(80px,10vw,130px)', minHeight: '100svh', background: '#0b0b14' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ display: 'inline-block', width: 24, height: 1, background: '#c4a44a' }} />
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a' }}>{t('about.eyebrow')}</span>
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, fontSize: 'clamp(56px,11vw,140px)', margin: 0, lineHeight: .86, textTransform: 'uppercase' }}>
          {t('about.title').split('\n')[0]}<br />{t('about.title').split('\n')[1]}
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: 'clamp(32px,5vw,70px)', marginTop: 'clamp(52px,8vw,100px)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <p style={{ color: '#e7e2d9', fontWeight: 300, lineHeight: 1.85, fontSize: 'clamp(17px,2vw,21px)', margin: 0 }}>
            {t('about.p1')}
          </p>
          <p style={{ color: '#b8b3a8', fontWeight: 300, lineHeight: 1.85, fontSize: 16, margin: 0 }}>
            {t('about.p2')}
          </p>
          <p style={{ color: '#b8b3a8', fontWeight: 300, lineHeight: 1.85, fontSize: 16, margin: 0 }}>
            {t('about.p3')}
          </p>
          <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', marginTop: 14, borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 32 }}>
            {[
              { value: '2002', label: t('about.established') },
              { value: '100%', label: t('about.movementReady') },
              { value: '1', label: t('about.mentality') },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  flex: 1, minWidth: 110,
                  paddingRight: i < 2 ? 20 : 0,
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,.07)' : 'none',
                  marginRight: i < 2 ? 20 : 0,
                }}
              >
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 54, letterSpacing: 2, color: '#c4a44a', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#9b958c', marginTop: 6 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ overflow: 'hidden', background: '#0e0d28', aspectRatio: '3/4', borderRadius: 2, gridRow: 'span 2', boxShadow: '0 24px 60px rgba(0,0,0,.5)' }}>
            <img src="/assets/zip-grey.jpg" alt="DN8" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ overflow: 'hidden', background: '#0e0d28', aspectRatio: '1/1', borderRadius: 2, boxShadow: '0 16px 40px rgba(0,0,0,.5)' }}>
            <img src="/assets/crop-beige.jpg" alt="DN8" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ overflow: 'hidden', background: '#0e0d28', aspectRatio: '1/1', borderRadius: 2, boxShadow: '0 16px 40px rgba(0,0,0,.5)' }}>
            <img src="/assets/editorial-kid.jpg" alt="DN8" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* PARTNERS */}
      <div style={{ marginTop: 'clamp(80px,11vw,130px)', borderTop: '1px solid rgba(196,164,74,.15)', paddingTop: 'clamp(60px,8vw,90px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ display: 'inline-block', width: 24, height: 1, background: '#c4a44a' }} />
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a' }}>{t('about.partners')}</span>
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, fontSize: 'clamp(40px,7vw,88px)', margin: '0 0 clamp(36px,5vw,60px)', lineHeight: .88, textTransform: 'uppercase', color: '#f3efe8' }}>
          {t('about.trustedBy')}<br />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 500, color: '#9b958c', fontSize: '.6em', letterSpacing: 2 }}>{t('about.theChampions')}</span>
        </h2>

        <div style={{ display: 'flex', gap: 'clamp(16px,3vw,32px)', flexWrap: 'wrap', alignItems: 'stretch' }}>
          <PartnerCard
            logo="/assets/partner-hockey.png"
            logoStyle={{ borderRadius: 0 }}
            badge={t('home.nationalTeam')}
            name={[t('about.hockeyLine1'), t('about.hockeyLine2')]}
            desc={t('about.hockeyDesc')}
          />
          <PartnerCard
            logo="/assets/partner-futsal.jpg"
            logoStyle={{ borderRadius: 6 }}
            badge={t('home.clubPartner')}
            name={[t('about.futsal')]}
            desc={t('about.futsalDesc')}
          />
        </div>
      </div>
    </div>
  );
}

function PartnerCard({ logo, logoStyle, badge, name, desc }: {
  logo: string;
  logoStyle: React.CSSProperties;
  badge: string;
  name: string[];
  desc: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1, minWidth: 260,
        background: '#0e0d28',
        border: `1px solid ${hovered ? 'rgba(196,164,74,.45)' : 'rgba(196,164,74,.18)'}`,
        borderRadius: 3,
        padding: 'clamp(28px,4vw,44px)',
        display: 'flex', alignItems: 'center', gap: 'clamp(20px,3vw,32px)',
        transition: 'border-color .35s, box-shadow .35s',
        boxShadow: hovered ? '0 20px 50px rgba(0,0,0,.5)' : 'none',
      }}
    >
      <div style={{ flex: 'none', width: 'clamp(70px,9vw,96px)', height: 'clamp(70px,9vw,96px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={logo}
          alt={name.join(' ')}
          style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,.4))', ...logoStyle }}
        />
      </div>
      <div>
        <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#c4a44a', marginBottom: 8 }}>{badge}</div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, fontSize: 'clamp(18px,2.2vw,24px)', color: '#f3efe8', lineHeight: 1.1 }}>
          {name.map((line, i) => <span key={i}>{line}{i < name.length - 1 && <br />}</span>)}
        </div>
        <div style={{ fontSize: 13, color: '#9b958c', marginTop: 8, fontWeight: 300, lineHeight: 1.65 }}>{desc}</div>
      </div>
    </div>
  );
}
