import React from 'react';
import { Flame, Heart, Layers } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';

export const ProfilePage: React.FC = () => {
  const { userProfile, posts } = usePosts();

  // Filter posts created by the current user
  const userPosts = posts.filter((p) => p.author.name === userProfile.name);

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] rounded-3xl overflow-hidden shadow-sm">
        {/* Decorative Top Cover */}
        <div className="h-28 bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--accent-yellow)]" />

        <div className="p-6 relative pt-0">
          {/* Avatar & Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-12 mb-4 gap-4">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-[var(--accent-yellow)] overflow-hidden shadow-lg shrink-0">
              <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-[var(--accent-yellow)] text-[var(--accent-yellow-text)] font-extrabold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
                <Flame className="w-4 h-4 fill-[var(--accent-yellow-text)]" />
                <span>{userProfile.streakDays} Day Streak</span>
              </div>
              <div className="bg-purple-100 text-[var(--primary)] font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-xs">
                Level {userProfile.level} Creator
              </div>
            </div>
          </div>

          {/* User Bio Information */}
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-[var(--text-main)]">{userProfile.name}</h1>
            <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-wide">{userProfile.title}</p>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium pt-1 leading-relaxed">
              {userProfile.bio}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-[var(--border-subtle)] text-center">
            <div className="bg-[var(--bg-input)] p-3 rounded-2xl">
              <span className="text-xs text-[var(--text-muted)] font-bold block">Creations</span>
              <span className="font-extrabold text-lg text-[var(--text-main)]">
                {userProfile.gallery.length + userPosts.length}
              </span>
            </div>
            <div className="bg-[var(--bg-input)] p-3 rounded-2xl">
              <span className="text-xs text-[var(--text-muted)] font-bold block">Streak</span>
              <span className="font-extrabold text-lg text-[var(--accent-yellow-text)]">
                {userProfile.streakDays} Days
              </span>
            </div>
            <div className="bg-[var(--bg-input)] p-3 rounded-2xl">
              <span className="text-xs text-[var(--text-muted)] font-bold block">Level</span>
              <span className="font-extrabold text-lg text-[var(--primary)]">Lvl {userProfile.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Creations Gallery */}
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] p-6 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[var(--primary)]" />
          <h2 className="font-extrabold text-[var(--text-main)] text-lg">Creation Gallery</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userProfile.gallery.map((item) => (
            <div
              key={item.id}
              className="bg-[var(--bg-input)] rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-xs hover:border-[var(--primary)] transition-all group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-[var(--primary)] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <h3 className="font-bold text-[var(--text-main)] text-xs truncate">{item.title}</h3>
                <div className="flex items-center gap-1 text-xs font-bold text-[var(--danger)] shrink-0">
                  <Heart className="w-3.5 h-3.5 fill-[var(--danger)]" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
