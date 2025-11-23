import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateListing: React.FC = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        address: '',
        type: 'sale',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        imageUrl: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    bedrooms: Number(formData.bedrooms),
                    bathrooms: Number(formData.bathrooms),
                    sqft: Number(formData.sqft),
                }),
            });

            if (!response.ok) throw new Error('Failed to create listing');

            navigate('/');
        } catch (err) {
            setError('Failed to create listing. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8">Create New Listing</h1>

                    {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                                <select
                                    name="type"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    <option value="sale">For Sale</option>
                                    <option value="rent">For Rent</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Image URL (optional)</label>
                            <input
                                type="url"
                                name="imageUrl"
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                value={formData.imageUrl}
                                onChange={handleChange}
                            />
                            <p className="mt-1 text-sm text-slate-500">Enter a URL to an image for this property</p>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Bedrooms</label>
                                <input
                                    type="number"
                                    name="bedrooms"
                                    required
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Bathrooms</label>
                                <input
                                    type="number"
                                    name="bathrooms"
                                    required
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Sq Ft</label>
                                <input
                                    type="number"
                                    name="sqft"
                                    required
                                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                                    value={formData.sqft}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium"
                            >
                                Create Listing
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateListing;
