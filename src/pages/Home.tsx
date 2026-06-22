import { useEffect, useRef, useState } from 'react';
import { products } from '../data/products';
import { useLanguage } from '../i18n';

interface HomeProps {
  onGoShop: () => void;
  onGoAbout: () => void;
  onOpenProduct: (id: string) => void;
  onAddToCart: (id: string, size: string, qty: number) => void;
  isMobile: boolean;
}

const coverBg = (src: string): React.CSSProperties => ({
  position: 'absolute',
  inset: 0,
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'transform .9s cubic-bezier(.16,1,.3,1)',
});

export default function Home({ onGoShop, onGoAbout, onOpenProduct, onAddToCart, isMobile }: HomeProps) {
  const { t, lang } = useLanguage();
  const [subscribed, setSubscribed] = useState(false);
  const patternOverlayRef = useRef<HTMLDivElement | null>(null);
  const patternSectionRef = useRef<HTMLElement | null>(null);
  const patternNextSectionRef = useRef<HTMLElement | null>(null);
  // Keep the hero block visually balanced across EN / HY / RU.
  // EN still uses the larger editorial type, while HY / RU keep their fitted sizes,
  // but the reserved rows and gaps below keep the spacing and photo size consistent.
  const heroBigSize = lang === 'en' ? 'clamp(74px,11.5vw,172px)' : lang === 'hy' ? 'clamp(62px,8.6vw,126px)' : 'clamp(60px,8.3vw,122px)';
  const heroScriptSize = lang === 'en' ? 'clamp(40px,6.4vw,92px)' : lang === 'hy' ? 'clamp(38px,5.5vw,82px)' : 'clamp(38px,5.5vw,82px)';
  const heroWordSize = lang === 'en' ? 'clamp(74px,11.5vw,172px)' : lang === 'hy' ? 'clamp(52px,7.6vw,108px)' : 'clamp(50px,7.2vw,104px)';
  const heroLineGap = 'clamp(14px,2vw,28px)';
  const heroMiddleNudge = 'clamp(-22px,-1.3vw,-12px)';

  const whyPillars = [
    { n: '01', title: t('home.whyPillar1Title'), text: t('home.whyPillar1Text') },
    { n: '02', title: t('home.whyPillar2Title'), text: t('home.whyPillar2Text') },
    { n: '03', title: t('home.whyPillar3Title'), text: t('home.whyPillar3Text') },
    { n: '04', title: t('home.whyPillar4Title'), text: t('home.whyPillar4Text') },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  useEffect(() => {
    const overlay = patternOverlayRef.current;
    const section = patternSectionRef.current;
    const nextSection = patternNextSectionRef.current;
    if (!overlay || !section || !nextSection) return;

    let raf = 0;
    const maxOpacity = 0.82;
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
    const progress = (value: number, start: number, end: number) => clamp((value - start) / (end - start), 0, 1);

    const updatePatternOpacity = () => {
      raf = 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const sectionTop = section.getBoundingClientRect().top;
      const nextTop = nextSection.getBoundingClientRect().top;

      const fadeIn = progress(viewportHeight - sectionTop, 0, viewportHeight * 0.7);
      const fadeOut = 1 - progress(viewportHeight - nextTop, 0, viewportHeight * 0.85);
      overlay.style.opacity = String(maxOpacity * Math.min(fadeIn, fadeOut));
    };

    const requestUpdate = () => {
      if (!raf) raf = window.requestAnimationFrame(updatePatternOpacity);
    };

    updatePatternOpacity();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      overlay.style.opacity = '0';
    };
  }, []);

  return (
    <div>
      <div
        ref={patternOverlayRef}
        className="dn8-fixed-pattern-overlay"
        aria-hidden="true"
      />
      {/* HERO */}
      <section style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.15fr 1fr',
        overflow: 'hidden',
        background: '#0b0b14',
      }}>
        <video
          src="/assets/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hoodie-white.jpg"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: isMobile ? 'center center' : '68% center',
            filter: 'brightness(.58) contrast(1.08) saturate(.92)',
            transform: 'scale(1.015)',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(90deg,rgba(6,6,14,.96) 0%,rgba(8,8,18,.88) 34%,rgba(8,8,18,.48) 62%,rgba(6,6,14,.62) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(circle at 75% 42%,rgba(196,164,74,.08),transparent 34%), linear-gradient(0deg,rgba(6,6,14,.86) 0%,rgba(6,6,14,.08) 46%,rgba(6,6,14,.62) 100%)' }} />

        {/* Left: Text panel */}
        <div style={{
          background: 'transparent',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(32px,6vw,80px)',
          paddingTop: 'clamp(120px,15vw,170px)',
          paddingBottom: 'clamp(72px,9vw,116px)',
          position: 'relative', zIndex: 2,
        }}>
          <div style={{ overflow: 'hidden', marginBottom: 20 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, animation: 'heroFade .9s cubic-bezier(.16,1,.3,1) both', animationDelay: '.05s' }}>
              <span style={{ display: 'inline-block', width: 28, height: 1, background: '#c4a44a' }} />
              <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#c4a44a' }}>DN8 Team — Est. 2002</span>
            </span>
          </div>

          <h1 style={{ margin: 0, lineHeight: 1, display: 'grid', rowGap: heroLineGap }}>
            <span style={{ display: 'block', overflow: 'visible' }}>
              <span style={{
                display: 'block',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: heroBigSize,
                letterSpacing: 3,
                color: '#f3efe8',
                animation: 'heroLine 1s cubic-bezier(.16,1,.3,1) both',
                animationDelay: '.1s',
              }}>{t('home.heroLine1')}</span>
            </span>

            {t('home.heroLine2') ? (
              <span style={{ display: 'block', overflow: 'visible', transform: `translateY(${heroMiddleNudge})` }}>
                <span style={{
                  display: 'block',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 500,
                  fontSize: heroScriptSize,
                  color: '#9b958c',
                  letterSpacing: 2,
                  animation: 'heroLine 1s cubic-bezier(.16,1,.3,1) both',
                  animationDelay: '.22s',
                }}>{t('home.heroLine2')}</span>
              </span>
            ) : (
              <span style={{ display: 'block', height: heroScriptSize, visibility: 'hidden' }} />
            )}

            <span style={{
              display: 'block',
              overflow: 'visible',
              maxWidth: '100%',
              position: 'relative',
              height: '1.14em',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: heroWordSize,
              letterSpacing: lang === 'hy' ? 1.5 : 3,
              color: '#c4a44a',
              marginTop: 0,
            }}>
              <span style={{ position: 'absolute', top: 0, left: 0, lineHeight: lang === 'hy' ? 1.08 : 1, animation: 'dn8word1 5.1s linear infinite' }}>{t('home.heroWinner')}</span>
              <span style={{ position: 'absolute', top: 0, left: 0, lineHeight: lang === 'hy' ? 1.08 : 1, animation: 'dn8word2 5.1s linear infinite' }}>{t('home.heroLeader')}</span>
              <span style={{ position: 'absolute', top: 0, left: 0, lineHeight: lang === 'hy' ? 1.08 : 1, animation: 'dn8word3 5.1s linear infinite' }}>{t('home.heroChampion')}</span>
            </span>
          </h1>

          <p style={{ maxWidth: 390, margin: '26px 0 0', fontSize: 'clamp(14px,1.4vw,16px)', lineHeight: 1.8, color: '#b8b3a8', fontWeight: 300, animation: 'heroFade 1s ease both', animationDelay: '.62s' }}>
            {t('home.heroText')}
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 38, animation: 'heroFade 1s ease both', animationDelay: '.78s' }}>
            <button
              onClick={onGoShop}
              style={{ background: '#f3efe8', color: '#060614', border: 'none', padding: '17px 38px', fontSize: 12, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2, transition: 'all .35s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#c4a44a'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f3efe8'; (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
            >
              {t('home.shopCollection')}
            </button>
            <button
              onClick={onGoAbout}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,.18)', color: '#f3efe8', padding: '17px 28px', fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2, transition: 'all .35s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#c4a44a'; (e.currentTarget as HTMLButtonElement).style.color = '#c4a44a'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,.18)'; (e.currentTarget as HTMLButtonElement).style.color = '#f3efe8'; }}
            >
              {t('home.ourStory')}
            </button>
          </div>

          <div style={{ position: 'absolute', bottom: 'clamp(24px,4vw,48px)', left: 'clamp(32px,6vw,80px)', display: 'flex', alignItems: 'center', gap: 16, animation: 'heroFade .9s ease both', animationDelay: '.95s' }}>
            <a href="https://www.instagram.com/dn8team" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6a6254', transition: 'color .25s' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c4a44a'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#6a6254'}
            >
              Instagram
            </a>
            <span style={{ color: '#c4a44a', fontSize: 8 }}>◆</span>
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6a6254' }}>{t('home.locationShort')}</span>
          </div>
        </div>

        {/* Right side intentionally left open so the full hero video can show naturally. */}
        {!isMobile && <div style={{ position: 'relative', zIndex: 2, minHeight: '100svh', pointerEvents: 'none' }} />}
      </section>

      {/* MARQUEE */}
      <div style={{ background: '#f3efe8', color: '#060614', overflow: 'hidden', padding: '17px 0', borderTop: '1px solid rgba(0,0,0,.07)', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: 'max-content', animation: 'marquee 64s linear infinite' }}>
          {['a', 'b'].map(group => (
            <div key={group} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {Array.from({ length: 5 }).flatMap((_, repeatIndex) =>
                [t('home.marquee1'), t('home.marquee2'), t('home.marquee3'), t('home.marquee4')].flatMap((text, i) => [
                  <span key={`${group}-t${repeatIndex}-${i}`} style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, fontSize: 'clamp(17px,1.9vw,22px)' }}>{text}</span>,
                  <span key={`${group}-d${repeatIndex}-${i}`} style={{ margin: '0 28px', fontSize: 8, color: '#c4a44a', opacity: .5 }}>◆</span>,
                ])
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PARTNERS STRIP */}
      <section style={{
        background: '#090915',
        borderTop: '1px solid rgba(196,164,74,.14)',
        borderBottom: '1px solid rgba(196,164,74,.14)',
        padding: 'clamp(30px,4.5vw,52px) clamp(20px,5vw,60px)',
      }}>
        <div style={{
          maxWidth: 980,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.05fr 1.35fr 1.15fr',
          alignItems: 'center',
          gap: isMobile ? 26 : 'clamp(28px,5vw,68px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', gap: 14 }}>
            <span style={{ width: 26, height: 1, background: '#c4a44a', opacity: .65 }} />
            <span style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#c4a44a', whiteSpace: 'nowrap' }}>{t('home.officialPartners')}</span>
            <span style={{ width: 26, height: 1, background: '#c4a44a', opacity: .65 }} />
          </div>

          <a
            href="https://www.instagram.com/armenia_hockey/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'grid',
              gridTemplateColumns: '52px 1fr',
              alignItems: 'center',
              gap: 16,
              textDecoration: 'none',
              minWidth: 0,
            }}
          >
            <img src="/assets/partner-hockey.png" alt="Armenian Ice Hockey National Team logo" style={{ width: 44, height: 44, objectFit: 'contain' }} />
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a', marginBottom: 5 }}>{t('home.nationalTeam')}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(17px,2vw,23px)', letterSpacing: 1.6, color: '#f3efe8', lineHeight: 1.05 }}>{t('home.partnerHockey')}</div>
            </div>
          </a>

          <a
            href="https://www.instagram.com/yerevan_futsal/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'grid',
              gridTemplateColumns: '52px 1fr',
              alignItems: 'center',
              gap: 16,
              textDecoration: 'none',
              minWidth: 0,
            }}
          >
            <img src="/assets/partner-futsal.jpg" alt="Yerevan Futsal logo" style={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 4 }} />
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a', marginBottom: 5 }}>{t('home.clubPartner')}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(17px,2vw,23px)', letterSpacing: 1.6, color: '#f3efe8', lineHeight: 1.05 }}>{t('home.partnerFutsal')}</div>
            </div>
          </a>
        </div>
      </section>

      {/* WHY DN8 */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#060614',
        padding: 'clamp(72px,9vw,128px) clamp(20px,5vw,60px)',
        borderBottom: '1px solid rgba(196,164,74,.12)',
      }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div className="scroll-reveal" style={{ marginBottom: 'clamp(34px,5vw,62px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ width: 28, height: 1, background: '#c4a44a' }} />
              <span style={{ fontSize: 11, letterSpacing: 3.5, textTransform: 'uppercase', color: '#c4a44a' }}>{t('home.whyDn8Eyebrow')}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr .9fr', gap: 'clamp(18px,4vw,68px)', alignItems: 'end' }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, lineHeight: .9, fontSize: 'clamp(54px,8vw,118px)', margin: 0, textTransform: 'uppercase', color: '#f3efe8' }}>
                {t('home.whyDn8Title').split('\n')[0]}<br />{t('home.whyDn8Title').split('\n')[1]}
              </h2>
              <p style={{ margin: 0, maxWidth: 460, color: '#9b958c', lineHeight: 1.85, fontSize: 15, fontWeight: 300 }}>
                {t('home.whyDn8Text')}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 0 }}>
            {whyPillars.map((pillar, idx) => (
              <article
                key={pillar.n}
                className="dn8-pillar-row"
                style={{
                  ['--pillar-delay' as string]: `${idx * 0.08}s`,
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: isMobile ? 210 : 190,
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '140px 1fr 1.1fr',
                  gap: isMobile ? 14 : 34,
                  alignItems: 'center',
                  padding: isMobile ? '30px 0 38px' : '34px 0',
                  borderTop: '1px solid rgba(196,164,74,.18)',
                }}
              >
                <div className="dn8-pillar-line" />
                <div className="dn8-pillar-kicker">{pillar.n}</div>
                <h3 className="dn8-pillar-title" style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(34px,5vw,72px)',
                  letterSpacing: 2.2,
                  lineHeight: .95,
                  margin: 0,
                  textTransform: 'uppercase',
                  color: '#f3efe8',
                }}>
                  {pillar.title}
                </h3>
                <p className="dn8-pillar-copy" style={{
                  margin: 0,
                  maxWidth: 480,
                  color: '#b8b3a8',
                  lineHeight: 1.8,
                  fontSize: 15,
                  fontWeight: 300,
                }}>
                  {pillar.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#060614', padding: 'clamp(60px,8vw,110px) clamp(20px,5vw,60px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#c4a44a' }} />
              <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a' }}>{t('home.collectionEyebrow')}</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, fontSize: 'clamp(48px,7vw,100px)', margin: 0, lineHeight: .88, textTransform: 'uppercase', color: '#f3efe8' }}>{t('home.featuredCollection').split('\n')[0]}<br />{t('home.featuredCollection').split('\n')[1]}</h2>
          </div>
          <button
            onClick={onGoShop}
            style={{ background: 'rgba(243,239,232,.1)', border: '1px solid rgba(243,239,232,.3)', color: '#f3efe8', padding: '14px 26px', fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', borderRadius: 2, transition: 'all .35s', backdropFilter: 'blur(6px)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f3efe8'; (e.currentTarget as HTMLButtonElement).style.color = '#060614'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(243,239,232,.1)'; (e.currentTarget as HTMLButtonElement).style.color = '#f3efe8'; }}
          >
            {t('home.viewAll')}
          </button>
        </div>

        <div className="hide-scrollbar" style={{ display: 'flex', gap: 'clamp(16px,2.5vw,28px)', overflowX: 'auto', paddingBottom: 12, scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
          {products.map((p, idx) => (
            <ProductCard
              key={p.id}
              product={p}
              animDelay={idx * 0.05}
              onView={() => onOpenProduct(p.id)}
              onAdd={e => { e.stopPropagation(); onAddToCart(p.id, 'M', 1); }}
            />
          ))}
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section ref={patternSectionRef} style={{ position: 'relative', zIndex: 4, background: 'transparent', padding: 'clamp(70px,10vw,140px) clamp(20px,5vw,60px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'clamp(30px,5vw,70px)', alignItems: 'center' }}>
          <div className="scroll-reveal">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#c4a44a' }} />
              <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a' }}>{t('home.mindset')}</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, lineHeight: .88, fontSize: 'clamp(56px,9vw,128px)', margin: 0, textTransform: 'uppercase' }}>
              {t('home.dontFollow').split('\n')[0]}<br />{t('home.dontFollow').split('\n')[1]}<br />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 500, color: '#9b958c', fontSize: '.68em', letterSpacing: 1 }}>{t('home.weLead')}</span>
            </h2>
            <p style={{ maxWidth: 380, margin: '28px 0 38px', color: '#b8b3a8', fontWeight: 300, lineHeight: 1.8, fontSize: 16 }}>
              {t('home.mindsetText')}
            </p>
            <button
              onClick={onGoShop}
              style={{ background: 'none', border: '1px solid #c4a44a', color: '#c4a44a', padding: '14px 28px', fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', borderRadius: 2, transition: 'all .35s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#c4a44a'; (e.currentTarget as HTMLButtonElement).style.color = '#060614'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; (e.currentTarget as HTMLButtonElement).style.color = '#c4a44a'; }}
            >
              {t('home.ctaButton')}
            </button>
          </div>
          <div className="scroll-reveal-scale" style={{ position: 'relative', overflow: 'hidden', background: '#0e0d28', aspectRatio: '4/5', borderRadius: 2, boxShadow: '0 40px 90px rgba(0,0,0,.6)' }}>
            <img src="/assets/tee-alleyes.jpg" alt="All Eyes On Us" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 22, background: 'linear-gradient(0deg,rgba(6,6,20,.75),transparent)' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, fontSize: 18, color: '#c4a44a' }}>{t('home.dividerAllEyes')}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'clamp(30px,5vw,70px)', alignItems: 'center', marginTop: 'clamp(30px,5vw,70px)' }}>
          <div className="scroll-reveal-scale" style={{ position: 'relative', overflow: 'hidden', background: '#0e0d28', aspectRatio: '4/5', borderRadius: 2, boxShadow: '0 40px 90px rgba(0,0,0,.6)' }}>
            <img src="/assets/editorial-duo.jpg" alt="DN8 Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(6,6,20,.5),transparent 60%)' }} />
          </div>
          <div className="scroll-reveal">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#c4a44a' }} />
              <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a' }}>{t('home.statementEyebrow')}</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, lineHeight: .88, fontSize: 'clamp(56px,9vw,128px)', margin: 0, textTransform: 'uppercase' }}>
              {t('home.statementTitle').split('\n')[0]}<br />{t('home.statementTitle').split('\n')[1]}
            </h2>
            <p style={{ maxWidth: 380, margin: '28px 0 0', color: '#b8b3a8', fontWeight: 300, lineHeight: 1.8, fontSize: 16 }}>
              {t('home.statementText')}
            </p>
          </div>
        </div>
      </section>

      {/* DIVIDER STRIP */}
      <div style={{ position: 'relative', zIndex: 4, borderTop: '1px solid rgba(196,164,74,.15)', borderBottom: '1px solid rgba(196,164,74,.15)', background: 'transparent', padding: 'clamp(28px,4vw,48px) clamp(20px,5vw,60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(20px,4vw,60px)', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 6, fontSize: 'clamp(18px,3vw,32px)', color: '#f3efe8' }}>{t('home.dividerBuilt')}</span>
        <span style={{ color: '#c4a44a', fontSize: 10, opacity: .6 }}>◆</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(16px,2.5vw,26px)', color: '#c4a44a', letterSpacing: 2 }}>{t('home.dividerAllEyes')}</span>
        <span style={{ color: '#c4a44a', fontSize: 10, opacity: .6 }}>◆</span>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 6, fontSize: 'clamp(18px,3vw,32px)', color: '#f3efe8' }}>{t('home.dividerDontFollow')}</span>
      </div>

      {/* JOIN */}
      <section ref={patternNextSectionRef} style={{ position: 'relative', zIndex: 4, background: 'transparent', padding: 'clamp(80px,11vw,150px) clamp(20px,5vw,60px)', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 26 }}>
          <span style={{ display: 'inline-block', width: 30, height: 1, background: '#c4a44a' }} />
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a' }}>{t('home.joinEyebrow')}</span>
          <span style={{ display: 'inline-block', width: 30, height: 1, background: '#c4a44a' }} />
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, fontSize: 'clamp(52px,10vw,144px)', margin: 0, textTransform: 'uppercase', textShadow: '0 4px 40px rgba(0,0,0,.7)' }}>
          {t('home.joinTitle').split('\n')[0]}<br />{t('home.joinTitle').split('\n')[1]}
        </h2>
        {subscribed ? (
          <div style={{ marginTop: 48, animation: 'scaleIn .45s cubic-bezier(.16,1,.3,1)' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(24px,3.5vw,38px)', color: '#c4a44a', letterSpacing: 1 }}>{t('home.subscribedTitle')}</div>
            <div style={{ fontSize: 13, color: '#9b958c', marginTop: 10, letterSpacing: .5 }}>{t('home.subscribedText')}</div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', margin: '48px auto 0', maxWidth: 520 }}>
            <input
              type="email"
              required
              placeholder={t('home.emailPlaceholder')}
              style={{ flex: 1, minWidth: 240, background: '#0e0d28', border: '1px solid rgba(255,255,255,.12)', borderBottom: '2px solid rgba(196,164,74,.4)', color: '#f3efe8', padding: '17px 20px', borderRadius: 2, fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
            />
            <button
              type="submit"
              style={{ background: '#f3efe8', color: '#060614', border: 'none', padding: '17px 34px', fontSize: 12, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2, transition: 'all .35s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#c4a44a'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f3efe8'; (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
            >
              {t('home.joinNow')}
            </button>
          </form>
        )}
        <div style={{ display: 'flex', gap: 18, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 30 }}>
          <a href="https://www.instagram.com/dn8team" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: '#9b958c', transition: 'color .25s' }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c4a44a'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#9b958c'}
          >
            Instagram
          </a>
          <span style={{ color: '#c4a44a', fontSize: 8 }}>◆</span>
          <span style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: '#6a6254' }}>{t('home.noSpam')}</span>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, animDelay, onView, onAdd }: {
  product: { id: string; name: string; cat: string; price: number; img: string; desc?: string };
  animDelay: number;
  onView: () => void;
  onAdd: (e: React.MouseEvent) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const { t, productCopy } = useLanguage();
  const copy = productCopy(product);

  return (
    <div
      onClick={onView}
      style={{ flex: 'none', width: 'clamp(220px,65vw,280px)', scrollSnapAlign: 'start', cursor: 'pointer', animation: 'cardReveal .8s cubic-bezier(.16,1,.3,1) both', animationDelay: `${animDelay}s` }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative', overflow: 'hidden',
          background: '#0e0d28', aspectRatio: '3/4', borderRadius: 2,
          boxShadow: hovered ? '0 36px 80px rgba(0,0,0,.85), 0 0 0 1px rgba(196,164,74,.4)' : '0 24px 60px rgba(0,0,0,.7), 0 0 0 1px rgba(196,164,74,.15)',
          transform: hovered ? 'translateY(-6px)' : 'none',
          transition: 'box-shadow .4s, transform .4s',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${product.img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform .9s cubic-bezier(.16,1,.3,1)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(6,6,20,.55) 0%,transparent 55%)', pointerEvents: 'none' }} />
        <button
          onClick={onAdd}
          style={{
            position: 'absolute', left: 12, right: 12, bottom: 12,
            background: hovered ? '#c4a44a' : 'rgba(243,239,232,.95)',
            color: '#060614', border: 'none', padding: 13,
            fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700,
            cursor: 'pointer', borderRadius: 2, transition: 'all .3s',
          }}
        >
          {t('home.quickAdd')}
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14, gap: 10 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#9b958c', marginBottom: 5 }}>{copy.cat}</div>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: -.2, color: '#f3efe8' }}>{copy.name}</div>
        </div>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#c4a44a', whiteSpace: 'nowrap' }}>${product.price}</div>
      </div>
    </div>
  );
}
