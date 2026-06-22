import { useLanguage } from '../i18n';
type View = 'home' | 'shop' | 'product' | 'about' | 'contact';

interface FooterProps {
  onGoShop: () => void;
  onGoAbout: () => void;
  onGoContact: () => void;
}

export default function Footer({ onGoShop, onGoAbout, onGoContact }: FooterProps) {
  const { t } = useLanguage();
  return (
    <footer style={{ background: '#060614', borderTop: '1px solid rgba(196,164,74,.18)', padding: 'clamp(64px,8vw,100px) clamp(20px,5vw,60px) 44px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 48 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a', marginBottom: 14 }}>{t('footer.tagline')}</div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(90px,18vw,210px)', letterSpacing: 4, lineHeight: .8, color: '#f3efe8' }}>DN8</div>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(44px,7vw,100px)', flexWrap: 'wrap', paddingTop: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#c4a44a', marginBottom: 4 }}>{t('footer.explore')}</div>
            {[
              { label: t('nav.shop'), action: onGoShop },
              { label: t('nav.about'), action: onGoAbout },
              { label: t('nav.contact'), action: onGoContact },
            ].map(({ label, action }) => (
              <a key={label} onClick={action} style={{ cursor: 'pointer', fontSize: 14, color: '#b8b3a8', transition: 'color .25s' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#f3efe8'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#b8b3a8'}
              >
                {label}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#c4a44a', marginBottom: 4 }}>{t('footer.social')}</div>
            <a href="https://www.instagram.com/dn8team" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#b8b3a8', transition: 'color .25s' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#f3efe8'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#b8b3a8'}
            >
              Instagram
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#c4a44a', marginBottom: 4 }}>{t('footer.visitUs')}</div>
            <a href="tel:+37495903090" style={{ fontSize: 14, color: '#b8b3a8', transition: 'color .25s' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c4a44a'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#b8b3a8'}
            >
              +374 95 903090
            </a>
            <div style={{ fontSize: 14, color: '#b8b3a8', lineHeight: 1.6 }}>{t('footer.address').split('\n')[0]}<br />{t('footer.address').split('\n')[1]}</div>
            <div style={{ fontSize: 13, color: '#c4a44a', fontWeight: 600, letterSpacing: .5 }}>{t('footer.hours')}</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ fontSize: 12, color: '#3e3a32' }}>{t('footer.rights')}</div>
        <div style={{ fontSize: 12, color: '#3e3a32' }}>{t('footer.location')}</div>
      </div>
    </footer>
  );
}
