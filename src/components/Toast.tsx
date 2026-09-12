import React from 'react';
import { Check, ShoppingBag, Heart } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'cart' | 'wishlist';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <aside
      aria-label="Notification"
      className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-fade-in"
    >
      <div className="w-7 h-7 rounded-full bg-[#8B6B4D] text-white flex items-center justify-center shrink-0">
        {type === 'cart' ? (
          <ShoppingBag className="w-3.5 h-3.5" />
        ) : (
          <Heart className="w-3.5 h-3.5 fill-current" />
        )}
      </div>
      <p className="text-xs font-medium tracking-wide font-sans">{message}</p>
    </aside>
  );
};
