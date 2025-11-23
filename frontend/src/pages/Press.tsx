import React from 'react';
import StaticPage from '../components/StaticPage';

const Press: React.FC = () => {
    return (
        <StaticPage title="Press" subtitle="Latest news and updates from Estately">
            <div className="space-y-8">
                <article>
                    <span className="text-sm font-bold text-indigo-600 uppercase tracking-wide">November 20, 2024</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-2">Estately Launches AI-Powered Home Recommendations</h3>
                    <p className="text-slate-600">
                        Our new recommendation engine uses advanced machine learning to match buyers with their perfect homes faster than ever before.
                    </p>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium mt-2 inline-block">Read More &rarr;</a>
                </article>
                <article>
                    <span className="text-sm font-bold text-indigo-600 uppercase tracking-wide">October 15, 2024</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-2">Estately Expands to European Markets</h3>
                    <p className="text-slate-600">
                        We are thrilled to announce our expansion into London, Paris, and Berlin, bringing our seamless real estate experience to Europe.
                    </p>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium mt-2 inline-block">Read More &rarr;</a>
                </article>
                <article>
                    <span className="text-sm font-bold text-indigo-600 uppercase tracking-wide">September 1, 2024</span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-2">Series B Funding Announcement</h3>
                    <p className="text-slate-600">
                        Estately has raised $50M in Series B funding led by top-tier venture capital firms to accelerate our growth and product development.
                    </p>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium mt-2 inline-block">Read More &rarr;</a>
                </article>
            </div>
            <div className="mt-12 border-t border-slate-200 pt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Media Inquiries</h3>
                <p>
                    For press inquiries, please contact <a href="mailto:press@estately.com" className="text-indigo-600 hover:underline">press@estately.com</a>.
                </p>
            </div>
        </StaticPage>
    );
};

export default Press;
