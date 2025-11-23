import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <div className="relative bg-slate-900 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    className="h-full w-full object-cover opacity-30"
                    src="https://images.unsplash.com/photo-1600596542815-2a4d9fbea40d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="Modern home interior"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                    <span className="block">Find your dream home</span>
                    <span className="block text-indigo-400">without the hassle</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-slate-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Explore the best properties in your area. From cozy apartments to luxury estates, we have something for everyone.
                </p>

                <div className="mt-10 max-w-xl mx-auto">
                    <form onSubmit={handleSearch} className="bg-white p-2 rounded-full shadow-xl flex items-center">
                        <div className="flex-grow px-4">
                            <input
                                type="text"
                                placeholder="Search by location, property type..."
                                className="w-full focus:outline-none text-slate-700 placeholder-slate-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="bg-indigo-600 text-white rounded-full px-8 py-3 font-medium hover:bg-indigo-700 transition-colors">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Hero;
