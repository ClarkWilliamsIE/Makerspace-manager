
import React, { useState } from 'react';
import { Calendar, CheckCircle2, Circle, Clock, MoreVertical, Plus, Edit3, Trash2 } from 'lucide-react';
import { ClassItem } from '../types';

interface ClassPlannerProps {
  classes: ClassItem[];
  setClasses: React.Dispatch<React.SetStateAction<ClassItem[]>>;
}

const ClassPlanner: React.FC<ClassPlannerProps> = ({ classes, setClasses }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<ClassItem, 'id'>>({
    name: '',
    date: '',
    status: 'Planning',
    notes: ''
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date) return;

    if (editingId) {
      setClasses(prev => prev.map(c => c.id === editingId ? { ...formData, id: editingId } : c));
      setEditingId(null);
    } else {
      setClasses(prev => [{ ...formData, id: Date.now().toString() }, ...prev]);
    }

    setFormData({ name: '', date: '', status: 'Planning', notes: '' });
    setIsAdding(false);
  };

  const deleteClass = (id: string) => {
    setClasses(prev => prev.filter(c => c.id !== id));
  };

  const startEdit = (cls: ClassItem) => {
    setFormData({ name: cls.name, date: cls.date, status: cls.status, notes: cls.notes });
    setEditingId(cls.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Calendar size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Term Classes & Events</h2>
            <p className="text-slate-500 text-sm">Organize upcoming workshops and staff training sessions.</p>
          </div>
        </div>
        <button 
          onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ name: '', date: '', status: 'Planning', notes: '' }); }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={20} /> Schedule Class
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-3xl p-8 shadow-md border-2 border-indigo-100 animate-in zoom-in duration-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">{editingId ? 'Edit Class' : 'New Workshop Details'}</h3>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Class Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm transition-all"
                  placeholder="e.g. Laser Cutting 101"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</label>
              <div className="flex gap-4">
                {['Planning', 'Ready', 'Done'].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({...formData, status: s as any})}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                      formData.status === s 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lesson Notes</label>
              <textarea 
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm transition-all resize-none"
                placeholder="What materials need prepping? Any special setup?"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="px-6 py-3 text-slate-500 font-bold hover:text-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button type="submit" className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100">
                {editingId ? 'Update Class' : 'Create Class'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
          <div key={cls.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                cls.status === 'Done' ? 'bg-emerald-50 text-emerald-600' :
                cls.status === 'Ready' ? 'bg-indigo-50 text-indigo-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                {cls.status}
              </div>
              <div className="flex gap-1">
                <button onClick={() => startEdit(cls)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                  <Edit3 size={16} />
                </button>
                <button onClick={() => deleteClass(cls.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">{cls.name}</h3>
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-4 font-medium">
              <Clock size={14} />
              {new Date(cls.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex-1 p-4 bg-slate-50 rounded-2xl">
              <p className="text-slate-600 text-sm italic">
                {cls.notes ? `"${cls.notes}"` : "No notes added yet."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassPlanner;
