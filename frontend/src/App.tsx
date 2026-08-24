import "./App.css";
import { Header } from "./components/Header";
import Sidebar from "./components/Sidebar";
import PostBox from "./components/PostBox";
import type { UserProfile, TabType, PostItem } from "./types";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { useState } from "react";

function App() {
  const [currentTab, setCurrentTab] = useState<TabType>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [posts, setPosts] = useState<PostItem[]>([]);

  const userProfile: UserProfile = {
    name: "RayPamber",
    title: "Digital Alchemist",
    bio: "Transforming ideas into reality, one project at a time.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8C7v89BbvbxExfwokilCsyCE7_12H6aNd6ymyP8uS6BndYixNQDTkGqjXFNqbPutu_2g0S1_rshnxg8Wyft6sGpcpSP97ncGEpIJoryw8x5whdP7ONUvi99jkkxyfboFcgZWhH6YJAEqD1m0QVoxhHVsmEYE5REKrR6sbS9-zsP0jwpbFd_CjbT-QmqeJbup8NzU8eXTD0Ffs_ZcpUTlVy_krv9yIMmuFBKW5akSX8Mrlzbx3tKNL",
    streakDays: 10,
    level: 5,
    xp: 500,
    xpNextLevel: 1000,
    streakCalendar: [true, true, false, true, false, true, true],
    gallery: [],
  };

  const handlePost = (newPostData: {
    content: string;
    imageUrl?: string;
    tag?: string;
  }) => {
    const newPost: PostItem = {
      id: Date.now().toString(),
      author: userProfile,
      content: newPostData.content,
      imageUrl: newPostData.imageUrl,
      tag: newPostData.tag,
      timestamp: "Just now",
      likesCount: 0,
      reactions: { heart: 0, surprised: 0, sparkles: 0 },
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f1] text-[#1b1c17] flex flex-col font-sans selection:bg-[#fcd03d] selection:text-[#705900]">
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        userProfile={userProfile}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenHelp={() => {}}
      />
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative pb-20 lg:pb-6">
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenNewPost={() => setIsNewPostModalOpen(true)}
          onOpenSafetyCenter={() => {}}
          onOpenParentGate={() => {}}
        />

        {/* Main Content View */}
        <main className="flex-1 lg:ml-64 p-4 md:p-6 max-w-3xl">
          {currentTab === "home" && (
            <div className="space-y-6">
              {/* PostBox Component */}
              <PostBox
                currentUser={userProfile}
                onPost={handlePost}
                placeholder="Share your latest project or idea..."
              />

              {/* Feed List */}
              {posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-2xl p-5 border-2 border-[#e4e3db] shadow-sm space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full border-2 border-[#5d39df] object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-[#1b1c17] text-sm">
                            {post.author.name}
                          </h4>
                          <span className="text-xs text-[#797587]">
                            {post.timestamp}
                          </span>
                        </div>
                        {post.tag && (
                          <span className="ml-auto bg-[#5d39df] text-white text-xs px-3 py-1 rounded-full font-bold">
                            {post.tag}
                          </span>
                        )}
                      </div>
                      {post.content && (
                        <p className="text-[#1b1c17] font-medium text-base">
                          {post.content}
                        </p>
                      )}
                      {post.imageUrl && (
                        <div className="rounded-xl overflow-hidden border border-[#e4e3db]">
                          <img
                            src={post.imageUrl}
                            alt="Post attachment"
                            className="w-full max-h-96 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/60 border-2 border-dashed border-[#c9c4d8] rounded-2xl p-8 text-center">
                  <p className="text-[#797587] font-medium">
                    No posts yet. Share something above!
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenNewPost={() => setIsNewPostModalOpen(true)}
      />
    </div>
  );
}

export default App;
