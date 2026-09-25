import React, { useState } from 'react';
import {
  X,
  Send,
  User,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Wallet,
  ArrowRight,
} from 'lucide-react';
import { Transaction, UserProfile } from '../../types';

interface SendMoneyModalProps {
  user: UserProfile;
  onClose: () => void;
  onSendSuccess: (txn: Transaction) => void;
}

export const SendMoneyModal: React.FC<SendMoneyModalProps> = ({
  user,
  onClose,
  onSendSuccess,
}) => {
  const [recipient, setRecipient] = useState('karthik.tn@okhdfcbank');
  const [amount, setAmount] = useState('500');
  const [note, setNote] = useState('Dinner split');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickContacts = [
    { name: 'Karthik TN', upi: 'karthik.tn@okhdfcbank', initial: 'K' },
    { name: 'Priya Sharma', upi: 'priya.s@paytm', initial: 'P' },
    { name: 'Ramesh Babu', upi: 'ramesh.b@ybl', initial: 'R' },
  ];

  const quickAmounts = ['100', '500', '1000', '2000'];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!recipient || isNaN(numAmount) || numAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newTxn: Transaction = {
        id: `TXN-${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        name: `Transfer to ${recipient.split('@')[0]}`,
        category: 'Transfer',
        serviceIconName: 'Send',
        provider: 'EnvelopePay UPI Transfer',
        date: 'Today, Just now',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now(),
        amount: numAmount,
        status: 'Success',
        referenceId: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}/ENV`,
        paymentMethod: `${user.linkedBank.bankName} •••• 4021`,
        goldEarnedMg: Number(((numAmount * 0.005) / 8.25 * 10).toFixed(2)),
        consumerNumber: recipient,
      };
      onSendSuccess(newTxn);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Send className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900">Send Money</h2>
              <p className="text-[10px] text-slate-500">Zero fee instant UPI transfer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSend} className="p-4 space-y-3.5">
          {/* Quick contacts */}
          <div>
            <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
              Recent UPI Contacts
            </span>
            <div className="grid grid-cols-3 gap-2">
              {quickContacts.map((c) => (
                <button
                  type="button"
                  key={c.upi}
                  onClick={() => setRecipient(c.upi)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    recipient === c.upi
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 mx-auto flex items-center justify-center text-xs font-bold mb-1">
                    {c.initial}
                  </div>
                  <div className="text-[10px] font-bold truncate">{c.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              UPI ID or Mobile Number
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. name@okhdfcbank or 9876543210"
              required
              className="w-full text-xs font-mono border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                ₹
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                required
                className="w-full text-lg font-black text-slate-900 border border-slate-200 rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div className="flex gap-1.5 mt-2">
              {quickAmounts.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className="flex-1 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95"
                >
                  +₹{amt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Add a note (optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's this for?"
              className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          {/* Payment debit source */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-600" />
              <span className="text-slate-700 font-semibold">Paying from:</span>
            </div>
            <span className="font-bold text-slate-900">
              {user.linkedBank.bankName} (•••• 4021)
            </span>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all disabled:opacity-75"
          >
            {isProcessing ? (
              <span>Authenticating UPI...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Pay ₹{amount || 0} via EnvelopePay UPI</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
