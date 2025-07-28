import React, { useCallback, useRef, useEffect, useState } from 'react';
import PresentationToolbar from './PresentationToolbar';
import SlideEditor from './SlideEditor';
import { Button } from '../ui/button';
import { Plus, FileText, Download, Upload, Save, RotateCcw, Presentation, Trash2, Copy, Image as ImageIcon, Type, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

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

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundImage?: string;
  fontFamily: string;
}

const backgroundImages = [
  'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1920&h=1080&fit=crop', // Blue starry night
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1920&h=1080&fit=crop', // Ocean wave
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1920&h=1080&fit=crop', // Orange flowers
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&h=1080&fit=crop', // Pine trees
  'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&h=1080&fit=crop', // Sun through trees
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop', // Mountain landscape
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop', // Code on MacBook
  'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1920&h=1080&fit=crop', // iMac setup
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=1080&fit=crop', // Gray laptop
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop', // Java programming
];

const templates: Template[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and modern design for business presentations',
    preview: '🏢',
    primaryColor: 'hsl(25 95% 53%)',
    secondaryColor: 'hsl(31 91% 43%)',
    accentColor: 'hsl(45 93% 58%)',
    fontFamily: 'inter',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and vibrant design for creative presentations',
    preview: '🎨',
    primaryColor: 'hsl(142 76% 36%)',
    secondaryColor: 'hsl(134 61% 41%)',
    accentColor: 'hsl(160 84% 39%)',
    fontFamily: 'poppins',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design with focus on content',
    preview: '✨',
    primaryColor: 'hsl(221 39% 11%)',
    secondaryColor: 'hsl(215 28% 17%)',
    accentColor: 'hsl(217 91% 60%)',
    fontFamily: 'playfair',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Premium design with gradient backgrounds',
    preview: '💎',
    primaryColor: 'hsl(267 85% 66%)',
    secondaryColor: 'hsl(213 94% 68%)',
    accentColor: 'hsl(292 91% 76%)',
    fontFamily: 'playfair',
    backgroundImage: 'gradient-mesh',
  },
];

const fontOptions = [
  { id: 'inter', name: 'Inter', family: 'font-inter' },
  { id: 'playfair', name: 'Playfair Display', family: 'font-playfair' },
  { id: 'poppins', name: 'Poppins', family: 'font-poppins' },
  { id: 'mono', name: 'JetBrains Mono', family: 'font-mono' },
];

