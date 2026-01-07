
import React, { useState } from 'react';
import { ExternalLink, Heart, Plus, Search } from 'lucide-react';

const InspirationBoard: React.FC = () => {
  const [activeTag, setActiveTag] = useState('All');
  
  const ideas = [
    { id: 1, title: "Laser Cut Succulents", url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=400", tags: ["Laser", "Decor"] },
    { id: 2, title: "Modular Synthesizer Kit", url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400", tags: ["Electronics", "Audio"] },
    { id: 3, title: "3D Printed Prosthetics", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400", tags: ["3D Printing", "Health"] },
    { id: 4, title: "Macrame Wall Hanging", url: "https://images.unsplash.com/photo-1535451801241-b5395e1d4a1b?auto=format&fit=crop&q=80&w=400", tags: ["Textiles", "Manual"] },
    { id: 5, title: "Cyberpunk Planter", url: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=400", tags: ["Laser", "Electronics"] },
    { id: 6, title: "Custom Screen Printed Tees", url: "https://images.unsplash.com/photo-1563225411-eb6aba0fd9ef?auto=format&fit=crop&q=80&w=400", tags: ["Textiles"] },
    { id: 7, title: "Arduino Smart Clock", url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=400", tags: ["Electronics"] },
    { id: 8, title: "Geometric Plywood Shelf", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400", tags: ["Laser", "Woodworking"] },
    { id: 9, title: "Resin Cast Coasters", url: "https://images.unsplash.com/photo-1590674899484-d5640e52263d?auto=format&fit=crop&q=80&w=400", tags: ["Resin"] },
  ];

  const tags = ['All', 'Laser', '3D Printing', 'Electronics', 'Textiles', 'Audio', 'Decor'];

  const filteredIdeas = activeTag === 'All' 
    ? ideas 
    : ideas.filter(i => i.tags.includes(activeTag));

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {tags.map(tag => (
          <button 
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              activeTag === tag 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'bg-white text-slate-500 hover:bg-slate-100 shadow-sm border border-slate-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredIdeas.map((idea) => (
          <div key={idea.id} className="relative break-inside-avoid group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white border border-slate-100">
            <img 
              src={idea.url} 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
              alt={idea.title} 
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="text-white font-bold text-lg mb-2">{idea.title}</h3>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {idea.tags.map(t => (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-white/70 bg-white/20 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                   <button className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/40 transition-colors">
                    <Heart size={18} />
                  </button>
                  <button className="p-2 bg-white text-slate-900 rounded-xl hover:bg-slate-100 transition-colors">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Title for mobile/visible fallback */}
            <div className="p-4 md:hidden">
               <h3 className="text-slate-800 font-bold">{idea.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredIdeas.length === 0 && (
        <div className="py-20 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No inspiration found</h3>
          <p className="text-slate-500">Try selecting a different category or search term.</p>
        </div>
      )}

      {/* Quick Add Button Sticky */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 border-4 border-white">
        <Plus size={28} />
      </button>
    </div>
  );
};

export default InspirationBoard;
