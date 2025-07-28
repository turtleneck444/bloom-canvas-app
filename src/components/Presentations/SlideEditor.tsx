import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Slide {
  id: string;
  title: string;
  content: string;
  subtitle?: string;
  template: 'title' | 'content' | 'two-column' | 'image-text' | 'conclusion' | 'quote' | 'bullets';
  backgroundColor: string;
  backgroundImage?: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  titleSize: 'small' | 'medium' | 'large' | 'xl';
  contentSize: 'small' | 'medium' | 'large';
  alignment: 'left' | 'center' | 'right';
  bulletPoints?: string[];
  imageUrl?: string;
  quote?: string;
  quoteAuthor?: string;
}

interface SlideEditorProps {
  slide: Slide;
  onSlideEdit: (slideId: string, field: keyof Slide, value: any) => void;
  isPreviewMode: boolean;
}

const SlideEditor: React.FC<SlideEditorProps> = ({ slide, onSlideEdit, isPreviewMode }) => {
  const getFontClass = (fontFamily: string) => {
    switch (fontFamily) {
      case 'playfair': return 'font-playfair';
      case 'poppins': return 'font-poppins';
      case 'mono': return 'font-mono';
      default: return 'font-inter';
    }
  };

  const getTitleSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'text-2xl md:text-3xl';
      case 'medium': return 'text-3xl md:text-4xl';
      case 'large': return 'text-4xl md:text-5xl';
      case 'xl': return 'text-5xl md:text-6xl';
      default: return 'text-4xl md:text-5xl';
    }
  };

  const getContentSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'text-lg md:text-xl';
      case 'medium': return 'text-xl md:text-2xl';
      case 'large': return 'text-2xl md:text-3xl';
      default: return 'text-xl md:text-2xl';
    }
  };

  const getAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case 'left': return 'text-left';
      case 'right': return 'text-right';
      case 'center': return 'text-center';
      default: return 'text-left';
    }
  };

  const addBulletPoint = () => {
    const currentBullets = slide.bulletPoints || [];
    onSlideEdit(slide.id, 'bulletPoints', [...currentBullets, 'New bullet point']);
  };

  const updateBulletPoint = (index: number, value: string) => {
    const currentBullets = slide.bulletPoints || [];
    const newBullets = [...currentBullets];
    newBullets[index] = value;
    onSlideEdit(slide.id, 'bulletPoints', newBullets);
  };

  const removeBulletPoint = (index: number) => {
    const currentBullets = slide.bulletPoints || [];
    const newBullets = currentBullets.filter((_, i) => i !== index);
    onSlideEdit(slide.id, 'bulletPoints', newBullets);
  };

  const backgroundStyle = {
    backgroundColor: slide.backgroundColor,
    backgroundImage: slide.backgroundImage === 'gradient-mesh' 
      ? 'radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)'
      : slide.backgroundImage 
        ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.backgroundImage})`
        : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const renderSlideContent = () => {
    switch (slide.template) {
      case 'title':
        return (
          <div className={cn(
            "h-full flex flex-col justify-center items-center text-center p-16",
            getFontClass(slide.fontFamily),
            getAlignmentClass(slide.alignment)
          )}>
            {!isPreviewMode ? (
              <>
                <input
                  type="text"
                  value={slide.title}
                  onChange={(e) => onSlideEdit(slide.id, 'title', e.target.value)}
                  className={cn(
                    "bg-transparent border-none outline-none w-full placeholder-white/70 font-bold mb-6",
                    getTitleSizeClass(slide.titleSize)
                  )}
                  style={{ color: slide.textColor }}
                  placeholder="Enter slide title..."
                />
                {slide.subtitle !== undefined && (
                  <input
                    type="text"
                    value={slide.subtitle}
                    onChange={(e) => onSlideEdit(slide.id, 'subtitle', e.target.value)}
                    className={cn(
                      "bg-transparent border-none outline-none w-full placeholder-white/70 opacity-90",
                      getContentSizeClass(slide.contentSize)
                    )}
                    style={{ color: slide.textColor }}
                    placeholder="Enter subtitle..."
                  />
                )}
              </>
            ) : (
              <>
                <h1 
                  className={cn("font-bold mb-6", getTitleSizeClass(slide.titleSize))}
                  style={{ color: slide.textColor }}
                >
                  {slide.title}
                </h1>
                {slide.subtitle && (
                  <p 
                    className={cn("opacity-90", getContentSizeClass(slide.contentSize))}
                    style={{ color: slide.textColor }}
                  >
                    {slide.subtitle}
                  </p>
                )}
              </>
            )}
          </div>
        );

      case 'bullets':
        return (
          <div className={cn(
            "h-full flex flex-col justify-center p-16",
            getFontClass(slide.fontFamily),
            getAlignmentClass(slide.alignment)
          )}>
            {!isPreviewMode ? (
              <>
                <input
                  type="text"
                  value={slide.title}
                  onChange={(e) => onSlideEdit(slide.id, 'title', e.target.value)}
                  className={cn(
                    "bg-transparent border-none outline-none w-full placeholder-white/70 font-bold mb-8",
                    getTitleSizeClass(slide.titleSize)
                  )}
                  style={{ color: slide.textColor }}
                  placeholder="Enter slide title..."
                />
                <div className="space-y-4">
                  {slide.bulletPoints?.map((bullet, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: slide.accentColor }}
                      />
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => updateBulletPoint(index, e.target.value)}
                        className={cn(
                          "bg-transparent border-none outline-none flex-1 placeholder-white/70",
                          getContentSizeClass(slide.contentSize)
                        )}
                        style={{ color: slide.textColor }}
                        placeholder="Enter bullet point..."
                      />
                      <button
                        onClick={() => removeBulletPoint(index)}
                        className="text-red-400 hover:text-red-300 opacity-70 hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addBulletPoint}
                    className="flex items-center gap-2 text-white/70 hover:text-white/90 transition-colors mt-4"
                  >
                    + Add bullet point
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 
                  className={cn("font-bold mb-8", getTitleSizeClass(slide.titleSize))}
                  style={{ color: slide.textColor }}
                >
                  {slide.title}
                </h1>
                <ul className="space-y-4">
                  {slide.bulletPoints?.map((bullet, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: slide.accentColor }}
                      />
                      <span 
                        className={getContentSizeClass(slide.contentSize)}
                        style={{ color: slide.textColor }}
                      >
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );

      case 'two-column':
        return (
          <div className={cn(
            "h-full grid grid-cols-2 gap-12 p-16",
            getFontClass(slide.fontFamily)
          )}>
            <div className="space-y-6">
              {!isPreviewMode ? (
                <>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => onSlideEdit(slide.id, 'title', e.target.value)}
                    className={cn(
                      "bg-transparent border-none outline-none w-full placeholder-white/70 font-bold",
                      getTitleSizeClass(slide.titleSize)
                    )}
                    style={{ color: slide.textColor }}
                    placeholder="Enter title..."
                  />
                  <textarea
                    value={slide.content}
                    onChange={(e) => onSlideEdit(slide.id, 'content', e.target.value)}
                    className={cn(
                      "bg-transparent border-none outline-none w-full h-40 resize-none placeholder-white/70",
                      getContentSizeClass(slide.contentSize)
                    )}
                    style={{ color: slide.textColor }}
                    placeholder="Enter content for left column..."
                  />
                </>
              ) : (
                <>
                  <h1 
                    className={cn("font-bold", getTitleSizeClass(slide.titleSize))}
                    style={{ color: slide.textColor }}
                  >
                    {slide.title}
                  </h1>
                  <p 
                    className={getContentSizeClass(slide.contentSize)}
                    style={{ color: slide.textColor }}
                  >
                    {slide.content}
                  </p>
                </>
              )}
            </div>
            <div className="bg-white/10 rounded-2xl p-8 flex items-center justify-center">
              <span className="text-white/50 text-lg">Content Area</span>
            </div>
          </div>
        );

      default:
        return (
          <div className={cn(
            "h-full flex flex-col justify-center p-16",
            getFontClass(slide.fontFamily),
            getAlignmentClass(slide.alignment)
          )}>
            {!isPreviewMode ? (
              <>
                <input
                  type="text"
                  value={slide.title}
                  onChange={(e) => onSlideEdit(slide.id, 'title', e.target.value)}
                  className={cn(
                    "bg-transparent border-none outline-none w-full placeholder-white/70 font-bold mb-8",
                    getTitleSizeClass(slide.titleSize)
                  )}
                  style={{ color: slide.textColor }}
                  placeholder="Enter slide title..."
                />
                <textarea
                  value={slide.content}
                  onChange={(e) => onSlideEdit(slide.id, 'content', e.target.value)}
                  className={cn(
                    "bg-transparent border-none outline-none w-full flex-1 resize-none placeholder-white/70 leading-relaxed",
                    getContentSizeClass(slide.contentSize)
                  )}
                  style={{ color: slide.textColor }}
                  placeholder="Enter slide content..."
                />
              </>
            ) : (
              <>
                <h1 
                  className={cn("font-bold mb-8", getTitleSizeClass(slide.titleSize))}
                  style={{ color: slide.textColor }}
                >
                  {slide.title}
                </h1>
                <div 
                  className={cn("leading-relaxed", getContentSizeClass(slide.contentSize))}
                  style={{ color: slide.textColor }}
                >
                  {slide.content.split('\n').map((line, index) => (
                    <p key={index} className="mb-4">{line}</p>
                  ))}
                </div>
              </>
            )}
          </div>
        );
    }
  };

  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="aspect-video rounded-3xl shadow-2xl overflow-hidden relative border-4 border-white/20"
      style={backgroundStyle}
    >
      {/* Overlay for better text readability */}
      {slide.backgroundImage && (
        <div className="absolute inset-0 bg-black/20"></div>
      )}
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {renderSlideContent()}
      </div>
      
      {/* Slide Template Indicator */}
      {!isPreviewMode && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {slide.template}
        </div>
      )}
    </motion.div>
  );
};

export default SlideEditor;