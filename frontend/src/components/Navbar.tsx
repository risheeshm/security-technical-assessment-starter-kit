import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 backdrop-blur-md shadow-md py-4'
                : 'bg-transparent py-6'
                } `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                            </svg>
                            <span>Estately</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/?type=sale" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Buy</Link>
                        <Link to="/?type=rent" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Rent</Link>
                        <Link to="/?type=sale" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Sell</Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-slate-600">Hello, {user.name}</span>
                                <Link to="/create-listing" className="text-indigo-600 font-medium hover:text-indigo-700 px-4 py-2">
                                    Create Listing
                                </Link>
                                <Link to="/settings" className="text-indigo-600 font-medium hover:text-indigo-700 px-4 py-2">
                                    Settings
                                </Link>
                                <Link to="/admin/debug" className="text-indigo-600 font-medium hover:text-indigo-700 px-4 py-2">
                                    System
                                </Link>
                                <button onClick={handleLogout} className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-700 px-4 py-2">
                                    Sign In
                                </Link>
                                <Link to="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-600 hover:text-indigo-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col space-y-4">
                    <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium">Buy</Link>
                    <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium">Rent</Link>
                    <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium">Sell</Link>
                    <hr className="border-slate-100" />
                    {user ? (
                        <>
                            <Link to="/create-listing" className="text-indigo-600 font-medium">Create Listing</Link>
                            <Link to="/settings" className="text-indigo-600 font-medium">Settings</Link>
                            <Link to="/admin/debug" className="text-indigo-600 font-medium">System</Link>
                            <button onClick={handleLogout} className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium text-center">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-indigo-600 font-medium text-left">Sign In</Link>
                            <Link to="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium text-center">Get Started</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
