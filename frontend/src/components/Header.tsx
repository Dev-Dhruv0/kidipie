import React, { useState } from 'react';
import { Search, HelpCircle, Bell, Sparkles, X, CheckCircle, ShieldCheck } from 'lucide-react';
import type { TabType, UserProfile } from '../types';

interface HeaderProps {
    onSelectTab: (tab: TabType) => void;
    userProfile: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
    onSelectTab,
    userProfile,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState([
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
        }
    ]);

    const markAllRead = () => {
        setUnreadNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const onSearchChange = (e: any) => {
        console.log('search change', e)
    }

    const unreadCount = unreadNotifications.filter(n => !n.read).length;

    return (
        <header className="sticky top-0 z-50 bg-[#fbf9f1] border-b-2 border-[#e4e3db] shadow-[0px_4px_0px_0px_rgba(93,57,223,0.08)] px-4 md:px-8 py-3.5 flex items-center justify-between">
            {/* Brand Logo */}
            <div
                onClick={() => onSelectTab('home')}
                className="flex items-center gap-2 cursor-pointer group select-none"
            >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5d39df] to-[#7757f9] flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <span className="font-extrabold text-3xl md:text-4xl text-[#5d39df] tracking-tight hover:scale-105 transition-transform">
                    KidiPie
                </span>
            </div>

            {/* Center Search (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5d39df]" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search friends & projects..."
                        className="w-full bg-[#FFFDF5] border-2 border-[#c9c4d8] focus:border-[#5d39df] rounded-full py-2.5 pl-12 pr-10 text-base text-[#1b1c17] outline-none transition-all shadow-inner placeholder:text-stone-400 font-medium"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange(searchQuery)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-4 relative">
                {/* Help Button */}
                <button
                    title="Safe Help & Guidelines"
                    className="w-11 h-11 rounded-full bg-[#f0eee6] hover:bg-[#e4e3db] flex items-center justify-center text-[#5d39df] hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                    <HelpCircle className="w-6 h-6" />
                </button>

                {/* Notifications Button */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        title="Notifications"
                        className="w-11 h-11 rounded-full bg-[#f0eee6] hover:bg-[#e4e3db] flex items-center justify-center text-[#5d39df] hover:scale-105 active:scale-95 transition-all shadow-sm relative"
                    >
                        <Bell className="w-6 h-6" />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-3 h-3 bg-[#ba1a1a] rounded-full border-2 border-[#fbf9f1] animate-ping" />
                        )}
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-3 h-3 bg-[#ba1a1a] rounded-full border-2 border-[#fbf9f1]" />
                        )}
                    </button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-xl border-2 border-[#e4e3db] p-4 z-50 animate-in fade-in slide-in-from-top-2">
                            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                                <div className="flex items-center gap-2">
                                    <Bell className="w-4 h-4 text-[#5d39df]" />
                                    <h4 className="font-bold text-stone-800 text-sm">Notifications</h4>
                                </div>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllRead}
                                        className="text-xs text-[#5d39df] font-bold hover:underline"
                                    >
                                        Mark read
                                    </button>
                                )}
                            </div>
                            <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                                {unreadNotifications.map(item => (
                                    <div
                                        key={item.id}
                                        className={`p-2.5 rounded-xl text-xs flex flex-col gap-1 transition-colors ${item.read ? 'bg-stone-50 text-stone-600' : 'bg-[#e6deff]/40 text-[#1c0062] font-semibold'
                                            }`}
                                    >
                                        <span>{item.title}</span>
                                        <span className="text-[10px] text-stone-400 font-normal">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                                <span className="flex items-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Safe Notifications
                                </span>
                                <button
                                    onClick={() => setShowNotifications(false)}
                                    className="text-stone-500 hover:text-stone-800 font-bold"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Avatar */}
                <div
                    onClick={() => onSelectTab('profile')}
                    title="Go to Alex's World"
                    className="w-11 h-11 rounded-full border-2 border-[#5d39df] bg-[#fcd03d] overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                    <img
                        src={userProfile.avatar}
                        alt={userProfile.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </header>
    );
};
