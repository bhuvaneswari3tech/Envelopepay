import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  ShieldCheck,
  MapPin,
  Bell,
  Globe,
  Moon,
  Lock,
  Smartphone,
  ChevronRight,
  Headphones,
  FileText,
  Shield,
  HelpCircle,
  Check,
} from 'lucide-react';
import { UserProfile, SubScreenType } from '../../types';

interface SettingsScreenProps {
  user: UserProfile;
  onBack: () => void;
  onOpenSubScreen: (sub: SubScreenType) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  user,
  onBack,
  onOpenSubScreen,
}) => {
  const [notificationsPush, setNotificationsPush] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [biometricsActive, setBiometricsActive] = useState(true);
  const [twoFactorActive, setTwoFactorActive] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  const languages = ['English', 'Tamil (தமிழ்)', 'Hindi (हिन्दी)', 'Telugu (తెలుగు)', 'Kannada (ಕನ್ನಡ)'];

  const triggerToast = (msg: string) => {
    setSavedSuccessMsg(msg);
    setTimeout(() => setSavedSuccessMsg(''), 2500);
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
            Settings
          </h1>
          <p className="text-[11px] text-slate-500">
            Account, preferences, security & legal
          </p>
        </div>
      </div>

      {savedSuccessMsg && (
        <div className="p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{savedSuccessMsg}</span>
        </div>
      )}

      {/* ACCOUNT */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          Account
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-indigo-700" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Personal Information
                </div>
                <div className="text-[11px] text-slate-500">
                  {user.name} · {user.phone}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded">
              Active
            </span>
          </div>

          <button
            onClick={() => onOpenSubScreen('kyc')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                  KYC Verification
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  Status: {user.kycStatus}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
          </button>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Primary Location
                </div>
                <div className="text-[11px] text-slate-500">
                  {user.location}, {user.state}
                </div>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-600">
              Hosur
            </span>
          </div>
        </div>
      </section>

      {/* PREFERENCES */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          Preferences
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-indigo-700" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Push Notifications
                </div>
                <div className="text-[11px] text-slate-500">
                  Instant bill due alerts and cashbacks
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsPush}
                onChange={(e) => {
                  setNotificationsPush(e.target.checked);
                  triggerToast('Notification preferences updated');
                }}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <button
            onClick={() => setShowLanguageModal(true)}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">Language</div>
                <div className="text-[11px] text-slate-500">
                  Current: {selectedLanguage}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-700">
              <span>Change</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-purple-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">App Theme</div>
                <div className="text-[11px] text-slate-500">
                  Clean Fintech White (Optimized for Sunlight)
                </div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              Light (Default)
            </span>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          Security
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          <button
            onClick={() => triggerToast('Password & UPI PIN reset link sent via SMS')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-indigo-700" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Change Password / UPI PIN
                </div>
                <div className="text-[11px] text-slate-500">
                  Update your 4 or 6-digit MPIN
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Two-Factor Authentication (2FA)
                </div>
                <div className="text-[11px] text-slate-500">
                  SMS OTP on unknown device login
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactorActive}
                onChange={(e) => {
                  setTwoFactorActive(e.target.checked);
                  triggerToast('Two-Factor Authentication toggled');
                }}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Biometric Login
                </div>
                <div className="text-[11px] text-slate-500">
                  Unlock app with FaceID / Fingerprint
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={biometricsActive}
                onChange={(e) => {
                  setBiometricsActive(e.target.checked);
                  triggerToast('Biometric lock status updated');
                }}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </section>

      {/* SUPPORT & LEGAL */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          Support & Legal
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          <button
            onClick={() => onOpenSubScreen('help')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-indigo-700" />
              <span className="text-xs font-bold text-slate-900">Help Center</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => onOpenSubScreen('help')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Headphones className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-900">Contact Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <div
            onClick={() => triggerToast('Terms of Service: RBI and BBPS compliance guaranteed.')}
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-900">
                Terms & Conditions
              </span>
            </div>
            <span className="text-[10px] text-slate-400">v2.4</span>
          </div>

          <div
            onClick={() => triggerToast('Privacy Policy: End-to-end 256-bit bank grade encryption.')}
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-900">
                Privacy Policy
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Compliant</span>
          </div>
        </div>
      </section>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-4 w-full max-w-sm border border-slate-200 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Select Regional Language
            </h3>
            <div className="space-y-1.5">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setShowLanguageModal(false);
                    triggerToast(`Language changed to ${lang}`);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between ${
                    selectedLanguage === lang
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span>{lang}</span>
                  {selectedLanguage === lang && <Check className="w-4 h-4 text-indigo-700" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowLanguageModal(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
