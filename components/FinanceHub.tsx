
import React, { useState } from 'react';
import { TrendingDown, TrendingUp, DollarSign, Plus, Calendar, Package, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Transaction } from '../types';

interface FinanceHubProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  totalBudget: number;
}

const FinanceHub: React.FC<FinanceHubProps> = ({ transactions, setTransactions, totalBudget }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    item: '',
    type: 'Expense' as 'Expense' | 'Income',
    cost: 0,
    date: new Date().toISOString().split('T')[0]
  });

  const totalSpent = transactions.reduce((acc, curr) => curr.type === 'Expense' ? acc + curr.cost : acc - curr.cost, 0);
  const remaining = totalBudget - totalSpent;
  const progressPercent = Math.min((totalSpent / totalBudget) * 100, 100);

  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.item || formData.cost <= 0) return;
    setTransactions(prev => [{
      id: Date.now().toString(),
      ...formData
    }, ...prev]);
    setShowAdd(false);
    setFormData({ item: '', type: 'Expense', cost: 0, date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="space-y-6">
      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
              <DollarSign size={20} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Current Month</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">${remaining.toLocaleString()}</p>
          <p className="text-sm text-slate-500 mt-1">Budget Remaining</p>
          <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                progressPercent > 90 ? 'bg-rose-500' : progressPercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Spent: ${totalSpent.toFixed(2)}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Limit: ${totalBudget}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
              <TrendingDown size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">${transactions.filter(t => t.type === 'Expense').reduce((a, b) => a + b.cost, 0).toLocaleString()}</p>
          <p className="text-sm text-slate-500 mt-1">Total Expenses</p>
          <div className="mt-2 flex items-center gap-1 text-rose-500 text-xs font-bold">
            <ArrowUpRight size={14} /> +8.4% from last month
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800">${transactions.filter(t => t.type === 'Income').reduce((a, b) => a + b.cost, 0).toLocaleString()}</p>
          <p className="text-sm text-slate-500 mt-1">Total Grants & Income</p>
           <div className="mt-2 flex items-center gap-1 text-emerald-500 text-xs font-bold">
            <ArrowDownLeft size={14} /> +12.1% from last month
          </div>
        </div>
      </div>

      {/* Main Ledger */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Financial Ledger</h2>
            <p className="text-slate-500 text-sm">Track all purchases and funding sources.</p>
          </div>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            {showAdd ? 'Cancel' : <><Plus size={18} /> Add Transaction</>}
          </button>
        </div>

        {showAdd && (
          <div className="p-6 bg-slate-50 border-b border-slate-100 animate-in slide-in-from-top duration-300">
            <form onSubmit={addTransaction} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Description</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="What did you buy?"
                    value={formData.item}
                    onChange={(e) => setFormData({...formData, item: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="number" 
                    placeholder="0.00"
                    step="0.01"
                    value={formData.cost || ''}
                    onChange={(e) => setFormData({...formData, cost: parseFloat(e.target.value) || 0})}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
                >
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                </select>
                <button type="submit" className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-all">
                  <Plus size={20} />
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-50">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Item / Description</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map(transaction => (
                <tr key={transaction.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm text-slate-500">{transaction.date}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-700">{transaction.item}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      transaction.type === 'Expense' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-bold text-right ${
                    transaction.type === 'Expense' ? 'text-slate-700' : 'text-emerald-600'
                  }`}>
                    {transaction.type === 'Expense' ? '-' : '+'}${transaction.cost.toFixed(2)}
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-sm">No transactions logged yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceHub;
