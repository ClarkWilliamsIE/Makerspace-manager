
import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Save, PlusCircle, Users, HandMetal, BookOpen, MapPin } from 'lucide-react';
import { StatEntry } from '../types';

interface StatsTrackerProps {
  stats: StatEntry[];
  setStats: React.Dispatch<React.SetStateAction<StatEntry[]>>;
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899'];

const StatsTracker: React.FC<StatsTrackerProps> = ({ stats, setStats }) => {
  const [formData, setFormData] = useState<Omit<StatEntry, 'date'>>({
    visitors: 0,
    engagements: 0,
    participants: 0,
    offsite: 0,
  });
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: StatEntry = {
      date,
      ...formData
    };
    
    // Check if date exists, if so update, else add
    setStats(prev => {
      const existingIndex = prev.findIndex(s => s.date === date);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = newEntry;
        return updated;
      }
      return [...prev, newEntry].sort((a, b) => a.date.localeCompare(b.date));
    });

    // Reset some form
    setFormData({ visitors: 0, engagements: 0, participants: 0, offsite: 0 });
  };

  const totals = useMemo(() => {
    return stats.reduce((acc, curr) => ({
      visitors: acc.visitors + curr.visitors,
      engagements: acc.engagements + curr.engagements,
      participants: acc.participants + curr.participants,
      offsite: acc.offsite + curr.offsite,
    }), { visitors: 0, engagements: 0, participants: 0, offsite: 0 });
  }, [stats]);

  const pieData = [
    { name: 'Visitors', value: totals.visitors },
    { name: 'Engagements', value: totals.engagements },
    { name: 'Participants', value: totals.participants },
    { name: 'Offsite', value: totals.offsite },
  ];

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <PlusCircle size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Log Daily Stats</h2>
            <p className="text-slate-500 text-sm">Keep our engagement numbers up to date.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Date</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Visitors</label>
            <div className="relative">
               <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
               <input 
                type="number" 
                value={formData.visitors || ''}
                onChange={(e) => setFormData({...formData, visitors: parseInt(e.target.value) || 0})}
                placeholder="0"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Engagements</label>
            <div className="relative">
              <HandMetal className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="number" 
                value={formData.engagements || ''}
                onChange={(e) => setFormData({...formData, engagements: parseInt(e.target.value) || 0})}
                placeholder="0"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Participants</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="number" 
                value={formData.participants || ''}
                onChange={(e) => setFormData({...formData, participants: parseInt(e.target.value) || 0})}
                placeholder="0"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button 
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
            >
              <Save size={18} /> Save Entry
            </button>
          </div>
        </form>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Engagement History</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="visitors" stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="engagements" stackId="a" fill="#10b981" />
                <Bar dataKey="participants" stackId="a" fill="#f59e0b" />
                <Bar dataKey="offsite" stackId="a" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Chart */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Category Breakdown</h3>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-slate-400 text-xs font-bold uppercase">Total Reach</p>
                <p className="text-2xl font-bold text-slate-800">
                  {pieData.reduce((a, b) => a + b.value, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {pieData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTracker;
