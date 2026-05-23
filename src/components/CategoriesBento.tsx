import React from 'react';

interface CategoriesBentoProps {
  onSelectCategory: (category: 'student' | 'professional' | 'luxury') => void;
}

export default function CategoriesBento({ onSelectCategory }: CategoriesBentoProps) {
  const categories = [
    {
      id: 'student' as const,
      title: 'Student',
      desc: 'Near University Hubs',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmU78Ri8aiWQmVetERvs1YYH0sLS-jarlXIHoMBmSr8zGrTnKr_dCsPp9C65P9uFehNKr1jFdPFEHVJgpTS6BHuhJFh3UMjHNnAytyDqCCOwQzbbR2C-fU1BXZOS95238Txpe_Xm5z1i1qtNT_va6t2eQxnu6Kp3C5n62qzKbENuFImmi2mRIRBwZpyDeNt7G2LThDFBCp5iKcepCYiM7AbZK26M0ORiMGhHdE0XgeAk3YTBQAy8eccCX9LDJwOizHV5wapgacUNPI'
    },
    {
      id: 'professional' as const,
      title: 'Professional',
      desc: 'Work-ready Spaces',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYmn9l7-a5ECsxBpQPH6z8UULjeXtCwQRkn1tD6RqdB7u09vRUKAFqvfI21g-LsWh3uEFqbYs3Yu-M8x2X5qvNcOKSsXxv1sWI1RanC2GlkwtmM-LyE7olCavddd9ugyW6ZqF0jSG0Vx5UG3majqLntOzG0QI0Sr5CCg_-ZMl58_mdJ51e3ijzGG5-s_1-1xhq5SdImloARYpUlU_vnjJ4RnDVkIzLmuXINnrrDhHHbj0zJkr_ZrAsonqobZgXADUqdSlKXDR6j94o'
    },
    {
      id: 'luxury' as const,
      title: 'Luxury',
      desc: 'Premium Amenities',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBpIry1IBoB3t12hKLnqwDgRM0umffKIZJe6LuNDpxFEDoSMz746TK3uj-xqeNrIokNXX3RQSley425ZvLtdID7EL5I8wTdNhiR1LWQ7_UcB1DbWqhj3xyNFHCEGyl-eHyu-ZRNIujxKT6VidY2R92jtG3KTHSeXf4hneHCu2cc9w1iqOpMaXh1uFtVHPGqCm7eqULVcueSFcCR8pnLQHG1Rpiao_IipvQ9XfoSfulorSUeIGHotw6nH51SP75OYgViImxnRwnjjQx'
    }
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px w-20 bg-white/30"></div>
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">Curated Collections mmxxiv</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((c) => (
          <div 
            key={c.id}
            onClick={() => onSelectCategory(c.id)}
            className="group relative overflow-hidden rounded-none h-72 border border-white/10 bg-zinc-900 transition-all cursor-pointer select-none"
          >
            <img 
              alt={c.title}
              src={c.img}
              className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
            {/* Elegant vignette gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent flex flex-col justify-end p-6">
              <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-zinc-400 block mb-1">Explore Range</span>
              <h3 className="text-white text-3xl font-black tracking-tight uppercase leading-none">{c.title}</h3>
              <p className="text-zinc-450 text-xs font-serif italic mt-1.5">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
