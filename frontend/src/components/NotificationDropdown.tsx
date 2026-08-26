import React from 'react';
import { Bell, ShieldCheck } from 'lucide-react';
import type { NotificationItem } from '../types';

interface NotificationDropdownProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onMarkAllRead,
  onClose,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="absolute right-0 top-14 w-80 bg-[var(--bg-card)] rounded-2xl shadow-xl border-2 border-[var(--border-subtle)] p-4 z-50 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[var(--primary)]" />
          <h4 className="font-bold text-[var(--text-main)] text-sm">Notifications</h4>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="text-xs text-[var(--primary)] font-bold hover:underline cursor-pointer"
          >
            Mark read
          </button>
        )}
      </div>

      <div className="mt-2 space-y-2 max-h-64 overflow-y-auto pr-1">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-2.5 rounded-xl text-xs flex flex-col gap-1 transition-colors ${
              item.read
                ? 'bg-[var(--bg-input)] text-[var(--text-secondary)]'
                : 'bg-purple-50/80 text-[var(--primary)] font-semibold border border-purple-100'
            }`}
          >
            <span>{item.title}</span>
            <span className="text-[10px] text-[var(--text-muted)] font-normal">{item.time}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Safe Notifications
        </span>
        <button
          onClick={onClose}
          className="text-[var(--text-secondary)] hover:text-[var(--text-main)] font-bold cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
