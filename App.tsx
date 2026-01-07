
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Wallet, 
  Lightbulb, 
  CalendarDays, 
  Image as ImageIcon,
  Menu,
  X,
  Ticket,
  Clock,
  UserCircle2,
  ChevronDown,
  Plus
} from 'lucide-react';
import { Tab, StatEntry, Transaction, ClassItem, EventItem, Task, ShoppingItem, ActivatorData } from './types';
import Dashboard from './components/Dashboard';
import StatsTracker from './components/StatsTracker';
import FinanceHub from './components/FinanceHub';
import ActivatorProject from './components/ActivatorProject';
import ClassPlanner from './components/ClassPlanner';
import EventsHub from './components/EventsHub';
import WeeklyScheduler from './components/WeeklyScheduler';
import InspirationBoard from './components/InspirationBoard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentStaff, setCurrentStaff] = useState('Staff Alex');

  // Global State (Local only)
  const [stats, setStats] = useState<StatEntry[]>([
    { date: '2025-05-01', visitors: 120, engagements: 45, participants: 12, offsite: 0 },
    { date: '2025-05-02', visitors: 98, engagements: 30, participants: 8, offsite: 5 },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', date: '2025-05-01', item: '3D Printer Filament', type: 'Expense', cost: 45.99 },
  ]);

  const [classes, setClasses] = useState<ClassItem[]>([
    { id: 'c1', name: 'Intro to 3D Printing', date: '2025-05-15', status: 'Ready', notes: 'Prepare test models' },
    { id: 'c2', name: 'Vinyl Workshop', date: '2025-05-18', status: 'Planning', notes: 'Check vinyl rolls' },
  ]);

  const [events, setEvents] = useState<EventItem[]>([
    { id: 'e1', name: 'Repair Café', date: '2025-05-16', time: '14:00', type: 'Repair', description: 'Community repair session' },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Clean laser cutter lens', completed: false },
    { id: '2', text: 'Organize resin area', completed: true },
    { id: '3', text: 'Update Safety Postings', completed: false },
  ]);

  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    { id: '1', item: 'Hot glue sticks', quantity: '1 pack' },
    { id: '2', item: 'Vinyl Roll (Blue)', quantity: '2 rolls' },
  ]);

  const [activator, setActivator] = useState<ActivatorData>({
    title: "Eco-Friendly Prototyping",
    description: "Focusing on sustainable materials and bioplastics this month.",
    materials: ["PLA Filament", "Recycled Cardboard", "Natural Dyes"],
    instructions: ["Step 1: Design in CAD", "Step 2: Print with bio-materials", "Step 3: Test durability"],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200",
    difficulty: "Intermediate",
    month: "May"
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            tasks={tasks} setTasks={setTasks} 
            shoppingList={shoppingList} setShoppingList={setShoppingList} 
            classes={classes} events={events}
            activator={activator} setActivator={setActivator}
          />
        );
      case 'stats':
        return <StatsTracker stats={stats} setStats={setStats} />;
      case 'finance':
        return <FinanceHub transactions={transactions} setTransactions={setTransactions} totalBudget={2500} />;
      case 'activator':
        return <ActivatorProject data={activator} />;
      case 'classes':
        return <ClassPlanner classes={classes} setClasses={setClasses} />;
      case 'events':
        return <EventsHub events={events} setEvents={setEvents} />;
      case 'scheduler':
        return <WeeklyScheduler classes={classes} events={events} />;
      case 'inspiration':
        return <InspirationBoard />;
      default:
        return null;
    }
  };

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'scheduler', icon: Clock, label: 'Weekly Planner' },
    { id: 'stats', icon: BarChart3, label: 'The Tracker' },
    { id: 'finance', icon: Wallet, label: 'Finance Hub' },
    { id: 'activator', icon: Lightbulb, label: 'Activator Project' },
    { id: 'classes', icon: CalendarDays, label: 'Class Planner' },
    { id: 'events', icon: Ticket, label: 'Events Hub' },
    { id: 'inspiration', icon: ImageIcon, label: 'Inspiration' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-24'} fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col transition-all duration-300 md:relative`}>
        <div className="p-8 hidden md:flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <LayoutDashboard size={24} />
          </div>
          {isSidebarOpen && <span className="font-black text-xl tracking-tight text-slate-800 uppercase">MakerOS</span>}
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as Tab); if (window.innerWidth < 768) setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
              >
                <Icon size={20} />
                {isSidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-50">
          <button 
            className="w-full p-3 rounded-2xl bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition-colors"
            onClick={() => setCurrentStaff(currentStaff === 'Staff Alex' ? 'Staff Jordan' : 'Staff Alex')}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                {currentStaff.split(' ')[1][0]}
              </div>
              {isSidebarOpen && (
                <div className="text-left overflow-hidden">
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Logged In</p>
                  <p className="text-sm font-bold text-slate-700 truncate">{currentStaff}</p>
                </div>
              )}
            </div>
            {isSidebarOpen && <ChevronDown size={14} className="text-slate-400" />}
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md px-6 py-4 md:px-10 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 text-slate-600 bg-white rounded-xl shadow-sm">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight capitalize">
                {activeTab === 'dashboard' ? `Welcome back, ${currentStaff.split(' ')[1]}` : activeTab.replace(/([A-Z])/g, ' $1').trim()}
              </h1>
              <p className="text-slate-400 text-sm font-medium">May 20, 2025 • Makerspace Live</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition-all font-bold text-sm">
                <Plus size={18} /> New Entry
             </button>
          </div>
        </header>

        <div className="px-6 pb-10 md:px-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