const PresentationCanvas: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);

  // Initialize with a default slide
  useEffect(() => {
    if (slides.length === 0) {
      const defaultSlide: Slide = {
        id: 'slide-1',
        title: 'Welcome to Your Presentation',
        content: 'Click to edit and add your content here',
        subtitle: 'Professional Slideshow Creator',
        template: 'title',
        backgroundColor: selectedTemplate.primaryColor,
        textColor: 'hsl(0 0% 100%)',
        accentColor: selectedTemplate.accentColor,
        fontFamily: selectedTemplate.fontFamily,
        titleSize: 'xl',
        contentSize: 'large',
        alignment: 'center',
      };
      setSlides([defaultSlide]);
    }
  }, [selectedTemplate]);

  const handleAddSlide = (template: Slide['template'] = 'content') => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      title: 'New Slide Title',
      content: 'Add your content here...',
      template,
      backgroundColor: selectedTemplate.primaryColor,
      textColor: 'hsl(0 0% 100%)',
      accentColor: selectedTemplate.accentColor,
      fontFamily: selectedTemplate.fontFamily,
      titleSize: 'large',
      contentSize: 'medium',
      alignment: 'left',
      bulletPoints: template === 'bullets' ? ['First point', 'Second point', 'Third point'] : undefined,
    };
    
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
    toast.success(`New ${template} slide added`);
  };

  const handleDuplicateSlide = (slideId: string) => {
    const slideIndex = slides.findIndex(s => s.id === slideId);
    if (slideIndex === -1) return;
    
    const originalSlide = slides[slideIndex];
    const duplicatedSlide: Slide = {
      ...originalSlide,
      id: `slide-${Date.now()}`,
      title: `${originalSlide.title} (Copy)`,
    };
    
    const newSlides = [...slides];
    newSlides.splice(slideIndex + 1, 0, duplicatedSlide);
    setSlides(newSlides);
    setCurrentSlideIndex(slideIndex + 1);
    toast.success('Slide duplicated');
  };

  const handleDeleteSlide = (slideId: string) => {
    if (slides.length <= 1) {
      toast.error('Cannot delete the last slide');
      return;
    }
    
    const slideIndex = slides.findIndex(s => s.id === slideId);
    const newSlides = slides.filter(slide => slide.id !== slideId);
    setSlides(newSlides);
    
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1);
    } else if (currentSlideIndex > slideIndex) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
    
    toast.success('Slide deleted');
  };

  const handleSlideEdit = (slideId: string, field: keyof Slide, value: any) => {
    setSlides(slides.map(slide => 
      slide.id === slideId 
        ? { ...slide, [field]: value }
        : slide
    ));
  };

  const handleTemplateChange = (template: Template) => {
    setSelectedTemplate(template);
    if (currentSlide) {
      setSlides(slides.map(slide => 
        slide.id === currentSlide.id
          ? {
              ...slide,
              backgroundColor: template.primaryColor,
              accentColor: template.accentColor,
              fontFamily: template.fontFamily,
              backgroundImage: template.backgroundImage,
            }
          : slide
      ));
    }
    setShowTemplateSelector(false);
    toast.success(`Applied ${template.name} template`);
  };

  const handleExport = () => {
    // Create a comprehensive export
    const exportData = {
      slides,
      template: selectedTemplate,
      metadata: {
        title: slides[0]?.title || 'Untitled Presentation',
        slideCount: slides.length,
        createdAt: new Date().toISOString(),
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exportData.metadata.title.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Presentation exported successfully');
  };

  const handleSave = () => {
    const saveData = {
      slides,
      template: selectedTemplate,
      lastModified: new Date().toISOString(),
    };
    localStorage.setItem('presentation-data', JSON.stringify(saveData));
    toast.success('Presentation saved to browser storage');
  };

  const handleImport = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            if (data.slides && Array.isArray(data.slides)) {
              setSlides(data.slides);
              if (data.template) setSelectedTemplate(data.template);
              setCurrentSlideIndex(0);
              toast.success('Presentation imported successfully');
            } else {
              toast.error('Invalid file format');
            }
          } catch (error) {
            toast.error('Failed to import presentation');
          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-orange-950 dark:via-amber-950 dark:to-orange-900 flex flex-col relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 dark:opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(25_95%_53%_/_0.15)_0%,transparent_30%),radial-gradient(circle_at_70%_80%,hsl(45_93%_58%_/_0.1)_0%,transparent_40%)]"></div>
      
      {/* Toolbar */}
      <div className="h-16 flex-shrink-0 relative z-10">
        <PresentationToolbar
          onAddSlide={() => handleAddSlide()}
          onSave={handleSave}
          onExport={handleExport}
          onImport={handleImport}
          onPreviewToggle={() => setIsPreviewMode(!isPreviewMode)}
          onTemplateSelect={() => setShowTemplateSelector(!showTemplateSelector)}
          onCustomize={() => setShowCustomization(!showCustomization)}
          slideCount={slides.length}
          currentTemplate={selectedTemplate.name}
          isPreviewMode={isPreviewMode}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Enhanced Slide Navigator */}
        {!isPreviewMode && (
          <div className="w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-orange-200/50 dark:border-orange-800/50 flex flex-col shadow-2xl">
            <div className="p-4 border-b border-orange-200/50 dark:border-orange-800/50 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50">
              <h3 className="font-bold text-orange-900 dark:text-orange-100 font-playfair">Slides</h3>
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={() => handleAddSlide('title')}
                  size="sm"
                  className="h-6 px-2 bg-orange-500 hover:bg-orange-600 text-white text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Title
                </Button>
                <Button
                  onClick={() => handleAddSlide('bullets')}
                  size="sm"
                  className="h-6 px-2 bg-amber-500 hover:bg-amber-600 text-white text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Bullets
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {slides.map((slide, index) => (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "group relative p-3 rounded-xl cursor-pointer transition-all duration-300 border-2",
                    currentSlideIndex === index
                      ? "bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/70 dark:to-amber-900/70 border-orange-500 shadow-lg transform scale-[1.02]"
                      : "bg-white/70 dark:bg-gray-800/70 border-orange-200/50 dark:border-orange-700/50 hover:bg-orange-50/80 dark:hover:bg-orange-900/40 hover:border-orange-400/70 hover:shadow-md"
                  )}
                  onClick={() => setCurrentSlideIndex(index)}
                >
                  {/* Slide Preview */}
                  <div className="aspect-video rounded-lg overflow-hidden mb-2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative">
                    <div 
                      className="w-full h-full p-2 flex flex-col justify-center"
                      style={{ 
                        backgroundColor: slide.backgroundColor,
                        backgroundImage: slide.backgroundImage === 'gradient-mesh' ? 'var(--tw-gradient-mesh)' : slide.backgroundImage ? `url(${slide.backgroundImage})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="text-white text-xs font-bold truncate">{slide.title}</div>
                      <div className="text-white/80 text-[10px] truncate mt-1">{slide.content}</div>
                    </div>
                  </div>
                  
                  {/* Slide Info */}
                  <div className="text-sm font-semibold text-orange-900 dark:text-orange-100 truncate">
                    {index + 1}. {slide.title}
                  </div>
                  <div className="text-xs text-orange-600 dark:text-orange-300 mt-1 truncate">
                    {slide.template} • {slide.fontFamily}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicateSlide(slide.id);
                      }}
                      size="sm"
                      className="h-6 w-6 p-0 bg-blue-500 hover:bg-blue-600 text-white"
                      title="Duplicate"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSlide(slide.id);
                      }}
                      size="sm"
                      className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white"
                      title="Delete"
                      disabled={slides.length <= 1}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Main Editor/Preview Area */}
        <div className="flex-1 flex flex-col">
          {/* Template & Customization Panels */}
          <AnimatePresence>
            {(showTemplateSelector || showCustomization) && !isPreviewMode && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-orange-200/50 dark:border-orange-800/50 shadow-lg"
              >
                {showTemplateSelector && (
                  <div className="p-6">
                    <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-4 font-playfair text-lg">Choose Template</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          onClick={() => handleTemplateChange(template)}
                          className={cn(
                            "p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 group hover:scale-105",
                            selectedTemplate.id === template.id
                              ? "border-orange-500 bg-orange-100 dark:bg-orange-900/50 shadow-lg"
                              : "border-orange-200/50 dark:border-orange-700/50 bg-white dark:bg-gray-800 hover:border-orange-400 hover:shadow-md"
                          )}
                        >
                          <div className="text-3xl mb-3 text-center group-hover:scale-110 transition-transform">
                            {template.preview}
                          </div>
                          <div className="font-semibold text-orange-900 dark:text-orange-100 text-center">
                            {template.name}
                          </div>
                          <div className="text-xs text-orange-600 dark:text-orange-300 text-center mt-1">
                            {template.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showCustomization && currentSlide && (
                  <div className="p-6 border-t border-orange-200/50 dark:border-orange-800/50">
                    <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-4 font-playfair text-lg">Customize Slide</h3>
                    
                    <div className="grid grid-cols-3 gap-6">
                      {/* Font Selection */}
                      <div>
                        <label className="block text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
                          <Type className="w-4 h-4 inline mr-1" />
                          Font Family
                        </label>
                        <select
                          value={currentSlide.fontFamily}
                          onChange={(e) => handleSlideEdit(currentSlide.id, 'fontFamily', e.target.value)}
                          className="w-full p-2 rounded-lg border border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800"
                        >
                          {fontOptions.map(font => (
                            <option key={font.id} value={font.id}>{font.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Background Images */}
                      <div>
                        <label className="block text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
                          <ImageIcon className="w-4 h-4 inline mr-1" />
                          Background
                        </label>
                        <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                          <div
                            onClick={() => handleSlideEdit(currentSlide.id, 'backgroundImage', undefined)}
                            className={cn(
                              "w-full h-8 rounded border-2 cursor-pointer",
                              !currentSlide.backgroundImage ? "border-orange-500" : "border-gray-300"
                            )}
                            style={{ backgroundColor: currentSlide.backgroundColor }}
                          />
                          {backgroundImages.map((img, index) => (
                            <div
                              key={index}
                              onClick={() => handleSlideEdit(currentSlide.id, 'backgroundImage', img)}
                              className={cn(
                                "w-full h-8 rounded border-2 cursor-pointer bg-cover bg-center",
                                currentSlide.backgroundImage === img ? "border-orange-500" : "border-gray-300"
                              )}
                              style={{ backgroundImage: `url(${img})` }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Colors */}
                      <div>
                        <label className="block text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
                          <Palette className="w-4 h-4 inline mr-1" />
                          Colors
                        </label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={currentSlide.backgroundColor}
                              onChange={(e) => handleSlideEdit(currentSlide.id, 'backgroundColor', e.target.value)}
                              className="w-8 h-8 rounded border"
                            />
                            <span className="text-xs text-orange-600 dark:text-orange-300">Background</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={currentSlide.textColor}
                              onChange={(e) => handleSlideEdit(currentSlide.id, 'textColor', e.target.value)}
                              className="w-8 h-8 rounded border"
                            />
                            <span className="text-xs text-orange-600 dark:text-orange-300">Text</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slide Canvas */}
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-5xl mx-auto">
              {currentSlide && (
                <SlideEditor
                  slide={currentSlide}
                  onSlideEdit={handleSlideEdit}
                  isPreviewMode={isPreviewMode}
                />
              )}
            </div>
          </div>

          {/* Enhanced Slide Navigation Controls */}
          <div className="p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-orange-200/50 dark:border-orange-800/50 flex justify-center items-center space-x-4 shadow-lg">
            <Button
              onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
              disabled={currentSlideIndex === 0}
              variant="outline"
              className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-300"
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50 rounded-xl border border-orange-200 dark:border-orange-700">
              <Presentation className="w-4 h-4 text-orange-600 dark:text-orange-300" />
              <span className="text-orange-900 dark:text-orange-100 font-semibold">
                {currentSlideIndex + 1} of {slides.length}
              </span>
            </div>
            
            <Button
              onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
              disabled={currentSlideIndex === slides.length - 1}
              variant="outline"
              className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-300"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationCanvas;