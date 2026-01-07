
import React, { useState } from 'react';
import { Ticket, Plus, Calendar, Clock, MapPin, Trash2, X } from 'lucide-react';
import { EventItem } from '../types';

interface EventsHubProps {
  events: EventItem[];
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
}

const EventsHub: React.FC<EventsHubProps> = ({ events, setEvents }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState<Omit<EventItem, 'id'>>({
    name: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    type: 'Public',
    description: ''
  });

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setEvents(prev => [...prev, { ...formData, id: Date.now().toString() }]);
    setShowAdd(false);
    setFormData({ name: '', date: new Date().toISOString().split('T')[0], time: '10:00', type: 'Public', description: '' });
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <Ticket size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Makerspace Events</h2>
            <p className="text-slate-500 text-sm font-medium">Community pop-ups and special workshops.</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-md hover:bg-emerald-700 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Create Event
        </button>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Add New Event</h3>
                <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X size={24} />
                </button>
             </div>
             <form onSubmit={addEvent} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Event Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Repair Café"
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl font-medium outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Time</label>
                    <input 
                      type="time" 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 rounded-xl font-medium outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Type</label>
                   <div className="flex gap-2">
                      {['Public', 'Staff', 'Repair'].map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormData({...formData, type: t as any})}
                          className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${
                            formData.type === t ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                   </div>
                </div>
                <button type="submit" className="w-full py-4 mt-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg">
                  Save Event
                </button>
             </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
               <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest ${
                 event.type === 'Repair' ? 'bg-emerald-50 text-emerald-600' : 
                 event.type === 'Public' ? 'bg-indigo-50 text-indigo-600' : 
                 'bg-amber-50 text-amber-600'
               }`}>
                 {event.type}
               </span>
               <button onClick={() => deleteEvent(event.id)} className="p-1 text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100">
                  <Trash2 size={16} />
               </button>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">{event.name}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <Calendar size={14} />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <Clock size={14} />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                <MapPin size={14} />
                <span>Zone A (Studio)</span>
              </div>
            </div>
            {event.description && (
              <p className="text-slate-500 text-xs font-medium leading-relaxed mt-4 border-t border-slate-50 pt-4 italic">
                {event.description}
              </p>
            )}
          </div>
        ))}
        {events.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400 text-sm font-medium">No events scheduled.</div>
        )}
      </div>
    </div>
  );
};

export default EventsHub;
