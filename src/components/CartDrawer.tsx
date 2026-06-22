import { products } from '../data/products';
import { useLanguage } from '../i18n';

interface CartItem {
  id: string;
  size: string;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  cart: CartItem[];
  checkedOut: boolean;
  onClose: () => void;
  onGoShop: () => void;
  onChangeQty: (id: string, size: string, delta: number) => void;
  onRemove: (id: string, size: string) => void;
  onCheckout: () => void;
}

const fmt = (n: number) => `$${n}`;
const byId = (id: string) => products.find(p => p.id === id) || products[0];

export default function CartDrawer({
  open,
  cart,
  checkedOut,
  onClose,
  onGoShop,
  onChangeQty,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const { t, productCopy } = useLanguage();
  if (!open) return null;

  const count = cart.reduce((a, c) => a + c.qty, 0);
  const subtotal = cart.reduce((a, c) => a + byId(c.id).price * c.qty, 0);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.68)', animation: 'fadeIn .3s ease', backdropFilter: 'blur(4px)' }}
      />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0,
        width: 'min(440px, 93vw)',
        background: '#0d0c22',
        borderLeft: '1px solid rgba(196,164,74,.15)',
        display: 'flex', flexDirection: 'column',
        animation: 'drawerIn .42s cubic-bezier(.16,1,.3,1)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 3, textTransform: 'uppercase' }}>{t('cart.title')}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#f3efe8', fontSize: 28, lineHeight: 1, cursor: 'pointer', fontWeight: 200 }}>&times;</button>
        </div>

        {checkedOut ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40, animation: 'scaleIn .4s ease' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, fontSize: 38, textTransform: 'uppercase', color: '#c4a44a' }}>{t('cart.orderPlaced')}</div>
            <p style={{ color: '#b8b3a8', fontWeight: 300, lineHeight: 1.8, marginTop: 14, maxWidth: 280 }}>{t('cart.orderText')}</p>
            <button onClick={onClose} style={{ marginTop: 30, background: '#f3efe8', color: '#060614', border: 'none', padding: '16px 34px', fontSize: 12, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2 }}>{t('cart.continue')}</button>
          </div>
        ) : count === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
            <div style={{ color: '#9b958c', fontSize: 14, fontWeight: 300, marginBottom: 24 }}>{t('cart.empty')}</div>
            <button onClick={onGoShop} style={{ background: '#f3efe8', color: '#060614', border: 'none', padding: '16px 34px', fontSize: 12, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2 }}>{t('home.shopCollection')}</button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 28px' }}>
              {cart.map(ci => {
                const p = byId(ci.id);
                const copy = productCopy(p);
                return (
                  <div key={`${ci.id}-${ci.size}`} style={{ display: 'flex', gap: 14, padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                    <div style={{ flex: 'none', width: 74, height: 92, overflow: 'hidden', background: '#131228', borderRadius: 2 }}>
                      <div style={{ width: '100%', height: '100%', backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                        <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: -.2 }}>{copy.name}</div>
                        <button onClick={() => onRemove(ci.id, ci.size)} style={{ background: 'none', border: 'none', color: '#6a6254', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0 }}>&times;</button>
                      </div>
                      <div style={{ fontSize: 12, color: '#9b958c', letterSpacing: 1, marginTop: 4 }}>{t('cart.size')} {ci.size}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,.13)', borderRadius: 2, overflow: 'hidden' }}>
                          <button onClick={() => onChangeQty(ci.id, ci.size, -1)} style={{ background: 'none', border: 'none', color: '#f3efe8', width: 32, height: 32, cursor: 'pointer', fontSize: 16 }}>−</button>
                          <div style={{ minWidth: 30, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{ci.qty}</div>
                          <button onClick={() => onChangeQty(ci.id, ci.size, 1)} style={{ background: 'none', border: 'none', color: '#f3efe8', width: 32, height: 32, cursor: 'pointer', fontSize: 16 }}>+</button>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: 15, color: '#c4a44a' }}>{fmt(p.price * ci.qty)}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: '22px 28px', borderTop: '1px solid rgba(255,255,255,.07)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: '#9b958c' }}>{t('cart.subtotal')}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: 2, color: '#c4a44a' }}>{fmt(subtotal)}</div>
              </div>
              <div style={{ fontSize: 12, color: '#6a6254', marginBottom: 18 }}>{t('cart.shipping')}</div>
              <button onClick={onCheckout} style={{ width: '100%', background: '#f3efe8', color: '#060614', border: 'none', padding: 18, fontSize: 12, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2, transition: 'background .35s' }}>{t('cart.checkout')}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
