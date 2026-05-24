"use client";
import { useState, useMemo, useRef } from "react";

// ─── PRODUCT DATA ─────────────────────────────────────────────────────────────
const INITIAL_PRODUCTS = [
  { id: 1,  name: "USB-C Fast Charger 65W",         category: "Mobile Accessories", price: 599,   originalPrice: 999,   stock: 25, unit: "piece",   emoji: "🔌", tag: "Bestseller", image: null },
  { id: 2,  name: "Tempered Glass Screen Guard",     category: "Mobile Accessories", price: 149,   originalPrice: 299,   stock: 50, unit: "piece",   emoji: "📱", tag: "Popular",    image: null },
  { id: 3,  name: "Braided Lightning Cable 2m",      category: "Mobile Accessories", price: 349,   originalPrice: 599,   stock: 30, unit: "piece",   emoji: "🔗", tag: null,         image: null },
  { id: 4,  name: "Wireless Earbuds TWS",            category: "Mobile Accessories", price: 1299,  originalPrice: 2499,  stock: 15, unit: "piece",   emoji: "🎧", tag: "Hot Deal",   image: null },
  { id: 5,  name: "Phone Stand Adjustable",          category: "Mobile Accessories", price: 249,   originalPrice: 399,   stock: 40, unit: "piece",   emoji: "📲", tag: null,         image: null },
  { id: 6,  name: "Power Bank 20000mAh",             category: "Mobile Accessories", price: 1599,  originalPrice: 2799,  stock: 12, unit: "piece",   emoji: "🔋", tag: "Bestseller", image: null },
  { id: 7,  name: "Redmi 13C 128GB",                category: "Smartphones",        price: 10499, originalPrice: 11999, stock: 8,  unit: "piece",   emoji: "📲", tag: "New",        image: null },
  { id: 8,  name: "Realme C65 6GB RAM",             category: "Smartphones",        price: 12999, originalPrice: 14999, stock: 5,  unit: "piece",   emoji: "📱", tag: "Hot Deal",   image: null },
  { id: 9,  name: "Samsung Galaxy A15",             category: "Smartphones",        price: 15999, originalPrice: 18999, stock: 6,  unit: "piece",   emoji: "📱", tag: null,         image: null },
  { id: 10, name: "Ceiling Fan 48 inch",            category: "Home Appliances",    price: 1899,  originalPrice: 2999,  stock: 10, unit: "piece",   emoji: "🌀", tag: "Popular",    image: null },
  { id: 11, name: "LED Bulb 9W (Pack of 4)",        category: "Home Appliances",    price: 299,   originalPrice: 499,   stock: 60, unit: "pack",    emoji: "💡", tag: null,         image: null },
  { id: 12, name: "Extension Board 6 Socket",       category: "Home Appliances",    price: 449,   originalPrice: 699,   stock: 20, unit: "piece",   emoji: "🔌", tag: null,         image: null },
  { id: 13, name: "Table Fan 3-Speed",              category: "Home Appliances",    price: 1299,  originalPrice: 1999,  stock: 7,  unit: "piece",   emoji: "💨", tag: "Bestseller", image: null },
  { id: 14, name: "MCB Switch 32A",                 category: "Electrical Goods",   price: 199,   originalPrice: 349,   stock: 35, unit: "piece",   emoji: "⚡", tag: null,         image: null },
  { id: 15, name: "Wire 1.5mm (10m Roll)",          category: "Electrical Goods",   price: 349,   originalPrice: 499,   stock: 25, unit: "roll",    emoji: "🔌", tag: null,         image: null },
  { id: 16, name: "Socket & Switch Board",          category: "Electrical Goods",   price: 179,   originalPrice: 299,   stock: 45, unit: "piece",   emoji: "🔲", tag: "Popular",    image: null },
  { id: 17, name: "Screen Replacement (Any Phone)", category: "Repair Services",    price: 799,   originalPrice: 1499,  stock: 99, unit: "service", emoji: "🛠️", tag: "Quick Fix",  image: null },
  { id: 18, name: "Battery Replacement",            category: "Repair Services",    price: 499,   originalPrice: 899,   stock: 99, unit: "service", emoji: "🔋", tag: "Quick Fix",  image: null },
  { id: 19, name: "Water Damage Repair",            category: "Repair Services",    price: 999,   originalPrice: 1999,  stock: 99, unit: "service", emoji: "💧", tag: null,         image: null },
  { id: 20, name: "Charging Port Repair",           category: "Repair Services",    price: 399,   originalPrice: 699,   stock: 99, unit: "service", emoji: "🔧", tag: "Popular",    image: null },
];

