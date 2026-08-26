import React, { useState } from 'react';
import { Users, Shield, Check, Plus, Sparkles } from 'lucide-react';
import type { Community } from '../types';

const INITIAL_COMMUNITIES: Community[] = [
  {
    id: 'c1',
    name: 'Robotics & AI Inventors 🤖',
    category: 'Tech',
    tagColor: 'bg-purple-100 text-purple-700',
    topBorderColor: 'border-t-purple-500',
    iconName: 'Cpu',
    description: 'A clan for kids building robots, coding apps, and experimenting with electronics!',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
    membersCount: 1420,
    membersAvatars: [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    ],
    isJoined: true,
    rules: ['Be respectful and encouraging', 'Share step-by-step photos of your build'],
    tags: ['Robotics', 'STEM', 'Coding'],
  },
  {
    id: 'c2',
    name: 'Digital Art Masters 🎨',
    category: 'Art',
    tagColor: 'bg-amber-100 text-amber-700',
    topBorderColor: 'border-t-amber-500',
    iconName: 'Palette',
    description: 'Share drawings, pixel art, digital paintings, and get friendly feedback.',
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
    membersCount: 2890,
    membersAvatars: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    ],
    isJoined: false,
    rules: ['Always give positive constructive feedback', 'No plagiarized art'],
    tags: ['Illustration', 'Animation', 'Sketching'],
  },
  {
    id: 'c3',
    name: 'Eco Crafters & Upcyclers 🌱',
    category: 'Making',
    tagColor: 'bg-emerald-100 text-emerald-700',
    topBorderColor: 'border-t-emerald-500',
    iconName: 'Recycle',
    description: 'Turning cardboard, bottles, and household materials into awesome inventions!',
    coverImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80',
    membersCount: 840,
    membersAvatars: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    ],
    isJoined: false,
    rules: ['Reuse materials safely', 'Get parent help when using hot glue'],
    tags: ['Eco', 'Upcycling', 'DIY'],
  },
];

export const CommunitiesPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>(INITIAL_COMMUNITIES);

  const toggleJoin = (id: string) => {
    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextState = !c.isJoined;
          return {
            ...c,
            isJoined: nextState,
            membersCount: nextState ? c.membersCount + 1 : Math.max(0, c.membersCount - 1),
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)] p-6 rounded-3xl shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-7 h-7 text-[var(--primary)]" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">Kids Clans & Clubs</h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">
            Join safe communities based on what you love to build, draw, and discover.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1 bg-[var(--accent-yellow)] text-[var(--accent-yellow-text)] font-extrabold text-xs px-3.5 py-2 rounded-2xl">
          <Sparkles className="w-4 h-4 fill-[var(--accent-yellow-text)]" />
          <span>Kid Safe Groups</span>
        </div>
      </div>

      {/* Clubs List */}
      <div className="space-y-5">
        {communities.map((club) => (
          <div
            key={club.id}
            className="bg-[var(--bg-card)] rounded-3xl border-2 border-[var(--border-subtle)] overflow-hidden shadow-sm hover:border-[var(--border-medium)] transition-all flex flex-col md:flex-row"
          >
            <div className="md:w-56 h-40 md:h-auto relative overflow-hidden bg-[var(--bg-input)] shrink-0">
              <img src={club.coverImage} alt={club.name} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-[var(--primary)] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                {club.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-extrabold text-[var(--text-main)] text-lg sm:text-xl">
                    {club.name}
                  </h2>
                  <button
                    onClick={() => toggleJoin(club.id)}
                    className={`px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                      club.isJoined
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-sm'
                    }`}
                  >
                    {club.isJoined ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Joined</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Join Club</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium mt-2 leading-relaxed">
                  {club.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {club.tags.map((t) => (
                    <span key={t} className="text-[11px] bg-[var(--bg-input)] text-[var(--text-secondary)] px-2.5 py-0.5 rounded-lg font-bold">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] font-semibold">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {club.membersAvatars.map((av, idx) => (
                      <img
                        key={idx}
                        src={av}
                        alt="Member"
                        className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <span>{club.membersCount.toLocaleString()} members</span>
                </div>
                <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                  <Shield className="w-3.5 h-3.5" /> Parent Moderated
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunitiesPage;
