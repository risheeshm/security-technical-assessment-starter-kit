import React from 'react';
import StaticPage from '../components/StaticPage';

const Guides: React.FC = () => {
    return (
        <StaticPage title="Real Estate Guides" subtitle="Expert advice for every step of your journey">
            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Buying a Home</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-2">The Ultimate Buyer's Guide</h3>
                            <p className="text-slate-600 text-sm mb-4">Everything you need to know from pre-approval to closing.</p>
                            <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">Read Guide &rarr;</a>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-2">Understanding Mortgages</h3>
                            <p className="text-slate-600 text-sm mb-4">Fixed vs. adjustable, rates, and terms explained simply.</p>
                            <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">Read Guide &rarr;</a>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-2">Making an Offer</h3>
                            <p className="text-slate-600 text-sm mb-4">Strategies to get your offer accepted in a competitive market.</p>
                            <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">Read Guide &rarr;</a>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Selling a Home</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-2">Seller's Handbook</h3>
                            <p className="text-slate-600 text-sm mb-4">Maximize your home's value and sell faster.</p>
                            <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">Read Guide &rarr;</a>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-2">Staging 101</h3>
                            <p className="text-slate-600 text-sm mb-4">Tips and tricks to make your home look its best.</p>
                            <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">Read Guide &rarr;</a>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-2">Closing Costs for Sellers</h3>
                            <p className="text-slate-600 text-sm mb-4">What to expect and how to prepare financially.</p>
                            <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">Read Guide &rarr;</a>
                        </div>
                    </div>
                </section>
            </div>
        </StaticPage>
    );
};

export default Guides;
