import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SystemMonitor() {
    const { token } = useAuth();
    const [envVars, setEnvVars] = useState<any>(null);
    const [routes, setRoutes] = useState<any>(null);
    const [users, setUsers] = useState<any>(null);
    const [analytics, setAnalytics] = useState<any>(null);
    const [analyticsId, setAnalyticsId] = useState('1');

    const fetchEnv = async () => {
        try {
            const response = await fetch('/api/debug/env');
            const data = await response.json();
            setEnvVars(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchRoutes = async () => {
        try {
            const response = await fetch('/api/debug/routes');
            const data = await response.json();
            setRoutes(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const response = await fetch(`/api/analytics/view?id=${analyticsId}`);
            const data = await response.json();
            setAnalytics(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">System Monitor</h1>
                <p className="text-gray-600 mb-8">Administrative tools and system diagnostics</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Configuration</h2>
                        <p className="text-sm text-gray-600 mb-4">View system configuration and environment</p>
                        <button
                            onClick={fetchEnv}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 mb-4 transition-colors"
                        >
                            View Config
                        </button>
                        {envVars && (
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-60 text-xs border border-gray-200">
                                {JSON.stringify(envVars, null, 2)}
                            </pre>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">API Endpoints</h2>
                        <p className="text-sm text-gray-600 mb-4">View registered application routes</p>
                        <button
                            onClick={fetchRoutes}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 mb-4 transition-colors"
                        >
                            View Routes
                        </button>
                        {routes && (
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-60 text-xs border border-gray-200">
                                {JSON.stringify(routes, null, 2)}
                            </pre>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">User Management</h2>
                        <p className="text-sm text-gray-600 mb-4">View registered users</p>
                        <button
                            onClick={fetchUsers}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 mb-4 transition-colors"
                        >
                            Load Users
                        </button>
                        {users && (
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-60 text-xs border border-gray-200">
                                {JSON.stringify(users, null, 2)}
                            </pre>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Analytics Dashboard</h2>
                        <p className="text-sm text-gray-600 mb-4">View user activity analytics</p>
                        <input
                            type="number"
                            value={analyticsId}
                            onChange={(e) => setAnalyticsId(e.target.value)}
                            className="border border-gray-300 p-2 rounded-lg w-full mb-3 focus:ring-2 focus:ring-indigo-500"
                            placeholder="User ID"
                        />
                        <button
                            onClick={fetchAnalytics}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 mb-4 transition-colors"
                        >
                            Load Analytics
                        </button>
                        {analytics && (
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-60 text-xs border border-gray-200">
                                {JSON.stringify(analytics, null, 2)}
                            </pre>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
