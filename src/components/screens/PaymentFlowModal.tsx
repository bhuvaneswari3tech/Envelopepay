import React, { useState } from 'react';
import {
  ArrowLeft,
  X,
  CheckCircle2,
  Smartphone,
  CreditCard,
  Building2,
  Wallet,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Tag,
  Check,
  Zap,
} from 'lucide-react';
import { ServiceItem, UserProfile, Transaction } from '../../types';
import { billPayServices, quickRechargePlans } from '../../data/mockData';
import { IconRenderer } from '../common/IconRenderer';

interface PaymentFlowModalProps {
  initialService?: ServiceItem | null;
  user: UserProfile;
  onClose: () => void;
  onPaymentSuccess: (transaction: Transaction) => void;
}

export const PaymentFlowModal: React.FC<PaymentFlowModalProps> = ({
  initialService,
  user,
  onClose,
  onPaymentSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem>(
    initialService || billPayServices[0]
  );
  const [selectedProvider, setSelectedProvider] = useState<string>(
    (initialService || billPayServices[0]).popularProviders[0] || 'Jio Prepaid'
  );
  const [consumerInput, setConsumerInput] = useState<string>('9361309871');
  const [amount, setAmount] = useState<number>(299);
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'bank' | 'card' | 'wallet'>('bank');
  const [appliedCoupon, setAppliedCoupon] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [upiPin, setUpiPin] = useState<string>('••••');

  const discountAmount = appliedCoupon ? 50 : 0;
  const netPayable = Math.max(1, amount - discountAmount);
  // Gold reward calculation: 1% value converted to mg (₹8.25 per mg)
  const estimatedGoldMg = Number(((amount * 0.01) / 8.25 * 10).toFixed(2));

  const handleServiceSelect = (service: ServiceItem) => {
    setSelectedService(service);
    setSelectedProvider(service.popularProviders[0]);
    if (service.id === 'electricity') {
      setConsumerInput('09-241-008-142');
      setAmount(845);
    } else if (service.id === 'dth') {
      setConsumerInput('1092837461');
      setAmount(399);
    } else if (service.id === 'credit_card') {
      setConsumerInput('•••• •••• •••• 9012');
      setAmount(4250);
    } else {
      setConsumerInput('9361309871');
      setAmount(299);
    }
    setCurrentStep(2);
  };

  const handleConfirmPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newTxn: Transaction = {
        id: `TXN-${Math.floor(10000000000 + Math.random() * 90000000000)}`,
        name: `${selectedProvider} ${selectedService.name}`,
        category:
          selectedService.id === 'mobile'
            ? 'Recharge'
            : selectedService.id === 'electricity'
            ? 'Electricity'
            : selectedService.id === 'dth'
            ? 'DTH'
            : selectedService.id === 'credit_card'
            ? 'Credit Card'
            : selectedService.id === 'education'
            ? 'Education'
            : 'Water / Gas',
        serviceIconName: selectedService.icon,
        provider: selectedProvider,
        date: 'Today, Just now',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now(),
        amount: netPayable,
        status: 'Success',
        referenceId: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}/ENV`,
        paymentMethod:
          selectedMethod === 'wallet'
            ? 'EnvelopePay Wallet'
            : selectedMethod === 'bank'
            ? `${user.linkedBank.bankName} •••• 4021`
            : selectedMethod === 'upi'
            ? `${user.upiId}`
            : 'Visa Debit Card •••• 1084',
        goldEarnedMg: estimatedGoldMg,
        consumerNumber: consumerInput,
      };
      onPaymentSuccess(newTxn);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            {currentStep > 1 && !isProcessing && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-700 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                {currentStep === 1
                  ? 'Select Service'
                  : currentStep === 2
                  ? `Enter ${selectedService.name} Details`
                  : currentStep === 3
                  ? 'Select Amount / Plan'
                  : currentStep === 4
                  ? 'Payment Method'
                  : 'Review & Pay'}
              </h2>
              <div className="text-[10px] text-slate-500">
                Step {currentStep} of 5 · Secure BBPS Transaction
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto no-scrollbar space-y-4 flex-1">
          {/* STEP 1: Select Service */}
          {currentStep === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Choose the utility or bill category you want to pay:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {billPayServices.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => handleServiceSelect(srv)}
                    className="p-3 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 flex items-center gap-2.5 text-left transition-all active:scale-98"
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${srv.color}`}>
                      <IconRenderer name={srv.icon} className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      {srv.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Enter Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Select Provider / Operator
                </label>
                <div className="space-y-1.5">
                  {selectedService.popularProviders.map((prov) => (
                    <button
                      key={prov}
                      onClick={() => setSelectedProvider(prov)}
                      className={`w-full p-2.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                        selectedProvider === prov
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span>{prov}</span>
                      {selectedProvider === prov && (
                        <Check className="w-4 h-4 text-indigo-700" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  {selectedService.id === 'mobile'
                    ? 'Mobile Number'
                    : selectedService.id === 'electricity'
                    ? 'Consumer Connection Number'
                    : selectedService.id === 'dth'
                    ? 'Smart Card / Subscriber ID'
                    : selectedService.id === 'credit_card'
                    ? 'Card Number (Last 4 digits)'
                    : 'Account / Reference Number'}
                </label>
                <input
                  type="text"
                  value={consumerInput}
                  onChange={(e) => setConsumerInput(e.target.value)}
                  placeholder="Enter details..."
                  className="w-full text-xs font-mono font-bold border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>

              <button
                onClick={() => setCurrentStep(3)}
                disabled={!consumerInput}
                className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer disabled:opacity-50"
              >
                Continue to Amount
              </button>
            </div>
          )}

          {/* STEP 3: Enter Amount / Select Plan */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Enter Bill Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={10}
                    className="w-full text-lg font-black text-slate-900 border border-slate-200 rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>
              </div>

              {/* Quick Recharge Plans if mobile */}
              {selectedService.id === 'mobile' && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">
                    Recommended 5G Plans
                  </span>
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {quickRechargePlans.map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => setAmount(plan.price)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          amount === plan.price
                            ? 'border-indigo-600 bg-indigo-50/60 shadow-2xs'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-slate-900">
                              ₹{plan.price}
                            </span>
                            <span className="text-[10px] bg-indigo-100 text-indigo-900 font-bold px-1.5 py-0.2 rounded">
                              {plan.tag}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-700">
                            {plan.validity}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1">
                          {plan.data} · {plan.calls}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setCurrentStep(4)}
                disabled={amount <= 0}
                className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer disabled:opacity-50"
              >
                Proceed to Payment Method
              </button>
            </div>
          )}

          {/* STEP 4: Select Payment Method */}
          {currentStep === 4 && (
            <div className="space-y-3.5">
              <span className="text-xs font-bold text-slate-800 block">
                Choose Payment Option
              </span>

              {/* 1. UPI */}
              <button
                onClick={() => setSelectedMethod('upi')}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  selectedMethod === 'upi'
                    ? 'border-indigo-600 bg-indigo-50/70'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      EnvelopePay UPI / QR
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {user.upiId}
                    </div>
                  </div>
                </div>
                {selectedMethod === 'upi' && (
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                )}
              </button>

              {/* 2. Bank Account */}
              <button
                onClick={() => setSelectedMethod('bank')}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  selectedMethod === 'bank'
                    ? 'border-indigo-600 bg-indigo-50/70'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{user.linkedBank.bankName}</span>
                      <span className="font-mono text-slate-600">
                        {user.linkedBank.accountNumberMasked}
                      </span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      Direct Bank Transfer · Zero Fee
                    </div>
                  </div>
                </div>
                {selectedMethod === 'bank' && (
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                )}
              </button>

              {/* 3. Wallet */}
              <button
                onClick={() => setSelectedMethod('wallet')}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  selectedMethod === 'wallet'
                    ? 'border-indigo-600 bg-indigo-50/70'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      EnvelopePay Wallet Balance
                    </div>
                    <div className="text-[10px] text-slate-600">
                      Available: ₹{user.walletBalance.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                {selectedMethod === 'wallet' && (
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                )}
              </button>

              {/* 4. Card */}
              <button
                onClick={() => setSelectedMethod('card')}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  selectedMethod === 'card'
                    ? 'border-indigo-600 bg-indigo-50/70'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Debit / Credit Card
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Visa / MasterCard / RuPay
                    </div>
                  </div>
                </div>
                {selectedMethod === 'card' && (
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                )}
              </button>

              <button
                onClick={() => setCurrentStep(5)}
                className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Review Summary
              </button>
            </div>
          )}

          {/* STEP 5: Review & Confirm */}
          {currentStep === 5 && (
            <div className="space-y-3.5">
              {/* Bill Details Summary */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Biller / Provider:</span>
                  <span className="font-bold text-slate-900">{selectedProvider}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Consumer / ID:</span>
                  <span className="font-mono font-bold text-slate-900">{consumerInput}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Bill Amount:</span>
                  <span className="font-bold text-slate-900">₹{amount.toFixed(2)}</span>
                </div>

                {/* Promotional Coupon applied */}
                <div className="flex justify-between items-center text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>ENVELOPE50 Applied</span>
                  </div>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="font-extrabold text-slate-900 text-sm">
                    Net Amount Payable:
                  </span>
                  <span className="font-black text-indigo-950 text-base">
                    ₹{netPayable.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Gold Cashback Unlocked Preview */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-amber-950">
                    Reward on Payment:
                  </span>
                </div>
                <span className="font-extrabold text-amber-800 bg-white/80 px-2 py-0.5 rounded-full border border-amber-300">
                  +{estimatedGoldMg} mg 24K Gold
                </span>
              </div>

              {/* UPI PIN simulated input */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  NPCI UPI PIN / Biometric Confirmation
                </label>
                <div className="flex justify-center gap-2 my-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center font-black text-slate-800 bg-slate-50"
                    >
                      ●
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400">
                  Encrypted directly with NPCI Payment Switch
                </span>
              </div>

              {/* Confirm Pay Button */}
              <button
                onClick={handleConfirmPay}
                disabled={isProcessing}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment via NPCI...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹{netPayable.toFixed(2)} Securely</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
