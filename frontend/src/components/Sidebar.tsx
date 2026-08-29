import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Users, Flame, Plus, User } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';

interface SidebarProps {
    onOpenNewPost: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenNewPost }) => {
    const { userProfile } = usePosts();

    const navItems = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/explore', label: 'Explore', icon: Compass },
        { to: '/communities', label: 'Clans', icon: Users },
        { to: '/streaks', label: 'Streaks', icon: Flame },
        { to: '/profile', label: 'Profile', icon: User },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-[69px] bottom-0 bg-[var(--bg-app)] border-r-2 border-[var(--border-subtle)] py-6 px-3 z-40 overflow-y-auto">
            {/* Streak Badge Widget */}
            {/* <div className="bg-[var(--accent-yellow)] text-[var(--accent-yellow-text)] font-bold text-xs px-3.5 py-2 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-1.5">
          <Flame className="w-4 h-4 fill-[var(--accent-yellow-text)]" />
          <span>{userProfile.streakDays} Day Streak! 🔥</span>
        </div>
        <span className="text-[10px] bg-white/60 px-2 py-0.5 rounded-full font-extrabold">
          Lvl {userProfile.level}
        </span>
      </div> */}

            {/* Nav List */}
            <nav className="mt-6 flex-1 flex flex-col gap-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-base transition-all duration-200 ${isActive
                                    ? 'bg-[var(--accent-yellow)] text-[var(--accent-yellow-text)] shadow-sm translate-x-1'
                                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--primary)] active:translate-y-0.5'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-5 h-5 ${isActive ? 'fill-[var(--accent-yellow-text)]' : ''}`} />
                                    <span>{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Action Button: New Post */}
            <div className="px-1 mt-4 mb-4">
                <button
                    onClick={onOpenNewPost}
                    className="chunky-btn-primary w-full bg-[var(--primary)] text-white font-bold text-base py-3.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                    <Plus className="w-5 h-5 stroke-[3]" />
                    <span>New Post</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
