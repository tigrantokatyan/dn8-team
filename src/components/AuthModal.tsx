import { useState } from 'react';
import { useLanguage } from '../i18n';

interface AuthModalProps {
  mode: 'signin' | 'signup';
  authErr: string;
  onClose: () => void;
  onSubmit: (email: string, password: string, name: string) => void;
  onSwitchMode: () => void;
}

export default function AuthModal({ mode, authErr, onClose, onSubmit, onSwitchMode }: AuthModalProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, name);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.82)', backdropFilter: 'blur(10px)', animation: 'fadeIn .25s ease' }} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: 420,
        background: '#0d0c22', border: '1px solid rgba(196,164,74,.22)',
        borderRadius: 3, padding: 'clamp(32px,5vw,48px)',
        animation: 'scaleIn .35s cubic-bezier(.16,1,.3,1)',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 22, background: 'none', border: 'none', color: '#9b958c', fontSize: 26, lineHeight: 1, cursor: 'pointer', fontWeight: 200 }}>&times;</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ display: 'inline-block', width: 18, height: 1, background: '#c4a44a' }} />
          <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a' }}>{t('auth.team')}</span>
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, fontSize: 36, textTransform: 'uppercase', margin: '0 0 30px', color: '#f3efe8' }}>
          {mode === 'signin' ? t('auth.signIn') : t('auth.createAccount')}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {mode === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#9b958c', marginBottom: 9 }}>{t('auth.fullName')}</label>
              <input
                type="text"
                placeholder={t('auth.yourName')}
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', background: '#0e0d28', border: '1px solid rgba(255,255,255,.1)', borderBottom: '2px solid rgba(196,164,74,.4)', color: '#f3efe8', padding: '14px 16px', borderRadius: 2, fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          )}
          <div>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#9b958c', marginBottom: 9 }}>{t('auth.email')}</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', background: '#0e0d28', border: '1px solid rgba(255,255,255,.1)', borderBottom: '2px solid rgba(196,164,74,.4)', color: '#f3efe8', padding: '14px 16px', borderRadius: 2, fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#9b958c', marginBottom: 9 }}>{t('auth.password')}</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', background: '#0e0d28', border: '1px solid rgba(255,255,255,.1)', borderBottom: '2px solid rgba(196,164,74,.4)', color: '#f3efe8', padding: '14px 16px', borderRadius: 2, fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          {authErr && (
            <div style={{ fontSize: 13, color: '#e07a5f', padding: '10px 14px', background: 'rgba(224,122,95,.1)', borderRadius: 2, border: '1px solid rgba(224,122,95,.2)' }}>
              {authErr}
            </div>
          )}
          <button
            type="submit"
            style={{ marginTop: 6, width: '100%', background: '#f3efe8', color: '#060614', border: 'none', padding: 17, fontSize: 12, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2, transition: 'background .35s' }}
          >
            {mode === 'signin' ? t('auth.signIn') : t('auth.createAccount')}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: '#9b958c' }}>
            {mode === 'signin' ? t('auth.noAccount') : t('auth.hasAccount')}
          </span>
          <button onClick={onSwitchMode} style={{ background: 'none', border: 'none', color: '#c4a44a', cursor: 'pointer', fontSize: 13, fontWeight: 600, padding: 0, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            {mode === 'signin' ? t('auth.createOne') : t('auth.signInSmall')}
          </button>
        </div>
      </div>
    </div>
  );
}
