/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  TabType,
  SubScreenType,
  UserProfile,
  Transaction,
  ServiceItem,
  NotificationItem,
  GoldRewardTransaction,
} from './types';
import {
  initialUserProfile,
  sampleTransactions,
  goldRewardHistory,
  initialNotifications,
  billPayServices,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { GoldRewardsScreen } from './components/screens/GoldRewardsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { KycScreen } from './components/screens/KycScreen';
import { PaymentFlowModal } from './components/screens/PaymentFlowModal';
import { PaymentSuccessModal } from './components/screens/PaymentSuccessModal';
import { NotificationScreen } from './components/screens/NotificationScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { HelpSupportScreen } from './components/screens/HelpSupportScreen';
import { ScanPayModal } from './components/modals/ScanPayModal';
import { SendMoneyModal } from './components/modals/SendMoneyModal';
import { AddMoneyModal } from './components/modals/AddMoneyModal';
import { ReceiptModal } from './components/modals/ReceiptModal';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentSubScreen, setCurrentSubScreen] = useState<SubScreenType>('none');

  // Application Data State
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [goldHistory, setGoldHistory] = useState<GoldRewardTransaction[]>(goldRewardHistory);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Active Modals & Selection Context
  const [selectedServiceForPayment, setSelectedServiceForPayment] = useState<ServiceItem | null>(null);
  const [selectedTransactionForReceipt, setSelectedTransactionForReceipt] = useState<Transaction | null>(null);
  const [lastCompletedTransaction, setLastCompletedTransaction] = useState<Transaction | null>(null);
  const [showDeviceFrame, setShowDeviceFrame] = useState<boolean>(true);

  // Unread notifications count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handlers
  const handleOpenSubScreen = (sub: SubScreenType, data?: any) => {
    setCurrentSubScreen(sub);
  };

  const handleCloseSubScreen = () => {
    setCurrentSubScreen('none');
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceForPayment(service);
    setCurrentSubScreen('payment');
  };

  const handleSelectTransaction = (tx: Transaction) => {
    setSelectedTransactionForReceipt(tx);
    setCurrentSubScreen('receipt');
  };

  const handlePaymentSuccess = (newTxn: Transaction) => {
    // Add to transactions at the top
    setTransactions((prev) => [newTxn, ...prev]);

    // Credit gold if earned
    if (newTxn.goldEarnedMg) {
      setUser((prev) => ({
        ...prev,
        goldBalanceMg: Number((prev.goldBalanceMg + newTxn.goldEarnedMg!).toFixed(2)),
      }));

      const newGoldTx: GoldRewardTransaction = {
        id: `GLD-${Date.now()}`,
        title: `${newTxn.provider} Cashback`,
        source: newTxn.category,
        date: 'Today',
        amountMg: newTxn.goldEarnedMg,
        type: 'credit',
      };
      setGoldHistory((prev) => [newGoldTx, ...prev]);
    }

    // Add notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      category: 'Payments',
      title: `${newTxn.name} Successful`,
      description: `Payment of ₹${newTxn.amount} completed via ${newTxn.paymentMethod}. Txn ID: ${newTxn.id}`,
      time: 'Just now',
      read: false,
      actionText: 'View Receipt',
      actionTarget: 'receipt',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setLastCompletedTransaction(newTxn);
    setCurrentSubScreen('none');
  };

  const handleSendMoneySuccess = (newTxn: Transaction) => {
    handlePaymentSuccess(newTxn);
  };

  const handleAddMoneySuccess = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + amount,
    }));
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(10000000000 + Math.random() * 90000000000)}`,
      name: 'Added Money to Wallet',
      category: 'Other',
      serviceIconName: 'Wallet',
      provider: 'HDFC NetBanking Auto-load',
      date: 'Today, Just now',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      amount: amount,
      status: 'Success',
      referenceId: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}/WLT`,
      paymentMethod: 'HDFC Bank •••• 4021',
      consumerNumber: user.phone,
    };
    setTransactions((prev) => [newTxn, ...prev]);
    setCurrentSubScreen('none');
  };

  const handleScannedMerchantPay = (merchantName: string, defaultAmount: number) => {
    // Open payment flow preloaded with merchant
    const simulatedService: ServiceItem = {
      id: 'merchant_qr',
      name: merchantName,
      icon: 'QrCode',
      category: 'bill',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      popularProviders: [merchantName],
    };
    setSelectedServiceForPayment(simulatedService);
    setCurrentSubScreen('payment');
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    if (notif.actionTarget === 'receipt' && transactions.length > 0) {
      setSelectedTransactionForReceipt(transactions[0]);
      setCurrentSubScreen('receipt');
    } else if (notif.actionTarget === 'payment') {
      setSelectedServiceForPayment(billPayServices[0]);
      setCurrentSubScreen('payment');
    }
  };

  const handleUpdateLocation = (newLoc: string, newState: string) => {
    setUser((prev) => ({ ...prev, location: newLoc, state: newState }));
  };

  const handleKycCompleted = () => {
    setUser((prev) => ({ ...prev, kycStatus: 'Verified' }));
  };

  const handleLogout = () => {
    alert('Logged out. Session reset.');
    setActiveTab('home');
    setCurrentSubScreen('none');
  };

  // Render the current active screen
  const renderCurrentScreen = () => {
    // Sub-screens take priority if navigated to directly
    if (currentSubScreen === 'notifications') {
      return (
        <NotificationScreen
          notifications={notifications}
          onBack={handleCloseSubScreen}
          onMarkAllRead={handleMarkAllNotificationsRead}
          onNotificationClick={handleNotificationClick}
        />
      );
    }

    if (currentSubScreen === 'settings') {
      return (
        <SettingsScreen
          user={user}
          onBack={handleCloseSubScreen}
          onOpenSubScreen={(sub) => setCurrentSubScreen(sub)}
        />
      );
    }

    if (currentSubScreen === 'help') {
      return <HelpSupportScreen onBack={handleCloseSubScreen} />;
    }

    if (currentSubScreen === 'kyc') {
      return (
        <KycScreen
          onBack={handleCloseSubScreen}
          onKycCompleted={handleKycCompleted}
        />
      );
    }

    // Main 4 Navigation Tabs
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            user={user}
            recentTransactions={transactions}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              setCurrentSubScreen('none');
            }}
            onOpenSubScreen={handleOpenSubScreen}
            onSelectService={handleSelectService}
            onSelectTransaction={handleSelectTransaction}
          />
        );
      case 'history':
        return (
          <HistoryScreen
            transactions={transactions}
            onSelectTransaction={handleSelectTransaction}
          />
        );
      case 'rewards':
        return (
          <GoldRewardsScreen
            user={user}
            goldHistory={goldHistory}
            onOpenPayment={() => {
              setSelectedServiceForPayment(billPayServices[0]);
              setCurrentSubScreen('payment');
            }}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            user={user}
            onOpenSubScreen={handleOpenSubScreen}
            onUpdateUserLocation={handleUpdateLocation}
            onToggleKycStatus={() => {
              setUser((prev) => ({
                ...prev,
                kycStatus:
                  prev.kycStatus === 'Verified'
                    ? 'Pending'
                    : prev.kycStatus === 'Pending'
                    ? 'Required'
                    : 'Verified',
              }));
            }}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  const showHeaderAndNav =
    currentSubScreen === 'none' ||
    (currentSubScreen !== 'notifications' &&
      currentSubScreen !== 'settings' &&
      currentSubScreen !== 'help' &&
      currentSubScreen !== 'kyc');

  return (
    <div className="min-h-screen bg-slate-200/70 flex flex-col items-center justify-start p-0 md:py-6 antialiased">
      {/* Top Device View Switcher for Developer & Previewer Comfort */}
      <aside aria-label="Device Preview Controls" className="hidden md:flex items-center justify-between w-full max-w-md mb-3 px-2 text-xs text-slate-600">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>EnvelopePay Mobile Preview</span>
        </div>
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-300 shadow-2xs">
          <button
            onClick={() => setShowDeviceFrame(true)}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all ${
              showDeviceFrame
                ? 'bg-indigo-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Frame</span>
          </button>
          <button
            onClick={() => setShowDeviceFrame(false)}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all ${
              !showDeviceFrame
                ? 'bg-indigo-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Full Width</span>
          </button>
        </div>
      </aside>

      {/* Main Application Container */}
      <div
        className={`w-full bg-white relative transition-all duration-300 flex flex-col overflow-x-hidden ${
          showDeviceFrame
            ? 'max-w-[430px] min-h-[880px] md:rounded-[42px] md:border-[10px] md:border-slate-850 md:shadow-2xl md:ring-1 md:ring-slate-900/10'
            : 'max-w-2xl min-h-screen shadow-md'
        }`}
      >
        {/* Mobile Status Bar (Visible in Frame mode or clean bar) */}
        <div className="pt-2 px-6 pb-1 bg-white flex items-center justify-between text-xs text-slate-800 font-semibold select-none border-b border-slate-50">
          <span>09:41</span>
          {/* Dynamic Island Pill / Speaker Notch */}
          <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto" />
          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Header (compact & clean) */}
        {showHeaderAndNav && (
          <Header
            onOpenNotifications={() => setCurrentSubScreen('notifications')}
            onOpenHelp={() => setCurrentSubScreen('help')}
            unreadCount={unreadCount}
            currentSubScreen={currentSubScreen}
          />
        )}

        {/* Screen Content Container */}
        <main className="flex-1 overflow-y-auto no-scrollbar bg-slate-50/50">
          {renderCurrentScreen()}
        </main>

        {/* Bottom Navigation */}
        {showHeaderAndNav && (
          <BottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setCurrentSubScreen('none');
            }}
            goldMg={user.goldBalanceMg}
          />
        )}

        {/* MODAL 1: Payment Flow Modal */}
        {currentSubScreen === 'payment' && (
          <PaymentFlowModal
            initialService={selectedServiceForPayment}
            user={user}
            onClose={handleCloseSubScreen}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {/* MODAL 2: Payment Success Modal */}
        {lastCompletedTransaction && (
          <PaymentSuccessModal
            transaction={lastCompletedTransaction}
            onBackToHome={() => {
              setLastCompletedTransaction(null);
              setActiveTab('home');
              setCurrentSubScreen('none');
            }}
            onViewReceipt={() => {
              setSelectedTransactionForReceipt(lastCompletedTransaction);
              setLastCompletedTransaction(null);
              setCurrentSubScreen('receipt');
            }}
          />
        )}

        {/* MODAL 3: Scan & Pay Modal */}
        {currentSubScreen === 'scan' && (
          <ScanPayModal
            onClose={handleCloseSubScreen}
            onScannedMerchantPay={(merchant, amt) => {
              handleCloseSubScreen();
              handleScannedMerchantPay(merchant, amt);
            }}
          />
        )}

        {/* MODAL 4: Send Money Modal */}
        {currentSubScreen === 'send_money' && (
          <SendMoneyModal
            user={user}
            onClose={handleCloseSubScreen}
            onSendSuccess={handleSendMoneySuccess}
          />
        )}

        {/* MODAL 5: Add Money Modal */}
        {currentSubScreen === 'add_money' && (
          <AddMoneyModal
            user={user}
            onClose={handleCloseSubScreen}
            onAddSuccess={handleAddMoneySuccess}
          />
        )}

        {/* MODAL 6: Receipt Modal */}
        {currentSubScreen === 'receipt' && selectedTransactionForReceipt && (
          <ReceiptModal
            transaction={selectedTransactionForReceipt}
            onClose={handleCloseSubScreen}
            onRepeatPayment={(tx) => {
              const matchingService =
                billPayServices.find(
                  (s) =>
                    s.name.toLowerCase().includes(tx.category.toLowerCase()) ||
                    s.category.toLowerCase().includes(tx.category.toLowerCase())
                ) || billPayServices[0];
              setSelectedServiceForPayment(matchingService);
              setCurrentSubScreen('payment');
            }}
          />
        )}
      </div>
    </div>
  );
}
