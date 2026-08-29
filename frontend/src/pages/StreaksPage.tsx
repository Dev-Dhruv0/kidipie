import React from 'react';
import { Flame, Award, CheckCircle2, Circle, Zap } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import type { Badge } from '../types';

const BADGES: Badge[] = [
  {
    id: 'b1',
    title: 'Streak Starter 🔥',
    subtitle: 'Log in for 5 days in a row',
    icon: '🔥',
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-100',
    isUnlocked: true,
    description: 'Maintained a 5 day creation streak!',
  },
  {
    id: 'b2',
    title: 'Master Crafter 🛠️',
    subtitle: 'Post 10 project creations',
    icon: '🛠️',
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-100',
    isUnlocked: true,
    description: 'Shared 10 creative build photos.',
  },
  {
    id: 'b3',
    title: 'Friendly Neighbor 🤝',
    subtitle: 'Leave 25 positive comments',
    icon: '🤝',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-100',
    isUnlocked: false,
    progress: 18,
    maxProgress: 25,
    description: 'Encouraging creators in the community.',
  },
  {
    id: 'b4',
    title: 'Science Explorer 🔬',
    subtitle: 'Post 5 science experiments',
    icon: '🔬',
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-100',
    isUnlocked: false,
    progress: 3,
    maxProgress: 5,
    description: 'Exploring how the world works!',
  },
];

export const StreaksPage: React.FC = () => {
  const { userProfile } = usePosts();
  const xpPercentage = Math.min(100, Math.round((userProfile.xp / userProfile.xpNextLevel) * 100));

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6">
      {/* Level & Streak Hero Banner */}
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] p-6 rounded-3xl shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-yellow)] text-[var(--accent-yellow-text)] flex items-center justify-center shadow-md">
              <Flame className="w-9 h-9 fill-[var(--accent-yellow-text)] animate-bounce" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
                {userProfile.streakDays} Day Streak!
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-semibold">
                Keep creating daily to level up your badges!
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-input)] px-4 py-2 rounded-2xl border border-[var(--border-medium)] flex items-center gap-2">
            <Zap className="w-5 h-5 text-[var(--primary)] fill-[var(--primary)]" />
            <div>
              <span className="text-xs text-[var(--text-muted)] font-bold uppercase block">Level</span>
              <span className="font-extrabold text-base text-[var(--primary)]">Level {userProfile.level}</span>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-[var(--text-secondary)]">
            <span>XP Progress ({userProfile.xp} / {userProfile.xpNextLevel} XP)</span>
            <span>{xpPercentage}%</span>
          </div>
          <div className="w-full bg-[var(--bg-input)] h-3.5 rounded-full overflow-hidden p-0.5 border border-[var(--border-subtle)]">
            <div
              className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Streak Calendar Card */}
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] p-6 rounded-3xl shadow-sm space-y-4">
        <h2 className="font-extrabold text-[var(--text-main)] text-lg">Weekly Activity Calendar</h2>
        <div className="grid grid-cols-7 gap-2 text-center">
          {daysOfWeek.map((day, idx) => {
            const active = userProfile.streakCalendar[idx] ?? false;
            return (
              <div key={day} className="flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-[var(--text-muted)]">{day}</span>
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm transition-all ${
                    active
                      ? 'bg-[var(--accent-yellow)] text-[var(--accent-yellow-text)] shadow-sm scale-105'
                      : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
                  }`}
                >
                  {active ? '🔥' : '·'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] p-6 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-[var(--primary)]" />
            <h2 className="font-extrabold text-[var(--text-main)] text-lg">Your Badges</h2>
          </div>
          <span className="text-xs font-bold text-[var(--text-muted)]">
            {BADGES.filter((b) => b.isUnlocked).length} / {BADGES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BADGES.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border-2 flex items-start gap-3 transition-all ${
                b.isUnlocked
                  ? 'border-[var(--border-medium)] bg-[var(--bg-card)]'
                  : 'border-dashed border-[var(--border-subtle)] bg-[var(--bg-input)] opacity-75'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${b.bgClass}`}>
                {b.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[var(--text-main)] text-sm">{b.title}</h3>
                  {b.isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-[var(--text-muted)]" />
                  )}
                </div>
                <p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">{b.subtitle}</p>

                {!b.isUnlocked && b.progress !== undefined && b.maxProgress !== undefined && (
                  <div className="mt-2 space-y-1">
                    <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[var(--primary)] h-full rounded-full"
                        style={{ width: `${(b.progress / b.maxProgress) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] font-bold block text-right">
                      {b.progress} / {b.maxProgress}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreaksPage;
