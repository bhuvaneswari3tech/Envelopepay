import React from 'react';
import {
  Smartphone,
  Zap,
  Tv,
  CreditCard,
  GraduationCap,
  Droplet,
  Car,
  Wifi,
  Flame,
  Landmark,
  HelpCircle,
  Bell,
  CheckCircle2,
  Clock,
  Send,
  Plus,
  QrCode,
  ShieldCheck,
  Award,
  Wallet,
  Coins,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5', size = 20 }) => {
  switch (name) {
    case 'Smartphone':
      return <Smartphone className={className} size={size} />;
    case 'Zap':
      return <Zap className={className} size={size} />;
    case 'Tv':
      return <Tv className={className} size={size} />;
    case 'CreditCard':
      return <CreditCard className={className} size={size} />;
    case 'GraduationCap':
      return <GraduationCap className={className} size={size} />;
    case 'Droplet':
      return <Droplet className={className} size={size} />;
    case 'Car':
      return <Car className={className} size={size} />;
    case 'Wifi':
      return <Wifi className={className} size={size} />;
    case 'Flame':
      return <Flame className={className} size={size} />;
    case 'Landmark':
      return <Landmark className={className} size={size} />;
    case 'HelpCircle':
      return <HelpCircle className={className} size={size} />;
    case 'Bell':
      return <Bell className={className} size={size} />;
    case 'CheckCircle2':
      return <CheckCircle2 className={className} size={size} />;
    case 'Clock':
      return <Clock className={className} size={size} />;
    case 'Send':
      return <Send className={className} size={size} />;
    case 'Plus':
      return <Plus className={className} size={size} />;
    case 'QrCode':
      return <QrCode className={className} size={size} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} size={size} />;
    case 'Award':
      return <Award className={className} size={size} />;
    case 'Wallet':
      return <Wallet className={className} size={size} />;
    case 'Coins':
      return <Coins className={className} size={size} />;
    case 'FileText':
      return <FileText className={className} size={size} />;
    default:
      return <AlertCircle className={className} size={size} />;
  }
};
