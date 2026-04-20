import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, User, Package, CreditCard, LayoutDashboard } from 'lucide-react';

/* --- PLACHOLDER COMPONENTS --- 
   In a larger app, these would be in their own files (e.g. src/pages/Home.jsx) */

const Home = () => (
  <div className="animate-fade-in">
    <div className="page-header" style={{ textAlign: 'center', margin: '4rem 0' }}>
      <h1 className="page-title" style={{ fontSize: '3.5rem', background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Next-Gen E-Commerce
      </h1>
      <p className="page-desc" style={{ maxWidth: '600px', margin: '1rem auto 2rem' }}>
        Experience the future of online shopping with our lightning-fast, microservices powered platform.
      </p>
      <Link to="/products" className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
        Explore Products
      </Link>
    </div>
  </div>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => {
         setProducts(Array.isArray(data) ? data : []);
         setLoading(false);
      })
      .catch(err => {
         console.error('Failed to fetch products', err);
         setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader-container"><div className="spinner"></div></div>;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <p className="page-desc">Browse our premium collection.</p>
      </div>
      <div className="product-grid">
        {products.map(p => (
          <div key={p._id || p.id} className="card">
            <div className="product-image-container">
              <span style={{ fontSize: '5rem' }}>{p.image || '📦'}</span>
            </div>
            <h3>{p.name}</h3>
            <div className="product-price">${p.price?.toFixed(2)}</div>
            <button className="btn btn-primary" style={{ width: '100%' }}>
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Cart = () => (
  <div className="animate-fade-in">
    <div className="page-header">
      <h1 className="page-title">Shopping Cart</h1>
    </div>
    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span style={{ fontSize: '3rem' }}>🎧</span>
        <div>
          <h3>Neural Headset Alpha</h3>
          <p className="text-muted">Quantity: 1</p>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <h3 className="product-price" style={{ margin: 0 }}>$299.99</h3>
      </div>
    </div>
    <div style={{ marginTop: '2rem', textAlign: 'right' }}>
      <Link to="/checkout" className="btn btn-primary">Proceed to Checkout <CreditCard size={16} /></Link>
    </div>
  </div>
);

const Checkout = () => (
  <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
    <div className="page-header text-center">
      <h1 className="page-title">Checkout</h1>
    </div>
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem' }}>Payment Details</h2>
      <div className="input-group">
        <label className="input-label">Cardholder Name</label>
        <input type="text" className="input-field" placeholder="John Doe" />
      </div>
      <div className="input-group">
        <label className="input-label">Card Number</label>
        <input type="text" className="input-field" placeholder="**** **** **** ****" />
      </div>
      <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
        Pay $299.99
      </button>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="animate-fade-in">
    <div className="page-header">
      <h1 className="page-title">User Dashboard</h1>
      <p className="page-desc">Manage your orders and profile.</p>
    </div>
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={30} />
        </div>
        <div>
          <h2>John Doe</h2>
          <p style={{ color: 'var(--text-muted)' }}>john.doe@example.com</p>
        </div>
      </div>
      <hr style={{ borderColor: 'var(--border-color)', margin: '1.5rem 0' }} />
      <h3>Recent Orders</h3>
      <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-hover)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontWeight: 600 }}>Order #ORD-10924</span>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Placed 2 days ago</p>
        </div>
        <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, height: 'fit-content' }}>Delivered</span>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/" className="nav-brand">NexusCart</Link>
          <div className="nav-links">
            <Link to="/products" className="nav-link"><Package size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/> Products</Link>
            <Link to="/cart" className="nav-link"><ShoppingCart size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/> Cart </Link>
            <Link to="/dashboard" className="nav-link"><LayoutDashboard size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }}/> Dashboard </Link>
            <button className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Login</button>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
