import React from 'react';
import { Link } from 'react-router-dom';

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

interface ListingCardProps {
    listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
    return (
        <Link to={`/listings/${listing.id}`} className="block h-full">
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={listing.imageUrl || `https://source.unsplash.com/random/800x600/?house,apartment&sig=${listing.id}`}
                        alt={listing.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                    />
                    <div className="absolute top-4 right-4">
                        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </button>
                    </div>
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${listing.type === 'sale'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-indigo-500 text-white'
                            }`}>
                            {listing.type === 'sale' ? 'For Sale' : 'For Rent'}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{listing.title}</h3>
                        <p className="text-lg font-bold text-indigo-600 whitespace-nowrap">
                            ${Number(listing.price).toLocaleString()}
                            {listing.type === 'rent' && <span className="text-sm text-slate-500 font-normal">/mo</span>}
                        </p>
                    </div>

                    <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {listing.address}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-bold">{listing.bedrooms}</span>
                            <span className="text-xs text-slate-500">Beds</span>
                        </div>
                        <div className="flex flex-col border-l border-slate-100">
                            <span className="text-slate-900 font-bold">{listing.bathrooms}</span>
                            <span className="text-xs text-slate-500">Baths</span>
                        </div>
                        <div className="flex flex-col border-l border-slate-100">
                            <span className="text-slate-900 font-bold">{listing.sqft}</span>
                            <span className="text-xs text-slate-500">Sqft</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ListingCard;
