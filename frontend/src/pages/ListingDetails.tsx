import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Listing {
    id: number;
    title: string;
    description: string;
    price: number;
    address: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    imageUrl?: string;
}

const ListingDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);
    const [couponCode, setCouponCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
    const [buyMessage, setBuyMessage] = useState('');

    useEffect(() => {
        fetch(`/api/listings/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setListing(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching listing:', err);
                setLoading(false);
            });
    }, [id]);

    // VULN-063: Coupon Stacking
    const applyCoupon = async () => {
        try {
            const response = await fetch('/api/shop/apply-coupon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: couponCode,
                    currentPrice: discountedPrice || listing?.price || 0
                })
            });
            const data = await response.json();
            setDiscountedPrice(data.newPrice);
        } catch (error) {
            console.error('Error applying coupon:', error);
        }
    };

    // VULN-033: Negative Pricing
    const buyNow = async () => {
        const price = discountedPrice || listing?.price || 0;
        try {
            const response = await fetch('/api/listings/buy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: listing?.id, price })
            });
            const data = await response.json();
            setBuyMessage(data.message + ` Charged: $${data.charged}`);
        } catch (error) {
            setBuyMessage('Error purchasing');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Listing not found</h2>
                    <Link to="/" className="mt-4 text-indigo-600 hover:text-indigo-500">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8 mt-4 font-medium transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Listings
                </Link>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="relative h-96 md:h-[32rem]">
                        <img
                            src={listing.imageUrl || `https://images.unsplash.com/photo-1600596542815-2a4d9fbea40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-6 right-6">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg backdrop-blur-md ${listing.type === 'sale'
                                ? 'bg-emerald-500/90 text-white'
                                : 'bg-indigo-500/90 text-white'
                                }`}>
                                {listing.type === 'sale' ? 'For Sale' : 'For Rent'}
                            </span>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">{listing.title}</h1>
                                <p className="text-slate-600 mt-2 text-lg">{listing.address}</p>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                    ${discountedPrice !== null ? discountedPrice.toFixed(2) : listing.price.toLocaleString()}
                                    {listing.type === 'rent' && '/month'}
                                    {discountedPrice !== null && (
                                        <span className="ml-2 text-sm text-green-600">
                                            (Discounted from ${listing.price.toLocaleString()})
                                        </span>
                                    )}
                                </h3>

                                {/* Coupon Application */}
                                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm font-semibold text-green-800 mb-2">
                                        💰 Have a promo code?
                                    </p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Enter promo code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <button
                                            onClick={applyCoupon}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                {/* Buy Button */}
                                <div className="mt-4">
                                    <button
                                        onClick={buyNow}
                                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg"
                                    >
                                        {listing.type === 'sale' ? 'Buy Now' : 'Rent Now'}
                                    </button>
                                    {buyMessage && (
                                        <div className="mt-2 p-2 bg-blue-50 text-blue-800 rounded text-sm border border-blue-200">
                                            {buyMessage}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-8 border-y border-slate-200 py-6">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-slate-900">{listing.bedrooms}</span>
                                <span className="text-slate-500">Bedrooms</span>
                            </div>
                            <div className="text-center border-x border-slate-200">
                                <span className="block text-2xl font-bold text-slate-900">{listing.bathrooms}</span>
                                <span className="text-slate-500">Bathrooms</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-slate-900">{listing.sqft}</span>
                                <span className="text-slate-500">Sq Ft</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
                            {/* VULNERABILITY: Stored XSS - Rendering HTML directly from user input */}
                            <div className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: listing.description }} />
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-200">
                            <button className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                                Contact Agent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetails;
