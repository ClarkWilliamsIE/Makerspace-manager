
import { StatEntry, Transaction, ClassItem, EventItem, Task, ShoppingItem, ActivatorData } from './types';

// Simulated Network Delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const CloudService = {
  async fetchData() {
    await delay(1200); // Simulate initial cold start
    return {
      stats: JSON.parse(localStorage.getItem('m_stats') || '[]'),
      transactions: JSON.parse(localStorage.getItem('m_transactions') || '[]'),
      classes: JSON.parse(localStorage.getItem('m_classes') || '[]'),
      events: JSON.parse(localStorage.getItem('m_events') || '[]'),
      tasks: JSON.parse(localStorage.getItem('m_tasks') || '[]'),
      shoppingList: JSON.parse(localStorage.getItem('m_shopping') || '[]'),
      activator: JSON.parse(localStorage.getItem('m_activator') || 'null')
    };
  },

  async sync(key: string, data: any) {
    await delay(600); // Simulate network latency
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`[CloudSync] ${key} updated successfully.`);
    return { status: 'success', timestamp: Date.now() };
  }
};
