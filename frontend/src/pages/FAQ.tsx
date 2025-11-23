import React from 'react';
import StaticPage from '../components/StaticPage';

const FAQ: React.FC = () => {
    return (
        <StaticPage title="Frequently Asked Questions" subtitle="Common questions about Estately">
            <div className="space-y-6">
                <details className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 open:ring-2 open:ring-indigo-100">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className="text-lg font-bold text-slate-900">How do I list my property?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <p className="text-slate-600 mt-3 group-open:animate-fadeIn">
                        To list your property, simply create an account, click on "Sell" or "Create Listing" in the navigation bar, and follow the step-by-step instructions. You'll need to provide details about your property and upload photos.
                    </p>
                </details>
                <details className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 open:ring-2 open:ring-indigo-100">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className="text-lg font-bold text-slate-900">Is Estately free to use?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <p className="text-slate-600 mt-3 group-open:animate-fadeIn">
                        Yes, browsing listings and contacting agents is completely free for buyers and renters. Sellers may be subject to listing fees depending on the service package selected.
                    </p>
                </details>
                <details className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 open:ring-2 open:ring-indigo-100">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className="text-lg font-bold text-slate-900">How do I contact an agent?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <p className="text-slate-600 mt-3 group-open:animate-fadeIn">
                        On every listing page, you'll find a contact form or button to reach out to the listing agent directly. You can also find agent contact information in our agent directory.
                    </p>
                </details>
                <details className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 open:ring-2 open:ring-indigo-100">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className="text-lg font-bold text-slate-900">Can I save listings I like?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <p className="text-slate-600 mt-3 group-open:animate-fadeIn">
                        Absolutely! Once you create a free account, you can save listings to your favorites list by clicking the heart icon on any listing card.
                    </p>
                </details>
            </div>
        </StaticPage>
    );
};

export default FAQ;
