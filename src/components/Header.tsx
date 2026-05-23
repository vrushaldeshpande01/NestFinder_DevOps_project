import React from 'react';
import { Home, Search, Heart, Receipt, ClipboardList, RefreshCw } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'search' | 'favorites' | 'bookings' | 'host';
  onNavigate: (view: 'home' | 'search' | 'favorites' | 'bookings' | 'host') => void;
  isHostMode: boolean;
  onToggleHostMode: () => void;
}

export default function Header({ currentView, onNavigate, isHostMode, onToggleHostMode }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0A0A0A] h-20 flex justify-between items-center px-6 md:px-12 border-b border-white/15">
      <div className="flex items-center gap-4">
        {/* Hamburger placeholder / branding */}
        <button className="text-white hover:bg-white/10 p-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
        <span 
          onClick={() => onNavigate(isHostMode ? 'host' : 'home')}
          className="text-sm tracking-[0.3em] uppercase font-bold text-white cursor-pointer hover:opacity-80 transition-opacity"
        >
          NEST / FINDER
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Navigation links - hidden on mobile */}
        {!isHostMode ? (
          <nav className="hidden md:flex gap-8 items-center">
            <button 
              onClick={() => onNavigate('home')} 
              className={`text-[11px] uppercase tracking-[0.2em] transition-colors py-2 ${currentView === 'home' || currentView === 'search' ? 'text-white font-bold border-b border-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Search
            </button>
            <button 
              onClick={() => onNavigate('favorites')} 
              className={`text-[11px] uppercase tracking-[0.2em] transition-colors py-2 ${currentView === 'favorites' ? 'text-white font-bold border-b border-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Favorites
            </button>
            <button 
              onClick={() => onNavigate('bookings')} 
              className={`text-[11px] uppercase tracking-[0.2em] transition-colors py-2 ${currentView === 'bookings' ? 'text-white font-bold border-b border-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Bookings
            </button>
          </nav>
        ) : (
          <nav className="hidden md:flex gap-6 items-center">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-white">Host Dashboard</span>
            <span className="text-[9px] font-mono tracking-[0.1em] uppercase text-zinc-300 bg-white/10 px-2 py-0.5 border border-white/25">Sarah Mode</span>
          </nav>
        )}

        {/* Dashboard Switch buttons */}
        <button 
          onClick={onToggleHostMode}
          className="flex items-center gap-1.5 px-4 py-2 border border-white/20 text-[10px] uppercase tracking-[0.2em] font-bold bg-transparent text-white hover:bg-white hover:text-black hover:border-white transition-all rounded-none"
        >
          <RefreshCw size={11} className="animate-spin-slow" />
          <span>{isHostMode ? "Tenant Mode" : "Host Mode"}</span>
        </button>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 p-0.5">
          <img 
            alt="Profile" 
            className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all" 
            src={isHostMode 
              ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBGxHBu_4EzbcjFftm-0vFUi_inkyA306pJ0oMs2GJPii4BFcKCmUcJjs7zuSs4jn44FiuXXDPwRhVlBTGFm-5KTzjhrgsAPaKFO4xIxnYLf0NCjLopKFbw7wCmjITzVsBIupeyo4Bc2YaOMZEHu_7sA9juiHo8HkT_oR9uh28L6I4CpvwiluGdX7AJl_2Quq4ZUU_diDWc_FbR6Jtb_X-_3Fi78iWbeMYMxWTvUhdTrg3dw_qi9mWAdzGVeCo-P2MVaW_iKAqM6MWg" 
              : "https://lh3.googleusercontent.com/aida-public/AB6AXuAWVOkhCz7AMJmNWvQyEYiJeObiZ40wJAFcP_N9GWA70kNDlblxKRaukr3zApKXn7DRz05I33ZO8hLdq4OUZKZsEWbA3OIuxwXIjZpLxayy24MD00noxkQ6Nv1jJIcqz18PjP7wo9-HUVhCK22tzYCrJoNaEyCNNlJ1I1lQThg0TCXCB0eIxuNnp5PXs2zDpbRef64HZgP2bWa_YgLZq9XIMvzCqagfBx871VbuKdnhUjCLvVKXyL-MZjH-IQoc6JNsCXkkGRC-dBDc"
            } 
          />
        </div>
      </div>
    </header>
  );
}
