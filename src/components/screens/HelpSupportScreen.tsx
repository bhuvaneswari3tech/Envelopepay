import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  Headphones,
  Phone,
  Mail,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Send,
  HelpCircle,
  FileQuestion,
} from 'lucide-react';

interface HelpSupportScreenProps {
  onBack: () => void;
}

export const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'faqs' | 'contact' | 'report'>('faqs');

  // Report problem state
  const [reportCategory, setReportCategory] = useState('Payment Debited but Not Credited');
  const [reportTxnId, setReportTxnId] = useState('TXN-98421049281');
  const [reportDesc, setReportDesc] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const faqs = [
    {
      q: 'When does the biller reflect my utility payment?',
      a: 'Most payments through EnvelopePay Bharat BillPay (BBPS) reflect instantly or within 15–30 minutes with the electricity board or mobile operator. You will receive an official operator confirmation SMS.',
    },
    {
      q: 'How does EnvelopePay Digital Gold work?',
      a: 'Every time you settle a bill or recharge, you receive 24 Karat 99.9% pure digital gold. The gold is held in bank-grade insured vaults managed by MMTC-PAMP. You can sell it back for cash or request doorstep physical coin delivery.',
    },
    {
      q: 'What if money is deducted from my bank but the transaction shows Failed?',
      a: 'As per RBI auto-reversal guidelines, any amount debited for a failed transaction will be refunded back to your source bank account within T+2 banking working days.',
    },
    {
      q: 'Is EnvelopePay approved by RBI and NPCI?',
      a: 'Yes, EnvelopePay operates as an authorized Bharat Bill Payment Operating Unit (BBPOU) partner and compliant NPCI Unified Payments Interface (UPI) third-party application.',
    },
    {
      q: 'How do I upgrade to the full KYC Tier?',
      a: 'Go to Profile > KYC Status, submit your PAN card number and verify your Aadhaar via OTP. Your account daily limit will immediately elevate to ₹1,00,000.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setReportDesc('');
      setActiveTab('faqs');
    }, 2800);
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-tight">
            Help & Support
          </h1>
          <p className="text-[11px] text-slate-500">
            24x7 resolution, FAQs and support desk
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'faqs'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          FAQs
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'contact'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Contact Us
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'report'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Report Issue
        </button>
      </div>

      {/* TAB 1: FAQS */}
      {activeTab === 'faqs' && (
        <div className="space-y-3.5">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
          </div>

          <div className="space-y-2">
            {filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-2 hover:bg-slate-50 cursor-pointer"
                  >
                    <span className="text-xs font-bold text-slate-900">
                      {faq.q}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-indigo-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CONTACT US */}
      {activeTab === 'contact' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Get in Touch
            </h3>

            {/* Helpline Phone */}
            <a
              href="tel:18008891234"
              className="p-3 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-indigo-50/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Toll-Free Helpline
                  </div>
                  <div className="text-[11px] text-slate-500">
                    1800-889-1234 (Available 24x7 in 6 languages)
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-700">Call Now</span>
            </a>

            {/* Email Support */}
            <a
              href="mailto:support@envelopepay.in"
              className="p-3 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-indigo-50/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Email Support
                  </div>
                  <div className="text-[11px] text-slate-500">
                    support@envelopepay.in (Average reply &lt; 2 hrs)
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-700">Email</span>
            </a>

            {/* In-App Live Agent */}
            <button
              onClick={() => alert('Starting live support chat with Priya from EnvelopePay Desk...')}
              className="w-full p-3 rounded-xl border border-indigo-200 bg-indigo-50/50 flex items-center justify-between hover:bg-indigo-100/50 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-indigo-950">
                    Instant Live Chat
                  </div>
                  <div className="text-[11px] text-indigo-700">
                    Connect with specialized payments officer
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-900">Start Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: REPORT A PROBLEM */}
      {activeTab === 'report' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          {reportSubmitted ? (
            <div className="py-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Ticket #ENV-{Math.floor(100000 + Math.random() * 900000)} Created
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Our grievance officer will review your transaction logs and provide resolution within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleReportSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Issue Category
                </label>
                <select
                  value={reportCategory}
                  onChange={(e) => setReportCategory(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                >
                  <option>Payment Debited but Not Credited</option>
                  <option>Bill Not Updated at Operator End</option>
                  <option>Gold Cashback Not Received</option>
                  <option>KYC Document Verification Delay</option>
                  <option>Other Grievance</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Transaction ID / Reference
                </label>
                <input
                  type="text"
                  value={reportTxnId}
                  onChange={(e) => setReportTxnId(e.target.value)}
                  placeholder="e.g. TXN-98421049281"
                  className="w-full text-xs font-mono border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Description of Issue
                </label>
                <textarea
                  rows={3}
                  value={reportDesc}
                  onChange={(e) => setReportDesc(e.target.value)}
                  placeholder="Please describe what happened..."
                  required
                  className="w-full text-xs border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance Ticket</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
