
import React from 'react';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { ClassItem, EventItem } from '../types';

interface WeeklySchedulerProps {
  classes: ClassItem[];
  events: EventItem[];
}

const WeeklyScheduler: React.FC<WeeklySchedulerProps> = ({ classes, events }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const getDayActivities = (dayName: string) => {
    const dayIdx = fullDays.indexOf(dayName);
    const combined = [
      ...classes.map(c => ({ ...c, type: 'Class' as const })),
      ...events.map(e => ({ ...e, type: 'Event' as const }))
    ];
    
    return combined.filter(item => {
      const d = new Date(item.date).getDay();
      const adjustedDay = d === 0 ? 6 : d - 1;
      return adjustedDay === dayIdx;
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <Calendar size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Weekly Planner</h2>
              <p className="text-slate-400 text-sm font-medium">May 12 - May 18, 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all text-slate-500">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all text-slate-500">
              <ChevronRight size={20} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs ml-2 shadow-sm">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {fullDays.map((day, idx) => {
            const activities = getDayActivities(day);
            const isToday = day === 'Wednesday';
            
            return (
              <div key={day} className="flex flex-col space-y-3">
                <div className={`text-center py-3 rounded-2xl font-bold text-xs uppercase tracking-widest ${
                  isToday ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-400'
                }`}>
                  {days[idx]}
                </div>
                <div className={`flex-1 p-2 rounded-2xl space-y-3 min-h-[300px] border border-transparent ${
                  isToday ? 'bg-indigo-50/30 border-indigo-100' : 'bg-slate-50/50'
                }`}>
                  {activities.map((act: any) => (
                    <div 
                      key={act.id} 
                      className={`p-3 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer ${
                        act.type === 'Class' ? 'bg-white' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          act.type === 'Class' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {act.type}
                        </span>
                        {act.time && <span className="text-[8px] font-bold text-slate-400">{act.time}</span>}
                      </div>
                      <p className="text-[11px] font-bold text-slate-800 leading-tight mb-2 line-clamp-2">{act.name}</p>
                      <div className="flex items-center gap-1 text-slate-300">
                        <MapPin size={10} />
                        <span className="text-[8px] font-medium">Main Hub</span>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center opacity-20 py-10 grayscale">
                      <Sparkles size={20} className="text-slate-400" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyScheduler;
