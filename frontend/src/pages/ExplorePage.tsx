import React, { useState } from 'react';
import { Search, Compass, Sparkles, Heart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface ProjectItem {
  id: string;
  title: string;
  category: 'Art' | 'Science' | 'Tech' | 'Making';
  author: string;
  avatar: string;
  imageUrl: string;
  likes: number;
  tags: string[];
}

const EXPLORE_ITEMS: ProjectItem[] = [
  {
    id: 'e1',
    title: 'Paper Maché Dragon Head 🐲',
    category: 'Art',
    author: 'Sora_Draws',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    likes: 48,
    tags: ['Sculpture', 'PaperCraft'],
  },
  {
    id: 'e2',
    title: 'Mini Water Turbine Model 🌊',
    category: 'Science',
    author: 'Sam_Hydro',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    likes: 62,
    tags: ['HydroPower', 'STEM'],
  },
  {
    id: 'e3',
    title: 'Python Turtle Art Generator 🐢',
    category: 'Tech',
    author: 'CoderDev',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    likes: 95,
    tags: ['Python', 'Coding'],
  },
  {
    id: 'e4',
    title: 'Recycled Cardboard Castle 🏰',
    category: 'Making',
    author: 'BuilderZoe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
    likes: 37,
    tags: ['EcoCraft', 'Diy'],
  },
];

const CATEGORIES = ['All', 'Art', 'Science', 'Tech', 'Making'];

export const ExplorePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const filteredItems = EXPLORE_ITEMS.filter((item) => {
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    const matchesQuery =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white p-6 rounded-3xl shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <Compass className="w-8 h-8 animate-spin-slow text-[var(--accent-yellow)]" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Explore & Discover</h1>
        </div>
        <p className="text-purple-100 text-sm font-medium">
          Check out amazing creations built by kids around the world!
        </p>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, tags, or creators..."
            className="w-full bg-white text-[var(--text-main)] placeholder-[var(--text-muted)] pl-12 pr-4 py-3 rounded-2xl text-sm font-semibold outline-none shadow-inner"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
              filterCategory === cat
                ? 'bg-[var(--accent-yellow)] text-[var(--accent-yellow-text)] shadow-sm'
                : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of creations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[var(--bg-card)] rounded-2xl border-2 border-[var(--border-subtle)] overflow-hidden shadow-sm hover:border-[var(--primary)] transition-all flex flex-col group"
          >
            <div className="relative h-48 bg-[var(--bg-input)] overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 right-3 bg-[var(--primary)] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                {item.category}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-[var(--text-main)] text-base group-hover:text-[var(--primary)] transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-6 h-6 rounded-full object-cover border border-[var(--primary)]"
                  />
                  <span className="text-xs font-semibold text-[var(--text-muted)]">{item.author}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div className="flex gap-1">
                  {item.tags.map((t) => (
                    <span key={t} className="text-[10px] bg-[var(--bg-input)] text-[var(--text-secondary)] px-2 py-0.5 rounded-md font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[var(--danger)]">
                  <Heart className="w-3.5 h-3.5 fill-[var(--danger)]" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-[var(--bg-card)] rounded-2xl border-2 border-dashed border-[var(--border-medium)] p-8 text-center">
          <Sparkles className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
          <p className="text-[var(--text-muted)] font-medium">No projects found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
