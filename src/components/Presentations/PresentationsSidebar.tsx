import React, { useState } from 'react';
import { Button } from '../ui/button';
import { FileText, Copy, Trash2, Plus, Palette, Download, Upload, Save, BarChart3, Layers, Eye, Presentation, Image as ImageIcon, CheckCircle, Settings, AlignLeft as AlignLeftIcon, AlignCenter as AlignCenterIcon, AlignRight as AlignRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import SlideEditor from './SlideEditor';
import { Slide } from './SlideEditor';

interface PresentationsSidebarProps {
  slides: any[];
  currentSlideIndex: number;
  onAddSlide: (type?: string) => void;
  onDuplicateSlide: (slideId: string) => void;
  onDeleteSlide: (slideId: string) => void;
  onSelectSlide: (index: number) => void;
  onTemplateSelect: (template: any) => void;
  onExport: () => void;
  onImport: () => void;
  onSave: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  renderSlideThumbnail?: (slide: any) => React.ReactNode;
  onSlideEdit: (slideId: string, key: string, value: any) => void;
}

const TABS = [
  { id: 'slides', label: 'Slides', icon: Presentation },
  { id: 'templates', label: 'Templates', icon: Palette },
  { id: 'customize', label: 'Customize', icon: Settings },
];

const TEMPLATES = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and modern design for business presentations',
    preview: '🏢',
    primaryColor: 'hsl(25 95% 53%)',
    secondaryColor: 'hsl(31 91% 43%)',
    accentColor: 'hsl(45 93% 58%)',
    fontFamily: 'inter',
    backgroundImage: undefined,
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
    backgroundImage: undefined,
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'Minimal, elegant, and distraction-free',
    preview: '✨',
    primaryColor: 'hsl(221 39% 11%)',
    secondaryColor: 'hsl(215 28% 17%)',
    accentColor: 'hsl(217 91% 60%)',
    fontFamily: 'playfair',
    backgroundImage: undefined,
  },
  {
    id: 'modern-gradient',
    name: 'Modern Gradient',
    description: 'Sleek gradient backgrounds with modern fonts',
    preview: '🌈',
    primaryColor: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    secondaryColor: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    accentColor: '#f093fb',
    fontFamily: 'montserrat',
    backgroundImage: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  },
  {
    id: 'photo',
    name: 'Photo',
    description: 'Elegant photo background for visual impact',
    preview: '🖼️',
    primaryColor: '#fff',
    secondaryColor: '#222',
    accentColor: '#f6d365',
    fontFamily: 'inter',
    backgroundImage: '/1.jpeg',
  },
];

// Add preset color swatches and opacity slider for each color input
// Define a set of preset colors
const PRESET_COLORS = [
  '#000000', '#ffffff', '#FFD700', '#FF4500', '#1E90FF', '#32CD32', '#FF69B4', '#8A2BE2', '#00CED1', '#FFA500', '#C0C0C0', '#333333', '#F5F5F5', '#B22222', '#228B22', '#4169E1', '#FF6347', '#2E8B57', '#DAA520', '#A0522D'
];

function hexToRgba(hex, alpha = 1) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

