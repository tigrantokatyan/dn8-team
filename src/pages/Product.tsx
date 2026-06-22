import { useState } from 'react';
import { products } from '../data/products';
import { useLanguage } from '../i18n';

interface ProductProps {
  productId: string;
  onGoShop: () => void;
  onOpenProduct: (id: string) => void;
  onAddToCart: (id: string, size: string, qty: number, openDrawer: boolean) => void;
  isMobile: boolean;
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function Product({ productId, onGoShop, onOpenProduct, onAddToCart, isMobile }: ProductProps) {
  const { t, productCopy } = useLanguage();
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [galleryIdx, setGalleryIdx] = useState(0);

  const cur = products.find(p => p.id === productId) || products[0];
  const related = products.filter(p => p.id !== cur.id).slice(0, 3);
  const mainImg = cur.gallery[galleryIdx] || cur.img;
  const curCopy = productCopy(cur);

  return (
    <div style={{ padding: 'clamp(120px,15vw,160px) clamp(20px,5vw,60px) clamp(80px,10vw,130px)', minHeight: '100svh', background: '#0b0b14' }}>
      <button
        onClick={onGoShop}
        style={{ background: 'none', border: 'none', color: '#9b958c', cursor: 'pointer', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, padding: 0, marginBottom: 40, display: 'flex', alignItems: 'center', gap: 8, transition: 'color .25s' }}
        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#c4a44a'}
        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = '#9b958c'}
      >
        {t('product.back')}
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'clamp(30px,5vw,70px)', alignItems: 'start' }}>
        {/* Gallery */}
        <div>
          <div style={{ position: 'relative', overflow: 'hidden', background: '#0e0d28', aspectRatio: '3/4', borderRadius: 2, boxShadow: '0 32px 80px rgba(0,0,0,.55)' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${mainImg})`, backgroundSize: 'cover', backgroundPosition: 'center', animation: 'fadeIn .5s ease' }} />
          </div>
          {cur.gallery.length > 1 && (
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              {cur.gallery.map((src, i) => (
                <div
                  key={src}
                  onClick={() => setGalleryIdx(i)}
                  style={{
                    flex: 'none', width: 72, height: 90,
                    backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center',
                    cursor: 'pointer', borderRadius: 2,
                    border: `1px solid ${galleryIdx === i ? '#c4a44a' : 'rgba(255,255,255,.1)'}`,
                    opacity: galleryIdx === i ? 1 : .4,
                    transition: 'all .25s',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div style={{ position: 'sticky', top: 130 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: '#c4a44a' }} />
            <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#c4a44a' }}>{curCopy.cat}</span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, fontSize: 'clamp(44px,6vw,76px)', margin: 0, lineHeight: .9, textTransform: 'uppercase' }}>{curCopy.name}</h1>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, letterSpacing: 2, color: '#c4a44a', marginTop: 16 }}>${cur.price}</div>
          <p style={{ color: '#b8b3a8', fontWeight: 300, lineHeight: 1.8, fontSize: 15, marginTop: 22, maxWidth: 440 }}>{curCopy.desc}</p>

          {/* Size */}
          <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: '#9b958c', marginTop: 36, marginBottom: 14 }}>{t('product.size')}</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {SIZES.map(sz => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                style={{
                  minWidth: 52, height: 48, padding: '0 6px', fontWeight: 600, fontSize: 14, cursor: 'pointer', borderRadius: 2, transition: 'all .22s',
                  border: `1px solid ${selectedSize === sz ? '#c4a44a' : 'rgba(255,255,255,.18)'}`,
                  background: selectedSize === sz ? '#c4a44a' : 'transparent',
                  color: selectedSize === sz ? '#060614' : '#f3efe8',
                }}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Qty */}
          <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: '#9b958c', marginTop: 32, marginBottom: 14 }}>{t('product.quantity')}</div>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,.18)', width: 'fit-content', borderRadius: 2, overflow: 'hidden' }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', color: '#f3efe8', width: 48, height: 48, fontSize: 20, cursor: 'pointer' }}>−</button>
            <div style={{ minWidth: 48, textAlign: 'center', fontWeight: 600, fontSize: 16 }}>{qty}</div>
            <button onClick={() => setQty(q => q + 1)} style={{ background: 'none', border: 'none', color: '#f3efe8', width: 48, height: 48, fontSize: 20, cursor: 'pointer' }}>+</button>
          </div>

          <button
            onClick={() => onAddToCart(cur.id, selectedSize, qty, true)}
            style={{ marginTop: 32, width: '100%', maxWidth: 440, background: '#f3efe8', color: '#060614', border: 'none', padding: 20, fontSize: 12, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2, transition: 'all .35s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#c4a44a'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f3efe8'; (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
          >
            {t('product.addToCart')} — ${cur.price}
          </button>
          <div style={{ display: 'flex', gap: 24, marginTop: 22, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 12, color: '#9b958c' }}>{t('product.freeShipping')}</div>
            <div style={{ fontSize: 12, color: '#9b958c' }}>{t('product.returns')}</div>
          </div>
        </div>
      </div>

      {/* Related */}
      <div style={{ marginTop: 'clamp(80px,10vw,130px)' }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, fontSize: 'clamp(32px,4.5vw,56px)', margin: '0 0 40px', textTransform: 'uppercase' }}>{t('product.related')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(46%, 240px), 1fr))', gap: 'clamp(16px,2.4vw,26px)' }}>
          {related.map(p => {
            const copy = productCopy(p);
            return (
            <div key={p.id} onClick={() => { onOpenProduct(p.id); setGalleryIdx(0); setSelectedSize('M'); setQty(1); }} style={{ cursor: 'pointer' }}>
              <RelatedCard product={p} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 13, gap: 10 }}>
                <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: -.2 }}>{copy.name}</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#c4a44a', whiteSpace: 'nowrap' }}>${p.price}</div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RelatedCard({ product }: { product: { img: string; name: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', overflow: 'hidden', background: '#0e0d28', aspectRatio: '3/4', borderRadius: 2 }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${product.img})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform .9s cubic-bezier(.16,1,.3,1)',
      }} />
    </div>
  );
}
