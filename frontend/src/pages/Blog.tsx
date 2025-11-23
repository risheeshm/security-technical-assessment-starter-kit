import React from 'react';
import StaticPage from '../components/StaticPage';

const Blog: React.FC = () => {
    return (
        <StaticPage title="Estately Blog" subtitle="Insights, tips, and trends in real estate">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Real Estate Trends" className="w-full h-48 object-cover" />
                    <div className="p-6">
                        <span className="text-xs font-bold text-indigo-600 uppercase">Market Trends</span>
                        <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">5 Real Estate Trends to Watch in 2025</h3>
                        <p className="text-slate-600 mb-4 line-clamp-3">
                            From smart homes to sustainable living, discover the key trends shaping the future of the housing market this year.
                        </p>
                        <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800">Read Article &rarr;</a>
                    </div>
                </div>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Home Buying Tips" className="w-full h-48 object-cover" />
                    <div className="p-6">
                        <span className="text-xs font-bold text-indigo-600 uppercase">Buying Guide</span>
                        <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">First-Time Homebuyer's Checklist</h3>
                        <p className="text-slate-600 mb-4 line-clamp-3">
                            Buying your first home is exciting but can be overwhelming. Use our comprehensive checklist to navigate the process with confidence.
                        </p>
                        <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800">Read Article &rarr;</a>
                    </div>
                </div>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Interior Design" className="w-full h-48 object-cover" />
                    <div className="p-6">
                        <span className="text-xs font-bold text-indigo-600 uppercase">Design</span>
                        <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">Minimalist Interior Design Ideas</h3>
                        <p className="text-slate-600 mb-4 line-clamp-3">
                            Less is more. Learn how to create a serene and stylish living space with these minimalist design principles.
                        </p>
                        <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800">Read Article &rarr;</a>
                    </div>
                </div>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Investment" className="w-full h-48 object-cover" />
                    <div className="p-6">
                        <span className="text-xs font-bold text-indigo-600 uppercase">Investment</span>
                        <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">Is Real Estate Still a Good Investment?</h3>
                        <p className="text-slate-600 mb-4 line-clamp-3">
                            We analyze the current market conditions and historical data to answer the age-old question about real estate investment.
                        </p>
                        <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800">Read Article &rarr;</a>
                    </div>
                </div>
            </div>
        </StaticPage>
    );
};

export default Blog;
