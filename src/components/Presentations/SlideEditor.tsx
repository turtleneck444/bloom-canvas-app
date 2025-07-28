import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Presentation } from 'lucide-react'; // Added for the new template indicator
import { Toolbar } from './toolbar';

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

  // Refactor renderSlideContent so that for ALL slide types, the title and subtitle/description are always rendered at the top of the slide, both in edit and preview mode.
  // For all cases, render:
  // - Title (input in edit mode, h1 in preview mode)
  // - Subtitle/description (input in edit mode, p in preview mode)
  // - Content area (textarea/input in edit mode, content in preview mode)

  const renderSlideContent = () => {
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
                "bg-transparent border-none outline-none w-full placeholder-white/70 font-bold mb-4 transition-all duration-200 focus:ring-2 focus:ring-cyan-400 focus:shadow-neon-cyan hover:shadow-neon-cyan font-orbitron",
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
                  "bg-transparent border-none outline-none w-full placeholder-white/70 opacity-90 mb-6 transition-all duration-200 focus:ring-2 focus:ring-cyan-400 focus:shadow-neon-cyan hover:shadow-neon-cyan font-orbitron",
                  getContentSizeClass(slide.contentSize)
                )}
                style={{ color: slide.textColor }}
                placeholder="Enter description..."
              />
            )}
            {/* Content area for each slide type */}
            {slide.template === 'bullets' ? (
              <div className="space-y-4">
                {slide.bulletPoints?.map((bullet, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: slide.accentColor }} />
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => updateBulletPoint(index, e.target.value)}
                      className={cn(
                        "bg-transparent border-none outline-none flex-1 placeholder-white/70 transition-all duration-200 focus:ring-2 focus:ring-cyan-400 focus:shadow-neon-cyan hover:shadow-neon-cyan font-orbitron",
                        getContentSizeClass(slide.contentSize)
                      )}
                      style={{ color: slide.textColor }}
                      placeholder="Enter bullet point..."
                    />
                    <button onClick={() => removeBulletPoint(index)} className="text-red-400 hover:text-red-300 opacity-70 hover:opacity-100 transition-opacity">×</button>
                  </div>
                ))}
                <button onClick={addBulletPoint} className="flex items-center gap-2 text-white/70 hover:text-white/90 transition-colors mt-4">+ Add bullet point</button>
              </div>
            ) : slide.template === 'two-column' ? (
              <div className="grid grid-cols-2 gap-12">
                <textarea
                  value={slide.content}
                  onChange={(e) => onSlideEdit(slide.id, 'content', e.target.value)}
                  className={cn(
                    "bg-transparent border-none outline-none w-full h-40 resize-none placeholder-white/70 transition-all duration-200 focus:ring-2 focus:ring-cyan-400 focus:shadow-neon-cyan hover:shadow-neon-cyan font-orbitron",
                    getContentSizeClass(slide.contentSize)
                  )}
                  style={{ color: slide.textColor }}
                  placeholder="Enter content for left column..."
                />
                <textarea
                  value={slide.subtitle || ''}
                  onChange={(e) => onSlideEdit(slide.id, 'subtitle', e.target.value)}
                  className={cn(
                    "bg-transparent border-none outline-none w-full h-40 resize-none placeholder-white/70 transition-all duration-200 focus:ring-2 focus:ring-cyan-400 focus:shadow-neon-cyan hover:shadow-neon-cyan font-orbitron",
                    getContentSizeClass(slide.contentSize)
                  )}
                  style={{ color: slide.textColor }}
                  placeholder="Enter content for right column..."
                />
              </div>
            ) : (
              <textarea
                value={slide.content}
                onChange={(e) => onSlideEdit(slide.id, 'content', e.target.value)}
                className={cn(
                  "bg-transparent border-none outline-none w-full flex-1 resize-none placeholder-white/70 leading-relaxed transition-all duration-200 focus:ring-2 focus:ring-cyan-400 focus:shadow-neon-cyan hover:shadow-neon-cyan font-orbitron",
                  getContentSizeClass(slide.contentSize)
                )}
                style={{ color: slide.textColor }}
                placeholder="Click to edit and add your content here"
              />
            )}
          </>
        ) : (
          <>
            <h1 className={cn("font-bold mb-4", getTitleSizeClass(slide.titleSize))} style={{ color: slide.textColor }}>{slide.title}</h1>
            {slide.subtitle && (
              <p className={cn("opacity-90 mb-6", getContentSizeClass(slide.contentSize))} style={{ color: slide.textColor }}>{slide.subtitle}</p>
            )}
            {/* Content area for each slide type */}
            {slide.template === 'bullets' ? (
              <ul className="space-y-4">
                {slide.bulletPoints?.map((bullet, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: slide.accentColor }} />
                    <span className={getContentSizeClass(slide.contentSize)} style={{ color: slide.textColor }}>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : slide.template === 'two-column' ? (
              <div className="grid grid-cols-2 gap-12">
                <div className={getContentSizeClass(slide.contentSize)} style={{ color: slide.textColor }}>{slide.content}</div>
                <div className={getContentSizeClass(slide.contentSize)} style={{ color: slide.textColor }}>{slide.subtitle}</div>
              </div>
            ) : (
              <div className={cn("leading-relaxed", getContentSizeClass(slide.contentSize))} style={{ color: slide.textColor }}>
                {slide.content.split('\n').map((line, index) => (
                  <p key={index} className="mb-4">{line}</p>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // Tag editing state
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // Drawing state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingMode, setDrawingMode] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  // Drawing handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setLastPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current || !lastPoint) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#f59e42';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    setLastPoint({ x, y });
  };
  const handlePointerUp = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };
  const handleClearDrawing = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // Tag handlers
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
      e.preventDefault();
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };
  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Toolbar/selection state
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState<{ top: number; left: number }>({ top: 80, left: 0 });
  const editorRef = useRef<HTMLDivElement>(null);

  // Show toolbar only when text is selected
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !editorRef.current || !editorRef.current.contains(selection.anchorNode)) {
        setShowToolbar(false);
        return;
      }
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setToolbarPosition({
        top: rect.top + window.scrollY - 48,
        left: rect.left + window.scrollX + rect.width / 2,
      });
      setShowToolbar(true);
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  // Formatting handler
  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
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
      {/* Floating Toolbar (only when text is selected and not in preview mode) */}
      {!isPreviewMode && showToolbar && (
        <div
          className="fixed z-50"
          style={{ top: toolbarPosition.top, left: toolbarPosition.left, transform: 'translate(-50%, -100%)' }}
        >
          <Toolbar onFormat={handleFormat} />
        </div>
      )}
      {/* Tag Editor (chips-style) */}
      {/* Remove tag editor UI (chips and input) */}
      {/* Remove draw toggle button from top right */}
      {/* Only show drawing feature in preview mode */}
      {isPreviewMode && drawingMode && (
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="absolute inset-0 z-40 w-full h-full cursor-crosshair"
          style={{ pointerEvents: 'auto' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      )}
      {isPreviewMode && drawingMode && (
        <button
          className="absolute right-8 top-20 z-30 px-3 py-1 rounded-full text-xs font-semibold shadow-md bg-white/80 text-orange-700 hover:bg-orange-100"
          onClick={handleClearDrawing}
        >
          Clear Drawing
        </button>
      )}
      {/* Content (contentEditable) */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-16">
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