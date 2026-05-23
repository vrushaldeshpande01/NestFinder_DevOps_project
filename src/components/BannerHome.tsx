import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface BannerHomeProps {
  onSearch: (cityOrLocality: string) => void;
}

export default function BannerHome({ onSearch }: BannerHomeProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const selectSuggestedCity = (city: string) => {
    setInputValue(city);
    onSearch(city);
  };

  return (
    <section className="relative h-[580px] flex items-center justify-center overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 z-0">
        <img 
          alt="Modern Nest Background"
          className="w-full h-full object-cover opacity-35 filter grayscale scale-102" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm-J4Hqb0xzs_itjbvcksDp7GoIBADN_IqTsxlyfz2zZhaIGk4MjkH49JGzm3Z-ar7D7dqwPVwTJj5HODhlLGOdbW0_2ENUgViI3775Qus71iB4zFKC2zQXleBH9N_UEqkOZRwNR6cvNVlPVj8ujyCS37I_FC2E9nuWJe9V-3yom7MJ8uCZ6ho4RsnnAjj3-sZmqJPeTN1Dpt4Cmar7o-_a9WQ3L29_ymEGYJXZgLt1kNKLGaHuwCWSKT5SegY3f8uzQAsxLasvyml"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-4xl px-8 text-center flex flex-col items-center">
        <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-zinc-500 mb-4 block">Archive / Vol. 12</span>
        
        <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase leading-[0.9] text-white">
          CO-LIVING<br/>ARCHIVE
        </h2>
        
        <p className="mt-2 mb-10 text-zinc-400 font-serif italic text-lg max-w-lg">
          A study in rhythmic minimalism and luxurious shared spaces.
        </p>
        
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-zinc-900/90 border border-white/15 p-3 shadow-2xl flex flex-col md:flex-row gap-3 backdrop-blur-md rounded-none mb-6"
        >
          <div className="flex-1 flex items-center px-4 py-3 bg-zinc-950 border border-white/10 rounded-none gap-3">
            <MapPin className="text-zinc-500 shrink-0" size={16} />
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="ENTER CITY OR NEIGHBORHOOD (E.G. BANGALORE, PUNE)"
              className="bg-transparent border-none focus:outline-none w-full text-white font-mono tracking-wider placeholder-zinc-650 text-xs focus:ring-0 uppercase"
            />
          </div>
          
          <button 
            type="submit"
            className="bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-widest font-black px-8 py-4 rounded-none transition-all active:scale-98 shrink-0 border border-white"
          >
            Find space
          </button>
        </form>

        <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] uppercase tracking-widest text-zinc-400">
          <span className="font-bold text-zinc-650">Select Destination:</span>
          {['Bangalore', 'Pune', 'Gurgaon'].map((city) => (
            <button
              key={city}
              onClick={() => selectSuggestedCity(city)}
              className="hover:text-white transition-colors border-b border-transparent hover:border-white/50 pb-0.5 font-bold"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
