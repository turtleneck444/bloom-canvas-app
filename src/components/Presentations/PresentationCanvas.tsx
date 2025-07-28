import React, { useCallback, useRef, useEffect, useState } from 'react';
import PresentationToolbar from './PresentationToolbar';
import { Button } from '../ui/button';
import { Plus, FileText, Download, Upload, Save, RotateCcw, Presentation } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: string;
  title: string;
  content: string;
  template: 'title' | 'content' | 'two-column' | 'image-text' | 'conclusion';
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

const templates: Template[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and modern design for business presentations',
    preview: '🏢',
    primaryColor: 'hsl(25 95% 53%)', // Orange
    secondaryColor: 'hsl(31 91% 43%)', // Darker orange
    accentColor: 'hsl(45 93% 58%)', // Amber
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and vibrant design for creative presentations',
    preview: '🎨',
    primaryColor: 'hsl(142 76% 36%)', // Green
    secondaryColor: 'hsl(134 61% 41%)', // Darker green
    accentColor: 'hsl(160 84% 39%)', // Teal
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design with focus on content',
    preview: '✨',
    primaryColor: 'hsl(221 39% 11%)', // Dark blue
    secondaryColor: 'hsl(215 28% 17%)', // Lighter dark blue
    accentColor: 'hsl(217 91% 60%)', // Blue accent
  },
];

const PresentationCanvas: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);

  // Initialize with a default slide
  useEffect(() => {
    if (slides.length === 0) {
      const defaultSlide: Slide = {
        id: 'slide-1',
        title: 'Welcome to Your Presentation',
        content: 'Click to edit and add your content here',
        template: 'title',
        backgroundColor: selectedTemplate.primaryColor,
        textColor: 'hsl(0 0% 100%)',
        accentColor: selectedTemplate.accentColor,
      };
      setSlides([defaultSlide]);
    }
  }, [selectedTemplate]);

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      title: 'New Slide',
      content: 'Add your content here',
      template: 'content',
      backgroundColor: selectedTemplate.primaryColor,
      textColor: 'hsl(0 0% 100%)',
      accentColor: selectedTemplate.accentColor,
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
    toast.success('New slide added');
  };

  const handleDeleteSlide = (slideId: string) => {
    if (slides.length <= 1) {
      toast.error('Cannot delete the last slide');
      return;
    }
    
    const newSlides = slides.filter(slide => slide.id !== slideId);
    setSlides(newSlides);
    
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1);
    }
    
    toast.success('Slide deleted');
  };

  const handleSlideEdit = (slideId: string, field: keyof Slide, value: string) => {
    setSlides(slides.map(slide => 
      slide.id === slideId 
        ? { ...slide, [field]: value }
        : slide
    ));
  };

  const handleTemplateChange = (template: Template) => {
    setSelectedTemplate(template);
    setSlides(slides.map(slide => ({
      ...slide,
      backgroundColor: template.primaryColor,
      accentColor: template.accentColor,
    })));
    setShowTemplateSelector(false);
    toast.success(`Applied ${template.name} template`);
  };

  const handleExport = () => {
    toast.success('Export feature coming soon!');
  };

  const handleSave = () => {
    localStorage.setItem('presentation-slides', JSON.stringify(slides));
    toast.success('Presentation saved');
  };

  const handleImport = () => {
    const saved = localStorage.getItem('presentation-slides');
    if (saved) {
      setSlides(JSON.parse(saved));
      toast.success('Presentation loaded');
    } else {
      toast.error('No saved presentation found');
    }
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="h-screen w-full bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 flex flex-col">
      {/* Toolbar */}
      <div className="h-16 flex-shrink-0">
        <PresentationToolbar
          onAddSlide={handleAddSlide}
          onSave={handleSave}
          onExport={handleExport}
          onImport={handleImport}
          onPreviewToggle={() => setIsPreviewMode(!isPreviewMode)}
          onTemplateSelect={() => setShowTemplateSelector(!showTemplateSelector)}
          slideCount={slides.length}
          currentTemplate={selectedTemplate.name}
          isPreviewMode={isPreviewMode}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide Navigator */}
        {!isPreviewMode && (
          <div className="w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-orange-200 dark:border-orange-800 flex flex-col">
            <div className="p-4 border-b border-orange-200 dark:border-orange-800">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100">Slides</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(index)}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-all duration-200",
                    currentSlideIndex === index
                      ? "bg-orange-100 dark:bg-orange-900/50 border-2 border-orange-500"
                      : "bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/30"
                  )}
                >
                  <div className="text-sm font-medium text-orange-900 dark:text-orange-100 truncate">
                    {index + 1}. {slide.title}
                  </div>
                  <div className="text-xs text-orange-600 dark:text-orange-300 mt-1 truncate">
                    {slide.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Editor/Preview Area */}
        <div className="flex-1 flex flex-col">
          {/* Template Selector */}
          <AnimatePresence>
            {showTemplateSelector && !isPreviewMode && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-orange-200 dark:border-orange-800"
              >
                <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-3">Choose Template</h3>
                <div className="grid grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleTemplateChange(template)}
                      className={cn(
                        "p-4 rounded-lg cursor-pointer transition-all duration-200 border-2",
                        selectedTemplate.id === template.id
                          ? "border-orange-500 bg-orange-100 dark:bg-orange-900/50"
                          : "border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30"
                      )}
                    >
                      <div className="text-2xl mb-2">{template.preview}</div>
                      <div className="font-medium text-orange-900 dark:text-orange-100">{template.name}</div>
                      <div className="text-sm text-orange-600 dark:text-orange-300">{template.description}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slide Canvas */}
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
              {currentSlide && (
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-video rounded-2xl shadow-2xl overflow-hidden"
                  style={{ backgroundColor: currentSlide.backgroundColor }}
                >
                  <div className="h-full p-12 flex flex-col justify-center">
                    {/* Editable Title */}
                    <input
                      type="text"
                      value={currentSlide.title}
                      onChange={(e) => handleSlideEdit(currentSlide.id, 'title', e.target.value)}
                      className="text-4xl font-bold mb-8 bg-transparent border-none outline-none text-white placeholder-white/70 w-full"
                      placeholder="Enter slide title..."
                      style={{ color: currentSlide.textColor }}
                      disabled={isPreviewMode}
                    />
                    
                    {/* Editable Content */}
                    <textarea
                      value={currentSlide.content}
                      onChange={(e) => handleSlideEdit(currentSlide.id, 'content', e.target.value)}
                      className="text-xl leading-relaxed bg-transparent border-none outline-none text-white placeholder-white/70 resize-none flex-1"
                      placeholder="Enter slide content..."
                      style={{ color: currentSlide.textColor }}
                      disabled={isPreviewMode}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Slide Navigation Controls */}
          <div className="p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-orange-200 dark:border-orange-800 flex justify-center space-x-4">
            <Button
              onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
              disabled={currentSlideIndex === 0}
              variant="outline"
              className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-300"
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/50 rounded-md">
              <span className="text-orange-900 dark:text-orange-100 font-medium">
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
            
            {currentSlide && slides.length > 1 && !isPreviewMode && (
              <Button
                onClick={() => handleDeleteSlide(currentSlide.id)}
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300"
              >
                Delete Slide
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationCanvas;