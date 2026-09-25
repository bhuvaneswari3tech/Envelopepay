export type TabType = 'home' | 'history' | 'rewards' | 'profile';

export type SubScreenType = 
  | 'none'
  | 'kyc'
  | 'payment'
  | 'notifications'
  | 'settings'
  | 'help'
  | 'scan'
  | 'send_money'
  | 'add_money'
  | 'receipt';

export interface Transaction {
  id: string;
  name: string;
  category: 'Recharge' | 'Electricity' | 'DTH' | 'Credit Card' | 'Education' | 'Water / Gas' | 'Transfer' | 'Other';
  serviceIconName: string;
  provider: string;
  date: string;
  time: string;
  timestamp: number;
  amount: number;
  status: 'Success' | 'Pending' | 'Failed';
  referenceId: string;
  paymentMethod: string;
  goldEarnedMg?: number;
  consumerNumber?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  icon: string;
  category: 'recharge' | 'bill' | 'finance';
  color: string;
  popularProviders: string[];
}

export interface NotificationItem {
  id: string;
  category: 'Payments' | 'Rewards' | 'Offers' | 'Security';
  title: string;
  description: string;
  time: string;
  read: boolean;
  actionText?: string;
  actionTarget?: SubScreenType;
}

export interface GoldRewardTransaction {
  id: string;
  title: string;
  source: string;
  date: string;
  amountMg: number;
  type: 'credit' | 'debit';
}

export interface KycData {
  fullName: string;
  dob: string;
  panNumber: string;
  aadhaarNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: 'Verified' | 'Pending' | 'Required';
  step: number;
  documentUploaded: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  upiId: string;
  location: string;
  state: string;
  avatarUrl?: string;
  walletBalance: number;
  goldBalanceMg: number;
  kycStatus: 'Verified' | 'Pending' | 'Required';
  linkedBank: {
    bankName: string;
    accountNumberMasked: string;
    ifsc: string;
    isPrimary: boolean;
  };
}
