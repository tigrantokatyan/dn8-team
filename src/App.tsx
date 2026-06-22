import { useEffect, useReducer, useRef, useCallback } from 'react';
import { useLanguage } from './i18n';
import AnnounceBar from './components/AnnounceBar';
import Nav from './components/Nav';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import About from './pages/About';
import Contact from './pages/Contact';

type View = 'home' | 'shop' | 'product' | 'about' | 'contact';

interface CartItem {
  id: string;
  size: string;
  qty: number;
}

interface State {
  view: View;
  selectedProductId: string;
  navOpen: boolean;
  scrolled: boolean;
  cart: CartItem[];
  drawerOpen: boolean;
  checkedOut: boolean;
  authOpen: boolean;
  authMode: 'signin' | 'signup';
  isLoggedIn: boolean;
  authName: string;
  authEmail: string;
  authErr: string;
  isMobile: boolean;
}

type Action =
  | { type: 'SET_VIEW'; view: View; productId?: string }
  | { type: 'SET_SCROLLED'; scrolled: boolean }
  | { type: 'SET_MOBILE'; isMobile: boolean }
  | { type: 'TOGGLE_NAV' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'CLEAR_CHECKOUT' }
  | { type: 'CHECKOUT' }
  | { type: 'ADD_TO_CART'; id: string; size: string; qty: number; openDrawer?: boolean }
  | { type: 'CHANGE_QTY'; id: string; size: string; delta: number }
  | { type: 'REMOVE_ITEM'; id: string; size: string }
  | { type: 'OPEN_AUTH'; mode?: 'signin' | 'signup' }
  | { type: 'CLOSE_AUTH' }
  | { type: 'SWITCH_AUTH_MODE' }
  | { type: 'SET_AUTH_ERR'; err: string }
  | { type: 'SIGN_IN'; name: string; email: string }
  | { type: 'SIGN_OUT' };

const initialState: State = {
  view: 'home',
  selectedProductId: 'signature-tee',
  navOpen: false,
  scrolled: false,
  cart: [],
  drawerOpen: false,
  checkedOut: false,
  authOpen: false,
  authMode: 'signin',
  isLoggedIn: false,
  authName: '',
  authEmail: '',
  authErr: '',
  isMobile: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_VIEW':
      return {
        ...state,
        view: action.view,
        selectedProductId: action.productId ?? state.selectedProductId,
        navOpen: false,
        drawerOpen: false,
      };
    case 'SET_SCROLLED':
      return { ...state, scrolled: action.scrolled };
    case 'SET_MOBILE':
      return { ...state, isMobile: action.isMobile };
    case 'TOGGLE_NAV':
      return { ...state, navOpen: !state.navOpen };
    case 'OPEN_CART':
      return { ...state, drawerOpen: true };
    case 'CLOSE_CART':
      return { ...state, drawerOpen: false };
    case 'CLEAR_CHECKOUT':
      return { ...state, checkedOut: false };
    case 'CHECKOUT':
      return { ...state, checkedOut: true, cart: [] };
    case 'ADD_TO_CART': {
      const cart = state.cart.slice();
      const i = cart.findIndex(c => c.id === action.id && c.size === action.size);
      if (i >= 0) cart[i] = { ...cart[i], qty: cart[i].qty + action.qty };
      else cart.push({ id: action.id, size: action.size, qty: action.qty });
      return { ...state, cart, drawerOpen: action.openDrawer ? true : state.drawerOpen };
    }
    case 'CHANGE_QTY':
      return {
        ...state,
        cart: state.cart
          .map(c => c.id === action.id && c.size === action.size ? { ...c, qty: c.qty + action.delta } : c)
          .filter(c => c.qty > 0),
      };
    case 'REMOVE_ITEM':
      return { ...state, cart: state.cart.filter(c => !(c.id === action.id && c.size === action.size)) };
    case 'OPEN_AUTH':
      return { ...state, authOpen: true, authMode: action.mode ?? 'signin', authErr: '', navOpen: false };
    case 'CLOSE_AUTH':
      return { ...state, authOpen: false, authErr: '' };
    case 'SWITCH_AUTH_MODE':
      return { ...state, authMode: state.authMode === 'signin' ? 'signup' : 'signin', authErr: '' };
    case 'SET_AUTH_ERR':
      return { ...state, authErr: action.err };
    case 'SIGN_IN':
      return { ...state, isLoggedIn: true, authName: action.name, authEmail: action.email, authOpen: false, authErr: '' };
    case 'SIGN_OUT':
      return { ...state, isLoggedIn: false, authName: '', authEmail: '' };
    default:
      return state;
  }
}

