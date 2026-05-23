import React from 'react';
import { SearchFilters } from '../types';

interface FilterSidebarProps {
  filters: SearchFilters;
  onFiltersChange: (updated: SearchFilters) => void;
  onApplyFilters?: () => void;
}

const AVAILABLE_AMENITIES = ['Wi-Fi', 'Air Conditioning', 'Food Included', 'Gym', 'Laundry', 'Meals', 'Power Backup', 'Daily Housekeeping', 'Parking', 'Transport'];

export default function FilterSidebar({ filters, onFiltersChange, onApplyFilters }: FilterSidebarProps) {
  
  const handleRoomTypeToggle = (type: 'single' | 'double' | 'triple') => {
    const active = filters.roomTypes.includes(type);
    const updatedTypes = active 
      ? filters.roomTypes.filter(t => t !== type)
      : [...filters.roomTypes, type];
    onFiltersChange({ ...filters, roomTypes: updatedTypes });
  };

  const handleAmenityToggle = (amenity: string) => {
    const active = filters.amenities.includes(amenity);
    const updatedAmenities = active
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    onFiltersChange({ ...filters, amenities: updatedAmenities });
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, budget: parseInt(e.target.value) });
  };

  return (
    <aside className="w-full bg-[#121212] p-6 rounded-none border border-white/10 text-white">
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/10">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Filters</h3>
        <button 
          onClick={() => onFiltersChange({
            city: '',
            locality: '',
            roomTypes: [],
            amenities: [],
            budget: 30000,
            category: 'all'
          })}
          className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors underline"
        >
          Reset All
        </button>
      </div>

      {/* Room Type */}
      <div className="mb-6 pb-6 border-b border-white/10">
        <p className="font-bold text-[10px] text-zinc-400 uppercase tracking-[0.2em] mb-4 font-mono">Room Type</p>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input 
              type="checkbox"
              checked={filters.roomTypes.includes('single')}
              onChange={() => handleRoomTypeToggle('single')}
              className="w-4.5 h-4.5 rounded-none border border-white/20 bg-zinc-950 text-white focus:ring-0 cursor-pointer"
            />
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-300 group-hover:text-white transition-colors">
              Single Room
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input 
              type="checkbox"
              checked={filters.roomTypes.includes('double')}
              onChange={() => handleRoomTypeToggle('double')}
              className="w-4.5 h-4.5 rounded-none border border-white/20 bg-zinc-950 text-white focus:ring-0 cursor-pointer"
            />
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-300 group-hover:text-white transition-colors">
              Sharing (Twin)
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <input 
              type="checkbox"
              checked={filters.roomTypes.includes('triple')}
              onChange={() => handleRoomTypeToggle('triple')}
              className="w-4.5 h-4.5 rounded-none border border-white/20 bg-zinc-950 text-white focus:ring-0 cursor-pointer"
            />
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-300 group-hover:text-white transition-colors">
              Triple Sharing
            </span>
          </label>
        </div>
      </div>

      {/* Category Selection */}
      <div className="mb-6 pb-6 border-b border-white/10">
        <p className="font-bold text-[10px] text-zinc-400 uppercase tracking-[0.2em] mb-4 font-mono">Target Profile</p>
        <div className="flex flex-wrap gap-2">
          {(['all', 'student', 'professional', 'luxury'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => onFiltersChange({ ...filters, category: cat })}
              className={`px-3 py-1.5 rounded-none text-[10px] uppercase tracking-wider font-mono font-bold transition-all ${
                filters.category === cat
                  ? 'bg-white text-black border border-white'
                  : 'bg-zinc-950 text-zinc-400 border border-white/10 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities Checkboxes */}
      <div className="mb-6 pb-6 border-b border-white/10">
        <p className="font-bold text-[10px] text-zinc-400 uppercase tracking-[0.2em] mb-4 font-mono">Amenities</p>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-1 scrollbar-none">
          {AVAILABLE_AMENITIES.map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer group select-none">
              <input 
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="w-4.5 h-4.5 rounded-none border border-white/20 bg-zinc-950 text-white focus:ring-0 cursor-pointer"
              />
              <span className="text-xs uppercase font-mono tracking-wider text-zinc-300 group-hover:text-white transition-colors">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget Range Slider */}
      <div className="mb-6">
        <p className="font-bold text-[10px] text-zinc-400 uppercase tracking-[0.2em] mb-4 font-mono">Budget (Monthly)</p>
        <input 
          type="range"
          min="5000"
          max="30000"
          step="1000"
          value={filters.budget}
          onChange={handleBudgetChange}
          className="w-full h-1 bg-zinc-800 rounded-none appearance-none cursor-pointer accent-white"
        />
        <div className="flex justify-between mt-3 text-[10px] font-mono font-semibold text-zinc-500">
          <span>₹5,000</span>
          <span className="text-white font-black">₹{filters.budget.toLocaleString()}</span>
          <span>₹30K+</span>
        </div>
      </div>

      {/* Apply Button */}
      {onApplyFilters && (
        <button 
          onClick={onApplyFilters}
          className="w-full bg-white text-black border border-white py-3 rounded-none font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-[0.98]"
        >
          Apply Filters
        </button>
      )}
    </aside>
  );
}
