import CascadeText from './CascadeText';
import { LANGS, useLanguage } from '../i18n';

type View = 'home' | 'shop' | 'product' | 'about' | 'contact';

interface NavProps {
  view: View;
  scrolled: boolean;
  cartCount: number;
  navOpen: boolean;
  isLoggedIn: boolean;
  authName: string;
  onGoHome: () => void;
  onGoShop: () => void;
  onGoAbout: () => void;
  onGoContact: () => void;
  onOpenCart: () => void;
  onToggleNav: () => void;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      aria-label={t('nav.language')}
      title={t('nav.language')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        padding: compact ? 4 : 5,
        border: '1px solid rgba(196,164,74,.28)',
        borderRadius: 999,
        background: 'rgba(196,164,74,.06)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.03)',
      }}
    >
      {LANGS.map(item => (
        <button
          key={item.code}
          onClick={() => setLang(item.code)}
          style={{
            border: 'none',
            borderRadius: 999,
            background: lang === item.code ? '#c4a44a' : 'transparent',
            color: lang === item.code ? '#060614' : '#b8b3a8',
            padding: compact ? '5px 8px' : '6px 9px',
            fontSize: compact ? 10 : 9,
            fontWeight: 800,
            letterSpacing: compact ? 1.2 : 1.4,
            cursor: 'pointer',
            transition: 'all .25s',
            lineHeight: 1,
          }}
        >
          {item.short}
        </button>
      ))}
    </div>
  );
}

export default function Nav({
  view,
  scrolled,
  cartCount,
  navOpen,
  isLoggedIn,
  authName,
  onGoHome,
  onGoShop,
  onGoAbout,
  onGoContact,
  onOpenCart,
  onToggleNav,
  onOpenAuth,
  onSignOut,
}: NavProps) {
  const { t } = useLanguage();
  const solid = scrolled || view !== 'home' || navOpen;

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 38,
    left: 0,
    right: 0,
    zIndex: 95,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${solid ? 14 : 22}px clamp(20px, 5vw, 60px)`,
    transition: 'padding .45s cubic-bezier(.16,1,.3,1), background .45s, border-color .45s',
    background: solid ? 'rgba(6,6,20,.9)' : 'transparent',
    backdropFilter: solid ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: solid ? 'blur(20px)' : 'none',
    borderBottom: `1px solid ${solid ? 'rgba(196,164,74,.15)' : 'transparent'}`,
  };

  const initials = authName
    ? authName.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <CascadeText
          as="div"
          text="DN8"
          onClick={onGoHome}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 28,
            letterSpacing: 5,
            lineHeight: 1,
            userSelect: 'none',
            color: '#f3efe8',
          }}
        />

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: 30, alignItems: 'center' }}>
          <CascadeText
            text={t('nav.shop')}
            onClick={onGoShop}
            style={{ fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 500, color: 'rgba(243,239,232,0.7)' }}
          />
          <CascadeText
            text={t('nav.about')}
            onClick={onGoAbout}
            style={{ fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 500, color: 'rgba(243,239,232,0.7)' }}
          />
          <CascadeText
            text={t('nav.contact')}
            onClick={onGoContact}
            style={{ fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 500, color: 'rgba(243,239,232,0.7)' }}
          />

          <LanguageSwitcher />

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: '#c4a44a', color: '#060614',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, userSelect: 'none',
              }}>
                {initials}
              </div>
              <CascadeText
                as="button"
                text={t('nav.signOut')}
                onClick={onSignOut}
                style={{ background: 'none', border: 'none', color: '#9b958c', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}
              />
            </div>
          ) : (
            <CascadeText
              as="button"
              text={t('nav.signIn')}
              onClick={onOpenAuth}
              style={{ background: 'none', border: 'none', color: '#f3efe8', fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 500, opacity: 0.7 }}
            />
          )}

          <CascadeText
            as="button"
            id="cart-icon-btn"
            text={t('nav.cart')}
            onClick={onOpenCart}
            style={{ background: 'none', border: 'none', color: '#f3efe8', fontSize: 12, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 600, position: 'relative' }}
          >
            {cartCount > 0 && (
              <span
                id="cart-badge"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  minWidth: 19, height: 19, padding: '0 5px', borderRadius: 20,
                  background: '#c4a44a', color: '#060614', fontSize: 10, fontWeight: 800,
                }}
              >
                {cartCount}
              </span>
            )}
          </CascadeText>
        </div>

        {/* Mobile right actions */}
        <div className="flex md:hidden" style={{ gap: 12, alignItems: 'center' }}>
          <LanguageSwitcher compact />
          <button
            id="cart-icon-btn-m"
            onClick={onOpenCart}
            style={{
              background: 'none', border: 'none', color: '#f3efe8',
              cursor: 'pointer', position: 'relative',
              fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, padding: 0,
            }}
          >
            {t('nav.cart')}
            {cartCount > 0 && (
              <span
                id="cart-badge-m"
                style={{
                  position: 'absolute', top: -8, right: -12,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  minWidth: 17, height: 17, padding: '0 4px', borderRadius: 20,
                  background: '#c4a44a', color: '#060614', fontSize: 9, fontWeight: 800,
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={onToggleNav}
            style={{ background: 'none', border: 'none', cursor: 'pointer', width: 24, height: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0 }}
          >
            <span style={{ display: 'block', height: 1.5, width: '100%', background: '#f3efe8' }} />
            <span style={{ display: 'block', height: 1.5, width: '70%', background: '#f3efe8', marginLeft: 'auto' }} />
            <span style={{ display: 'block', height: 1.5, width: '100%', background: '#f3efe8' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {navOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 90,
          background: '#060614',
          display: 'flex', flexDirection: 'column',
          padding: '112px 30px 40px',
          animation: 'fadeIn .25s ease',
        }}>
          <button
            onClick={onToggleNav}
            style={{ position: 'absolute', top: 56, right: 24, background: 'none', border: 'none', color: '#f3efe8', fontSize: 32, lineHeight: 1, cursor: 'pointer', fontWeight: 200 }}
          >
            &times;
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 'auto' }}>
            {[
              { label: t('nav.shop'), action: onGoShop },
              { label: t('nav.about'), action: onGoAbout },
              { label: t('nav.contact'), action: onGoContact },
            ].map(({ label, action }) => (
              <a
                key={label}
                onClick={action}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: 56,
                  letterSpacing: 2, cursor: 'pointer', lineHeight: 1.05,
                  color: '#f3efe8',
                }}
              >
                {label}
              </a>
            ))}
            {isLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c4a44a', color: '#060614', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>
                  {initials}
                </div>
                <a onClick={onSignOut} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', color: '#9b958c' }}>
                  {t('nav.signOut')}
                </a>
              </div>
            ) : (
              <a onClick={onOpenAuth} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', color: '#c4a44a' }}>
                {t('nav.signIn')}
              </a>
            )}
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 40, alignItems: 'center' }}>
            <a href="https://www.instagram.com/dn8team" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: '#9b958c' }}>
              {t('home.instagram')}
            </a>
            <span style={{ color: '#c4a44a', fontSize: 9 }}>◆</span>
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#4a4636' }}>{t('home.locationShort')}</span>
          </div>
        </div>
      )}
    </>
  );
}
