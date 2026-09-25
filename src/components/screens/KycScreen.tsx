import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  CreditCard,
  UserCheck,
  Building,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { KycData } from '../../types';

interface KycScreenProps {
  onBack: () => void;
  onKycCompleted: () => void;
}

export const KycScreen: React.FC<KycScreenProps> = ({ onBack, onKycCompleted }) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: 'Bhuvaneswari R',
    dob: '1995-08-14',
    panNumber: 'ABCDE1234F',
    aadhaarNumber: '9842 1083 4910',
    address: 'No. 42, Gandhi Road, Phase 2',
    city: 'Hosur',
    state: 'Tamil Nadu',
    pincode: '635109',
    documentUploaded: true,
  });

  const [panFile, setPanFile] = useState<string | null>('pan_card_bhuvaneswari.pdf');
  const [aadhaarFile, setAadhaarFile] = useState<string | null>('aadhaar_card_masked.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stepsList = [
    { num: 1, title: 'Personal Details' },
    { num: 2, title: 'Identity Verification' },
    { num: 3, title: 'Address Details' },
    { num: 4, title: 'KYC Review' },
    { num: 5, title: 'Completed' },
  ];

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(5);
        onKycCompleted();
      }, 1500);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* Top Header with Back button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePrevStep}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-tight">
            KYC Verification
          </h1>
          <p className="text-[11px] text-slate-500">
            RBI & NPCI compliant e-KYC flow
          </p>
        </div>
      </div>

      {/* Clean 5-Step Progress Indicator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-3 left-4 right-4 h-0.5 bg-slate-200 -z-0" />
          {stepsList.map((s) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;

            return (
              <div
                key={s.num}
                className="flex flex-col items-center relative z-10"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                </div>
                <span
                  className={`text-[9px] mt-1 font-semibold text-center max-w-[60px] leading-tight ${
                    isCurrent
                      ? 'text-indigo-900 font-bold'
                      : isCompleted
                      ? 'text-emerald-700'
                      : 'text-slate-400'
                  }`}
                >
                  {s.title.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        {step === 1 && (
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <UserCheck className="w-5 h-5 text-indigo-700" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Step 1: Personal Details
                </h2>
                <p className="text-[11px] text-slate-500">
                  Must match your government identity records
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Full Name (as on PAN card)
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Permanent Account Number (PAN)
              </label>
              <input
                type="text"
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                maxLength={10}
                className="w-full text-xs font-mono uppercase border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <CreditCard className="w-5 h-5 text-indigo-700" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Step 2: Identity & Documents
                </h2>
                <p className="text-[11px] text-slate-500">
                  Upload clear photos or scanned copies
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Aadhaar Number (12 Digits)
              </label>
              <input
                type="text"
                value={formData.aadhaarNumber}
                onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                className="w-full text-xs font-mono border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold text-slate-700 block">
                Document Uploads
              </span>

              {/* PAN Upload Box */}
              <div className="border border-dashed border-slate-300 rounded-xl p-3 flex items-center justify-between bg-slate-50 hover:bg-indigo-50/20 transition-colors">
                <div className="flex items-center gap-2.5">
                  <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-800">
                      PAN Card Document
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {panFile || 'No file selected'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPanFile('pan_card_verified.pdf')}
                  className="text-xs font-bold text-indigo-700 hover:text-indigo-900 shrink-0 ml-2"
                >
                  {panFile ? 'Change' : 'Upload'}
                </button>
              </div>

              {/* Aadhaar Upload Box */}
              <div className="border border-dashed border-slate-300 rounded-xl p-3 flex items-center justify-between bg-slate-50 hover:bg-indigo-50/20 transition-colors">
                <div className="flex items-center gap-2.5">
                  <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-800">
                      Masked Aadhaar Card
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {aadhaarFile || 'No file selected'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAadhaarFile('aadhaar_card_masked_verified.pdf')}
                  className="text-xs font-bold text-indigo-700 hover:text-indigo-900 shrink-0 ml-2"
                >
                  {aadhaarFile ? 'Change' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <Building className="w-5 h-5 text-indigo-700" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Step 3: Address Verification
                </h2>
                <p className="text-[11px] text-slate-500">
                  Current communication residence
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Street Address / Door No.
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  City / Town
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  maxLength={6}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full text-xs font-mono border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-indigo-700" />
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Step 4: KYC Review & Submission
                </h2>
                <p className="text-[11px] text-slate-500">
                  Confirm accuracy before final digital signature
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 space-y-2 text-xs divide-y divide-slate-200/60">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">PAN Card:</span>
                <span className="font-mono font-bold text-slate-900">{formData.panNumber}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Aadhaar:</span>
                <span className="font-mono font-bold text-slate-900">{formData.aadhaarNumber}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">City & State:</span>
                <span className="font-bold text-slate-900">{formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Documents:</span>
                <span className="text-emerald-700 font-bold">2 Attached (Verified)</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-slate-600 bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100">
              <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
              <span>
                I hereby declare that the details provided are true to the best of my knowledge and comply with RBI KYC Master Directions.
              </span>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="py-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center ring-8 ring-emerald-50">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <h2 className="text-base font-extrabold text-slate-900">
              KYC Verification Complete!
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Congratulations! Your EnvelopePay account is now fully verified with unrestricted tier limits.
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>₹1,00,000 / Day Payment Limit Active</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onBack}
                className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Return to Account
              </button>
            </div>
          </div>
        )}

        {step < 5 && (
          <div className="pt-3 flex gap-2">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={handleNextStep}
              disabled={isSubmitting}
              className="flex-1 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Submitting to NPCI...</span>
              ) : step === 4 ? (
                <span>Confirm & Submit KYC</span>
              ) : (
                <span>Continue</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
