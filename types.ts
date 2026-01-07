
export type Tab = 'dashboard' | 'stats' | 'finance' | 'activator' | 'classes' | 'events' | 'scheduler' | 'inspiration';

export interface StatEntry {
  date: string;
  visitors: number;
  engagements: number;
  participants: number;
  offsite: number;
}

export interface Transaction {
  id: string;
  date: string;
  item: string;
  type: 'Expense' | 'Income';
  cost: number;
}

export interface ClassItem {
  id: string;
  name: string;
  date: string;
  status: 'Planning' | 'Ready' | 'Done';
  notes: string;
}

export interface EventItem {
  id: string;
  name: string;
  date: string;
  time: string;
  type: 'Public' | 'Staff' | 'Repair';
  description: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface ShoppingItem {
  id: string;
  item: string;
  quantity: string;
}

export interface ActivatorData {
  title: string;
  description: string;
  materials: string[];
  instructions: string[];
  imageUrl: string;
  difficulty: string;
  month: string;
}

export interface AIProject {
  title: string;
  description: string;
  materials: string[];
  difficulty: string;
  vibe: string;
  timestamp: number;
}
