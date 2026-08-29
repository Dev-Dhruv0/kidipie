import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Compass, Users, Flame, Plus, User } from "lucide-react";

interface MobileBottomNavProps {
  onOpenNewPost: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenNewPost,
}) => {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/explore", label: "Explore", icon: Compass },
    { to: "/communities", label: "Clans", icon: Users },
    { to: "/streaks", label: "Streaks", icon: Flame },
    { to: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-app)] border-t-2 border-[var(--border-subtle)] shadow-[0px_-4px_16px_rgba(93,57,223,0.08)] flex justify-around items-center px-2 py-2 pb-safe">
      {navItems.slice(0, 2).map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-1.5 transition-transform active:scale-95 ${
                isActive
                  ? "text-[var(--primary)] scale-105 font-extrabold"
                  : "text-[var(--text-secondary)] font-bold"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-5 h-5 ${isActive ? "fill-[var(--primary)]" : ""}`}
                />
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}

      {/* Center FAB Post */}
      <button
        onClick={onOpenNewPost}
        className="flex flex-col items-center justify-center -mt-6 active:scale-90 transition-transform cursor-pointer"
      >
        <div className="w-13 h-13 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-lg chunky-btn-primary border-4 border-[var(--bg-app)]">
          <Plus className="w-7 h-7 stroke-[3]" />
        </div>
        <span className="text-[10px] font-bold text-[var(--primary)] mt-0.5">
          Post
        </span>
      </button>

      {navItems.slice(2).map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-1.5 transition-transform active:scale-95 ${
                isActive
                  ? "text-[var(--primary)] scale-105 font-extrabold"
                  : "text-[var(--text-secondary)] font-bold"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-5 h-5 ${isActive ? "fill-[var(--primary)]" : ""}`}
                />
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
