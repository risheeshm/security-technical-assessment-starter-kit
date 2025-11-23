import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ListingCard from './components/ListingCard';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ListingDetails from './pages/ListingDetails';
import CreateListing from './pages/CreateListing';
import { ProtectedRoute } from './components/ProtectedRoute';
import About from './pages/About';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Guides from './pages/Guides';
import FAQ from './pages/FAQ';
import HelpCenter from './pages/HelpCenter';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Settings from './pages/Settings';
import SystemMonitor from './pages/SystemMonitor';

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl?: string;
}

function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    let url = '/api/listings';
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (type) params.append('type', type);
    if (params.toString()) url += `? ${params.toString()} `;

    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <>
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Properties</h2>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
            View all properties
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </main>
    </>
  );
}

function App() {
  // VULNERABILITY: DOM XSS (VULN-027)
  // Using location.hash to render content directly into the DOM
  React.useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const messageDiv = document.getElementById('welcome-message');
      if (messageDiv) {
        messageDiv.innerHTML = decodeURIComponent(hash);
      }
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
          <div id="welcome-message" className="text-center py-2 bg-indigo-100 text-indigo-800"></div>
          {/* VULNERABILITY: Information Disclosure (VULN-049) - Sensitive comment in production build */}
          {/* TODO: Remove hardcoded API key before production: sk_test_1234567890 */}
          {/* VULNERABILITY: Source Code Comments (VULN-063) - Another secret */}
          {/* AWS_SECRET_KEY=AKIAIOSFODNN7EXAMPLE */}

          {/* VULNERABILITY: CSS Injection (VULN-062) - User controlled style injection */}
          <style dangerouslySetInnerHTML={{ __html: `body { background-color: ${new URLSearchParams(window.location.search).get('theme') || '#f8fafc'}; }` }} />

          <Navbar />

          {/* VULNERABILITY: Client-Side Logic Bypass (VULN-061) - Admin button hidden by CSS only */}
          <div style={{ display: 'none' }} className="admin-panel">
            <button onClick={() => alert('Admin Action Executed!')}>Delete Database</button>
          </div>

          {/* VULNERABILITY: Reverse Tabnabbing (VULN-060) - target="_blank" without noopener */}
          <a href="http://malicious-site.com" target="_blank">External Link</a>

          {/* VULNERABILITY: Sensitive Data in LocalStorage (VULN-059) */}
          {/* Simulating storing JWT in localStorage (done in AuthContext usually, but noting here) */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/listings/:id" element={<ListingDetails />} />
            <Route path="/create-listing" element={
              <ProtectedRoute>
                <CreateListing />
              </ProtectedRoute>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/admin/debug" element={
              <ProtectedRoute>
                <SystemMonitor />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
