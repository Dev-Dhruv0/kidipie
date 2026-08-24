import React from 'react';
import { Home, Compass, Users, Flame, PlusCircle, Plus } from 'lucide-react';
import type { TabType } from '../types';

interface SidebarProps {
    currentTab: TabType;
    onSelectTab: (tab: TabType) => void;
    onOpenNewPost: () => void;
    onOpenSafetyCenter: () => void;
    onOpenParentGate: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    currentTab,
    onSelectTab,
    onOpenNewPost,
}) => {
    const navItems = [
        { id: 'home' as TabType, label: 'Home', icon: Home },
        { id: 'explore' as TabType, label: 'Explore', icon: Compass },
        { id: 'clan' as TabType, label: 'Clan', icon: Users },
        { id: 'streaks' as TabType, label: 'Streaks', icon: Flame },
        { id: 'create' as TabType, label: 'Create', icon: PlusCircle },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-[73px] bottom-0 bg-[#fbf9f1] border-r-2 border-[#e4e3db] py-6 px-3 z-40 overflow-y-auto">
            {/* Creator Profile Snippet */}
            {/* <div className="bg-[#fcd03d] text-[#705900] font-bold text-xs px-3.5 py-2 rounded-full mt-1.5 flex items-center gap-1.5 shadow-sm">
                <Flame className="w-3.5 h-4.5 fill-[#705900]" />
                {userProfile.streakDays} Day Streak! 🔥
            </div> */}
            {/* Nav Tabs */}
            <nav className="mt-8 flex-1 flex flex-col gap-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelectTab(item.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-base transition-all duration-200 ${isActive
                                ? 'bg-[#fcd03d] text-[#705900] shadow-sm translate-x-1'
                                : 'text-[#484555] hover:bg-[#f0eee6] hover:text-[#5d39df] active:translate-y-0.5'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'fill-[#705900]' : ''}`} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Action Button: New Post */}
            <div className="px-1 mt-4 mb-4">
                <button
                    onClick={onOpenNewPost}
                    className="chunky-btn-primary w-full bg-[#5d39df] text-white font-bold text-lg py-3.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
                >
                    <Plus className="w-6 h-6 stroke-[3]" />
                    <span>New Post</span>
                </button>
            </div>
        </aside >
    );
};

export default Sidebar;
