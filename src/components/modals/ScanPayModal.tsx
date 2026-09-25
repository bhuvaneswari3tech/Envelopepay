import React, { useState } from 'react';
import {
  X,
  Camera,
  Flashlight,
  Image,
  QrCode,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Transaction } from '../../types';

interface ScanPayModalProps {
  onClose: () => void;
  onScannedMerchantPay: (merchantName: string, defaultAmount: number) => void;
}

export const ScanPayModal: React.FC<ScanPayModalProps> = ({
  onClose,
  onScannedMerchantPay,
}) => {
  const [flashlightOn, setFlashlightOn] = useState(false);

  const sampleMerchants = [
    { name: 'FreshMart Supermarket (Hosur)', amount: 480 },
    { name: 'Cafe Coffee & Bakes', amount: 160 },
    { name: 'TNEB Bill Counter (QR)', amount: 845 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-slate-900 w-full max-w-sm rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col text-white">
        {/* Top Control Bar */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-bold text-white">Scan Any QR Code</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFlashlightOn(!flashlightOn)}
              className={`p-2 rounded-full transition-colors ${
                flashlightOn ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}
              title="Toggle Flash"
            >
              <Flashlight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewfinder area */}
        <div className="relative p-6 flex flex-col items-center justify-center bg-black/40 min-h-[260px]">
          {/* Scanning Box */}
          <div className="relative w-56 h-56 rounded-2xl border-2 border-indigo-500/50 flex items-center justify-center overflow-hidden">
            {/* Corner reticles */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-400 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-400 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-400 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-400 rounded-br-lg" />

            {/* Laser scanning beam */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-amber-400 to-indigo-500 shadow-[0_0_12px_#6366f1] animate-[pulse_2s_infinite]" />

            <div className="text-center p-3 opacity-60">
              <QrCode className="w-16 h-16 mx-auto text-indigo-300 mb-1" />
              <span className="text-[11px] text-slate-300">
                Align BharatQR / UPI QR inside box
              </span>
            </div>
          </div>
        </div>

        {/* Quick Test Demo QRs */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Tap a demo merchant to simulate scan:
          </span>
          <div className="space-y-1.5">
            {sampleMerchants.map((m, idx) => (
              <button
                key={idx}
                onClick={() => onScannedMerchantPay(m.name, m.amount)}
                className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-indigo-950/70 border border-slate-800 hover:border-indigo-500 flex items-center justify-between text-left transition-all group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-300">
                    {m.name}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Auto-fill: ₹{m.amount}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
