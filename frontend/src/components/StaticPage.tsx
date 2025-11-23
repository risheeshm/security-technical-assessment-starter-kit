import React from 'react';

interface StaticPageProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const StaticPage: React.FC<StaticPageProps> = ({ title, subtitle, children }) => {
    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">{title}</h1>
                    {subtitle && <p className="mt-4 text-xl text-slate-600">{subtitle}</p>}
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 prose prose-indigo max-w-none">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default StaticPage;
