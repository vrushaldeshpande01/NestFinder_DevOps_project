import React from 'react';
import { Heart, Star, MapPin, Wifi, Utensils, Shield, Sparkles, Building, Truck } from 'lucide-react';
import { Property } from '../types';

interface PGCardProps {
  key?: string | number;
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
  onViewDetails: (id: string) => void;
}

export default function PGCard({ property, isFavorite, onToggleFavorite, onViewDetails }: PGCardProps) {
  
  // Render specific monoline mini indicators
  const getFeatureIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wi-fi':
      case 'free wi-fi':
      case 'high-speed wi-fi':
        return <Wifi size={14} className="text-[#006565]" />;
      case 'meals':
      case 'food':
      case 'restaurant':
      case 'meals included':
        return <Utensils size={14} className="text-[#006565]" />;
      case 'cctv':
      case 'cctv security':
        return <Shield size={14} className="text-[#006565]" />;
      case 'transport':
        return <Truck size={14} className="text-[#006565]" />;
      default:
        return <Building size={14} className="text-[#006565]" />;
    }
  };

  return (
    <div 
      onClick={() => onViewDetails(property.id)}
      className="group bg-[#121212] rounded-none overflow-hidden hover:border-white/40 transition-all duration-300 border border-white/10 flex flex-col justify-between h-auto cursor-pointer"
    >
      <div>
        {/* Gallery Image Box */}
        <div className="relative h-56 overflow-hidden bg-zinc-950 border-b border-white/10">
          <img 
            alt={property.name}
            src={property.image}
            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
          />
          
          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold font-mono ${
              property.status === 'Available'
                ? 'bg-white text-black border border-white' 
                : 'bg-zinc-800 text-zinc-300 border border-white/10'
            }`}>
              {property.status}
            </span>
          </div>

          {/* Favorite button */}
          <button 
            type="button"
            onClick={(e) => onToggleFavorite(e, property.id)}
            className="absolute top-4 right-4 bg-black/60 border border-white/10 p-2 rounded-none text-zinc-400 hover:text-white hover:border-white/30 transition-all shadow-md"
          >
            <Heart 
              size={15} 
              className={`transition-colors ${isFavorite ? 'fill-[#FF3B30] text-[#FF3B30]' : 'text-zinc-300'}`} 
            />
          </button>
        </div>

        {/* Content details block */}
        <div className="p-5 flex flex-col">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-md md:text-lg font-bold text-white tracking-tight uppercase group-hover:text-zinc-300 transition-colors leading-tight">
              {property.name}
            </h3>
            <div className="flex items-center gap-1 text-white font-mono text-[10px] bg-white/10 px-2 py-0.5 border border-white/10 select-none">
              <Star size={11} className="fill-white text-white" />
              <span>{property.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 mb-4 flex items-start gap-1 font-mono uppercase tracking-wider">
            <MapPin size={12} className="text-zinc-500 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{property.locality || property.city}</span>
          </p>

          {/* Core Mini list elements */}
          <div className="flex flex-wrap gap-2 mb-4">
            {property.amenities.slice(0, 3).map((amenity) => (
              <span 
                key={amenity}
                className="bg-zinc-950 px-2.5 py-1 text-[10px] text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-1.5 border border-white/10"
              >
                <span className="opacity-70">
                  {getFeatureIcon(amenity)}
                </span>
                <span>{amenity}</span>
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="bg-transparent px-2 py-1 text-[9px] text-zinc-500 font-mono border border-white/10 border-dashed">
                +{property.amenities.length - 3} MORE
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing and booking CTA */}
      <div className="p-5 pt-0 border-t border-white/10 flex items-center justify-between mt-auto">
        <div className="pt-4">
          <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold font-mono">Starts from</p>
          <p className="text-lg font-black text-white mt-0.5 font-mono">
            ₹{property.rent.toLocaleString()}
            <span className="text-[10px] text-zinc-500 font-normal tracking-wide"> /mo</span>
          </p>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(property.id);
          }}
          className="bg-white hover:bg-zinc-200 text-black text-[10px] px-4 py-2.5 rounded-none font-black uppercase tracking-widest transition-all mt-4"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
