import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  MapPin,
  Settings,
  Lock,
  Smartphone,
  ChevronRight,
  Edit2,
  HelpCircle,
  FileQuestion,
  Headphones,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Landmark,
  Camera,
  Check,
} from 'lucide-react';
import { UserProfile, SubScreenType } from '../../types';

interface ProfileScreenProps {
  user: UserProfile;
  onOpenSubScreen: (sub: SubScreenType, data?: any) => void;
  onUpdateUserLocation: (newLocation: string, newState: string) => void;
  onToggleKycStatus: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onOpenSubScreen,
  onUpdateUserLocation,
  onToggleKycStatus,
  onLogout,
}) => {
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [cityInput, setCityInput] = useState(user.location);
  const [stateInput, setStateInput] = useState(user.state);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onUpdateUserLocation(cityInput.trim(), stateInput.trim() || 'Tamil Nadu');
      setIsEditingLocation(false);
    }
  };

  const getKycBadge = () => {
    switch (user.kycStatus) {
      case 'Verified':
        return {
          text: 'Verified',
          textColor: 'text-emerald-700',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          icon: CheckCircle2,
          desc: 'Full access · Daily payment limit ₹1,00,000',
        };
      case 'Pending':
        return {
          text: 'KYC Pending',
          textColor: 'text-amber-700',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          icon: Clock,
          desc: 'Verification in progress by NPCI partners',
        };
      case 'Required':
      default:
        return {
          text: 'KYC Required',
          textColor: 'text-rose-700',
          bgColor: 'bg-rose-50',
          borderColor: 'border-rose-200',
          icon: AlertTriangle,
          desc: 'Complete Aadhaar/PAN to unlock all features',
        };
    }
  };

  const kycBadge = getKycBadge();
  const KycIcon = kycBadge.icon;

  return (
    <div className="space-y-4 pb-28">
      {/* Modern Navy/Indigo Profile Header */}
      <div className="bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900 text-white px-5 pt-5 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            Account & Security
          </span>
          <button
            onClick={() => onOpenSubScreen('settings')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white focus:outline-none"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Avatar with edit badge */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-amber-400 p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-indigo-950 flex items-center justify-center text-xl font-bold text-white">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            </div>
            <button
              onClick={() => alert('Photo upload simulated successfully!')}
              className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center ring-2 ring-slate-900 shadow-xs active:scale-95"
              title="Edit Photo"
            >
              <Camera className="w-3 h-3" />
            </button>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white truncate">
                {user.name}
              </h1>
              <span className="bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-[10px] font-bold px-1.5 py-0.2 rounded-md shrink-0">
                PRO
              </span>
            </div>
            <p className="text-xs text-indigo-200/90 truncate mt-0.5">
              {user.email}
            </p>
            <p className="text-xs text-indigo-200/70 font-mono mt-0.5">
              {user.phone}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* KYC STATUS CARD */}
        <div
          onClick={() => onOpenSubScreen('kyc')}
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${kycBadge.bgColor} ${kycBadge.textColor}`}>
                <KycIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-medium text-slate-500">
                  KYC Status
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${kycBadge.textColor}`}>
                    {kycBadge.text}
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-indigo-600">
                    (Click to view flow)
                  </span>
                </div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
            {kycBadge.desc}
          </p>
        </div>

        {/* LOCATION CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          {!isEditingLocation ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-500">
                    Location
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {user.location}, {user.state}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsEditingLocation(true)}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveLocation} className="space-y-3">
              <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>Edit Registered Location</span>
                <button
                  type="button"
                  onClick={() => setIsEditingLocation(false)}
                  className="text-slate-400 hover:text-slate-600 text-[11px]"
                >
                  Cancel
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="City (e.g. Hosur)"
                  className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
                <input
                  type="text"
                  value={stateInput}
                  onChange={(e) => setStateInput(e.target.value)}
                  placeholder="State (e.g. Tamil Nadu)"
                  className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                />
              </div>
              <button
                type="submit"
                className="w-full py-1.5 bg-indigo-900 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-2xs"
              >
                <Check className="w-3.5 h-3.5" />
                Save Location
              </button>
            </form>
          )}
        </div>

        {/* ACCOUNT SECTION */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
            Account
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
            <button
              onClick={() => onOpenSubScreen('settings')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                    Profile
                  </div>
                  <div className="text-[11px] text-slate-500">
                    View & update your personal details
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onOpenSubScreen('settings')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                    Settings
                  </div>
                  <div className="text-[11px] text-slate-500">
                    App preferences & notifications
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Linked Bank Account Item */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{user.linkedBank.bankName}</span>
                    <span className="font-mono text-slate-600">
                      ({user.linkedBank.accountNumberMasked})
                    </span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                      Primary
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    IFSC: {user.linkedBank.ifsc}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-indigo-700">
                Active
              </span>
            </div>
          </div>
        </section>

        {/* SECURITY SECTION */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
            Security
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
            <button
              onClick={() => onOpenSubScreen('settings')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                    Change Password / PIN
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Keep your account secure
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Two-Factor Authentication Switch */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Two-Factor Authentication
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Add an extra layer of security
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Biometric Login */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Biometric & App PIN
                  </div>
                  <div className="text-[11px] text-slate-500">
                    TouchID / FaceID for quick unlock
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={biometricEnabled}
                  onChange={(e) => setBiometricEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* SUPPORT SECTION */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
            Help & Support
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
            <button
              onClick={() => onOpenSubScreen('help')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <FileQuestion className="w-4 h-4 text-indigo-700" />
                <span className="text-xs font-bold text-slate-900">
                  FAQs & Knowledge Base
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => onOpenSubScreen('help')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Headphones className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-slate-900">
                  Contact Us (24x7 Help Desk)
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => onOpenSubScreen('help')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold text-slate-900">
                  Report a Problem / Dispute
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </section>

        {/* LOGOUT BUTTON (Clean Outlined Red, Not Visually Dominant) */}
        <div className="pt-2">
          {!showLogoutConfirm ? (
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full py-2.5 px-4 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
              <p className="text-xs text-rose-900 font-semibold text-center">
                Are you sure you want to log out of EnvelopePay?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={onLogout}
                  className="flex-1 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-700 shadow-2xs"
                >
                  Yes, Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
