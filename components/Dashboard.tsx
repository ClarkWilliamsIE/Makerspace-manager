
import React, { useState } from 'react';
import { CheckCircle2, Circle, ShoppingCart, Lightbulb, ArrowRight, Plus, Trash2, Calendar, Clock, MapPin, X } from 'lucide-react';
import { Task, ShoppingItem, ClassItem, EventItem, ActivatorData } from '../types';
import AISpark from './AISpark';

interface DashboardProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  shoppingList: ShoppingItem[];
  setShoppingList: (items: ShoppingItem[]) => void;
  classes: ClassItem[];
  events: EventItem[];
  activator: ActivatorData;
  setActivator: React.Dispatch<React.SetStateAction<ActivatorData>>;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  tasks, setTasks, 
  shoppingList, setShoppingList, 
  classes, events, 
  activator, setActivator 
}) => {
  const [newTask, setNewTask] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('1');
  const [showSupplyForm, setShowSupplyForm] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now().toString(), text: newTask, completed: false }, ...tasks]);
    setNewTask('');
  };

  const addShoppingItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setShoppingList([{ 
      id: Date.now().toString(), 
      item: newItemName.trim(), 
      quantity: newItemQty || '1' 
    }, ...shoppingList]);
    setNewItemName('');
    setNewItemQty('1');
    setShowSupplyForm(false);
  };

  const removeShoppingItem = (id: string) => {
    setShoppingList(shoppingList.filter(i => i.id !== id));
  };

  const upcoming = [...classes.map(c => ({...c, type: 'Class'})), ...events.map(e => ({...e, type: 'Event'}))]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 min-h-[600px]">
      {/* AI Daily Spark */}
      <div className="md:col-span-1 md:row-span-1">
        <AISpark setActivator={setActivator} />
      </div>

      {/* To-Do List Section */}
      <div className="md:col-span-2 md:row-span-1 bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h2 className="font-black text-xl text-slate-800 tracking-tight uppercase">To-Do List</h2>
              <p className="text-slate-400 text-xs font-bold">Staff Tasks for Today</p>
            </div>
          </div>
          <span className="text-[10px] font-black px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full uppercase tracking-widest">
            {tasks.filter(t => !t.completed).length} Pending
          </span>
        </div>
        
        <form onSubmit={addTask} className="mb-6">
          <div className="relative group/input">
            <input 
              type="text" 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a task for the team..." 
              className="w-full pl-6 pr-14 py-4 bg-slate-50 border-none rounded-[24px] text-sm font-semibold focus:ring-4 focus:ring-indigo-50 transition-all outline-none"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg">
              <Plus size={20} />
            </button>
          </div>
        </form>

        <div className="flex-1 space-y-2 overflow-y-auto max-h-[160px] pr-2 scrollbar-hide">
          {tasks.map(task => (
            <button 
              key={task.id} 
              onClick={() => toggleTask(task.id)}
              className="w-full flex items-center gap-4 p-4 rounded-[20px] hover:bg-slate-50 transition-all group/item text-left border border-transparent"
            >
              {task.completed ? <CheckCircle2 size={24} className="text-emerald-500" /> : <Circle size={24} className="text-slate-200 group-hover/item:text-indigo-400" />}
              <span className={`text-sm font-bold ${task.completed ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{task.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Activities */}
      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl transition-all">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-rose-50 rounded-2xl text-rose-600">
            <Calendar size={24} />
          </div>
          <div>
            <h2 className="font-black text-xl text-slate-800 tracking-tight uppercase">Upcoming</h2>
            <p className="text-slate-400 text-xs font-bold">Next 3 Activities</p>
          </div>
        </div>
        <div className="space-y-3 flex-1">
          {upcoming.map((item, idx) => (
            <div key={idx} className="p-4 rounded-3xl bg-slate-50/50 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${item.type === 'Class' ? 'bg-indigo-100 text-indigo-700' : 'bg-rose-100 text-rose-700'}`}>
                  {item.type}
                </span>
                <span className="text-[9px] font-bold text-slate-400">{item.date}</span>
              </div>
              <p className="text-sm font-bold text-slate-800 line-clamp-1">{item.name}</p>
            </div>
          ))}
          {upcoming.length === 0 && <p className="text-center py-10 text-slate-400 text-sm font-medium">Nothing scheduled.</p>}
        </div>
      </div>

      {/* Activator Highlight */}
      <div className="bg-gradient-to-br from-indigo-700 to-violet-900 rounded-[40px] p-8 shadow-2xl flex flex-col justify-between text-white relative overflow-hidden group hover:scale-[1.01] transition-transform">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20"><Lightbulb size={20} /></div>
            <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">{activator.month} Project</span>
          </div>
          <h2 className="text-2xl font-black leading-tight mt-2 mb-4">{activator.title}</h2>
          <p className="text-white/60 text-sm font-medium line-clamp-3 leading-relaxed">{activator.description}</p>
        </div>
        <button className="relative z-10 self-start mt-6 px-6 py-3 bg-white text-indigo-700 rounded-2xl font-black text-xs shadow-xl flex items-center gap-2 transition-transform hover:translate-x-1">
          View Detail <ArrowRight size={14} />
        </button>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
      </div>

      {/* Supply List (Shopping List) */}
      <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl transition-all relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h2 className="font-black text-xl text-slate-800 tracking-tight uppercase">Supply List</h2>
              <p className="text-slate-400 text-xs font-bold">Low Stock Items</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSupplyForm(!showSupplyForm)}
            className={`p-2 rounded-xl transition-all ${showSupplyForm ? 'bg-amber-100 text-amber-600' : 'bg-slate-50 text-slate-400 hover:text-amber-600'}`}
          >
            {showSupplyForm ? <X size={18} /> : <Plus size={18} />}
          </button>
        </div>

        {showSupplyForm && (
          <form onSubmit={addShoppingItem} className="mb-6 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                autoFocus
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Item Name..." 
                className="w-full px-5 py-3 bg-amber-50/50 border-none rounded-2xl text-sm font-bold placeholder:text-amber-200 focus:ring-2 focus:ring-amber-200 outline-none"
              />
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newItemQty}
                  onChange={(e) => setNewItemQty(e.target.value)}
                  placeholder="Qty..." 
                  className="w-24 px-5 py-3 bg-amber-50/50 border-none rounded-2xl text-sm font-bold placeholder:text-amber-200 focus:ring-2 focus:ring-amber-200 outline-none"
                />
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-amber-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-100 hover:bg-amber-600 transition-all"
                >
                  Add Item
                </button>
              </div>
            </div>
          </form>
        )}
        
        <div className="flex-1 space-y-3 overflow-y-auto max-h-[180px] pr-2 scrollbar-hide">
          {shoppingList.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 rounded-3xl bg-slate-50/50 hover:bg-slate-50 transition-all group/item">
              <div>
                <p className="text-sm font-bold text-slate-700">{item.item}</p>
                <div className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-lg text-[9px] font-black uppercase tracking-widest">
                  Qty: {item.quantity}
                </div>
              </div>
              <button onClick={() => removeShoppingItem(item.id)} className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover/item:opacity-100 transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {shoppingList.length === 0 && !showSupplyForm && (
            <div className="flex flex-col items-center justify-center py-10 text-slate-300">
              <ShoppingCart size={40} className="mb-2 opacity-20" />
              <p className="text-center text-[10px] font-black uppercase tracking-widest">Inventory looks good.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
