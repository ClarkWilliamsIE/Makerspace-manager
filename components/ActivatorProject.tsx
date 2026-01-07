
import React from 'react';
import { Layers, ListChecks, Hammer, Sparkles, Printer } from 'lucide-react';
import { ActivatorData } from '../types';

interface ActivatorProjectProps {
  data: ActivatorData;
}

const ActivatorProject: React.FC<ActivatorProjectProps> = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="relative h-[300px] md:h-[450px] rounded-[40px] overflow-hidden shadow-2xl group">
        <img 
          src={data.imageUrl} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          alt={data.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border border-white/30">{data.month} Project</span>
            <span className="px-3 py-1 bg-indigo-500 rounded-full text-xs font-bold uppercase tracking-widest">{data.difficulty}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">{data.title}</h2>
          <p className="text-slate-200 text-lg max-w-xl line-clamp-3">{data.description}</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white hover:bg-white/20 transition-all"
        >
          <Printer size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Hammer size={24} /></div>
              <h3 className="text-xl font-bold text-slate-800">Instructions</h3>
            </div>
            <div className="space-y-6">
              {data.instructions.map((text, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-indigo-600 text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {idx + 1}
                  </span>
                  <p className="text-slate-600 leading-relaxed pt-1">{text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-50 rounded-xl text-amber-600"><ListChecks size={20} /></div>
              <h3 className="text-lg font-bold text-slate-800">Materials Needed</h3>
            </div>
            <ul className="space-y-3">
              {data.materials.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivatorProject;
