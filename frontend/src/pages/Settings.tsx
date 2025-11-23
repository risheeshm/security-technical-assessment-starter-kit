import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
    const { token } = useAuth();
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [customSettings, setCustomSettings] = useState('');
    const [message, setMessage] = useState('');

    const handleChangePassword = async () => {
        try {
            await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword: password }),
                credentials: 'include'
            });
            setMessage('Password changed successfully!');
        } catch (error) {
            setMessage('Error changing password');
        }
    };

    const handleUpdateProfile = async () => {
        try {
            await fetch('/api/users/settings', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: role })
            });
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage('Error updating profile');
        }
    };

    const handleUpdateSettings = async () => {
        try {
            const settings = JSON.parse(customSettings);
            await fetch('/api/users/settings', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(settings)
            });
            setMessage('Settings updated successfully!');
        } catch (error) {
            setMessage('Error: ' + (error as Error).message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

                {message && (
                    <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                        {message}
                    </div>
                )}

                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Security</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Update your password to keep your account secure
                    </p>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleChangePassword}
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Update Password
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Preferences</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Manage your account type and permissions
                    </p>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Type
                    </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="user">Standard User</option>
                        <option value="agent">Agent</option>
                        <option value="admin">Administrator</option>
                    </select>
                    <button
                        onClick={handleUpdateProfile}
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Save Preferences
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Advanced Settings</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Advanced configuration options (JSON format)
                    </p>
                    <textarea
                        placeholder='{"theme": "dark", "notifications": true}'
                        value={customSettings}
                        onChange={(e) => setCustomSettings(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg w-full mb-3 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={5}
                    />
                    <button
                        onClick={handleUpdateSettings}
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Apply Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
