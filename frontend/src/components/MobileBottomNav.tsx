import React from 'react';
import { Home, Users, Plus, Flame, User } from 'lucide-react';
import type { TabType } from '../types';

interface MobileBottomNavProps {
    currentTab: TabType;
    onSelectTab: (tab: TabType) => void;
    onOpenNewPost: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
    currentTab,
    onSelectTab,
    onOpenNewPost,
}) => {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#fbf9f1] border-t-2 border-[#e4e3db] shadow-[0px_-4px_16px_rgba(93,57,223,0.08)] flex justify-around items-center px-3 py-2 pb-safe">
            {/* Home */}
            <button
                onClick={() => onSelectTab('home')}
                className={`flex flex-col items-center justify-center p-1.5 transition-transform active:scale-95 ${currentTab === 'home' ? 'text-[#5d39df] scale-105' : 'text-[#484555]'
                    }`}
            >
                <Home className={`w-6 h-6 ${currentTab === 'home' ? 'fill-[#5d39df]' : ''}`} />
                <span className="text-[11px] font-bold mt-0.5">Home</span>
            </button>

            {/* Groups / Communities */}
            <button
                onClick={() => onSelectTab('communities')}
                className={`flex flex-col items-center justify-center p-1.5 transition-transform active:scale-95 ${currentTab === 'communities' ? 'text-[#5d39df] scale-105' : 'text-[#484555]'
                    }`}
            >
                <Users className={`w-6 h-6 ${currentTab === 'communities' ? 'fill-[#5d39df]' : ''}`} />
                <span className="text-[11px] font-bold mt-0.5">Groups</span>
            </button>

            {/* Center FAB Post */}
            <button
                onClick={onOpenNewPost}
                className="flex flex-col items-center justify-center -mt-6 active:scale-90 transition-transform"
            >
                <div className="w-14 h-14 bg-[#5d39df] text-white rounded-full flex items-center justify-center shadow-lg chunky-btn-primary border-4 border-[#fbf9f1]">
                    <Plus className="w-8 h-8 stroke-[3]" />
                </div>
                <span className="text-[10px] font-bold text-[#5d39df] mt-0.5">Post</span>
            </button>

            {/* Streaks */}
            <button
                onClick={() => onSelectTab('streaks')}
                className={`flex flex-col items-center justify-center p-1.5 transition-transform active:scale-95 ${currentTab === 'streaks' ? 'text-[#5d39df] scale-105' : 'text-[#484555]'
                    }`}
            >
                <Flame className={`w-6 h-6 ${currentTab === 'streaks' ? 'fill-[#5d39df]' : ''}`} />
                <span className="text-[11px] font-bold mt-0.5">Streaks</span>
            </button>

            {/* Profile */}
            <button
                onClick={() => onSelectTab('profile')}
                className={`flex flex-col items-center justify-center p-1.5 transition-transform active:scale-95 ${currentTab === 'profile' ? 'text-[#5d39df] scale-105' : 'text-[#484555]'
                    }`}
            >
                <div className="relative flex flex-col items-center">
                    {currentTab === 'profile' && (
                        <div className="absolute -inset-1.5 bg-[#5d39df]/15 rounded-full -z-10 animate-pulse" />
                    )}
                    <User className={`w-6 h-6 ${currentTab === 'profile' ? 'fill-[#5d39df]' : ''}`} />
                    <span className="text-[11px] font-bold mt-0.5">Profile</span>
                </div>
            </button>
        </nav>
    );
};
