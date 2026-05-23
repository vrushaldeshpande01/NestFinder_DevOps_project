import React, { useState, useMemo } from 'react';
import { initialProperties } from './propertiesData';
import { Property, SearchFilters, Booking } from './types';
import Header from './components/Header';
import BannerHome from './components/BannerHome';
import CategoriesBento from './components/CategoriesBento';
import FilterSidebar from './components/FilterSidebar';
import PGCard from './components/PGCard';
import PGDetailView from './components/PGDetailView';
import HostDashboard from './components/HostDashboard';
import ChatFAB from './components/ChatFAB';
import { Heart, Calendar, Search, MapPin, Smile, ArrowRight } from 'lucide-react';

export default function App() {
  // Core state engines
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [favorites, setFavorites] = useState<string[]>(['narayan-pg-2', 'urban-retreat']);
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'favorites' | 'bookings' | 'host'>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isHostMode, setIsHostMode] = useState<boolean>(false);
  const [startInquiryText, setStartInquiryText] = useState<string>('');

  // Search and Advanced Filters
  const [filters, setFilters] = useState<SearchFilters>({
    city: '',
    locality: '',
    roomTypes: [],
    amenities: [],
    budget: 30000,
    category: 'all'
  });

  // Pre-seed a realistic scheduled booking context
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'bk-seeded',
      propertyId: 'narayan-pg-2',
      propertyName: 'Narayan PG 2',
      visitDate: '2026-06-12',
      visitTime: '11:00 AM',
      contactName: 'Rajiv Sharma',
      contactPhone: '9876543210',
      status: 'Scheduled'
    }
  ]);

  // Navigate utility
  const handleNavigate = (view: 'home' | 'search' | 'favorites' | 'bookings' | 'host') => {
    setSelectedPropertyId(null);
    setCurrentView(view);
  };

  // Switch modes dynamically
  const handleToggleHostMode = () => {
    const nextMode = !isHostMode;
    setIsHostMode(nextMode);
    setSelectedPropertyId(null);
    if (nextMode) {
      setCurrentView('host');
    } else {
      setCurrentView('home');
    }
  };

  // Toggle favorite property
  const handleToggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter(fId => fId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle Home Screen search inputs
  const handleHomeSearch = (query: string) => {
    // Determine if it matches any city specifically
    const cityMap: { [key: string]: string } = {
      'bangalore': 'Bangalore',
      'bengaluru': 'Bangalore',
      'pune': 'Pune',
      'gurgaon': 'Gurgaon'
    };
    
    const key = query.toLowerCase().trim();
    if (cityMap[key]) {
      setFilters(prev => ({ ...prev, city: cityMap[key], locality: '' }));
    } else {
      // Otherwise consider it locality search
      setFilters(prev => ({ ...prev, locality: query, city: '' }));
    }
    setCurrentView('search');
    setSelectedPropertyId(null);
  };

  // Handle homepage bento category clicks
  const handleCategorySelect = (category: 'student' | 'professional' | 'luxury') => {
    setFilters(prev => ({ ...prev, category }));
    setCurrentView('search');
    setSelectedPropertyId(null);
  };

  // Landlord action additions
  const handleAddListedProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
  };

  // Landlord action deletions
  const handleDeleteListedProperty = (id: string) => {
    setProperties((prev) => prev.filter(p => p.id !== id));
  };

  // Tenant scheduling bookings
  const handleAddBooking = (newBookingData: Omit<Booking, 'id' | 'status'>) => {
    const added: Booking = {
      ...newBookingData,
      id: 'bk-' + Date.now(),
      status: 'Scheduled'
    };
    setBookings((prev) => [added, ...prev]);
  };

  // Cancel dynamic visit
  const handleCancelBooking = (id: string) => {
    setBookings((prev) => prev.map(bk => bk.id === id ? { ...bk, status: 'Cancelled' as const } : bk));
  };

  // Inquiry triggers
  const handleStartInquiry = (text: string) => {
    setStartInquiryText(text);
  };

  // Computed properties matching filters
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Check City/Locality
      if (filters.city && p.city !== filters.city) return false;
      if (filters.locality && !p.location.toLowerCase().includes(filters.locality.toLowerCase())) return false;
      
      // Check Budget limits
      if (p.rent > filters.budget) return false;

      // Check Category target profiles
      if (filters.category !== 'all' && p.category !== filters.category) return false;

      // Check Room types
      if (filters.roomTypes.length > 0) {
        const hasMatch = p.roomTypes.some(t => filters.roomTypes.includes(t));
        if (!hasMatch) return false;
      }

      // Check Specific Amenities
      if (filters.amenities.length > 0) {
        const hasAllFeatures = filters.amenities.every(amenity => 
          p.amenities.some(item => item.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    });
  }, [properties, filters]);

  // Selected details property
  const selectedProperty = useMemo(() => {
    if (!selectedPropertyId) return null;
    return properties.find(p => p.id === selectedPropertyId) || null;
  }, [properties, selectedPropertyId]);

  return (
    <div className="bg-[#0A0A0A] min-h-screen font-sans select-none text-white flex flex-col justify-between">
      
      {/* Persistant navigation header */}
      <Header 
        currentView={currentView}
        onNavigate={handleNavigate}
        isHostMode={isHostMode}
        onToggleHostMode={handleToggleHostMode}
      />

      <main className="flex-1 pt-16">
        {selectedProperty ? (
          <PGDetailView 
            property={selectedProperty}
            onBack={() => {
              setSelectedPropertyId(null);
              // Avoid clearing filters so they remain on search
            }}
            onAddBooking={handleAddBooking}
            onStartInquiry={handleStartInquiry}
          />
        ) : (
          <>
            {/* View: Home Screen */}
            {currentView === 'home' && (
              <div className="animate-fade-in">
                <BannerHome onSearch={handleHomeSearch} />
                <CategoriesBento onSelectCategory={handleCategorySelect} />
                
                {/* Handpicked Best PGs section */}
                <section className="max-w-7xl mx-auto px-6 py-12">
                  <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                        Recommended Spaces
                      </h2>
                      <p className="text-zinc-400 text-xs mt-1">
                        High ranking co-living locations selected by reviews on NestFinder
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleNavigate('search')}
                      className="hidden md:flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-white hover:opacity-80"
                    >
                      <span>Explore all rooms</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Standard cards list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.slice(0, 3).map((p) => (
                      <PGCard 
                        key={p.id}
                        property={p}
                        isFavorite={favorites.includes(p.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onViewDetails={(id) => setSelectedPropertyId(id)}
                      />
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* View: Advanced searched results */}
            {currentView === 'search' && (
              <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Filters column (left) */}
                <div className="lg:col-span-1">
                  <FilterSidebar 
                    filters={filters}
                    onFiltersChange={setFilters}
                  />
                </div>

                {/* Grid items list (right) */}
                <div className="lg:col-span-3 space-y-6">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121212] p-5 rounded-none border border-white/10">
                    <div>
                      <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white flex items-center gap-2">
                        <Search size={14} className="text-white" />
                        <span>Room Search Listings</span>
                      </h3>
                      <p className="text-[10px] text-zinc-400 mt-0.5">
                        Showing {filteredProperties.length} active listings matching current requirements
                      </p>
                    </div>

                    {/* Quick location state buttons */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-zinc-500 font-bold font-mono uppercase tracking-wider mr-1 text-[10px]">City:</span>
                      {['All', 'Bangalore', 'Pune', 'Gurgaon'].map((city) => (
                        <button
                          key={city}
                          onClick={() => setFilters(prev => ({ ...prev, city: city === 'All' ? '' : city }))}
                          className={`px-3 py-1.5 rounded-none font-mono text-[10px] uppercase tracking-wider transition-all border ${
                            (city === 'All' && !filters.city) || filters.city === city
                              ? 'bg-white text-black border-white'
                              : 'bg-zinc-950 text-zinc-400 border-white/10 hover:bg-zinc-900 hover:text-white'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>

                  {filteredProperties.length === 0 ? (
                    <div className="bg-[#121212] p-12 text-center rounded-none border border-dashed border-white/15 space-y-4">
                      <Search size={32} className="mx-auto text-zinc-500 animate-pulse" />
                      <p className="font-bold text-xs uppercase tracking-widest font-mono text-white">No matching PGs found</p>
                      <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                        We don't list rooms with those exact specifications. Try relaxing your budget limits or clearing customized room attributes.
                      </p>
                      <button 
                        onClick={() => setFilters({
                          city: '',
                          locality: '',
                          roomTypes: [],
                          amenities: [],
                          budget: 30000,
                          category: 'all'
                        })}
                        className="bg-white text-black text-xs px-5 py-3 rounded-none font-black uppercase tracking-widest border border-white"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProperties.map((p) => (
                        <PGCard 
                          key={p.id}
                          property={p}
                          isFavorite={favorites.includes(p.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onViewDetails={(id) => setSelectedPropertyId(id)}
                        />
                      ))}
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* View: User Favorites */}
            {currentView === 'favorites' && (
              <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in min-h-[500px]">
                <div className="mb-8 border-b border-white/10 pb-4">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2">
                    <Heart size={16} className="text-white fill-white" />
                    <span>My Favorites</span>
                  </h2>
                  <p className="text-zinc-400 text-xs mt-1">Your pinned listings and co-living choices</p>
                </div>

                {favorites.length === 0 ? (
                  <div className="bg-[#121212] p-12 text-center rounded-none border border-dashed border-white/15 max-w-md mx-auto space-y-4">
                    <Heart size={28} className="text-zinc-500 mx-auto animate-pulse" />
                    <p className="font-bold text-xs uppercase tracking-widest font-mono text-white">No favorites pinned yet</p>
                    <p className="text-xs text-zinc-400">Click the heart badge on any card to access rooms from here.</p>
                    <button 
                      onClick={() => handleNavigate('search')}
                      className="bg-white text-black text-xs px-5 py-3 rounded-none font-black uppercase tracking-widest"
                    >
                      Browse Accommodation
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties
                      .filter(p => favorites.includes(p.id))
                      .map((p) => (
                        <PGCard 
                          key={p.id}
                          property={p}
                          isFavorite={true}
                          onToggleFavorite={handleToggleFavorite}
                          onViewDetails={(id) => setSelectedPropertyId(id)}
                        />
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* View: User Visited Schedule Bookings */}
            {currentView === 'bookings' && (
              <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in min-h-[500px]">
                <div className="mb-8 border-b border-white/10 pb-4">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2">
                    <Calendar size={16} className="text-white" />
                    <span>My Bookings</span>
                  </h2>
                  <p className="text-zinc-400 text-xs mt-1">Visits and inquiry history sorted by timing</p>
                </div>

                {bookings.length === 0 ? (
                  <div className="bg-[#121212] p-12 text-center rounded-none border border-dashed border-white/15 max-w-sm mx-auto space-y-4">
                    <Calendar size={28} className="text-zinc-500 mx-auto" />
                    <p className="font-bold text-xs uppercase tracking-widest font-mono text-white">No schedules set</p>
                    <p className="text-xs text-zinc-400">Schedule visits to explore the co-living properties personally.</p>
                  </div>
                ) : (
                  <div className="bg-[#121212] rounded-none border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse font-mono">
                        <thead>
                          <tr className="bg-zinc-950 border-b border-white/10 text-zinc-400 text-[10px] font-bold tracking-widest uppercase">
                            <th className="p-4 pl-6">Property Name</th>
                            <th className="p-4">Visitor/Tenant</th>
                            <th className="p-4">Visit Date</th>
                            <th className="p-4">Time Window</th>
                            <th className="p-4">Meeting Status</th>
                            <th className="p-4 pr-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 font-medium">
                          {bookings.map((bk) => (
                            <tr key={bk.id} className="hover:bg-zinc-900/40 transition-colors">
                              <td className="p-4 pl-6 font-bold text-white uppercase">{bk.propertyName}</td>
                              <td className="p-4">
                                <p className="text-white text-xs uppercase">{bk.contactName}</p>
                                <p className="text-zinc-455 text-[9px] font-mono">{bk.contactPhone}</p>
                              </td>
                              <td className="p-4 text-xs font-semibold text-zinc-300">{bk.visitDate}</td>
                              <td className="p-4 text-xs text-zinc-400">{bk.visitTime}</td>
                              <td className="p-4">
                                <span className={`px-2.5 py-0.5 rounded-none text-[9px] uppercase font-mono tracking-wider inline-block ${
                                  bk.status === 'Scheduled' 
                                    ? 'bg-white text-black' 
                                    : 'bg-zinc-800 text-zinc-400 border border-white/10'
                                }`}>
                                  {bk.status}
                                </span>
                              </td>
                              <td className="p-4 pr-6 text-right">
                                {bk.status === 'Scheduled' && (
                                  <button
                                    onClick={() => handleCancelBooking(bk.id)}
                                    className="text-xs text-[#FF3B30] hover:underline uppercase tracking-widest text-[10px] font-bold"
                                  >
                                    Cancel Visit
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* View: Host Landlord Dashboard (Sarah D'souza) */}
            {currentView === 'host' && (
              <div className="animate-fade-in">
                <HostDashboard 
                  properties={properties.filter(p => p.manager.name === "Sarah D'souza")}
                  onAddProperty={handleAddListedProperty}
                  onDeleteProperty={handleDeleteListedProperty}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Persistent footer */}
      <footer className="bg-zinc-950 border-t border-white/10 py-12 text-center text-xs text-zinc-405 mt-20 select-none">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p className="font-bold text-white text-xs uppercase tracking-[0.28em] font-mono">NESTFINDER PREMIUM ARCHIVE</p>
          <p className="font-serif italic text-zinc-400">Find &amp; request high-end room rentals in Bangalore, Gurgaon, and Pune on the fly.</p>
          <p className="text-[9px] text-zinc-500 pt-3 font-mono">© 2026 NESTFINDER. ALL LICENSING RECORDS STRICTLY CO-RELATED.</p>
        </div>
      </footer>

      {/* Floating support chatbot widget */}
      <ChatFAB 
        onStartInquiryText={startInquiryText}
        onClearInquiryText={() => setStartInquiryText('')}
      />

    </div>
  );
}