const CATEGORIES = ["All", "Mobile Accessories", "Smartphones", "Home Appliances", "Electrical Goods", "Repair Services"];
const CATEGORY_ICONS = { "All": "🛍️", "Mobile Accessories": "🎧", "Smartphones": "📱", "Home Appliances": "🏠", "Electrical Goods": "⚡", "Repair Services": "🛠️" };
const WHATSAPP_NUMBER = "919435422488";
const ADMIN_PASSWORD = "assm2024"; // Change this to your own password

export default function Home() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [formError, setFormError] = useState("");

  // Admin state
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminTab, setAdminTab] = useState("photos"); // "photos" | "stock" | "add"
  const [newProduct, setNewProduct] = useState({ name: "", category: "Mobile Accessories", price: "", originalPrice: "", stock: "", unit: "piece", emoji: "📦", tag: "" });
  const fileInputRef = useRef({});

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Cart helpers
  const addToCart = (product) => {
    if (product.stock === 0) return;
    setCart((prev) => ({ ...prev, [product.id]: Math.min((prev[product.id] || 0) + 1, product.stock) }));
  };
  const removeFromCart = (product) => {
    setCart((prev) => {
      const qty = (prev[product.id] || 0) - 1;
      if (qty <= 0) { const next = { ...prev }; delete next[product.id]; return next; }
      return { ...prev, [product.id]: qty };
    });
  };
  const cartItems = Object.entries(cart).map(([id, qty]) => ({ ...products.find((p) => p.id === parseInt(id)), qty }));
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // WhatsApp checkout
  const handlePlaceOrder = () => {
    if (!form.name.trim() || !form.address.trim() || !form.phone.trim()) { setFormError("Please fill all fields to continue."); return; }
    setFormError("");
    const itemLines = cartItems.map((item) => `• ${item.emoji} ${item.name} x${item.qty} = ₹${(item.price * item.qty).toLocaleString()}`).join("\n");
    const message = `🛒 *New Order from ASSM Electronics*\n\n👤 *Name:* ${form.name}\n📞 *Phone:* ${form.phone}\n📍 *Address:* ${form.address}\n\n*Order Details:*\n${itemLines}\n\n💰 *Total: ₹${cartTotal.toLocaleString()}*\n\n_Order placed via ASSM Electronics website_`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Admin login
  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) { setShowAdmin(true); setShowAdminLogin(false); setAdminError(""); setAdminPassword(""); }
    else { setAdminError("Wrong password. Try again."); }
  };

  // Upload photo for a product
  const handlePhotoUpload = (productId, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setProducts((prev) => prev.map((p) => p.id === productId ? { ...p, image: e.target.result } : p));
    };
    reader.readAsDataURL(file);
  };

  // Update stock
  const handleStockUpdate = (productId, newStock) => {
    setProducts((prev) => prev.map((p) => p.id === productId ? { ...p, stock: Math.max(0, parseInt(newStock) || 0) } : p));
  };

  // Update price
  const handlePriceUpdate = (productId, newPrice) => {
    setProducts((prev) => prev.map((p) => p.id === productId ? { ...p, price: Math.max(0, parseInt(newPrice) || 0) } : p));
  };

  // Add new product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    const id = Math.max(...products.map(p => p.id)) + 1;
    setProducts((prev) => [...prev, { ...newProduct, id, price: parseInt(newProduct.price), originalPrice: parseInt(newProduct.originalPrice) || parseInt(newProduct.price), stock: parseInt(newProduct.stock), tag: newProduct.tag || null, image: null }]);
    setNewProduct({ name: "", category: "Mobile Accessories", price: "", originalPrice: "", stock: "", unit: "piece", emoji: "📦", tag: "" });
  };

  // Remove photo
  const handleRemovePhoto = (productId) => {
    setProducts((prev) => prev.map((p) => p.id === productId ? { ...p, image: null } : p));
  };

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#f5f6fa", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f5f6fa; }
        .add-btn:active { transform: scale(0.95); }
        .product-card { transition: box-shadow 0.2s ease; }
        .product-card:hover { box-shadow: 0 8px 24px rgba(15,76,129,0.15); }
        .slide-up { animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        input:focus { border-color: #0f4c81 !important; }
        .admin-tab { transition: all 0.2s; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{ background: "linear-gradient(135deg, #0f4c81 0%, #1a6ab3 100%)", padding: "14px 16px 10px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(15,76,129,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 20, letterSpacing: -0.5 }}>⚡ ASSM Electronics</div>
            <div style={{ color: "#a8d4f5", fontSize: 11, fontWeight: 600 }}>📍 Assam · Fast Delivery</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setShowAdminLogin(true)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "7px 11px", cursor: "pointer", color: "#fff", fontSize: 18 }}>⚙️</button>
            <button onClick={() => setShowCart(true)} style={{ background: cartCount > 0 ? "#f9a825" : "rgba(255,255,255,0.15)", border: "none", borderRadius: 12, padding: "8px 14px", cursor: "pointer", color: cartCount > 0 ? "#000" : "#fff", fontWeight: 800, fontSize: 14 }}>
              🛒 {cartCount > 0 ? `₹${cartTotal.toLocaleString()}` : "Cart"}
            </button>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
          <input type="text" placeholder="Search for electronics, cables, repair..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: "100%", padding: "10px 12px 10px 38px", borderRadius: 10, border: "none", fontSize: 14, background: "rgba(255,255,255,0.95)", fontFamily: "inherit", outline: "none", fontWeight: 600, color: "#1a1a2e" }} />
        </div>
      </header>

      {/* ── CATEGORIES ── */}
      <div style={{ overflowX: "auto", padding: "12px 12px 4px", display: "flex", gap: 8, scrollbarWidth: "none" }}>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ whiteSpace: "nowrap", padding: "7px 14px", borderRadius: 20, border: "none", cursor: "pointer", background: selectedCategory === cat ? "#0f4c81" : "#fff", color: selectedCategory === cat ? "#fff" : "#444", fontWeight: 700, fontSize: 13, fontFamily: "inherit", boxShadow: selectedCategory === cat ? "0 3px 10px rgba(15,76,129,0.3)" : "0 1px 4px rgba(0,0,0,0.1)" }}>
            {CATEGORY_ICONS[cat]} {cat}
          </button>
        ))}
      </div>

      {/* ── BANNER ── */}
      <div style={{ margin: "8px 12px", borderRadius: 14, background: "linear-gradient(135deg, #0f4c81, #e53935)", padding: "14px 18px", color: "#fff" }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>⚡ Free Delivery in Assam</div>
        <div style={{ fontSize: 12, opacity: 0.9, marginTop: 2 }}>On orders above ₹500 · Repairs done same day</div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div style={{ padding: "8px 12px 100px" }}>
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
            <div style={{ fontSize: 40 }}>🔍</div>
            <div style={{ fontWeight: 700, marginTop: 8 }}>No products found</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {filteredProducts.map((product) => {
              const qty = cart[product.id] || 0;
              const outOfStock = product.stock === 0;
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              return (
                <div key={product.id} className="product-card" style={{ background: "#fff", borderRadius: 14, padding: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.07)", display: "flex", flexDirection: "column", gap: 6, position: "relative", overflow: "hidden" }}>
                  {product.tag && (
                    <div style={{ position: "absolute", top: 8, left: 8, background: product.tag === "Hot Deal" ? "#e53935" : product.tag === "New" ? "#00897b" : "#f9a825", color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 6, zIndex: 1 }}>{product.tag}</div>
                  )}

                  {/* Product Image or Emoji */}
                  <div style={{ background: "linear-gradient(135deg, #e3f0ff, #f0f4ff)", borderRadius: 10, height: 100, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginTop: product.tag ? 14 : 0 }}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: 44 }}>{product.emoji}</span>
                    )}
                  </div>

                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3 }}>{product.name}</div>
                  <div style={{ fontSize: 11, color: outOfStock ? "#e53935" : "#888", fontWeight: outOfStock ? 700 : 400 }}>
                    {outOfStock ? "Out of Stock" : `${product.stock} ${product.unit}s left`}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontWeight: 900, fontSize: 15, color: "#0f4c81" }}>₹{product.price.toLocaleString()}</span>
                    <span style={{ fontSize: 11, color: "#aaa", textDecoration: "line-through" }}>₹{product.originalPrice.toLocaleString()}</span>
                    <span style={{ fontSize: 10, color: "#00897b", fontWeight: 800 }}>{discount}% off</span>
                  </div>

                  {outOfStock ? (
                    <div style={{ background: "#f5f5f5", borderRadius: 8, padding: "8px", textAlign: "center", fontSize: 12, color: "#999", fontWeight: 700 }}>Notify Me</div>
                  ) : qty === 0 ? (
                    <button className="add-btn" onClick={() => addToCart(product)} style={{ background: "#0f4c81", color: "#fff", border: "none", borderRadius: 8, padding: "8px", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>ADD +</button>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0f4c81", borderRadius: 8, overflow: "hidden" }}>
                      <button onClick={() => removeFromCart(product)} style={{ background: "none", border: "none", color: "#fff", padding: "8px 14px", fontSize: 18, cursor: "pointer", fontWeight: 900 }}>−</button>
                      <span style={{ color: "#fff", fontWeight: 900, fontSize: 14 }}>{qty}</span>
                      <button onClick={() => addToCart(product)} style={{ background: "none", border: "none", color: "#fff", padding: "8px 14px", fontSize: 18, cursor: "pointer", fontWeight: 900 }}>+</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── FLOATING CART ── */}
      {cartCount > 0 && !showCart && (
        <div onClick={() => setShowCart(true)} style={{ position: "fixed", bottom: 16, left: 12, right: 12, zIndex: 200, background: "linear-gradient(135deg, #0f4c81, #1a6ab3)", borderRadius: 14, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", boxShadow: "0 4px 20px rgba(15,76,129,0.4)" }}>
          <div style={{ color: "#fff", fontWeight: 800 }}>🛒 {cartCount} item{cartCount > 1 ? "s" : ""} in cart</div>
          <div style={{ color: "#f9a825", fontWeight: 900, fontSize: 16 }}>₹{cartTotal.toLocaleString()} →</div>
        </div>
      )}

      {/* ── CART DRAWER ── */}
      {showCart && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.5)" }} onClick={() => setShowCart(false)}>
          <div className="slide-up" onClick={(e) => e.stopPropagation()} style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderRadius: "20px 20px 0 0", maxHeight: "80vh", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 900, fontSize: 18, color: "#0f4c81" }}>🛒 Your Cart</div>
              <button onClick={() => setShowCart(false)} style={{ background: "#f5f5f5", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>✕ Close</button>
            </div>
            <div style={{ overflowY: "auto", flex: 1, padding: "12px 16px" }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#888" }}><div style={{ fontSize: 40 }}>🛒</div><div style={{ fontWeight: 700, marginTop: 8 }}>Cart is empty</div></div>
              ) : cartItems.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.image ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 22 }}>{item.emoji}</span>}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: "#666" }}>₹{item.price.toLocaleString()} each</div>
                    </div>
           
