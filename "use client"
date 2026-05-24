import { useState, useEffect, useRef, useCallback } from "react";

// ── MOCK DATA ──────────────────────────────────────────────────────────────────
const ADMIN_CREDENTIALS = { user: "admin", pass: "assam2024" };
const WHATSAPP_NUMBER = "919435422488";
const SHOP_ADDRESS = "Sapekhati Main Road, 785692";

const CATEGORIES = [
  { id: "all", label: "All Products", icon: "⚡" },
  { id: "mobile", label: "Mobile Accessories", icon: "📱" },
  { id: "batteries", label: "Batteries & UPS", icon: "🔋" },
  { id: "appliances", label: "Home Appliances", icon: "🏠" },
  { id: "wiring", label: "Wiring & Electricals", icon: "🔌" },
  { id: "lighting", label: "Lighting", icon: "💡" },
  { id: "tools", label: "Tools & Testers", icon: "🔧" },
];

const INITIAL_PRODUCTS = [
  { id: 1, title: "USB-C Fast Charger 65W", desc: "GaN technology, supports PD 3.0", category: "mobile", price: 849, stock: 12, image: "https://placehold.co/300x300/1a1a2e/e2e8f0?text=65W+Charger" },
  { id: 2, title: "Anchor Extension Board 6-in-1", desc: "6 sockets, 2 USB, 2m cord, surge protection", category: "wiring", price: 549, stock: 2, image: "https://placehold.co/300x300/1a1a2e/e2e8f0?text=Extension+Board" },
  { id: 3, title: "Exide 150Ah Inverter Battery", desc: "Tubular, 42-month warranty", category: "batteries", price: 12500, stock: 4, image: "https://placehold.co/300x300/1a1a2e/e2e8f0?text=Exide+Battery" },
  { id: 4, title: "Philips LED Bulb 9W (Pack of 4)", desc: "Cool daylight, B22 base, 800 lumens", category: "lighting", price: 299, stock: 30, image: "https://placehold.co/300x300/1a1a2e/e2e8f0?text=LED+Bulb+4pk" },
  { id: 5, title: "Lightning Cable 2m (MFi Certified)", desc: "Apple certified, fast charging", category: "mobile", price: 399, stock: 8, image: "https://placehold.co/300x300/1a1a2e/e2e8f0?text=Lightning+Cable" },
  { id: 6, title: "Crompton Table Fan 400mm", desc: "High-speed, 3-blade, 55W", category: "appliances", price: 1799, stock: 1, image: "https://placehold.co/300x300/1a1a2e/e2e8f0?text=Table+Fan" },
  { id: 7, title: "Digital Clamp Meter", desc: "Auto-range, AC/DC, true RMS", category: "tools", price: 1250, stock: 6, image: "https://placehold.co/300x300/1a1a2e/e2e8f0?text=Clamp+Meter" },
  { id: 8, title: "20mm Conduit Pipe (per metre)", desc: "ISI mark PVC electrical conduit", category: "wiring", price: 45, stock: 200, image: "https://placehold.co/300x300/1a1a2e/e2e8f0?text=Conduit+Pipe" },
  { id: 9, title: "Wipro 18W LED Panel Light", desc: "Square flush, cool white, 3yr warranty", category: "lighting", price: 649, stock: 0, image: "https://placehold.co/300x300/1a1a2e/e2e8f0?text=Panel+Light" },
  { id: 10, title: "Bluetooth TWS Earbuds", desc: "45hr playtime, IPX5, noise isolation", category: "mobile", price: 999, stock: 15, image: "https://placehold.co/300x300/1a1a2e/e2e8f0?text=TWS+Earbuds" },
  { id: 11, title: "Inverter 1500VA Microtek", desc: "Pure sine wave, auto-sensing", category: "batteries", price: 6800, stock: 3, image: "https://placehold.co/300x300/1a1a2e/e2e8f0?text=Inverter+1500VA" },
  { id: 12, title: "Electrician Screwdriver Set (6pc)", desc: "CR-V, insulated 1000V, VDE tested", category: "tools", price: 380, stock: 9, image: "https://placehold.co/300x300/1a1a2e/e2e8f0?text=Screwdriver+Set" },
];

// ── UTILITIES ─────────────────────────────────────────────────────────────────
const fmt = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
let _nextId = INITIAL_PRODUCTS.length + 1;
const nextId = () => _nextId++;

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useProducts() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const addProduct = useCallback((p) => {
    setProducts((prev) => [...prev, { ...p, id: nextId() }]);
  }, []);

  const updateProduct = useCallback((id, changes) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...changes } : p)));
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { products, addProduct, updateProduct, deleteProduct };
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  Cart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  Minus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path d="M5 12h14"/>
    </svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
    </svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Warning: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  WA: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L0 24l6.341-1.501A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.875 9.875 0 0 1-5.031-1.378l-.361-.214-3.738.884.916-3.632-.235-.374A9.86 9.86 0 0 1 2.118 12C2.118 6.534 6.534 2.118 12 2.118S21.882 6.534 21.882 12 17.466 21.882 12 21.882z"/>
    </svg>
  ),
  Close: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Package: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Logout: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
};

