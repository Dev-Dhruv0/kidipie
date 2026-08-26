import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, HelpCircle, Bell, Sparkles, X } from 'lucide-react';
import type { NotificationItem } from '../types';
import { usePosts } from '../hooks/usePosts';
import NotificationDropdown from './NotificationDropdown';

interface HeaderProps {
  onOpenHelp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHelp }) => {
  const navigate = useNavigate();
  const { userProfile } = usePosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Mia_Arts loved your drawing! ❤️',
      time: '10m ago',
      read: false,
    },
    {
      id: 'n2',
      title: 'Daily Challenge is ready: Animal drawing! 🦁',
      time: '1h ago',
      read: false,
    },
    {
      id: 'n3',
      title: 'LeoBuilds replied: "Awesome BeepBoop!" 🤖',
      time: '2h ago',
      read: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-app)] border-b-2 border-[var(--border-subtle)] shadow-[0px_4px_0px_0px_rgba(93,57,223,0.08)] px-4 md:px-8 py-3 flex items-center justify-between">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 group select-none">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <span className="font-extrabold text-3xl md:text-4xl text-[var(--primary)] tracking-tight hover:scale-105 transition-transform">
          KidiPie
        </span>
      </Link>

      {/* Center Search (Desktop) */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--primary)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search friends & projects..."
            className="w-full bg-[var(--bg-card)] border-2 border-[var(--border-medium)] focus:border-[var(--primary)] rounded-full py-2.5 pl-12 pr-10 text-sm text-[var(--text-main)] outline-none transition-all shadow-inner placeholder-[var(--text-muted)] font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-4 relative">
        {/* Help Button */}
        <button
          onClick={onOpenHelp}
          title="Safe Help & Guidelines"
          className="w-11 h-11 rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] flex items-center justify-center text-[var(--primary)] hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          <HelpCircle className="w-6 h-6" />
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            className="w-11 h-11 rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--border-subtle)] flex items-center justify-center text-[var(--primary)] hover:scale-105 active:scale-95 transition-all shadow-sm relative cursor-pointer"
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <>
                <span className="absolute top-2 right-2 w-3 h-3 bg-[var(--danger)] rounded-full border-2 border-[var(--bg-app)] animate-ping" />
                <span className="absolute top-2 right-2 w-3 h-3 bg-[var(--danger)] rounded-full border-2 border-[var(--bg-app)]" />
              </>
            )}
          </button>

          {showNotifications && (
            <NotificationDropdown
              notifications={notifications}
              onMarkAllRead={markAllRead}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        {/* User Avatar -> Routes to Profile */}
        <Link
          to="/profile"
          title={`Go to ${userProfile.name}'s Profile`}
          className="w-11 h-11 rounded-full border-2 border-[var(--primary)] bg-[var(--accent-yellow)] overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-sm"
        >
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
            }}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
