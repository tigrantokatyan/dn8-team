import { useState } from 'react';
import { products } from '../data/products';
import { useLanguage } from '../i18n';

interface ShopProps {
  onOpenProduct: (id: string) => void;
  onAddToCart: (id: string, size: string, qty: number) => void;
}

export default function Shop({ onOpenProduct, onAddToCart }: ShopProps) {
  const { t } = useLanguage();
  return (
    <div style={{ padding: 'clamp(130px,16vw,170px) clamp(20px,5vw,60px) clamp(80px,10vw,130px)', minHeight: '100svh', background: '#0b0b14' }}>
      <div style={{ marginBottom: 52 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{ display: 'inline-block', width: 24, height: 1, background: '#c4a44a' }} />
          <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a' }}>{t('shop.eyebrow')}</span>
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 4, fontSize: 'clamp(64px,12vw,150px)', margin: 0, lineHeight: .86, textTransform: 'uppercase' }}>{t('shop.title')}</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(46%, 260px), 1fr))', gap: 'clamp(16px,2.4vw,30px)' }}>
        {products.map(p => <ShopCard key={p.id} product={p} onView={() => onOpenProduct(p.id)} onAdd={e => { e.stopPropagation(); onAddToCart(p.id, 'M', 1); }} />)}
      </div>
    </div>
  );
}

function ShopCard({ product, onView, onAdd }: {
  product: { id: string; name: string; cat: string; price: number; img: string; desc?: string };
  onView: () => void;
  onAdd: (e: React.MouseEvent) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const { t, productCopy } = useLanguage();
  const copy = productCopy(product);
  return (
    <div onClick={onView} style={{ cursor: 'pointer' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative', overflow: 'hidden', background: '#0e0d28', aspectRatio: '3/4', borderRadius: 2,
          boxShadow: hovered ? '0 24px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(196,164,74,.25)' : 'none',
          transform: hovered ? 'translateY(-4px)' : 'none',
          transition: 'box-shadow .4s, transform .4s',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${product.img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform .9s cubic-bezier(.16,1,.3,1)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(6,6,20,.5) 0%,transparent 55%)', pointerEvents: 'none' }} />
        <button
          onClick={onAdd}
          style={{
            position: 'absolute', left: 12, right: 12, bottom: 12,
            background: hovered ? '#c4a44a' : 'rgba(243,239,232,.95)',
            color: '#060614', border: 'none', padding: 12,
            fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700,
            cursor: 'pointer', borderRadius: 2, transition: 'all .3s',
          }}
        >
          {t('shop.quickAdd')}
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14, gap: 10 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#9b958c', marginBottom: 5 }}>{copy.cat}</div>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: -.2 }}>{copy.name}</div>
        </div>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#c4a44a', whiteSpace: 'nowrap' }}>${product.price}</div>
      </div>
    </div>
  );
}