// ── GLOBAL STYLES ──────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --green: #0fd65b;
      --green-dark: #0bbf4f;
      --yellow: #fbbf24;
      --red: #ef4444;
      --bg: #f7f8fa;
      --surface: #ffffff;
      --border: #e8eaed;
      --text: #111827;
      --muted: #6b7280;
      --accent: #1a1a2e;
    }

    body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }

    .app { min-height: 100vh; }

    /* ── HEADER ── */
    .header {
      position: sticky; top: 0; z-index: 100;
      background: var(--accent);
      padding: 0 16px;
      box-shadow: 0 2px 12px rgba(0,0,0,.25);
    }
    .header-inner {
      max-width: 1280px; margin: 0 auto;
      display: flex; align-items: center; gap: 12px;
      height: 60px;
    }
    .logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem; color: #fff; white-space: nowrap; }
    .logo span { color: var(--green); }
    .search-wrap { flex: 1; position: relative; }
    .search-input {
      width: 100%; height: 40px; border-radius: 10px;
      border: none; outline: none;
      padding: 0 16px 0 40px;
      font-family: 'DM Sans', sans-serif; font-size: .9rem;
      background: rgba(255,255,255,.12); color: #fff;
      transition: background .2s;
    }
    .search-input::placeholder { color: rgba(255,255,255,.45); }
    .search-input:focus { background: rgba(255,255,255,.2); }
    .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,.5); }
    .cart-btn {
      position: relative; background: var(--green); border: none; cursor: pointer;
      border-radius: 10px; padding: 8px 14px; display: flex; align-items: center; gap: 6px;
      color: #fff; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .85rem;
      transition: transform .15s, background .15s; white-space: nowrap;
    }
    .cart-btn:hover { background: var(--green-dark); transform: translateY(-1px); }
    .cart-badge {
      position: absolute; top: -6px; right: -6px;
      background: var(--yellow); color: var(--accent); border-radius: 50%;
      width: 18px; height: 18px; font-size: .65rem; font-weight: 800;
      display: flex; align-items: center; justify-content: center;
    }

    /* ── LAYOUT ── */
    .main-layout { max-width: 1280px; margin: 0 auto; padding: 0 12px 100px; display: flex; gap: 16px; }

    /* ── SIDEBAR ── */
    .sidebar {
      width: 180px; flex-shrink: 0; padding-top: 16px;
      position: sticky; top: 76px; height: fit-content;
    }
    .sidebar-title { font-family: 'Syne', sans-serif; font-size: .75rem; font-weight: 700; color: var(--muted); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 8px; padding: 0 4px; }
    .cat-btn {
      width: 100%; display: flex; align-items: center; gap: 8px;
      padding: 9px 10px; border-radius: 10px; border: none; cursor: pointer;
      background: transparent; font-family: 'DM Sans', sans-serif; font-size: .85rem;
      color: var(--muted); text-align: left; transition: all .15s; margin-bottom: 2px;
    }
    .cat-btn:hover { background: var(--border); color: var(--text); }
    .cat-btn.active { background: var(--accent); color: #fff; font-weight: 600; }
    .cat-icon { font-size: 1rem; }

    /* ── PRODUCT GRID ── */
    .product-area { flex: 1; padding-top: 16px; min-width: 0; }
    .section-heading { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.15rem; margin-bottom: 14px; }
    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }

    /* ── PRODUCT CARD ── */
    .card {
      background: var(--surface); border-radius: 14px; overflow: hidden;
      border: 1.5px solid var(--border); transition: box-shadow .2s, transform .2s;
      display: flex; flex-direction: column;
    }
    .card:hover { box-shadow: 0 6px 24px rgba(0,0,0,.08); transform: translateY(-2px); }
    .card-img { width: 100%; aspect-ratio: 1; object-fit: cover; background: #f3f4f6; }
    .card-body { padding: 10px 10px 12px; display: flex; flex-direction: column; flex: 1; }
    .card-title { font-weight: 600; font-size: .8rem; line-height: 1.3; margin-bottom: 4px; }
    .card-desc { font-size: .7rem; color: var(--muted); line-height: 1.4; flex: 1; margin-bottom: 8px; }
    .card-price { font-family: 'Syne', sans-serif; font-weight: 700; font-size: .95rem; margin-bottom: 8px; }
    .badge-out { display: inline-block; background: #fee2e2; color: var(--red); font-size: .65rem; font-weight: 600; border-radius: 5px; padding: 2px 6px; margin-bottom: 6px; }
    .badge-low { display: inline-block; background: #fef3c7; color: #92400e; font-size: .65rem; font-weight: 600; border-radius: 5px; padding: 2px 6px; margin-bottom: 6px; }
    
    .add-btn {
      width: 100%; border: none; border-radius: 9px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .8rem;
      padding: 8px 0; transition: all .15s; display: flex; align-items: center; justify-content: center; gap: 4px;
    }
    .add-btn.green { background: #e8fdf0; color: var(--green-dark); border: 1.5px solid #a7f3c8; }
    .add-btn.green:hover { background: var(--green); color: #fff; border-color: var(--green); }
    .add-btn.disabled { background: #f3f4f6; color: #d1d5db; cursor: not-allowed; }
    .qty-ctrl { display: flex; align-items: center; justify-content: space-between; gap: 4px; }
    .qty-btn { width: 28px; height: 28px; border-radius: 7px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 700; }
    .qty-btn.minus { background: #fee2e2; color: var(--red); }
    .qty-btn.plus  { background: #e8fdf0; color: var(--green-dark); }
    .qty-num { font-family: 'Syne', sans-serif; font-weight: 700; font-size: .9rem; min-width: 20px; text-align: center; }

    /* ── FLOATING CART BAR ── */
    .float-bar {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
      padding: 10px 16px 16px;
      background: linear-gradient(to top, rgba(247,248,250,1) 60%, transparent);
      pointer-events: none;
    }
    .float-inner {
      max-width: 600px; margin: 0 auto;
      background: var(--accent); border-radius: 14px;
      padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
      box-shadow: 0 8px 30px rgba(0,0,0,.25);
      pointer-events: all; cursor: pointer;
      transition: transform .2s;
    }
    .float-inner:hover { transform: translateY(-2px); }
    .float-left { display: flex; align-items: center; gap: 10px; }
    .float-count { background: var(--green); color: #fff; border-radius: 8px; padding: 3px 9px; font-size: .8rem; font-weight: 700; }
    .float-label { color: rgba(255,255,255,.8); font-size: .85rem; }
    .float-total { font-family: 'Syne', sans-serif; font-weight: 700; color: #fff; font-size: 1rem; }
    .float-cta { background: var(--green); color: #fff; border: none; border-radius: 9px; padding: 8px 16px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .85rem; cursor: pointer; }

    /* ── MODAL ── */
    .modal-overlay {
      position: fixed; inset: 0; z-index: 300;
      background: rgba(0,0,0,.55); backdrop-filter: blur(4px);
      display: flex; align-items: flex-end; justify-content: center;
      padding: 0;
    }
    @media (min-width: 600px) { .modal-overlay { align-items: center; padding: 20px; } }
    .modal {
      background: var(--surface); width: 100%; max-width: 520px;
      border-radius: 20px 20px 0 0; padding: 20px 20px 32px;
      max-height: 90vh; overflow-y: auto;
      animation: slideUp .25s ease;
    }
    @media (min-width: 600px) { .modal { border-radius: 20px; } }
    @keyframes slideUp { from { transform: translateY(60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
    .modal-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.1rem; }
    .modal-close { background: #f3f4f6; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--muted); }
    
    /* cart items */
    .cart-item { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
    .cart-item-img { width: 50px; height: 50px; border-radius: 9px; object-fit: cover; flex-shrink: 0; }
    .cart-item-info { flex: 1; min-width: 0; }
    .cart-item-name { font-size: .82rem; font-weight: 600; }
    .cart-item-price { font-size: .78rem; color: var(--muted); }
    .cart-total-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0 0; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; }
    
    /* form */
    .form-group { margin-bottom: 14px; }
    .form-label { display: block; font-size: .78rem; font-weight: 600; color: var(--muted); margin-bottom: 5px; text-transform: uppercase; letter-spacing: .05em; }
    .form-input {
      width: 100%; border: 1.5px solid var(--border); border-radius: 10px;
      padding: 10px 12px; font-family: 'DM Sans', sans-serif; font-size: .9rem;
      outline: none; transition: border-color .15s;
    }
    .form-input:focus { border-color: var(--green); }
    .wa-btn {
      width: 100%; padding: 14px; border: none; border-radius: 12px; cursor: pointer;
      background: #25d366; color: #fff;
      font-family: 'Syne', sans-serif; font-weight: 700; font-size: .95rem;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      transition: background .15s, transform .15s;
    }
    .wa-btn:hover { background: #1db954; transform: translateY(-1px); }
    .wa-btn:disabled { background: #9ca3af; cursor: not-allowed; transform: none; }

    /* ── ADMIN ── */
    .admin-wrap { min-height: 100vh; background: #f0f4f8; }
    .admin-header {
      background: var(--accent); padding: 0 20px; height: 56px;
      display: flex; align-items: center; justify-content: space-between;
      position: sticky; top: 0; z-index: 50;
    }
    .admin-logo { font-family: 'Syne', sans-serif; font-weight: 800; color: #fff; font-size: 1rem; }
    .admin-logo span { color: var(--green); }
    .admin-body { max-width: 1100px; margin: 0 auto; padding: 24px 16px; }
    .stat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 24px; }
    .stat-card { background: var(--surface); border-radius: 14px; padding: 16px; border: 1.5px solid var(--border); }
    .stat-label { font-size: .72rem; color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 4px; }
    .stat-value { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.6rem; }
    .stat-value.red { color: var(--red); }
    .stat-value.green { color: var(--green-dark); }
    .stat-value.yellow { color: #d97706; }

    .section-card { background: var(--surface); border-radius: 16px; padding: 20px; border: 1.5px solid var(--border); margin-bottom: 24px; }
    .section-card-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
    
    .admin-form { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    @media (max-width: 600px) { .admin-form { grid-template-columns: 1fr; } }
    .admin-form .full { grid-column: 1 / -1; }
    .btn-primary {
      background: var(--accent); color: #fff; border: none; border-radius: 10px;
      padding: 10px 20px; font-family: 'DM Sans', sans-serif; font-weight: 600;
      font-size: .88rem; cursor: pointer; transition: opacity .15s;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-primary:hover { opacity: .85; }
    .btn-green { background: var(--green); color: #fff; }
    .btn-danger { background: #fee2e2; color: var(--red); border: none; border-radius: 8px; padding: 5px 10px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .78rem; transition: background .15s; display: inline-flex; align-items: center; gap: 4px; }
    .btn-danger:hover { background: var(--red); color: #fff; }
    .btn-edit { background: #eff6ff; color: #2563eb; border: none; border-radius: 8px; padding: 5px 10px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .78rem; transition: background .15s; display: inline-flex; align-items: center; gap: 4px; margin-right: 6px; }
    .btn-edit:hover { background: #2563eb; color: #fff; }

    /* product table */
    .product-table { width: 100%; border-collapse: collapse; }
    .product-table th { font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); padding: 0 8px 10px; text-align: left; border-bottom: 2px solid var(--border); }
    .product-table td { padding: 12px 8px; border-bottom: 1px solid var(--border); font-size: .82rem; vertical-align: middle; }
    .product-table tr:last-child td { border-bottom: none; }
    .product-table tr.low-stock td { background: #fefce8; }
    .product-table tr.out-stock td { background: #fef2f2; }
    .stock-input { width: 70px; border: 1.5px solid var(--border); border-radius: 7px; padding: 4px 8px; font-family: 'DM Sans', sans-serif; font-size: .82rem; outline: none; }
    .stock-input:focus { border-color: var(--green); }
    .tbl-img { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; }
    .low-badge { background: #fef3c7; color: #92400e; border-radius: 5px; padding: 1px 6px; font-size: .65rem; font-weight: 700; display: inline-flex; align-items: center; gap: 3px; }
    .out-badge { background: #fee2e2; color: var(--red); border-radius: 5px; padding: 1px 6px; font-size: .65rem; font-weight: 700; }

    /* login */
    .login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--accent); padding: 20px; }
    .login-card { background: #fff; border-radius: 20px; padding: 36px 28px; width: 100%; max-width: 380px; box-shadow: 0 20px 60px rgba(0,0,0,.3); }
    .login-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem; text-align: center; margin-bottom: 4px; }
    .login-logo span { color: var(--green); }
    .login-sub { text-align: center; color: var(--muted); font-size: .82rem; margin-bottom: 28px; }
    .error-msg { background: #fee2e2; color: var(--red); border-radius: 8px; padding: 9px 12px; font-size: .82rem; margin-bottom: 14px; }

    /* responsive helpers */
    @media (max-width: 768px) {
      .sidebar { display: none; }
      .product-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
      .overflow-x-auto { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    }
    .mobile-cats {
      display: none;
      overflow-x: auto; gap: 8px; padding: 12px 12px 0;
      -webkit-overflow-scrolling: touch;
    }
    @media (max-width: 768px) { .mobile-cats { display: flex; } }
    .mobile-cat-btn {
      flex-shrink: 0; border: 1.5px solid var(--border); background: var(--surface);
      border-radius: 20px; padding: 6px 12px; font-size: .78rem; font-weight: 600;
      cursor: pointer; white-space: nowrap; transition: all .15s;
      font-family: 'DM Sans', sans-serif; color: var(--muted);
    }
    .mobile-cat-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }

    /* tab nav */
    .tab-nav { display: flex; gap: 4px; background: #f0f4f8; border-radius: 10px; padding: 4px; margin-bottom: 20px; }
    .tab-btn { flex: 1; border: none; background: transparent; border-radius: 8px; padding: 8px 12px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: .82rem; cursor: pointer; color: var(--muted); transition: all .15s; }
    .tab-btn.active { background: var(--surface); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,.08); }

    /* empty state */
    .empty-state { text-align: center; padding: 60px 20px; color: var(--muted); }
    .empty-state svg { margin: 0 auto 16px; opacity: .3; display: block; }
    .empty-state h3 { font-family: 'Syne', sans-serif; font-weight: 700; margin-bottom: 6px; color: var(--text); }

    /* success screen */
    .success-icon { width: 64px; height: 64px; background: #e8fdf0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: var(--green-dark); }
    .success-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.2rem; text-align: center; margin-bottom: 6px; }
    .success-sub { text-align: center; color: var(--muted); font-size: .85rem; margin-bottom: 24px; }

    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
  `}</style>
);

// ── PRODUCT CARD ───────────────────────────────────────────────────────────────
function ProductCard({ product, cart, onAdd, onInc, onDec }) {
  const qty = cart[product.id] || 0;
  const outOfStock = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock < 3;

  return (
    <div className="card">
      <img className="card-img" src={product.image} alt={product.title} loading="lazy" />
      <div className="card-body">
        <div className="card-title">{product.title}</div>
        <div className="card-desc">{product.desc}</div>
        <div className="card-price">{fmt(product.price)}</div>
        {outOfStock && <span className="badge-out">Out of Stock</span>}
        {lowStock && <span className="badge-low">Only {product.stock} left!</span>}
        {outOfStock ? (
          <button className="add-btn disabled" disabled>Unavailable</button>
        ) : qty === 0 ? (
          <button className="add-btn green" onClick={() => onAdd(product)}>
            <Icon.Plus /> ADD
          </button>
        ) : (
          <div className="qty-ctrl">
            <button className="qty-btn minus" onClick={() => onDec(product.id)}>
              <Icon.Minus />
            </button>
            <span className="qty-num">{qty}</span>
            <button className="qty-btn plus" onClick={() => onInc(product.id, product.stock)}>
              <Icon.Plus />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CART MODAL ─────────────────────────────────────────────────────────────────
function CartModal({ cart, products, onClose, onUpdate }) {
  const [step, setStep] = useState("cart"); // cart | form | success
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [errors, setErrors] = useState({});

  const cartItems = products.filter((p) => cart[p.id] > 0).map((p) => ({ ...p, qty: cart[p.id] }));
  const total = cartItems.reduce((s, p) => s + p.price * p.qty, 0);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.address.trim()) e.address = "Delivery address is required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `🛒 *New Order – Assam Electronics*`,
      `━━━━━━━━━━━━━━━━━━`,
      `👤 *Customer:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      `📍 *Delivery to:* ${form.address}`,
      ``,
      `*Order Items:*`,
      ...cartItems.map((i) => `  • ${i.title} × ${i.qty}  —  ${fmt(i.price * i.qty)}`),
      ``,
      `💰 *Total: ${fmt(total)}*`,
      ``,
      `_Delivery from: ${SHOP_ADDRESS}_`,
    ];
    return encodeURIComponent(lines.join("\n"));
  };

  const placeOrder = () => {
    if (!validate()) return;
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setStep("success");
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {step === "success" ? (
          <div style={{ paddingTop: 20 }}>
            <div className="success-icon"><Icon.Check /></div>
            <div className="success-title">Order Sent via WhatsApp! 🎉</div>
            <div className="success-sub">Your order has been forwarded to the shop.<br />They'll confirm shortly.</div>
            <button className="wa-btn" onClick={onClose} style={{ background: "var(--accent)" }}>
              Continue Shopping
            </button>
          </div>
        ) : step === "form" ? (
          <>
            <div className="modal-header">
              <button className="modal-close" onClick={() => setStep("cart")} style={{ marginRight: 8 }}>←</button>
              <div className="modal-title">Delivery Details</div>
              <button className="modal-close" onClick={onClose}><Icon.Close /></button>
            </div>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input className="form-input" placeholder="Full name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <p style={{ color: "var(--red)", fontSize: ".75rem", marginTop: 4 }}>{errors.name}</p>}
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" placeholder="10-digit mobile number" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} />
              {errors.phone && <p style={{ color: "var(--red)", fontSize: ".75rem", marginTop: 4 }}>{errors.phone}</p>}
            </div>
            <div className="form-group">
              <label className="form-label">Delivery Address</label>
              <textarea className="form-input" rows={3} placeholder="House/flat no., street, landmark..."
                value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              {errors.address && <p style={{ color: "var(--red)", fontSize: ".75rem", marginTop: 4 }}>{errors.address}</p>}
            </div>
            <div style={{ background: "#f0fdf4", borderRadius: 10, padding: 12, marginBottom: 16, fontSize: ".82rem", color: "#166534" }}>
              📦 Order total: <strong>{fmt(total)}</strong> — Will be confirmed via WhatsApp
            </div>
            <button className="wa-btn" onClick={placeOrder}>
              <Icon.WA /> Place Order on WhatsApp
            </button>
          </>
        ) : (
          <>
            <div className="modal-header">
              <div className="modal-title">Your Cart</div>
              <button className="modal-close" onClick={onClose}><Icon.Close /></button>
            </div>
            {cartItems.length === 0 ? (
              <div className="empty-state" style={{ padding: "40px 0" }}>
                <Icon.Package />
                <h3>Cart is empty</h3>
                <p style={{ fontSize: ".82rem" }}>Add products to get started</p>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img className="cart-item-img" src={item.image} alt={item.title} />
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.title}</div>
                      <div className="cart-item-price">{fmt(item.price)} × {item.qty} = <strong>{fmt(item.price * item.qty)}</strong></div>
                    </div>
                    <div className="qty-ctrl" style={{ gap: 6 }}>
                      <button className="qty-btn minus" onClick={() => onUpdate(item.id, item.qty - 1)}>
                        <Icon.Minus />
                      </button>
                      <span className="qty-num">{item.qty}</span>
                      <button className="qty-btn plus" onClick={() => onUpdate(item.id, item.qty + 1)}>
                        <Icon.Plus />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="cart-total-row">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>
                <button className="wa-btn" style={{ marginTop: 16 }} onClick={() => setStep("form")}>
                  Proceed to Checkout →
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── STOREFRONT ─────────────────────────────────────────────────────────────────
function Storefront({ products, onAdminClick }) {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const filtered = products.filter((p) => {
    const matchCat = activeCat === "all" || p.category === activeCat;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);
  const cartTotal = products.reduce((s, p) => s + (cart[p.id] || 0) * p.price, 0);

  const addToCart = (p) => setCart((c) => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }));
  const incCart = (id, max) => setCart((c) => ({ ...c, [id]: clamp((c[id] || 0) + 1, 1, max) }));
  const decCart = (id) => setCart((c) => {
    const next = (c[id] || 0) - 1;
    if (next <= 0) { const { [id]: _, ...rest } = c; return rest; }
    return { ...c, [id]: next };
  });
  const updateCart = (id, qty) => {
    if (qty <= 0) { setCart((c) => { const { [id]: _, ...rest } = c; return rest; }); }
    else setCart((c) => ({ ...c, [id]: qty }));
  };

  const catLabel = CATEGORIES.find((c) => c.id === activeCat)?.label || "Products";

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">Assam <span>Electronics</span></div>
          <div className="search-wrap">
            <span className="search-icon"><Icon.Search /></span>
            <input className="search-input" placeholder="Search cables, bulbs, batteries..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button className="cart-btn" onClick={() => setShowCart(true)}>
            <Icon.Cart />
            <span style={{ display: "none" }}>Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* Mobile categories */}
      <div className="mobile-cats" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((c) => (
          <button key={c.id} className={`mobile-cat-btn ${activeCat === c.id ? "active" : ""}`}
            onClick={() => setActiveCat(c.id)}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-title">Categories</div>
          {CATEGORIES.map((c) => (
            <button key={c.id} className={`cat-btn ${activeCat === c.id ? "active" : ""}`}
              onClick={() => setActiveCat(c.id)}>
              <span className="cat-icon">{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
          <div style={{ marginTop: 24, padding: "14px 10px", background: "#f0fdf4", borderRadius: 12 }}>
            <div style={{ fontSize: ".72rem", fontWeight: 700, color: "#166534", marginBottom: 4 }}>📍 Shop Address</div>
            <div style={{ fontSize: ".72rem", color: "#166534", lineHeight: 1.4 }}>{SHOP_ADDRESS}</div>
            <a href={`tel:+91${WHATSAPP_NUMBER.slice(2)}`} style={{ display: "block", marginTop: 8, fontSize: ".72rem", fontWeight: 600, color: "#15803d", textDecoration: "none" }}>
              📞 9435422488
            </a>
          </div>
          <button onClick={onAdminClick} style={{ marginTop: 12, width: "100%", background: "transparent", border: "1.5px solid var(--border)", borderRadius: 10, padding: "7px 10px", fontSize: ".72rem", color: "var(--muted)", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
            🔐 Admin Login
          </button>
        </aside>

        {/* Products */}
        <main className="product-area">
          <div className="section-heading">
            {activeCat === "all" ? "🛍️ All Products" : CATEGORIES.find((c) => c.id === activeCat)?.icon + " " + catLabel}
            <span style={{ fontSize: ".8rem", fontWeight: 400, color: "var(--muted)", marginLeft: 8 }}>({filtered.length})</span>
          </div>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <Icon.Package />
              <h3>No products found</h3>
              <p>Try a different search or category</p>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} cart={cart}
                  onAdd={addToCart} onInc={incCart} onDec={decCart} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Float bar */}
      {cartCount > 0 && (
        <div className="float-bar">
          <div className="float-inner" onClick={() => setShowCart(true)}>
            <div className="float-left">
              <span className="float-count">{cartCount} item{cartCount > 1 ? "s" : ""}</span>
              <span className="float-label">View Cart</span>
            </div>
            <span className="float-total">{fmt(cartTotal)}</span>
            <button className="float-cta">Checkout →</button>
          </div>
        </div>
      )}

      {/* Cart modal */}
      {showCart && (
        <CartModal cart={cart} products={products}
          onClose={() => setShowCart(false)}
          onUpdate={updateCart} />
      )}
    </div>
  );
}

// ── ADMIN LOGIN ────────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (user === ADMIN_CREDENTIALS.user && pass === ADMIN_CREDENTIALS.pass) {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">Assam <span>Electronics</span></div>
        <div className="login-sub">Admin Dashboard — Secure Login</div>
        {error && <div className="error-msg">⚠️ {error}</div>}
        <div className="form-group">
          <label className="form-label">Username</label>
          <input className="form-input" placeholder="admin" value={user}
            onChange={(e) => { setUser(e.target.value); setError(""); }} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={pass}
            onChange={(e) => { setPass(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && submit()} />
        </div>
        <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }} onClick={submit}>
          Login to Dashboard
        </button>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: ".75rem", color: "var(--muted)" }}>
          Demo: admin / assam2024
        </p>
      </div>
    </div>
  );
}

// ── ADMIN ADD PRODUCT FORM ─────────────────────────────────────────────────────
function AddProductForm({ onAdd }) {
  const blank = { title: "", desc: "", category: "mobile", price: "", stock: "", image: "" };
  const [form, setForm] = useState(blank);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, image: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const submit = () => {
    if (!form.title || !form.price || !form.stock) return alert("Fill all required fields");
    onAdd({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      image: form.image || `https://placehold.co/300x300/1a1a2e/e2e8f0?text=${encodeURIComponent(form.title.slice(0, 10))}`,
    });
    setForm(blank);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div className="section-card">
      <div className="section-card-title"><Icon.Plus /> Add New Product</div>
      {success && (
        <div style={{ background: "#f0fdf4", color: "#166534", borderRadius: 9, padding: "10px 14px", marginBottom: 14, fontSize: ".84rem", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon.Check /> Product added successfully!
        </div>
      )}
      <div className="admin-form">
        <div>
          <label className="form-label">Product Title *</label>
          <input className="form-input" placeholder="e.g. USB-C Cable 2m" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label className="form-label">Category *</label>
          <select className="form-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="full">
          <label className="form-label">Description</label>
          <input className="form-input" placeholder="Short product description..." value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })} />
        </div>
        <div>
          <label className="form-label">Price (₹) *</label>
          <input className="form-input" type="number" placeholder="0" value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </div>
        <div>
          <label className="form-label">Stock Qty *</label>
          <input className="form-input" type="number" placeholder="0" value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        </div>
        <div className="full">
          <label className="form-label">Product Image</label>
          <input type="file" accept="image/*" ref={fileRef} onChange={handleFile} style={{ display: "none" }} />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn-primary" style={{ padding: "8px 14px" }} onClick={() => fileRef.current.click()}>
              📷 Upload Photo
            </button>
            {form.image && (
              <img src={form.image} alt="preview" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", border: "1.5px solid var(--border)" }} />
            )}
          </div>
        </div>
        <div className="full">
          <button className="btn-primary btn-green" onClick={submit}>
            <Icon.Plus /> Add Product to Inventory
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN DASHBOARD ────────────────────────────────────────────────────────────
function AdminDashboard({ products, onAdd, onUpdate, onDelete, onLogout, onBack }) {
  const [tab, setTab] = useState("inventory");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const totalProducts = products.length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 3).length;
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0);

  const startEdit = (p) => { setEditingId(p.id); setEditData({ title: p.title, price: p.price, stock: p.stock, category: p.category, desc: p.desc }); };
  const saveEdit = (id) => { onUpdate(id, { ...editData, price: Number(editData.price), stock: Number(editData.stock) }); setEditingId(null); };

  return (
    <div className="admin-wrap">
      <header className="admin-header">
        <div className="admin-logo">Assam <span>Electronics</span> — Admin</div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-primary" style={{ padding: "6px 12px", fontSize: ".78rem", background: "rgba(255,255,255,.15)" }} onClick={onBack}>
            🛍️ Storefront
          </button>
          <button className="btn-primary" style={{ padding: "6px 12px", fontSize: ".78rem", background: "rgba(255,255,255,.1)" }} onClick={onLogout}>
            <Icon.Logout /> Logout
          </button>
        </div>
      </header>

      <div className="admin-body">
        {/* Stats */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Total Products</div>
            <div className="stat-value">{totalProducts}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Out of Stock</div>
            <div className="stat-value red">{outOfStock}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Low Stock (&lt;3)</div>
            <div className="stat-value yellow">{lowStock}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Inventory Value</div>
            <div className="stat-value green" style={{ fontSize: "1.1rem" }}>{fmt(totalValue)}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-nav">
          <button className={`tab-btn ${tab === "inventory" ? "active" : ""}`} onClick={() => setTab("inventory")}>📦 Inventory</button>
          <button className={`tab-btn ${tab === "add" ? "active" : ""}`} onClick={() => setTab("add")}>➕ Add Product</button>
        </div>

        {/* Add product */}
        {tab === "add" && <AddProductForm onAdd={(p) => { onAdd(p); setTab("inventory"); }} />}

        {/* Inventory */}
        {tab === "inventory" && (
          <div className="section-card">
            <div className="section-card-title"><Icon.Dashboard /> Inventory Management</div>
            <div className="overflow-x-auto">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    const isEditing = editingId === p.id;
                    const rowClass = p.stock === 0 ? "out-stock" : p.stock < 3 ? "low-stock" : "";
                    return (
                      <tr key={p.id} className={rowClass}>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <img className="tbl-img" src={p.image} alt={p.title} />
                            {isEditing ? (
                              <input className="stock-input" style={{ width: 140 }} value={editData.title}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                            ) : (
                              <span style={{ fontWeight: 600, fontSize: ".82rem" }}>{p.title}</span>
                            )}
                          </div>
                        </td>
                        <td>
                          {isEditing ? (
                            <select className="stock-input" style={{ width: 130 }} value={editData.category}
                              onChange={(e) => setEditData({ ...editData, category: e.target.value })}>
                              {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                                <option key={c.id} value={c.id}>{c.label}</option>
                              ))}
                            </select>
                          ) : (
                            <span style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                              {CATEGORIES.find((c) => c.id === p.category)?.label}
                            </span>
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <input className="stock-input" type="number" value={editData.price}
                              onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
                          ) : (
                            <strong>{fmt(p.price)}</strong>
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <input className="stock-input" type="number" value={editData.stock}
                              onChange={(e) => setEditData({ ...editData, stock: e.target.value })} />
                          ) : (
                            <input className="stock-input" type="number" defaultValue={p.stock}
                              onBlur={(e) => onUpdate(p.id, { stock: Number(e.target.value) })} />
                          )}
                        </td>
                        <td>
                          {p.stock === 0 ? <span className="out-badge">Out of Stock</span>
                            : p.stock < 3 ? <span className="low-badge"><Icon.Warning /> Low Stock</span>
                            : <span style={{ color: "var(--green-dark)", fontSize: ".75rem", fontWeight: 600 }}>✓ In Stock</span>}
                        </td>
                        <td>
                          {isEditing ? (
                            <>
                              <button className="btn-primary btn-green" style={{ padding: "5px 10px", fontSize: ".75rem", marginRight: 6 }} onClick={() => saveEdit(p.id)}>
                                <Icon.Check /> Save
                              </button>
                              <button className="btn-edit" onClick={() => setEditingId(null)}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <button className="btn-edit" onClick={() => startEdit(p)}><Icon.Edit /> Edit</button>
                              <button className="btn-danger" onClick={() => window.confirm(`Delete "${p.title}"?`) && onDelete(p.id)}>
                                <Icon.Trash /> Del
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ROOT APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("store"); // store | adminLogin | admin
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [adminAuth, setAdminAuth] = useState(false);

  return (
    <>
      <GlobalStyles />
      {view === "store" && (
        <Storefront products={products} onAdminClick={() => setView(adminAuth ? "admin" : "adminLogin")} />
      )}
      {view === "adminLogin" && (
        <AdminLogin onLogin={() => { setAdminAuth(true); setView("admin"); }} />
      )}
      {view === "admin" && (
        <AdminDashboard
          products={products}
          onAdd={addProduct}
          onUpdate={updateProduct}
          onDelete={deleteProduct}
          onLogout={() => { setAdminAuth(false); setView("store"); }}
          onBack={() => setView("store")}
        />
      )}
    </>
  );
}

