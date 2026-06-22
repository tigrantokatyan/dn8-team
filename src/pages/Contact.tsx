import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../i18n';

interface ContactProps {
  isMobile: boolean;
}

const MAPS_URL = 'https://www.google.com/maps?q=40.18912901426762,44.514150427250826';
const LAT = 40.18912901426762;
const LNG = 44.514150427250826;

export default function Contact({ isMobile }: ContactProps) {
  const { t, lang } = useLanguage();
  const [formSent, setFormSent] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    try {
      const map = L.map(mapRef.current, { scrollWheelZoom: false, attributionControl: false }).setView([LAT, LNG], 15);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, subdomains: 'abcd' }).addTo(map);

      const markerIcon = L.divIcon({
        className: 'dn8-map-marker',
        iconSize: [34, 46],
        iconAnchor: [17, 44],
        popupAnchor: [0, -42],
        html: '<div style="width:34px;height:34px;background:#2d9fe8;border:2px solid rgba(255,255,255,.75);border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 6px 18px rgba(45,159,232,.45)"><span style="position:absolute;left:9px;top:9px;width:10px;height:10px;background:#f3efe8;border-radius:50%;display:block"></span></div>',
      });

      L.marker([LAT, LNG], { icon: markerIcon })
        .addTo(map)
        .bindPopup(`<b style="font-family:sans-serif">DN8 Team</b><br><span style="font-size:12px">${t('contact.popupAddress')}</span>`)
        .openPopup();

      mapInstanceRef.current = map;
      setTimeout(() => {
        try { map.invalidateSize(); } catch (e) { /* noop */ }
      }, 200);
    } catch (e) {
      console.error('Map init failed', e);
    }

    return () => {
      if (mapInstanceRef.current) {
        try { mapInstanceRef.current.remove(); } catch (e) { /* noop */ }
        mapInstanceRef.current = null;
      }
    };
  }, [lang, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div style={{ padding: 'clamp(130px,16vw,170px) clamp(20px,5vw,60px) clamp(80px,10vw,130px)', minHeight: '100svh', background: '#0b0b14' }}>
      <div style={{ marginBottom: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ display: 'inline-block', width: 24, height: 1, background: '#c4a44a' }} />
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a' }}>{t('contact.eyebrow')}</span>
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 4, fontSize: 'clamp(60px,11vw,150px)', margin: 0, lineHeight: .86, textTransform: 'uppercase' }}>{t('contact.title')}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>
        {/* Form side */}
        <div>
          {formSent ? (
            <div style={{ background: '#0e0d28', border: '1px solid rgba(196,164,74,.25)', borderRadius: 3, padding: '48px 36px', maxWidth: 520, animation: 'scaleIn .4s ease' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, fontSize: 36, textTransform: 'uppercase', color: '#c4a44a' }}>{t('contact.messageSent')}</div>
              <p style={{ color: '#b8b3a8', fontWeight: 300, lineHeight: 1.8, marginTop: 14 }}>{t('contact.messageSentText')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 520 }}>
              {[
                { label: t('contact.name'), type: 'text', placeholder: t('contact.yourName') },
                { label: t('contact.email'), type: 'email', placeholder: t('contact.emailPlaceholder') },
              ].map(field => (
                <div key={field.label}>
                  <label style={{ display: 'block', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#9b958c', marginBottom: 10 }}>{field.label}</label>
                  <input
                    required
                    type={field.type}
                    placeholder={field.placeholder}
                    style={{ width: '100%', background: '#0e0d28', border: '1px solid rgba(255,255,255,.1)', borderBottom: '2px solid rgba(196,164,74,.4)', color: '#f3efe8', padding: '15px 16px', borderRadius: 2, fontSize: 15, outline: 'none' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#9b958c', marginBottom: 10 }}>{t('contact.message')}</label>
                <textarea
                  required
                  rows={5}
                  style={{ width: '100%', background: '#0e0d28', border: '1px solid rgba(255,255,255,.1)', borderBottom: '2px solid rgba(196,164,74,.4)', color: '#f3efe8', padding: '15px 16px', borderRadius: 2, fontSize: 15, outline: 'none', resize: 'vertical' }}
                />
              </div>
              <button
                type="submit"
                style={{ background: '#f3efe8', color: '#060614', border: 'none', padding: 18, fontSize: 12, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2, transition: 'background .35s' }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#c4a44a'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#f3efe8'}
              >
                {t('contact.sendMessage')}
              </button>
            </form>
          )}

          {/* Contact info grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 20px', marginTop: 48, borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 40 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#c4a44a', marginBottom: 10 }}>{t('contact.phone')}</div>
              <a href="tel:+37495903090" style={{ fontSize: 17, fontWeight: 500, transition: 'color .25s' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c4a44a'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#f3efe8'}
              >
                +374 95 903090
              </a>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#c4a44a', marginBottom: 10 }}>{t('contact.studio')}</div>
              <div style={{ fontSize: 15, fontWeight: 400, lineHeight: 1.65, color: '#e7e2d9' }}>{t('contact.address').split('\n')[0]}<br />{t('contact.address').split('\n')[1]}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#c4a44a', marginBottom: 10 }}>{t('contact.hours')}</div>
              <div style={{ fontSize: 15, lineHeight: 1.8, color: '#e7e2d9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 210, gap: 16 }}>
                  <span>{t('contact.days')}</span>
                  <span style={{ color: '#c4a44a', fontWeight: 700 }}>10:00 – 22:00</span>
                </div>
                <div style={{ fontSize: 12, color: '#9b958c', marginTop: 4 }}>{t('contact.openEveryDay')}</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: '#c4a44a', marginBottom: 10 }}>{t('contact.social')}</div>
              <a
                href="https://www.instagram.com/dn8team"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,.15)', padding: '10px 18px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, borderRadius: 2, transition: 'all .3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f3efe8'; (e.currentTarget as HTMLAnchorElement).style.color = '#060614'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#f3efe8'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'none'; (e.currentTarget as HTMLAnchorElement).style.color = '#f3efe8'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,.15)'; }}
              >
                {t('home.instagram')}
              </a>
            </div>
          </div>
        </div>

        {/* Map side */}
        <div style={{ animation: 'scaleIn 1s cubic-bezier(.16,1,.3,1) both' }}>
          <div style={{ position: 'relative', borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(196,164,74,.2)', background: '#0e0d28', boxShadow: '0 32px 80px rgba(0,0,0,.55)' }}>
            <div ref={mapRef} style={{ width: '100%', height: 'clamp(320px,50vh,500px)' }} />
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 18, flexWrap: 'wrap' }}>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: '1px solid rgba(196,164,74,.4)', color: '#c4a44a', padding: '13px 24px', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, borderRadius: 2, transition: 'all .35s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#c4a44a'; (e.currentTarget as HTMLAnchorElement).style.color = '#060614'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'none'; (e.currentTarget as HTMLAnchorElement).style.color = '#c4a44a'; }}
            >
              {t('contact.openMaps')}
            </a>
            <div style={{ fontSize: 12, color: '#6a6254' }}>{t('contact.dragZoom')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