const PresentationsSidebar: React.FC<PresentationsSidebarProps> = ({
  slides,
  currentSlideIndex,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onSelectSlide,
  onTemplateSelect,
  onExport,
  onImport,
  onSave,
  isCollapsed = false,
  onToggleCollapse,
  renderSlideThumbnail,
  onSlideEdit,
}) => {
  const [activeTab, setActiveTab] = useState('slides');
  const currentSlide = slides[currentSlideIndex];
  // Add state for background color popover
  const [showBgColorPopover, setShowBgColorPopover] = useState(false);
  const [showBorderColorPopover, setShowBorderColorPopover] = useState(false);

  // Responsive tab bar: horizontal scroll when expanded, vertical when collapsed
  const tabBarClass = isCollapsed
    ? 'flex-col px-0 w-full'
    : 'flex-row px-2 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-orange-200';

  // Customize Tab UI
  const fontOptions = [
    { id: 'inter', name: 'Inter' },
    { id: 'playfair', name: 'Playfair Display' },
    { id: 'poppins', name: 'Poppins' },
    { id: 'mono', name: 'JetBrains Mono' },
    { id: 'roboto', name: 'Roboto' },
    { id: 'lato', name: 'Lato' },
    { id: 'montserrat', name: 'Montserrat' },
    { id: 'opensans', name: 'Open Sans' },
    { id: 'raleway', name: 'Raleway' },
    { id: 'sourcesans', name: 'Source Sans Pro' },
  ];
  const titleSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xl', label: 'XL' },
  ];
  return (
    <aside className={cn(
      'fixed left-0 top-16 bottom-0 bg-gradient-to-b from-white/90 via-orange-50/60 to-orange-100/40 dark:from-gray-900/90 dark:via-orange-900/40 dark:to-orange-950/20 backdrop-blur-xl border-r border-orange-200 dark:border-orange-800 shadow-2xl overflow-hidden z-40 flex flex-col transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-96',
      'font-sans'
    )}>
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 dark:from-orange-900 dark:via-amber-800 dark:to-yellow-700 text-white p-4 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08),transparent_60%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-yellow-300/20"></div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              <FileText className="w-5 h-5" />
            </div>
            {!isCollapsed && <span className="font-bold text-lg">NOV8 Presentations</span>}
            {!isCollapsed && <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-500/20 text-yellow-100 border border-orange-300/40">v2.0</span>}
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={onToggleCollapse}>
              {isCollapsed ? <Layers className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        {/* Status Row */}
        {!isCollapsed && (
          <div className="mt-3 space-y-2 relative z-10">
            <div className="flex items-center justify-between text-sm">
              <span>Slides</span>
              <span className="font-semibold">{slides.length}</span>
            </div>
          </div>
        )}
      </div>
      {/* Tabs - robust, scrollable, responsive */}
      <div className={cn('flex border-b border-orange-200/40 dark:border-orange-800/40 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/20', tabBarClass)}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap',
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-900 text-orange-700 dark:text-yellow-200 shadow border-b-2 border-orange-500'
                : 'text-orange-700/70 dark:text-yellow-200/70 hover:bg-orange-100/60 dark:hover:bg-orange-900/30',
              isCollapsed && 'justify-center px-0 w-full rounded-none'
            )}
            title={tab.label}
            tabIndex={0}
          >
            <tab.icon className="w-4 h-4" />
            {!isCollapsed && tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className={cn(
        'flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white/80 to-orange-50/40 dark:from-gray-900/80 dark:to-orange-900/10',
        isCollapsed && 'p-2'
      )}>
        {/* Slides Tab */}
        {activeTab === 'slides' && (
          <>
            {/* Slide Actions */}
            {/* Slides Tab Actions: Remove Templates button */}
            {!isCollapsed && (
              <div className="flex gap-2 mb-4 flex-wrap">
                <Button onClick={() => onAddSlide('content')} size="sm" className="h-7 px-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold shadow rounded">
                  <Plus className="w-4 h-4 mr-1" /> Add Slide
                </Button>
              </div>
            )}
            {/* Slide List with Thumbnails */}
            <div className="flex flex-col gap-2">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={cn(
                    'group flex flex-col items-center justify-center cursor-pointer transition-all duration-200 bg-white/80 dark:bg-gray-900/80 rounded-xl border border-orange-100 dark:border-orange-800 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:ring-2 hover:ring-orange-200/60',
                    currentSlideIndex === index
                      ? 'ring-2 ring-orange-500 border-orange-400 shadow-lg scale-105 z-10'
                      : 'hover:ring-1',
                  )}
                  onClick={() => onSelectSlide(index)}
                  title={slide.title || 'Untitled'}
                  style={{ background: 'none', padding: 0, marginBottom: 10, minHeight: 0, minWidth: 0 }}
                >
                  <div className="flex items-center justify-center w-full p-3">
                    <div className="relative w-[160px] h-[90px] aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-white dark:bg-gray-900 border border-orange-100 dark:border-orange-800">
                      <div style={{ transform: 'scale(0.22)', transformOrigin: 'center', width: '700px', height: '393px', pointerEvents: 'none', position: 'absolute', left: '50%', top: '50%', translate: '-50% -50%' }}>
                        <SlideEditor
                          slide={slide}
                          onSlideEdit={() => {}}
                          isPreviewMode={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-orange-700 dark:text-orange-200 mb-2 text-center w-full truncate transition-colors duration-200">
                    Slide {index + 1}: {slide.title || 'Untitled'}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="flex flex-col gap-3 items-center justify-start h-full text-orange-700 dark:text-orange-200 opacity-90">
            <Palette className="w-8 h-8 mb-2" />
            <span className="font-semibold text-lg mb-1">Templates</span>
            <span className="text-sm mb-2">Choose a template for your slides:</span>
            <div className="flex flex-col gap-4 w-full">
              {TEMPLATES.map((template) => {
                const mockSlide: Slide = {
                  id: template.id,
                  title: template.name,
                  content: 'Sample content',
                  subtitle: template.description,
                  template: 'title',
                  backgroundColor: template.primaryColor,
                  backgroundImage: template.backgroundImage,
                  textColor: '#fff', // Force white text for preview
                  accentColor: template.accentColor,
                  fontFamily: template.fontFamily,
                  titleSize: 'large',
                  contentSize: 'medium',
                  alignment: 'center',
                  bulletPoints: [],
                  letterSpacing: 0,
                  lineHeight: 1.2,
                  textShadow: false,
                  textOpacity: 1,
                  textBgColor: '',
                  textBorderColor: '',
                  isLocked: false,
                  isBackgroundBlur: false,
                  overlayStrength: 0,
                  overlayColor: '',
                };
                return (
                  <button
                    key={template.id}
                    onClick={() => onTemplateSelect(template)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 w-full bg-white/90 dark:bg-gray-900/90 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-orange-300/60',
                      'border-orange-200/40 dark:border-orange-700/40',
                    )}
                    style={{ minHeight: 160 }}
                  >
                    <div className="flex items-center justify-center w-full mb-2">
                      <div className="relative w-full max-w-[420px] h-[24vw] max-h-[180px] min-h-[78px] aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-white dark:bg-gray-900 border border-orange-100 dark:border-orange-800">
                        <div style={{ transform: 'scale(0.22)', transformOrigin: 'center', width: '700px', height: '393px', pointerEvents: 'none', position: 'absolute', left: '50%', top: '50%', translate: '-50% -50%' }}>
                          <SlideEditor
                            slide={mockSlide}
                            onSlideEdit={() => {}}
                            isPreviewMode={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold text-orange-900 dark:text-orange-100 text-base text-center truncate transition-colors duration-200 w-full max-w-full">{template.name}</div>
                    <div className="text-xs text-orange-600 dark:text-orange-300 text-center truncate w-full max-w-full">{template.description}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {/* Customize Tab */}
        {activeTab === 'customize' && currentSlide && (
          <div className="flex flex-col gap-8 items-center justify-start h-full text-orange-700 dark:text-orange-200 opacity-90">
            <span className="font-semibold text-base mb-2 tracking-wide text-orange-900 dark:text-orange-100">Customize Slide</span>
            {/* Background Customization */}
            <div className="w-full mb-2">
              <label className="text-xs font-semibold mb-2 block">Background</label>
              <div className="grid grid-cols-3 gap-2 py-2 mb-2 w-full min-w-0">
                {/* Add image backgrounds from public folder */}
                {['/1.jpeg','/2.jpeg','/3.jpeg','/4.jpeg','/5.jpeg','/6.jpeg', undefined, '#fffbe6', '#f6d365', '#a1c4fd', '#292929', 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)'].map((bg, i) => {
                  let style = {};
                  let isImage = typeof bg === 'string' && bg.endsWith('.jpeg');
                  if (!bg) style = { background: '#f3f4f6' };
                  else if (isImage) style = { backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' };
                  else if (typeof bg === 'string' && bg.startsWith('linear-gradient')) style = { background: bg };
                  else style = { background: bg };
                  return (
                    <button
                      key={i}
                      onClick={() => onSlideEdit(currentSlide.id, 'backgroundImage', bg)}
                      className={cn(
                        'relative h-10 w-full rounded-lg border-2 transition-all duration-200',
                        currentSlide.backgroundImage === bg ? 'border-orange-500 ring-2 ring-orange-400' : 'border-orange-200 hover:border-orange-400',
                        'shadow-sm'
                      )}
                      style={style}
                    >
                      {currentSlide.backgroundImage === bg && <span className="absolute top-1 right-1 bg-orange-500 text-white rounded-full p-1 text-xs">✓</span>}
                      {!bg && <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">N/A</span>}
                      {isImage && <span className="absolute bottom-1 right-1 bg-white/80 text-orange-700 rounded-full px-1 text-[10px]">IMG</span>}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Text Customization */}
            <div className="flex flex-col gap-6 w-full">
              {/* Font family and size */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs font-semibold mb-1">Font</label>
                  <select value={currentSlide.fontFamily} onChange={e => onSlideEdit(currentSlide.id, 'fontFamily', e.target.value)} className="w-full p-2 rounded-lg border border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800 text-sm font-semibold">
                    {fontOptions.map(font => (<option key={font.id} value={font.id}>{font.name}</option>))}
                  </select>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs font-semibold mb-1">Title Size</label>
                  <select value={currentSlide.titleSize} onChange={e => onSlideEdit(currentSlide.id, 'titleSize', e.target.value)} className="w-full p-2 rounded-lg border border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800 text-sm font-semibold">
                    {titleSizeOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                  </select>
                </div>
              </div>
              {/* Colors */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col items-center gap-1">
                  <label className="text-xs font-semibold">Text</label>
                  <input type="color" value={currentSlide.textColor} onChange={e => onSlideEdit(currentSlide.id, 'textColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded shadow" title="Text Color" />
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <label className="text-xs font-semibold">Background</label>
                  <div className="relative">
                    <button
                      className="w-8 h-8 p-0 border-none rounded shadow"
                      style={{ background: currentSlide.backgroundColor || '#ffffff' }}
                      title="Background Color"
                      onClick={() => setShowBgColorPopover((v) => !v)}
                    />
                    {showBgColorPopover && (
                      <div className="absolute left-0 mt-2 z-50 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col gap-2 min-w-[180px] border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {PRESET_COLORS.map(color => (
                            <button key={color} className="w-6 h-6 rounded-full border-2 border-white shadow" style={{ background: color }} onClick={() => { onSlideEdit(currentSlide.id, 'backgroundColor', color); setShowBgColorPopover(false); }} aria-label={color}></button>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="color" value={currentSlide.backgroundColor || '#ffffff'} onChange={e => onSlideEdit(currentSlide.id, 'backgroundColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded shadow" title="Custom Background Color" />
                          <input type="range" min="0" max="100" value={currentSlide.backgroundColorAlpha !== undefined ? currentSlide.backgroundColorAlpha : 100} onChange={e => onSlideEdit(currentSlide.id, 'backgroundColorAlpha', Number(e.target.value))} className="w-16 ml-2" title="Background Opacity" />
                          <span className="text-xs">{currentSlide.backgroundColorAlpha !== undefined ? currentSlide.backgroundColorAlpha : 100}%</span>
                        </div>
                        <button className="mt-2 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white" onClick={() => setShowBgColorPopover(false)}>Close</button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <label className="text-xs font-semibold">Border</label>
                  <div className="relative">
                    <button
                      className="w-8 h-8 p-0 border-none rounded shadow"
                      style={{ background: currentSlide.textBorderColor || '#000000' }}
                      title="Border Color"
                      onClick={() => setShowBorderColorPopover((v) => !v)}
                    />
                    {showBorderColorPopover && (
                      <div className="absolute left-0 mt-2 z-50 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col gap-2 min-w-[180px] border border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {PRESET_COLORS.map(color => (
                            <button key={color} className="w-6 h-6 rounded-full border-2 border-white shadow" style={{ background: color }} onClick={() => { onSlideEdit(currentSlide.id, 'textBorderColor', color); setShowBorderColorPopover(false); }} aria-label={color}></button>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="color" value={currentSlide.textBorderColor || '#000000'} onChange={e => onSlideEdit(currentSlide.id, 'textBorderColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded shadow" title="Custom Border Color" />
                          <input type="range" min="0" max="100" value={currentSlide.textBorderColorAlpha !== undefined ? currentSlide.textBorderColorAlpha : 100} onChange={e => onSlideEdit(currentSlide.id, 'textBorderColorAlpha', Number(e.target.value))} className="w-16 ml-2" title="Border Opacity" />
                          <span className="text-xs">{currentSlide.textBorderColorAlpha !== undefined ? currentSlide.textBorderColorAlpha : 100}%</span>
                        </div>
                        <button className="mt-2 text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white" onClick={() => setShowBorderColorPopover(false)}>Close</button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <label className="text-xs font-semibold">Shadow</label>
                  <input type="checkbox" checked={!!currentSlide.textShadow} onChange={e => onSlideEdit(currentSlide.id, 'textShadow', e.target.checked)} title="Text Shadow" className="w-5 h-5 accent-orange-500" />
                </div>
              </div>
              {/* Alignment, spacing, line height */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col items-center gap-1">
                  <label className="text-xs font-semibold">Alignment</label>
                  <div className="flex gap-1 bg-orange-50/40 dark:bg-orange-900/20 rounded-lg px-2 py-1 shadow-sm">
                    <button className={cn('p-1 rounded hover:bg-orange-100 transition', currentSlide.alignment === 'left' && 'bg-orange-200')} onClick={() => onSlideEdit(currentSlide.id, 'alignment', 'left')} title="Align Left">
                      <AlignLeftIcon className="w-5 h-5" />
                    </button>
                    <button className={cn('p-1 rounded hover:bg-orange-100 transition', currentSlide.alignment === 'center' && 'bg-orange-200')} onClick={() => onSlideEdit(currentSlide.id, 'alignment', 'center')} title="Align Center">
                      <AlignCenterIcon className="w-5 h-5" />
                    </button>
                    <button className={cn('p-1 rounded hover:bg-orange-100 transition', currentSlide.alignment === 'right' && 'bg-orange-200')} onClick={() => onSlideEdit(currentSlide.id, 'alignment', 'right')} title="Align Right">
                      <AlignRightIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <label className="text-xs font-semibold">Letter Spacing</label>
                  <input type="range" min="0" max="10" value={currentSlide.letterSpacing || 0} onChange={e => onSlideEdit(currentSlide.id, 'letterSpacing', Number(e.target.value))} className="w-full" title="Letter Spacing" />
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <label className="text-xs font-semibold">Line Height</label>
                  <input type="range" min="1" max="3" step="0.1" value={currentSlide.lineHeight || 1.2} onChange={e => onSlideEdit(currentSlide.id, 'lineHeight', Number(e.target.value))} className="w-full" title="Line Height" />
                </div>
              </div>
              {/* Overlay controls */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col items-center gap-1">
                  <label className="text-xs font-semibold">Overlay Color</label>
                  <input type="color" value={currentSlide.overlayColor || '#000000'} onChange={e => onSlideEdit(currentSlide.id, 'overlayColor', e.target.value)} className="w-8 h-8 p-0 border-none rounded shadow" title="Overlay Color" />
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <label className="text-xs font-semibold">Overlay Strength</label>
                  <input type="range" min="0" max="100" value={currentSlide.overlayStrength || 50} onChange={e => onSlideEdit(currentSlide.id, 'overlayStrength', Number(e.target.value))} className="w-full" title="Overlay Strength" />
                  <span className="text-xs text-orange-700">{currentSlide.overlayStrength || 50}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default PresentationsSidebar; 