export default function App() {
  const { t } = useLanguage();
  const [state, dispatch] = useReducer(reducer, initialState);
  const prevView = useRef<View>(state.view);

  useEffect(() => {
    if (prevView.current !== state.view) {
      window.scrollTo(0, 0);
      prevView.current = state.view;
    }
  }, [state.view]);

  useEffect(() => {
    const onScroll = () => {
      const sc = window.scrollY > 60;
      dispatch({ type: 'SET_SCROLLED', scrolled: sc });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const handler = () => dispatch({ type: 'SET_MOBILE', isMobile: mq.matches });
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const pulseBadge = useCallback(() => {
    setTimeout(() => {
      ['cart-badge', 'cart-badge-m'].forEach(id => {
        const b = document.getElementById(id);
        if (b?.animate) b.animate(
          [{ transform: 'scale(1)' }, { transform: 'scale(1.7)' }, { transform: 'scale(1)' }],
          { duration: 450, easing: 'cubic-bezier(.16,1,.3,1)' }
        );
      });
    }, 20);
  }, []);

  const handleAddToCart = useCallback((id: string, size: string, qty: number, openDrawer = false) => {
    dispatch({ type: 'ADD_TO_CART', id, size, qty, openDrawer });
    pulseBadge();
  }, [pulseBadge]);

  const handleAuth = useCallback((email: string, password: string, name: string) => {
    if (!email || !password) { dispatch({ type: 'SET_AUTH_ERR', err: t('auth.fillFields') }); return; }
    if (password.length < 6) { dispatch({ type: 'SET_AUTH_ERR', err: t('auth.passwordLength') }); return; }
    const displayName = name || email.split('@')[0];
    dispatch({ type: 'SIGN_IN', name: displayName, email });
  }, [t]);

  const cartCount = state.cart.reduce((a, c) => a + c.qty, 0);

  return (
    <div style={{ background: '#060614', minHeight: '100vh', color: '#f3efe8', position: 'relative', overflowX: 'hidden' }}>
      <AnnounceBar />

      <Nav
        view={state.view}
        scrolled={state.scrolled}
        cartCount={cartCount}
        navOpen={state.navOpen}
        isLoggedIn={state.isLoggedIn}
        authName={state.authName}
        onGoHome={() => dispatch({ type: 'SET_VIEW', view: 'home' })}
        onGoShop={() => dispatch({ type: 'SET_VIEW', view: 'shop' })}
        onGoAbout={() => dispatch({ type: 'SET_VIEW', view: 'about' })}
        onGoContact={() => dispatch({ type: 'SET_VIEW', view: 'contact' })}
        onOpenCart={() => dispatch({ type: 'OPEN_CART' })}
        onToggleNav={() => dispatch({ type: 'TOGGLE_NAV' })}
        onOpenAuth={() => dispatch({ type: 'OPEN_AUTH', mode: 'signin' })}
        onSignOut={() => dispatch({ type: 'SIGN_OUT' })}
      />

      {state.view === 'home' && (
        <Home
          isMobile={state.isMobile}
          onGoShop={() => dispatch({ type: 'SET_VIEW', view: 'shop' })}
          onGoAbout={() => dispatch({ type: 'SET_VIEW', view: 'about' })}
          onOpenProduct={id => dispatch({ type: 'SET_VIEW', view: 'product', productId: id })}
          onAddToCart={handleAddToCart}
        />
      )}
      {state.view === 'shop' && (
        <Shop
          onOpenProduct={id => dispatch({ type: 'SET_VIEW', view: 'product', productId: id })}
          onAddToCart={handleAddToCart}
        />
      )}
      {state.view === 'product' && (
        <Product
          productId={state.selectedProductId}
          isMobile={state.isMobile}
          onGoShop={() => dispatch({ type: 'SET_VIEW', view: 'shop' })}
          onOpenProduct={id => dispatch({ type: 'SET_VIEW', view: 'product', productId: id })}
          onAddToCart={handleAddToCart}
        />
      )}
      {state.view === 'about' && <About isMobile={state.isMobile} />}
      {state.view === 'contact' && <Contact isMobile={state.isMobile} />}

      <Footer
        onGoShop={() => dispatch({ type: 'SET_VIEW', view: 'shop' })}
        onGoAbout={() => dispatch({ type: 'SET_VIEW', view: 'about' })}
        onGoContact={() => dispatch({ type: 'SET_VIEW', view: 'contact' })}
      />

      <CartDrawer
        open={state.drawerOpen}
        cart={state.cart}
        checkedOut={state.checkedOut}
        onClose={() => {
          dispatch({ type: 'CLOSE_CART' });
          setTimeout(() => dispatch({ type: 'CLEAR_CHECKOUT' }), 400);
        }}
        onGoShop={() => {
          dispatch({ type: 'SET_VIEW', view: 'shop' });
          dispatch({ type: 'CLOSE_CART' });
        }}
        onChangeQty={(id, size, delta) => dispatch({ type: 'CHANGE_QTY', id, size, delta })}
        onRemove={(id, size) => dispatch({ type: 'REMOVE_ITEM', id, size })}
        onCheckout={() => dispatch({ type: 'CHECKOUT' })}
      />

      {state.authOpen && (
        <AuthModal
          mode={state.authMode}
          authErr={state.authErr}
          onClose={() => dispatch({ type: 'CLOSE_AUTH' })}
          onSubmit={handleAuth}
          onSwitchMode={() => dispatch({ type: 'SWITCH_AUTH_MODE' })}
        />
      )}
    </div>
  );
}
