import React, { useState } from 'react';
import { 
  ArrowLeft, Star, MapPin, Wifi, Utensils, Shield, 
  Sparkles, Building, Bookmark, Calendar, Clock, 
  Map, User, CheckCircle, Zap, ShieldCheck, HelpCircle, Phone 
} from 'lucide-react';
import { Property, Booking } from '../types';

interface PGDetailViewProps {
  property: Property;
  onBack: () => void;
  onAddBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
  onStartInquiry: (messageText: string) => void;
}

export default function PGDetailView({ property, onBack, onAddBooking, onStartInquiry }: PGDetailViewProps) {
  
  // States for the Booking visitor scheduler widget
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Custom states to select a preferred sharing price option
  const [selectedSharing, setSelectedSharing] = useState<string>(
    property.sharingPrices ? Object.keys(property.sharingPrices)[0] : 'Single occupancy'
  );

  const getPriceToDisplay = () => {
    if (property.sharingPrices && property.sharingPrices[selectedSharing]) {
      return property.sharingPrices[selectedSharing];
    }
    return property.rent;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitDate || !visitorName || !visitorPhone) return;

    onAddBooking({
      propertyId: property.id,
      propertyName: property.name,
      visitDate,
      visitTime,
      contactName: visitorName,
      contactPhone: visitorPhone
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      // Reset
      setVisitorName('');
      setVisitorPhone('');
      setVisitDate('');
    }, 5000);
  };

  const handleInquireClick = () => {
    // Start inquiry in AI support box
    const textQuery = `Hi, I am interested in ${property.name} located in ${property.location}. Can you tell me what food is served and if curfew is strictly 10 PM?`;
    onStartInquiry(textQuery);
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen pb-32 text-white">
      {/* Banner / Back link header */}
      <div className="bg-zinc-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-5 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-mono text-zinc-300 font-bold hover:text-white select-none"
          >
            <ArrowLeft size={14} />
            <span>Back to PG list</span>
          </button>
          
          <button
            onClick={handleInquireClick}
            className="text-[10px] uppercase tracking-[0.2em] font-mono border border-white/20 hover:border-white/50 bg-black text-white px-3.5 py-1.5 rounded-none flex items-center gap-1 hover:bg-white hover:text-black transition-all font-bold"
          >
            <HelpCircle size={14} />
            <span>Ask AI about details</span>
          </button>
        </div>
      </div>

      {/* Hero Gallery: Bento Grid Style */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[320px] md:h-[480px]">
          {/* Main big bedroom image */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-none border border-white/10 bg-zinc-900">
            <img 
              alt="Plush master room bedroom"
              src={property.image}
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
          </div>

          {/* Top workspace pane */}
          <div className="hidden md:block md:col-span-1 relative group overflow-hidden rounded-none border border-white/10 bg-zinc-900">
            <img 
              alt="Shared workspace zone"
              src={property.gallery[1] || property.image} 
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
          </div>

          {/* Shared Kitchen / dining */}
          <div className="hidden md:block md:col-span-1 relative group overflow-hidden rounded-none border border-white/10 bg-zinc-900">
            <img 
              alt="Sleek common kitchen area"
              src={property.gallery[2] || property.image}
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
          </div>

          {/* Bathroom / sanitary */}
          <div className="hidden md:block md:col-span-2 relative group overflow-hidden rounded-none border border-white/10 bg-zinc-900">
            <img 
              alt="Modern washroom tiles"
              src={property.gallery[3] || property.image}
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Info Heading Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 bg-[#121212] p-6 rounded-none border border-white/10 text-white">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 text-[9px] uppercase font-mono tracking-widest font-bold ${
                property.status === 'Available' ? 'bg-white text-black' : 'bg-zinc-805 text-zinc-300 border border-white/10'
              }`}>
                {property.status}
              </span>
              <span className="bg-zinc-900 text-zinc-300 px-2.5 py-0.5 text-[9px] uppercase font-mono tracking-widest border border-white/10">
                {property.category}
              </span>
              <div className="flex items-center text-white font-mono text-[10px] ml-2">
                <Star size={12} className="fill-white text-white shrink-0 mr-1" />
                <span>{property.rating.toFixed(1)} ({property.reviewsCount} verified reviews)</span>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">
              {property.name}
            </h2>
            
            <div className="flex items-center text-zinc-400 text-xs font-mono uppercase tracking-wider mt-1">
              <MapPin size={14} className="text-zinc-550 shrink-0 mr-1.5" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Pricing Selector dynamically */}
          <div className="flex flex-col items-start md:items-end bg-zinc-950 p-5 border border-white/10 rounded-none min-w-[240px]">
            {property.sharingPrices ? (
              <div className="w-full">
                <span className="text-[9px] text-zinc-405 font-bold uppercase tracking-[0.15em] font-mono block mb-2">Select Housing Option</span>
                <div className="space-y-1.5">
                  {Object.entries(property.sharingPrices).map(([sharingType, val]) => (
                    <button
                      key={sharingType}
                      onClick={() => setSelectedSharing(sharingType)}
                      className={`w-full flex items-center justify-between gap-4 px-3 py-2 rounded-none text-[10px] font-mono uppercase tracking-wider border transition-all ${
                        selectedSharing === sharingType
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-zinc-900 text-zinc-400 border-white/10 hover:bg-zinc-850 hover:text-white'
                      }`}
                    >
                      <span>{sharingType}</span>
                      <span className="font-bold">₹{val.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-left md:text-right">
                <span className="text-[9px] text-zinc-500 font-mono font-bold tracking-[0.2em] block uppercase">Monthly Rent</span>
                <span className="text-2xl md:text-3xl font-black text-white mt-1 block font-mono">
                  ₹{property.rent.toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-450 uppercase tracking-widest font-mono">Utility bills inclusive</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Grid split layout content */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* About description */}
          <div className="bg-[#121212] p-6 md:p-8 rounded-none border border-white/10 text-white">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 pb-3 border-b border-white/10 text-zinc-300">
              About this home
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line text-justify">
              {property.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="bg-[#121212] p-6 md:p-8 rounded-none border border-white/10 text-white">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 pb-3 border-b border-white/10 text-zinc-300">
              Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {property.amenities.map((amenity) => (
                <div 
                  key={amenity}
                  className="flex items-center gap-3 p-3.5 bg-zinc-950 hover:bg-zinc-900 border border-white/10 rounded-none transition-all hover:border-white/30 group"
                >
                  <div className="w-8 h-8 rounded-none bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Wifi size={14} />
                  </div>
                  <span className="text-xs uppercase font-mono tracking-wider text-zinc-300">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Restrictive rules */}
          <div className="bg-[#121212] p-6 md:p-8 rounded-none border border-white/10 text-white">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 pb-3 border-b border-white/10 text-zinc-300">
              House Rules
            </h3>
            <div className="bg-zinc-950 p-6 rounded-none border border-dashed border-white/15">
              <ul className="space-y-4">
                {property.houseRules.map((rule, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="p-2.5 rounded-none bg-white/10 text-zinc-300 shrink-0">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wider text-white font-mono">{rule.title}</p>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{rule.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive simulated maps placeholder */}
          <div className="bg-[#121212] p-6 md:p-8 rounded-none border border-white/10 text-white">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 pb-3 border-b border-white/10 text-zinc-300">
              Location
            </h3>
            <div className="aspect-video w-full rounded-none overflow-hidden bg-zinc-950 relative border border-white/10">
              {/* Simulated Map Visuals */}
              <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center p-3 select-none">
                <Map size={32} className="text-white mb-2 animate-pulse" />
                <span className="font-bold text-xs uppercase tracking-[0.2em] text-white">ARCHIVE MAP LOCATOR</span>
                <span className="text-[10px] text-zinc-405 mt-2 max-w-sm text-center font-mono uppercase tracking-wide">
                  Hinjewadi Infotech, phase 1 area map. Located near key software hubs and popular food courts.
                </span>
                
                {/* Visual Location indicator pin */}
                <div className="absolute top-[48%] left-[45%] bg-black border border-white/30 p-2 rounded-none shadow-lg flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  <span className="text-[9px] uppercase font-mono font-bold text-zinc-300 shrink-0">{property.name}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Booking panel widget */}
        <div className="space-y-6">
          <div className="bg-[#121212] p-6 rounded-none border border-white/10 sticky top-24 text-white">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-2">Interested?</h4>
            <p className="text-xs text-zinc-400 mb-6 font-serif italic">Schedule a personal viewing tour of this living arrangement.</p>
            
            {bookingSuccess ? (
              <div className="bg-white text-black p-5 rounded-none border border-white text-xs text-center space-y-3">
                <CheckCircle className="mx-auto text-black" size={24} />
                <p className="font-bold text-xs uppercase tracking-widest font-mono">Visit Scheduled</p>
                <p>We have received your viewing slot request, Rajiv. Lead helper Sarah will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-zinc-500 uppercase font-mono tracking-widest">Visitor Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-zinc-550" size={14} />
                    <input 
                      type="text"
                      required
                      placeholder="ENTER FULL NAME"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 text-white pl-10 pr-3 py-3 rounded-none text-xs font-mono focus:outline-none focus:border-white uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-zinc-500 uppercase font-mono tracking-widest">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 text-zinc-550" size={14} />
                    <input 
                      type="tel"
                      required
                      placeholder="MOBILE PHONE NUMBER"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 text-white pl-10 pr-3 py-3 rounded-none text-xs font-mono focus:outline-none focus:border-white uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-zinc-500 uppercase font-mono tracking-widest">Select Date</label>
                    <div className="relative">
                      <input 
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 text-white px-3 py-3 rounded-none text-xs font-mono focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-zinc-500 uppercase font-mono tracking-widest">Time Window</label>
                    <select
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 text-white px-3 py-3 rounded-none text-xs font-mono focus:outline-none focus:border-white"
                    >
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>02:00 PM</option>
                      <option>04:00 PM</option>
                      <option>06:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-white text-black border border-white py-3.5 rounded-none font-black text-xs uppercase tracking-widest hover:bg-zinc-205 transition-all active:scale-[0.98]"
                  >
                    Lock Slot &amp; Schedule
                  </button>
                  
                  <button 
                    type="button"
                    onClick={handleInquireClick}
                    className="w-full border border-white/15 text-zinc-300 bg-transparent py-3 rounded-none font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all"
                  >
                    Ask AI about rules
                  </button>
                </div>

              </form>
            )}

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-4">
                <img 
                  alt={property.manager.name} 
                  className="w-10 h-10 rounded-full object-cover filter grayscale" 
                  src={property.manager.image}
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white font-mono">{property.manager.name}</p>
                  <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">{property.manager.role}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Floating Action Bar (Mobile Only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950 border-t border-white/15 px-6 py-4 flex items-center justify-between gap-4 shadow-2xl">
        <div className="flex flex-col">
          <span className="text-zinc-500 text-[10px] uppercase tracking-wider font-mono">Monthly Rent</span>
          <span className="text-white font-black text-lg font-mono">
            ₹{getPriceToDisplay().toLocaleString()}
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={() => {
              const el = document.querySelector('form');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="h-11 px-5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-none active:scale-[0.95] transition-transform"
          >
            Schedule Slot
          </button>
          
          <button 
            type="button"
            onClick={handleInquireClick}
            className="h-11 w-11 flex items-center justify-center border border-white/20 text-white rounded-none active:scale-[0.95] transition-transform bg-transparent"
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}
