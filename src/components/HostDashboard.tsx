import React, { useState } from 'react';
import { 
  Building, Plus, Users, IndianRupee, TrendingUp, Sparkles, 
  MessageSquare, Edit, Trash2, X, PlusCircle, LayoutGrid, CheckCircle, MapPin 
} from 'lucide-react';
import { Property } from '../types';

interface HostDashboardProps {
  properties: Property[];
  onAddProperty: (newProperty: Property) => void;
  onDeleteProperty: (id: string) => void;
}

export default function HostDashboard({ properties, onAddProperty, onDeleteProperty }: HostDashboardProps) {
  
  // States for custom new properties form
  const [modalOpen, setModalOpen] = useState(false);
  const [newPropName, setNewPropName] = useState('');
  const [newPropCity, setNewPropCity] = useState('Bangalore');
  const [newPropLocality, setNewPropLocality] = useState('');
  const [newPropRent, setNewPropRent] = useState('');
  const [newPropCategory, setNewPropCategory] = useState<'student' | 'professional' | 'luxury'>('student');
  const [newPropDesc, setNewPropDesc] = useState('');
  const [newPropStatus, setNewPropStatus] = useState<'Available' | 'Limited' | 'Full'>('Available');
  const [isSuccess, setIsSuccess] = useState(false);

  // Hardcoded initial metrics mirroring original design
  const occupancyRate = '85%';
  const monthlyRevenue = '₹1,24,000';
  const activeInquiries = 12;

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPropName || !newPropLocality || !newPropRent) return;

    // Hotlink generic beautiful default rooms based on the chosen category
    const defaultImagesByCat = {
      student: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmU78Ri8aiWQmVetERvs1YYH0sLS-jarlXIHoMBmSr8zGrTnKr_dCsPp9C65P9uFehNKr1jFdPFEHVJgpTS6BHuhJFh3UMjHNnAytyDqCCOwQzbbR2C-fU1BXZOS95238Txpe_Xm5z1i1qtNT_va6t2eQxnu6Kp3C5n62qzKbENuFImmi2mRIRBwZpyDeNt7G2LThDFBCp5iKcepCYiM7AbZK26M0ORiMGhHdE0XgeAk3YTBQAy8eccCX9LDJwOizHV5wapgacUNPI',
      professional: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYmn9l7-a5ECsxBpQPH6z8UULjeXtCwQRkn1tD6RqdB7u09vRUKAFqvfI21g-LsWh3uEFqbYs3Yu-M8x2X5qvNcOKSsXxv1sWI1RanC2GlkwtmM-LyE7olCavddd9ugyW6ZqF0jSG0Vx5UG3majqLntOzG0QI0Sr5CCg_-ZMl58_mdJ51e3ijzGG5-s_1-1xhq5SdImloARYpUlU_vnjJ4RnDVkIzLmuXINnrrDhHHbj0zJkr_ZrAsonqobZgXADUqdSlKXDR6j94o',
      luxury: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0vDQCCXT6kcUfx2FJ7TwSUlLIcBum7Jc11krN19mBDUtNbVCE3ySFXdy7eXxRMREgJdmW2XVD6T2knMQX8M2zeg9mPkyrhp1ox4WfnBrgu6ljveEnJ7MpC7RfiMg_RC8L1rwm_MyOFD01iXRw8k7ntHCgdNQ4wi_Wneph6LeztK-5TFMK3hsj-Omq437wbyqgy1zUFyWVvpv4V5PqT_lplnE0VpNMteg_ByzL1kjmcLu2B78Vq50GwcNhLlOoNks9r7e-fpeN7BEP'
    };

    const added: Property = {
      id: 'added-' + Date.now(),
      name: newPropName,
      location: `${newPropLocality}, ${newPropCity}`,
      locality: newPropLocality,
      city: newPropCity,
      rating: 4.8,
      reviewsCount: 1,
      rent: parseInt(newPropRent),
      image: defaultImagesByCat[newPropCategory],
      status: newPropStatus,
      category: newPropCategory,
      roomTypes: ['single', 'double'],
      amenities: ['Wi-Fi', 'AC', 'CCTV Security', 'Meals', 'Power Backup'],
      description: newPropDesc || 'A gorgeous, newly added PG listed near popular student and IT corporate zones.',
      houseRules: [
        { title: 'No Smoking', desc: 'Smoking is strictly prohibited inside the rooms.', icon: 'smoke_free' },
        { title: '10 PM Curfew', desc: 'Curfew strictly set at 10 PM.', icon: 'schedule' }
      ],
      manager: {
        name: 'Sarah D\'souza',
        role: 'Hosting Manager',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGxHBu_4EzbcjFftm-0vFUi_inkyA306pJ0oMs2GJPii4BFcKCmUcJjs7zuSs4jn44FiuXXDPwRhVlBTGFm-5KTzjhrgsAPaKFO4xIxnYLf0NCjLopKFbw7wCmjITzVsBIupeyo4Bc2YaOMZEHu_7sA9juiHo8HkT_oR9uh28L6I4CpvwiluGdX7AJl_2Quq4ZUU_diDWc_FbR6Jtb_X-_3Fi78iWbeMYMxWTvUhdTrg3dw_qi9mWAdzGVeCo-P2MVaW_iKAqM6MWg'
      },
      gallery: [defaultImagesByCat[newPropCategory]]
    };

    onAddProperty(added);
    setIsSuccess(true);
    
    // Clear out form inputs
    setTimeout(() => {
      setNewPropName('');
      setNewPropLocality('');
      setNewPropRent('');
      setNewPropDesc('');
      setIsSuccess(false);
      setModalOpen(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 bg-[#0A0A0A] min-h-screen text-white">
      
      {/* Welcome Landlord header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pt-16">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 block mb-1">Host Operations Bureau</span>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            Welcome back, Sarah
          </h2>
          <p className="text-zinc-400 text-xs">
            Operational status and property statistics overview.
          </p>
        </div>

        <button 
          onClick={() => setModalOpen(true)}
          className="bg-white hover:bg-zinc-200 text-black py-3 px-6 rounded-none font-black text-xs uppercase tracking-widest flex items-center gap-2 border border-white"
        >
          <Plus size={14} />
          <span>Add New Listing</span>
        </button>
      </div>

      {/* Bento style Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        {/* Occupancy Rate */}
        <div className="md:col-span-2 bg-[#121212] p-6 rounded-none border border-white/10 flex flex-col justify-between h-44 select-none">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold text-zinc-455 uppercase tracking-widest">Occupancy Ratio</span>
            <span className="p-1.5 rounded-none bg-white/10 text-white border border-white/10">
              <Users size={16} />
            </span>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white font-mono">{occupancyRate}</h3>
            <div className="h-16 w-32 bg-zinc-950 rounded-none overflow-hidden relative border border-white/10 flex items-center justify-center">
              <div className="absolute bottom-0 left-0 w-full bg-white/20 h-[85%]"></div>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-[9px] font-mono text-zinc-400">TARGET: 90%</div>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-[#121212] p-6 rounded-none border border-white/10 flex flex-col justify-between h-44 select-none">
          <span className="text-[9px] font-mono font-bold text-zinc-455 uppercase tracking-widest block">Operational Yield</span>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white font-mono">{monthlyRevenue}</h3>
            <p className="text-zinc-400 font-bold text-[10px] flex items-center gap-1 mt-1 font-mono uppercase tracking-wider">
              <TrendingUp size={12} className="text-white" />
              <span>+12% vs preceding cycle</span>
            </p>
          </div>
        </div>

        {/* Active Inquiries */}
        <div className="bg-zinc-950 border border-white/25 text-white p-6 rounded-none flex flex-col justify-between h-44 select-none">
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block">Pending Requests</span>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold leading-tight font-mono">{activeInquiries}</h3>
            <p className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider mt-1">4 fresh inquiries today</p>
          </div>
        </div>

      </div>

      {/* Properties List Header */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">My Properties</h3>
          <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">{properties.length} Active Listings</span>
        </div>

        {/* Grid listed properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div 
              key={p.id}
              className="bg-[#121212] rounded-none overflow-hidden group border border-white/10 flex flex-col justify-between h-full hover:border-white/30 transition-all duration-300"
            >
              <div>
                <div className="relative h-48 overflow-hidden select-none bg-zinc-950 border-b border-white/10">
                  <img 
                    alt={p.name}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    src={p.image}
                  />
                  <span className={`absolute top-4 right-4 text-[9px] font-bold px-2 py-0.5 rounded-none border uppercase tracking-wider font-mono ${
                    p.status === 'Available'
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-800 text-zinc-350 border-white/10'
                  }`}>
                    {p.status}
                  </span>
                </div>

                <div className="p-5">
                  <h4 className="text-md font-bold text-white uppercase tracking-tight group-hover:text-zinc-300 transition-colors leading-snug">{p.name}</h4>
                  <p className="text-xs text-zinc-450 flex items-center gap-1 mt-1 leading-snug font-mono uppercase tracking-wide">
                    <MapPin size={12} className="text-zinc-500 shrink-0" />
                    <span>{p.location}</span>
                  </p>
                </div>
              </div>

              {/* Tenants details and action tool */}
              <div className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-white/10 select-none">
                <div className="pt-4">
                  <p className="text-[9px] text-zinc-500 uppercase font-mono tracking-widest font-semibold">Active Tenants</p>
                  <p className="text-sm font-extrabold text-white mt-1 font-mono">
                    {p.status === 'Available' ? '18/24' : '12/12'}
                  </p>
                </div>

                <div className="flex gap-2 pt-4">
                  <button 
                    onClick={() => onDeleteProperty(p.id)}
                    className="p-2.5 rounded-none text-[#FF3B30] bg-zinc-950 hover:bg-zinc-900 border border-white/10 hover:border-[#FF3B30]/30 transition-all"
                    title="Remove Property"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

            </div>
          ))}

          {/* Dotted Box Addition */}
          <div 
            onClick={() => setModalOpen(true)}
            className="bg-transparent rounded-none border border-dashed border-white/20 flex items-center justify-center p-8 text-center cursor-pointer hover:border-white hover:bg-white/5 duration-300 select-none min-h-[290px]"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-none bg-white/10 text-white flex items-center justify-center mx-auto border border-white/10">
                <PlusCircle size={20} />
              </div>
              <p className="font-bold text-[10px] uppercase font-mono tracking-widest text-zinc-400">Add New Listing</p>
            </div>
          </div>

        </div>
      </section>

      {/* Add New Listing Modal DRAWER */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#121212] w-full max-w-lg rounded-none shadow-2xl overflow-hidden flex flex-col border border-white/15 text-white">
            
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/10 bg-zinc-950">
              <div className="flex items-center gap-2">
                <Building className="text-white" size={16} />
                <h3 className="font-bold text-white text-xs uppercase tracking-widest font-mono">List Your PG Property</h3>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-none hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {isSuccess ? (
              <div className="p-8 text-center space-y-4">
                <CheckCircle className="text-white mx-auto animate-bounce" size={40} />
                <h4 className="font-bold text-xs uppercase tracking-widest font-mono">Property Listed!</h4>
                <p className="text-xs text-zinc-400">
                  Your property has been successfully logged on the archive index ledger.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateProperty} className="p-6 space-y-4 bg-[#121212]">
                
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-zinc-505 uppercase font-mono tracking-widest">PG Housing Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. SKYLINE STUDIO CO-LIV"
                    value={newPropName}
                    onChange={(e) => setNewPropName(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 text-white px-3 py-3 rounded-none text-xs font-mono focus:outline-none focus:border-white uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-zinc-505 uppercase font-mono tracking-widest">City</label>
                    <select
                      value={newPropCity}
                      onChange={(e) => setNewPropCity(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 text-white px-3 py-3 rounded-none text-xs font-mono focus:outline-none focus:border-white"
                    >
                      <option>Bangalore</option>
                      <option>Pune</option>
                      <option>Gurgaon</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-zinc-505 uppercase font-mono tracking-widest">Locality</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. KORAMANGALA 4TH BLOCK"
                      value={newPropLocality}
                      onChange={(e) => setNewPropLocality(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 text-white px-3 py-3 rounded-none text-xs font-mono focus:outline-none focus:border-white uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-zinc-505 uppercase font-mono tracking-widest">Monthly Rent (₹)</label>
                    <input 
                      type="number"
                      required
                      placeholder="e.g. 11000"
                      value={newPropRent}
                      onChange={(e) => setNewPropRent(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 text-white px-3 py-3 rounded-none text-xs font-mono focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-zinc-500 uppercase font-mono tracking-widest">Category</label>
                    <select
                      value={newPropCategory}
                      onChange={(e) => setNewPropCategory(e.target.value as any)}
                      className="w-full bg-zinc-950 border border-white/10 text-white px-3 py-3 rounded-none text-xs font-mono focus:outline-none focus:border-white"
                    >
                      <option value="student">Student Space</option>
                      <option value="professional">Work-Professional Space</option>
                      <option value="luxury">Luxury Studio</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-zinc-500 uppercase font-mono tracking-widest">Operational Summary</label>
                  <textarea 
                    rows={3}
                    placeholder="DESCRIBE COMPLEMENTARY FACILITIES..."
                    value={newPropDesc}
                    onChange={(e) => setNewPropDesc(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 text-white px-3 py-2.5 rounded-none text-xs font-mono focus:outline-none focus:border-white uppercase"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3.5 select-none">
                  <button 
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="border border-white/10 hover:border-white bg-transparent text-white px-5 py-3 rounded-none text-xs font-bold uppercase tracking-widest font-mono transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-white text-black border border-white hover:bg-zinc-205 px-6 py-3 rounded-none text-xs font-black uppercase tracking-widest font-mono transition-all"
                  >
                    Post Listing
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
