import React from 'react';
import StaticPage from '../components/StaticPage';

const Careers: React.FC = () => {
    return (
        <StaticPage title="Careers at Estately" subtitle="Join us in building the future of real estate">
            <p>
                We're looking for big thinkers, problem solvers, and innovators to join our growing team. If you're passionate about technology and real estate, we want to hear from you.
            </p>
            <h3>Open Positions</h3>
            <div className="space-y-6 mt-8">
                <div className="border-b border-slate-200 pb-6">
                    <h4 className="text-xl font-bold text-slate-900">Senior Full Stack Engineer</h4>
                    <p className="text-slate-600">Remote • Engineering</p>
                    <button className="mt-2 text-indigo-600 font-medium hover:text-indigo-800">View Details &rarr;</button>
                </div>
                <div className="border-b border-slate-200 pb-6">
                    <h4 className="text-xl font-bold text-slate-900">Product Designer</h4>
                    <p className="text-slate-600">New York, NY • Design</p>
                    <button className="mt-2 text-indigo-600 font-medium hover:text-indigo-800">View Details &rarr;</button>
                </div>
                <div className="border-b border-slate-200 pb-6">
                    <h4 className="text-xl font-bold text-slate-900">Real Estate Market Analyst</h4>
                    <p className="text-slate-600">Los Angeles, CA • Data</p>
                    <button className="mt-2 text-indigo-600 font-medium hover:text-indigo-800">View Details &rarr;</button>
                </div>
            </div>
            <div className="mt-8 p-6 bg-indigo-50 rounded-xl">
                <h4 className="text-lg font-bold text-indigo-900">Don't see your role?</h4>
                <p className="text-indigo-700">
                    We're always looking for talent. Send your resume to <a href="mailto:careers@estately.com" className="underline">careers@estately.com</a>.
                </p>
            </div>
        </StaticPage>
    );
};

export default Careers;
