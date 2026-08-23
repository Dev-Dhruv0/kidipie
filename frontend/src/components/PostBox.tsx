import React, { useState, useRef, type ChangeEvent } from 'react';
import { Image as ImageIcon, X, Loader2, Send } from 'lucide-react';
import type { PostBoxProps } from '../types';

const DEFAULT_AVATAR =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD8C7v89BbvbxExfwokilCsyCE7_12H6aNd6ymyP8uS6BndYixNQDTkGqjXFNqbPutu_2g0S1_rshnxg8Wyft6sGpcpSP97ncGEpIJoryw8x5whdP7ONUvi99jkkxyfboFcgZWhH6YJAEqD1m0QVoxhHVsmEYE5REKrR6sbS9-zsP0jwpbFd_CjbT-QmqeJbup8NzU8eXTD0Ffs_ZcpUTlVy_krv9yIMmuFBKW5akSX8Mrlzbx3tKNL';

const TAG_OPTIONS = ['Project', 'Drawing', 'Craft', 'Science'];

const PostBox: React.FC<PostBoxProps> = ({
    currentUser,
    onPost,
    placeholder = 'Share what you made today...',
    className = '',
}) => {
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<string>('Project');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                setSelectedImage(e.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    };

    const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleImageFile(e.target.files[0]);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmedContent = content.trim();
        if (!trimmedContent && !selectedImage) return;

        setIsSubmitting(true);
        try {
            if (onPost) {
                await onPost({
                    content: trimmedContent,
                    imageUrl: selectedImage || undefined,
                    tag: selectedTag,
                });
            }
            setContent('');
            setSelectedImage(null);
        } catch (err) {
            console.error('Failed to publish post:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = content.trim().length > 0 || !!selectedImage;
    const avatarUrl = currentUser?.avatar || (currentUser as any)?.avatarUrl || DEFAULT_AVATAR;

    return (
        <div className={`bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#e4e3db] shadow-sm ${className}`}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={onFileInputChange}
                accept="image/*"
                className="hidden"
            />

            {/* Input Row */}
            <div className="flex gap-3 sm:gap-4 items-start">
                <div className="w-11 h-11 rounded-full border-2 border-[#5d39df] overflow-hidden bg-[#f5f4ec] shrink-0">
                    <img
                        src={avatarUrl}
                        alt={currentUser?.name || 'User'}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={placeholder}
                        rows={2}
                        className="w-full bg-[#f5f4ec] border border-[#c9c4d8] focus:border-[#5d39df] focus:bg-white rounded-xl p-3 text-sm sm:text-base font-medium text-[#1b1c17] placeholder-[#797587] outline-none resize-none transition-colors"
                    />

                    {/* Image Preview */}
                    {selectedImage && (
                        <div className="mt-3 relative inline-block">
                            <img
                                src={selectedImage}
                                alt="Attachment preview"
                                className="w-32 h-32 object-cover rounded-xl border border-[#e4e3db]"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 bg-[#ba1a1a] text-white p-1 rounded-full shadow-md hover:bg-red-700 transition-colors cursor-pointer"
                                title="Remove photo"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}

                    {/* Action Bar */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#e4e3db]">
                        <div className="flex items-center gap-2 flex-wrap">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-[#fcd03d] text-[#705900] font-bold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 hover:brightness-95 transition-all cursor-pointer"
                            >
                                <ImageIcon className="w-4 h-4" />
                                <span>Photo</span>
                            </button>

                            {/* Category Tags */}
                            <div className="flex items-center gap-1">
                                {TAG_OPTIONS.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => setSelectedTag(tag)}
                                        className={`text-xs px-2.5 py-1 rounded-full font-bold transition-colors cursor-pointer ${selectedTag === tag
                                            ? 'bg-[#5d39df] text-white'
                                            : 'bg-[#f5f4ec] text-[#484555] hover:bg-[#e4e3db]'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleSubmit()}
                            disabled={!isFormValid || isSubmitting}
                            className={`bg-[#5d39df] text-white font-bold text-sm px-5 py-2 rounded-xl flex items-center gap-2 transition-all ${isFormValid && !isSubmitting
                                ? 'hover:bg-[#4c2dc7] cursor-pointer'
                                : 'opacity-50 cursor-not-allowed'
                                }`}
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                            <span>Post</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostBox;
