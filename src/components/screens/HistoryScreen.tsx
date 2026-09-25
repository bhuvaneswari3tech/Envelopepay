import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Calendar,
  X,
  ChevronDown,
  ArrowUpRight,
  Download,
  Share2,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Transaction } from '../../types';
import { IconRenderer } from '../common/IconRenderer';

interface HistoryScreenProps {
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  transactions,
  onSelectTransaction,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('All');

  const categories = [
    'All',
    'Recharge',
    'Electricity',
    'DTH',
    'Credit Card',
    'Education',
    'Other',
  ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Search filter
      const matchesSearch =
        tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.amount.toString().includes(searchQuery);

      if (!matchesSearch) return false;

      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Other') {
          if (['Recharge', 'Electricity', 'DTH', 'Credit Card', 'Education'].includes(tx.category)) {
            return false;
          }
        } else if (tx.category !== selectedCategory) {
          return false;
        }
      }

      // Status filter
      if (selectedStatus !== 'All' && tx.status !== selectedStatus) {
        return false;
      }

      // Date range filter
      if (selectedDateRange === 'This Month') {
        const now = Date.now();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        if (now - tx.timestamp > thirtyDays) return false;
      }

      return true;
    });
  }, [transactions, searchQuery, selectedCategory, selectedStatus, selectedDateRange]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSelectedDateRange('All');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedStatus !== 'All' ||
    selectedDateRange !== 'All';

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* Header & Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Transaction History
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          All your passbook entries and payments in one place
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by biller, amount, or Txn ID..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-9 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Horizontal Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary Filters: Date Range & Status */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {/* Date Filter */}
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs shadow-2xs"
          >
            <option value="All">All Dates</option>
            <option value="This Month">This Month (Sep 2026)</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs shadow-2xs"
          >
            <option value="All">All Status</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-[11px] font-semibold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      {/* Transaction List */}
      {filteredTransactions.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {filteredTransactions.map((tx) => {
            const isSuccess = tx.status === 'Success';
            const isPending = tx.status === 'Pending';
            return (
              <div
                key={tx.id}
                onClick={() => onSelectTransaction(tx)}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50/90 cursor-pointer transition-colors active:bg-slate-100/70"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-indigo-700 flex items-center justify-center shrink-0">
                    <IconRenderer name={tx.serviceIconName} className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {tx.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate mt-0.5">
                      <span>{tx.date}</span>
                      <span>·</span>
                      <span>{tx.time}</span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-400 truncate">
                      ID: {tx.id}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 ml-2">
                  <div className="text-sm font-extrabold text-slate-900">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </div>
                  <div className="mt-0.5">
                    {isSuccess ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Success
                      </span>
                    ) : isPending ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/50">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/50">
                        <AlertCircle className="w-3 h-3 text-rose-600" />
                        Failed
                      </span>
                    )}
                  </div>
                  {tx.goldEarnedMg && (
                    <div className="text-[10px] font-bold text-amber-600 mt-1">
                      +{tx.goldEarnedMg}mg Gold
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No transactions found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            We couldn't find any transaction matching your search or active filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
