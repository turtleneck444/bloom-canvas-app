import React, { useCallback, useRef, useEffect, useState } from 'react';
import PresentationToolbar from './PresentationToolbar';
import SlideEditor from './SlideEditor';
import { Button } from '../ui/button';
import { Plus, FileText, Download, Upload, Save, RotateCcw, Presentation, Trash2, Copy, Image as ImageIcon, Type, Palette, Quote, Settings, CheckCircle, Undo2 as UndoIcon, Redo2 as RedoIcon, Copy as CopyIcon, Pause as PasteIcon, Bug as BlurIcon, Layers as LayersIcon, Lock as LockIcon, AlignEndVertical as AlignVerticalIcon, AlignEndHorizontal as AlignHorizontalIcon, Image as ImageIconIcon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  letterSpacing?: number;
  lineHeight?: number;
  textShadow?: boolean;
  textOpacity?: number; // Added for text opacity
  textBgColor?: string; // Added for text background color
  textBorderColor?: string; // Added for text border color
  isLocked?: boolean; // Added for lock/unlock
  isBackgroundBlur?: boolean; // Added for background blur
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
  // --- Luxury/Professional Gradients ---
  // Gold polygon (default)
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImcxIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGRDYwMCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGRjhEQyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ1cmwoI2cxKSIvPjxwb2x5Z29uIHBvaW50cz0iMCw2MDAgODAwLDAgODAwLDYwMCIgZmlsbD0iI0Y1REVCMyIgb3BhY2l0eT0iMC4zIi8+PHBvbHlnb24gcG9pbnRzPSIwLDAgODAwLDAgMCw2MDAiIGZpbGw9IiNCODg2MEIiIG9wYWNpdHk9IjAuMTUiLz48L3N2Zz4=',
  // Blue mesh gradient
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwYmZmZiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwM2ZmZiIvPjwvbGluZWFyR3JhZGllbnQ+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9InVybCgjYikiLz48L3N2Zz4=',
  // Purple-pink wave
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNTAwIEMyMDAgNDAwIDYwMCA2MDAgODAwIDUwIiBmaWxsPSJ1cmwoI3cpIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJ3IiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2YwNzVmZiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2YwN2ZmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg==',
  // Orange-pink gradient mesh
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJhZGlhbEdyYWRpZW50IGlkPSJnIiBjeD0iNTAlIiBjeT0iNTAlIiByPSI4MCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmM0YjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZjYwN2MiLz48L3JhZGlhbEdyYWRpZW50PjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+',
  // Subtle grid luxury
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2ZmZiIvPjxnIHN0cm9rZT0iI2UwYzY4YyIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjIiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSI2MDAiLz48bGluZSB4MT0iNTAiIHkxPSIwIiB4Mj0iNTAiIHkyPSI2MDAiLz48bGluZSB4MT0iMTAwIiB5MT0iMCIgeDI9IjEwMCIgeTI9IjYwMCIvPjxsaW5lIHgxPSIxNTAiIHkxPSIwIiB4Mj0iMTUwIiB5Mj0iNjAwIi8+PGxpbmUgeDE9IjIwMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSI2MDAiLz48bGluZSB4MT0iMjUwIiB5MT0iMCIgeDI9IjI1MCIgeTI9IjYwMCIvPjxsaW5lIHgxPSIzMDAiIHkxPSIwIiB4Mj0iMzAwIiB5Mj0iNjAwIi8+PGxpbmUgeDE9IjM1MCIgeTE9IjAiIHgyPSIzNTAiIHkyPSI2MDAiLz48bGluZSB4MT0iNDAwIiB5MT0iMCIgeDI9IjQwMCIgeTI9IjYwMCIvPjxsaW5lIHgxPSI0NTAiIHkxPSIwIiB4Mj0iNDUwIiB5Mj0iNjAwIi8+PGxpbmUgeDE9IjUwMCIgeTE9IjAiIHgyPSI1MDAiIHkyPSI2MDAiLz48bGluZSB4MT0iNTUwIiB5MT0iMCIgeDI9IjU1MCIgeTI9IjYwMCIvPjxsaW5lIHgxPSI2MDAiIHkxPSIwIiB4Mj0iNjAwIiB5Mj0iNjAwIi8+PGxpbmUgeDE9IjY1MCIgeTE9IjAiIHgyPSI2NTAiIHkyPSI2MDAiLz48bGluZSB4MT0iNzAwIiB5MT0iMCIgeDI9IjcwMCIgeTI9IjYwMCIvPjxsaW5lIHgxPSI3NTAiIHkxPSIwIiB4Mj0iNzUwIiB5Mj0iNjAwIi8+PGxpbmUgeDE9IjgwMCIgeTE9IjAiIHgyPSI4MDAiIHkyPSI2MDAiLz48bGluZSB4MT0iMCIgeTE9IjAiIHgyPSI4MDAiIHkyPSIwIi8+PGxpbmUgeDE9IjAiIHkxPSI1MCIgeDI9IjgwMCIgeTI9IjUwIi8+PGxpbmUgeDE9IjAiIHkxPSIxMDAiIHgyPSI4MDAiIHkyPSIxMDAiLz48bGluZSB4MT0iMCIgeTE9IjE1MCIgeDI9IjgwMCIgeTI9IjE1MCIvPjxsaW5lIHgxPSIwIiB5MT0iMjAwIiB4Mj0iODAwIiB5Mj0iMjAwIi8+PGxpbmUgeDE9IjAiIHkxPSIyNTAiIHgyPSI4MDAiIHkyPSIyNTAiLz48bGluZSB4MT0iMCIgeTE9IjMwMCIgeDI9IjgwMCIgeTI9IjMwMCIvPjxsaW5lIHgxPSIwIiB5MT0iMzUwIiB4Mj0iODAwIiB5Mj0iMzUwIi8+PGxpbmUgeDE9IjAiIHkxPSI0MDAiIHgyPSI4MDAiIHkyPSI0MDAiLz48bGluZSB4MT0iMCIgeTE9IjQ1MCIgeDI9IjgwMCIgeTI9IjQ1MCIvPjxsaW5lIHgxPSIwIiB5MT0iNTAwIiB4Mj0iODAwIiB5Mj0iNTAwIi8+PGxpbmUgeDE9IjAiIHkxPSI1NTAiIHgyPSI4MDAiIHkyPSI1NTAiLz48bGluZSB4MT0iMCIgeTE9IjYwMCIgeDI9IjgwMCIgeTI9IjYwMCIvPjwvZz48L3N2Zz4=',
  // Simple dark mesh
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMwMDAiLz48bGluZSB4MT0iMCIgeTE9IjAiIHgyPSI4MDAiIHkyPSI2MDAiIHN0cm9rZT0iIzQ0NDQiIHN0cm9rZS13aWR0aD0iMyIgb3BhY2l0eT0iMC4xIi8+PGxpbmUgeDE9IjgwMCIgeTE9IjAiIHgyPSIwIiB5Mj0iNjAwIiBzdHJva2U9IiM0NDQ0IiBzdHJva2Utd2lkdGg9IjMiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==',
  // Abstract triangles
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cG9seWdvbiBwb2ludHM9IjAsNjAwIDQwMCwwIDgwMCw2MDAiIGZpbGw9IiNlMGUwZTAiLz48cG9seWdvbiBwb2ludHM9IjAsNjAwIDIwMCwyMDAgNDAwLDYwMCIgZmlsbD0iI2JkYmRiZCIvPjxwb2x5Z29uIHBvaW50cz0iODAwLDYwMCA2MDAsMjAwIDQwMCw2MDAiIGZpbGw9IiM5ZTllOWUiLz48L3N2Zz4=',
  // Blue polygonal mesh
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBvbHlnb24gcG9pbnRzPSIwLDAgNDAwLDAgODAwLDYwMCAwLDYwMCIgZmlsbD0iIzAwYmZmZiIvPjxwb2x5Z29uIHBvaW50cz0iNDAwLDAgODAwLDAgNDAwLDYwMCIgZmlsbD0iIzAwM2ZmZiIvPjwvc3ZnPg==',
  // Green abstract mesh
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMzAwIiByPSIyMDAiIGZpbGw9IiMwZmY4YjAiIG9wYWNpdHk9IjAuNSIvPjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjE1Ii8+PC9zdmc+',
  // Orange flowers (light, nature)
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1920&h=1080&fit=crop',
  // Blue starry night (dark, nature)
  'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1920&h=1080&fit=crop',
  // Ocean wave (light, nature)
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1920&h=1080&fit=crop',
  // Pine trees (nature)
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&h=1080&fit=crop',
  // Sun through trees (nature)
  'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&h=1080&fit=crop',
  // Mountain landscape (dark, nature)
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop',
  // City at night (dark, tech)
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1920&h=1080&fit=crop',
  // Futuristic tech (dark, abstract)
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1920&h=1080&fit=crop',
  // Code on MacBook (dark, tech)
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop',
  // iMac setup (dark, tech)
  'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1920&h=1080&fit=crop',
  // Gray laptop (neutral)
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=1080&fit=crop',
  // Java programming (dark, tech)
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop',
  // New SVG/gradient backgrounds:
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', // Peach gradient
  'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)', // Blue sky gradient
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple gradient
  'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)', // Pink-red gradient
  'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', // Green-blue gradient
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iNDAwIiB5Mj0iMzAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmY5YjYwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY2YjYwIi8+PC9saW5lYXJHcmFkaWVudD48L3N2Zz4=', // Gold mesh
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iNDAwIiB5Mj0iMzAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjY2RmMmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5YmY2Ii8+PC9saW5lYXJHcmFkaWVudD48L3N2Zz4=', // Blue mesh
  // ...add more SVG/gradient backgrounds as desired...
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
    backgroundImage: backgroundImages[0], // Set the first geometric background as default
  },
];

const creativeTemplates = [
  { id: 'quote', label: 'Quote', color: 'from-purple-500 to-pink-400', icon: Quote, template: 'quote', customType: undefined },
  { id: 'image-text', label: 'Image+Caption', color: 'from-blue-500 to-cyan-400', icon: ImageIcon, template: 'image-text', customType: undefined },
  { id: 'two-column', label: 'Two-Column', color: 'from-green-500 to-lime-400', icon: Type, template: 'two-column', customType: undefined },
  { id: 'big-number', label: 'Big Number', color: 'from-pink-500 to-orange-400', icon: FileText, template: 'content', customType: 'big-number' },
  { id: 'section', label: 'Section', color: 'from-gray-700 to-gray-500', icon: Presentation, template: 'content', customType: 'section' },
  { id: 'timeline', label: 'Timeline', color: 'from-cyan-600 to-blue-400', icon: RotateCcw, template: 'content', customType: 'timeline' },
];

const fontOptions = [
  { id: 'inter', name: 'Inter', family: 'font-inter' },
  { id: 'playfair', name: 'Playfair Display', family: 'font-playfair' },
  { id: 'poppins', name: 'Poppins', family: 'font-poppins' },
  { id: 'mono', name: 'JetBrains Mono', family: 'font-mono' },
  { id: 'roboto', name: 'Roboto', family: 'font-roboto' },
  { id: 'lato', name: 'Lato', family: 'font-lato' },
  { id: 'montserrat', name: 'Montserrat', family: 'font-montserrat' },
  { id: 'opensans', name: 'Open Sans', family: 'font-opensans' },
  { id: 'raleway', name: 'Raleway', family: 'font-raleway' },
  { id: 'sourcesans', name: 'Source Sans Pro', family: 'font-sourcesans' },
];

const titleSizeOptions = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'xl', label: 'XL' },
];
const contentSizeOptions = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
];

const getTitleSizeClass = (size: Slide['titleSize']) => {
  switch (size) {
    case 'small':
      return 'text-lg';
    case 'medium':
      return 'text-xl';
    case 'large':
      return 'text-2xl';
    case 'xl':
      return 'text-3xl';
  }
};

const getContentSizeClass = (size: Slide['contentSize']) => {
  switch (size) {
    case 'small':
      return 'text-sm';
    case 'medium':
      return 'text-base';
    case 'large':
      return 'text-lg';
  }
};

const PresentationCanvas: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [overlayStrength, setOverlayStrength] = useState(50); // 0-100%
  const [overlayColor, setOverlayColor] = useState('#000000'); // Black overlay
  const [isBackgroundBlur, setIsBackgroundBlur] = useState(false); // Added for background blur
  const [undoStack, setUndoStack] = useState<Slide[][]>([]); // Added for undo/redo
  const [redoStack, setRedoStack] = useState<Slide[][]>([]); // Added for undo/redo
  const [zoomLevel, setZoomLevel] = useState(1); // Added for zoom

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
        backgroundImage: backgroundImages[0], // Set the first geometric background as default
      };
      setSlides([defaultSlide]);
    }
  }, [selectedTemplate]);

  const handleAddSlide = (template: Slide['template'] = 'content', customType?: string) => {
    // Always include title and subtitle/description
    let title = 'Slide Title';
    let content = 'Add your content here...';
    let subtitle = 'Add a description...';
    let titleSize: Slide['titleSize'] = 'large';
    let contentSize: Slide['contentSize'] = 'medium';
    if (template === 'title') {
      titleSize = 'xl';
      contentSize = 'large';
    } else if (template === 'quote') {
      title = 'Inspirational Quote';
      content = '“Your quote here.”';
      subtitle = '— Author';
      titleSize = 'large';
      contentSize = 'medium';
    } else if (template === 'image-text') {
      title = 'Image Slide';
      content = 'Add a caption...';
      subtitle = 'Image description...';
      titleSize = 'large';
      contentSize = 'medium';
    } else if (template === 'two-column') {
      title = 'Two-Column Slide';
      content = 'Left column...';
      subtitle = 'Right column...';
      titleSize = 'large';
      contentSize = 'medium';
    } else if (customType === 'big-number') {
      title = 'Big Number';
      content = '42';
      subtitle = 'Key Statistic';
      titleSize = 'xl';
      contentSize = 'large';
    } else if (customType === 'section') {
      title = 'Section Title';
      content = '';
      subtitle = 'Section Description';
      titleSize = 'xl';
      contentSize = 'large';
    } else if (customType === 'timeline') {
      title = 'Timeline';
      content = 'Step 1\nStep 2\nStep 3';
      subtitle = 'Process Overview';
      titleSize = 'large';
      contentSize = 'medium';
    } else if (template === 'bullets') {
      title = 'Bullet Slide';
      content = '';
      subtitle = 'Add a description...';
      titleSize = 'large';
      contentSize = 'medium';
    }
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      title,
      content,
      subtitle,
      template,
      backgroundColor: selectedTemplate.primaryColor,
      textColor: 'hsl(0 0% 100%)',
      accentColor: selectedTemplate.accentColor,
      fontFamily: selectedTemplate.fontFamily,
      titleSize,
      contentSize,
      alignment: 'left',
      bulletPoints: template === 'bullets' ? ['First point', 'Second point', 'Third point'] : undefined,
      backgroundImage: backgroundImages[0],
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
    toast.success(`New ${customType || template} slide added`);
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

  const handleFormatTitle = (format: string, value?: string) => {
    const currentSlide = slides[currentSlideIndex];
    if (!currentSlide) return;

    let newTitle = currentSlide.title;
    let newSubtitle = currentSlide.subtitle;

    if (format === 'bold') {
      newTitle = `<strong>${newTitle}</strong>`;
      newSubtitle = `<strong>${newSubtitle}</strong>`;
    } else if (format === 'italic') {
      newTitle = `<em>${newTitle}</em>`;
      newSubtitle = `<em>${newSubtitle}</em>`;
    } else if (format === 'underline') {
      newTitle = `<u>${newTitle}</u>`;
      newSubtitle = `<u>${newSubtitle}</u>`;
    } else if (format === 'strikeThrough') {
      newTitle = `<s>${newTitle}</s>`;
      newSubtitle = `<s>${newSubtitle}</s>`;
    } else if (format === 'formatBlock' && value === 'BLOCKQUOTE') {
      newTitle = `<blockquote>${newTitle}</blockquote>`;
      newSubtitle = `<blockquote>${newSubtitle}</blockquote>`;
    }

    setSlides(slides.map(slide => 
      slide.id === currentSlide.id
        ? { ...slide, title: newTitle, subtitle: newSubtitle }
        : slide
    ));
  };

  const handleResetSlideStyles = (slideId: string) => {
    const currentSlide = slides.find(s => s.id === slideId);
    if (!currentSlide) return;

    const resetSlide: Slide = {
      ...currentSlide,
      title: 'Slide Title',
      subtitle: 'Add a description...',
      content: 'Add your content here...',
      bulletPoints: undefined,
      letterSpacing: undefined,
      lineHeight: undefined,
      textShadow: undefined,
    };

    setSlides(slides.map(slide => 
      slide.id === slideId ? resetSlide : slide
    ));
    toast.success('Slide styles reset to default');
  };

  const currentSlide = slides[currentSlideIndex];

  // Undo/Redo handlers
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastSlides = undoStack[undoStack.length - 1];
      setRedoStack([...redoStack, slides]);
      setSlides(lastSlides);
      setUndoStack(undoStack.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextSlides = redoStack[redoStack.length - 1];
      setUndoStack([...undoStack, slides]);
      setSlides(nextSlides);
      setRedoStack(redoStack.slice(0, -1));
    }
  };

  // Copy/Paste handlers
  const handleCopy = () => {
    if (currentSlide) {
      setUndoStack([...undoStack, [...slides]]);
      setRedoStack([]); // Clear redo on new action
      const copiedSlide = { ...currentSlide, id: `copy-${Date.now()}` };
      setSlides([...slides, copiedSlide]);
      setCurrentSlideIndex(slides.length - 1);
      toast.success('Slide copied');
    }
  };

  const handlePaste = () => {
    if (currentSlide) {
      setUndoStack([...undoStack, [...slides]]);
      setRedoStack([]);
      const pastedSlide = { ...currentSlide, id: `paste-${Date.now()}` };
      setSlides([...slides, pastedSlide]);
      setCurrentSlideIndex(slides.length);
      toast.success('Slide pasted');
    }
  };

  // Background blur toggle
  const toggleBackgroundBlur = () => {
    setUndoStack([...undoStack, [...slides]]);
    setRedoStack([]);
    setSlides(slides.map(slide => slide.id === currentSlide.id ? { ...slide, isBackgroundBlur: !isBackgroundBlur } : slide));
  };

  // Layer order handlers
  const handleBringForward = () => {
    if (currentSlideIndex < slides.length - 1) {
      setUndoStack([...undoStack, [...slides]]);
      setRedoStack([]);
      const newSlides = [...slides];
      const [slideToBringForward] = newSlides.splice(currentSlideIndex, 1);
      newSlides.push(slideToBringForward);
      setSlides(newSlides);
      setCurrentSlideIndex(newSlides.length - 1);
    }
  };

  const handleSendBackward = () => {
    if (currentSlideIndex > 0) {
      setUndoStack([...undoStack, [...slides]]);
      setRedoStack([]);
      const newSlides = [...slides];
      const [slideToSendBackward] = newSlides.splice(currentSlideIndex, 1);
      newSlides.unshift(slideToSendBackward);
      setSlides(newSlides);
      setCurrentSlideIndex(slides.length - 1);
    }
  };

  // Lock/Unlock
  const toggleLock = () => {
    setUndoStack([...undoStack, [...slides]]);
    setRedoStack([]);
    setSlides(slides.map(slide => slide.id === currentSlide.id ? { ...slide, isLocked: !slide.isLocked } : slide));
  };

  // Alignment handlers
  const alignVerticalCenter = () => {
    setUndoStack([...undoStack, [...slides]]);
    setRedoStack([]);
    setSlides(slides.map(slide => slide.id === currentSlide.id ? { ...slide, alignment: 'center' } : slide));
  };

  const alignHorizontalCenter = () => {
    setUndoStack([...undoStack, [...slides]]);
    setRedoStack([]);
    setSlides(slides.map(slide => slide.id === currentSlide.id ? { ...slide, alignment: 'center' } : slide));
  };

  // Export as Image/PDF
  const handleExportImage = async () => {
    const slideElement = document.querySelector('.slide-preview-content') as HTMLElement;
    if (slideElement) {
      const canvas = await html2canvas(slideElement);
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${currentSlide.title.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success('Slide exported as image');
    }
  };

  const handleExportPDF = async () => {
    const slideElement = document.querySelector('.slide-preview-content') as HTMLElement;
    if (slideElement) {
      const canvas = await html2canvas(slideElement);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${currentSlide.title.replace(/\s+/g, '_')}.pdf`);
      toast.success('Slide exported as PDF');
    }
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(5, prev + 0.1));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(0.1, prev - 0.1));
  };

  // Group/Ungroup handlers (for layers)
  const handleGroup = () => {
    // This is a placeholder for a more robust layer management system
    toast.info('Group feature coming soon!');
  };

  const handleUngroup = () => {
    // This is a placeholder for a more robust layer management system
    toast.info('Ungroup feature coming soon!');
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-950 flex flex-col relative overflow-hidden">
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
              <div className="flex gap-2 mt-2 flex-wrap">
                <Button onClick={() => handleAddSlide('title')} size="sm" className="h-6 px-2.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white text-xs font-semibold shadow-md rounded">
                  <FileText className="w-3 h-3 mr-1" /> Title
                </Button>
                <Button onClick={() => handleAddSlide('bullets')} size="sm" className="h-6 px-2.5 border border-orange-400 text-orange-700 bg-white hover:bg-orange-50 text-xs font-semibold shadow-sm rounded">
                  <Type className="w-3 h-3 mr-1" /> Bullets
                </Button>
                {creativeTemplates.map(opt => (
                  <Button key={opt.id} onClick={() => handleAddSlide(opt.template as any, opt.customType)} size="sm" className={`h-6 px-2.5 border border-orange-300 text-orange-700 bg-white hover:bg-orange-50 text-xs font-semibold shadow-sm rounded flex items-center gap-1.5`}>
                    <opt.icon className="w-3 h-3 mr-1" /> {opt.label}
                  </Button>
                ))}
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
                      {/* Overlay for text */}
                      <div 
                        className="absolute inset-0 bg-black/50 dark:bg-black/70"
                        style={{ opacity: overlayStrength / 100 }}
                      />
                      {/* Render preview based on slide type */}
                      {slide.template === 'title' && (
                        <>
                          <div className={cn('truncate font-bold', getTitleSizeClass(slide.titleSize))} style={{ color: slide.textColor }}>{slide.title}</div>
                          {slide.subtitle && <div className={cn('truncate opacity-80', getContentSizeClass(slide.contentSize))} style={{ color: slide.textColor }}>{slide.subtitle}</div>}
                        </>
                      )}
                      {slide.template === 'bullets' && (
                        <>
                          <div className={cn('truncate font-bold', getTitleSizeClass(slide.titleSize))} style={{ color: slide.textColor }}>{slide.title}</div>
                          <ul className="mt-1 space-y-1">
                            {(slide.bulletPoints || ['• ...']).slice(0, 3).map((bullet, i) => (
                              <li key={i} className={cn('truncate flex items-center gap-1', getContentSizeClass(slide.contentSize))} style={{ color: slide.textColor }}>
                                <span className="w-2 h-2 rounded-full inline-block mr-1" style={{ backgroundColor: slide.accentColor }}></span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {slide.template === 'quote' && (
                        <>
                          <div className={cn('italic truncate', getContentSizeClass(slide.contentSize))} style={{ color: slide.textColor }}>
                            “{slide.content || 'Quote...'}”
                          </div>
                          {slide.subtitle && <div className={cn('truncate opacity-80 mt-1', getContentSizeClass(slide.contentSize))} style={{ color: slide.textColor }}>{slide.subtitle}</div>}
                        </>
                      )}
                      {slide.template === 'two-column' && (
                        <div className="flex gap-1">
                          <div className={cn('truncate flex-1', getContentSizeClass(slide.contentSize))} style={{ color: slide.textColor }}>{slide.content?.split('\n')[0] || 'Left...'}</div>
                          <div className={cn('truncate flex-1 opacity-80', getContentSizeClass(slide.contentSize))} style={{ color: slide.textColor }}>{slide.subtitle || 'Right...'}</div>
                        </div>
                      )}
                      {slide.template === 'image-text' && (
                        <>
                          <div className={cn('truncate font-bold', getTitleSizeClass(slide.titleSize))} style={{ color: slide.textColor }}>{slide.title}</div>
                          <div className={cn('truncate opacity-80', getContentSizeClass(slide.contentSize))} style={{ color: slide.textColor }}>{slide.content}</div>
                        </>
                      )}
                      {/* Fallback for other types */}
                      {['content', 'conclusion'].includes(slide.template) && (
                        <>
                          <div className={cn('truncate font-bold', getTitleSizeClass(slide.titleSize))} style={{ color: slide.textColor }}>{slide.title}</div>
                          <div className={cn('truncate opacity-80', getContentSizeClass(slide.contentSize))} style={{ color: slide.textColor }}>{slide.content}</div>
                        </>
                      )}
                    </div>
                  </div>
                  {/* Slide Info and Editable Title/Description */}
                  <div className="text-sm font-semibold text-orange-900 dark:text-orange-100 truncate">
                    {index + 1}. {currentSlideIndex === index ? (
                      <input
                        type="text"
                        value={slide.title}
                        onChange={e => handleSlideEdit(slide.id, 'title', e.target.value)}
                        className="w-full bg-transparent border-b border-orange-200 dark:border-orange-700 focus:outline-none focus:border-orange-500 text-orange-900 dark:text-orange-100 font-bold"
                        placeholder="Slide Title..."
                        onSelect={() => { /* show formatting toolbar logic here */ }}
                      />
                    ) : slide.title}
                  </div>
                  <div className="text-xs text-orange-600 dark:text-orange-300 mt-1 truncate">
                    {currentSlideIndex === index ? (
                      <input
                        type="text"
                        value={slide.subtitle || ''}
                        onChange={e => handleSlideEdit(slide.id, 'subtitle', e.target.value)}
                        className="w-full bg-transparent border-b border-orange-100 dark:border-orange-800 focus:outline-none focus:border-orange-400 text-orange-600 dark:text-orange-300"
                        placeholder="Description..."
                        onSelect={() => { /* show formatting toolbar logic here */ }}
                      />
                    ) : slide.subtitle}
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
                className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl border-b border-orange-200/40 dark:border-orange-800/40 shadow-2xl rounded-b-3xl w-full mt-0 transition-all duration-300"
              >
                {showTemplateSelector && (
                  <div className="p-3">
                    <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-2 font-playfair text-base border-b border-orange-200/40 dark:border-orange-800/40 pb-1 uppercase tracking-wide flex items-center gap-2">
                      <Palette className="w-4 h-4 text-orange-400" /> Choose Template
                    </h3>
                    <div className="grid grid-cols-4 gap-3 w-full">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          onClick={() => handleTemplateChange(template)}
                          className={cn(
                            "p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 group hover:scale-105 hover:shadow-xl bg-gradient-to-br from-white/80 to-orange-50 dark:from-gray-900/80 dark:to-orange-900/30 w-full flex-1",
                            selectedTemplate.id === template.id
                              ? "border-orange-500 ring-2 ring-orange-400 shadow-2xl"
                              : "border-orange-200/40 dark:border-orange-700/40 hover:border-orange-400"
                          )}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-3xl text-center group-hover:scale-110 transition-transform">{template.preview}</div>
                            {selectedTemplate.id === template.id && <CheckCircle className="w-5 h-5 text-orange-500" />}
                          </div>
                          <div className="font-semibold text-orange-900 dark:text-orange-100 text-center">{template.name}</div>
                          <div className="text-xs text-orange-600 dark:text-orange-300 text-center mt-1">{template.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {showCustomization && currentSlide && (
                  <div className="p-3 border-t border-orange-200/50 dark:border-orange-800/50">
                    <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-2 font-playfair text-base border-b border-orange-200/40 dark:border-orange-800/40 pb-1 uppercase tracking-wide flex items-center gap-2">
                      <Settings className="w-4 h-4 text-orange-400" /> Customize Slide
                    </h3>
                    <hr className="my-4 border-orange-200/40 dark:border-orange-800/40" />
                    <div className="flex items-center gap-2 overflow-x-auto py-2 mb-2">
                      {backgroundImages.map((bg, i) => {
                        let style = {};
                        if (bg.startsWith('linear-gradient') || bg.startsWith('radial-gradient')) {
                          style = { background: bg };
                        } else if (bg.startsWith('data:image/svg+xml') || bg.startsWith('data:image')) {
                          style = { backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' };
                        } else if (bg.startsWith('http')) {
                          style = { backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' };
                        } else {
                          style = { background: '#f3f4f6' };
                        }
                        return (
                          <button key={i} onClick={() => handleSlideEdit(currentSlide.id, 'backgroundImage', bg)} className={cn(
                            'relative h-12 w-20 rounded-lg border-2 transition-all duration-200 flex-shrink-0',
                            currentSlide.backgroundImage === bg ? 'border-orange-500 ring-2 ring-orange-400' : 'border-orange-200 hover:border-orange-400',
                            'shadow-sm'
                          )} style={style}>
                            {currentSlide.backgroundImage === bg && <span className="absolute top-1 right-1 bg-orange-500 text-white rounded-full p-1 text-xs">✓</span>}
                            {/* Fallback for empty/invalid backgrounds */}
                            {!bg && <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">N/A</span>}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex w-full gap-3 items-end">
                      {/* Font family/size */}
                      <div className="flex flex-col flex-1 min-w-[120px]">
                        <label className="text-xs font-medium text-orange-800 dark:text-orange-200">Font</label>
                        <select value={currentSlide.fontFamily} onChange={e => handleSlideEdit(currentSlide.id, 'fontFamily', e.target.value)} className="w-full p-1.5 rounded-lg border border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800 text-sm" >
                          {fontOptions.map(font => (<option key={font.id} value={font.id}>{font.name}</option>))}
                        </select>
                        <label className="text-xs font-medium text-orange-800 dark:text-orange-200 mt-1">Size</label>
                        <select value={currentSlide.titleSize} onChange={e => handleSlideEdit(currentSlide.id, 'titleSize', e.target.value)} className="w-full p-1.5 rounded-lg border border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800 text-sm" >
                          {titleSizeOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                        </select>
                      </div>
                      {/* Text color, background color, border, shadow */}
                      <div className="flex flex-col flex-1 min-w-[120px]">
                        <label className="text-xs font-medium text-orange-800 dark:text-orange-200">Text Color</label>
                        <input type="color" value={currentSlide.textColor} onChange={e => handleSlideEdit(currentSlide.id, 'textColor', e.target.value)} className="w-7 h-7 p-0 border-none rounded shadow" title="Text Color" />
                        <label className="text-xs font-medium text-orange-800 dark:text-orange-200 mt-1">Background</label>
                        <input type="color" value={currentSlide.textBgColor || '#ffffff'} onChange={e => handleSlideEdit(currentSlide.id, 'textBgColor', e.target.value)} className="w-7 h-7 p-0 border-none rounded shadow" title="Text Background Color" />
                        <label className="text-xs font-medium text-orange-800 dark:text-orange-200 mt-1">Border</label>
                        <input type="color" value={currentSlide.textBorderColor || '#000000'} onChange={e => handleSlideEdit(currentSlide.id, 'textBorderColor', e.target.value)} className="w-7 h-7 p-0 border-none rounded shadow" title="Text Border Color" />
                        <label className="text-xs font-medium text-orange-800 dark:text-orange-200 mt-1">Shadow</label>
                        <input type="checkbox" checked={!!currentSlide.textShadow} onChange={e => handleSlideEdit(currentSlide.id, 'textShadow', e.target.checked)} title="Text Shadow" />
                      </div>
                      {/* Formatting controls */}
                      <div className="flex flex-1 items-center gap-1 justify-center">
                        <button title="Bold" className="p-1 rounded hover:bg-orange-100" onClick={() => handleFormatTitle('bold')}><b>B</b></button>
                        <button title="Italic" className="p-1 rounded hover:bg-orange-100" onClick={() => handleFormatTitle('italic')}><i>I</i></button>
                        <button title="Underline" className="p-1 rounded hover:bg-orange-100" onClick={() => handleFormatTitle('underline')}><u>U</u></button>
                        <button title="Strikethrough" className="p-1 rounded hover:bg-orange-100" onClick={() => handleFormatTitle('strikeThrough')}><s>S</s></button>
                        <button title="Quote" className="p-1 rounded hover:bg-orange-100" onClick={() => handleFormatTitle('formatBlock', 'BLOCKQUOTE')}>“”</button>
                        <button title="Duplicate" className="p-1 rounded hover:bg-orange-100" onClick={handleCopy}><CopyIcon /></button>
                        <button title="Group" className="p-1 rounded hover:bg-orange-100" onClick={handleGroup}><LayersIcon /></button>
                        <button title="Ungroup" className="p-1 rounded hover:bg-orange-100" onClick={handleUngroup}><LayersIcon /></button>
                        </div>
                      {/* Alignment, letter spacing, line height */}
                      <div className="flex flex-1 items-center gap-1 justify-center">
                        <button title="Align Left" className="p-1 rounded hover:bg-orange-100" onClick={() => handleSlideEdit(currentSlide.id, 'alignment', 'left')}>L</button>
                        <button title="Align Center" className="p-1 rounded hover:bg-orange-100" onClick={() => handleSlideEdit(currentSlide.id, 'alignment', 'center')}>C</button>
                        <button title="Align Right" className="p-1 rounded hover:bg-orange-100" onClick={() => handleSlideEdit(currentSlide.id, 'alignment', 'right')}>R</button>
                        <label className="text-xs font-medium text-orange-800 dark:text-orange-200 ml-2">Spacing</label>
                        <input type="range" min="0" max="10" value={currentSlide.letterSpacing || 0} onChange={e => handleSlideEdit(currentSlide.id, 'letterSpacing', Number(e.target.value))} className="w-16" title="Letter Spacing" />
                        <label className="text-xs font-medium text-orange-800 dark:text-orange-200 ml-2">Line</label>
                        <input type="range" min="1" max="3" step="0.1" value={currentSlide.lineHeight || 1.2} onChange={e => handleSlideEdit(currentSlide.id, 'lineHeight', Number(e.target.value))} className="w-16" title="Line Height" />
                      </div>
                      {/* Overlay settings */}
                      <div className="flex flex-col flex-1 min-w-[120px]">
                        <label className="text-xs font-medium text-orange-800 dark:text-orange-200">Overlay</label>
                        <input type="color" value={overlayColor} onChange={e => setOverlayColor(e.target.value)} className="w-7 h-7 p-0 border-none rounded shadow" title="Overlay Color" />
                        <input type="range" min="0" max="100" value={overlayStrength} onChange={e => setOverlayStrength(Number(e.target.value))} className="w-full" title="Overlay Strength" />
                        <span className="text-xs text-orange-700">{overlayStrength}%</span>
                          </div>
                      {/* Export, undo/redo, more */}
                      <div className="flex flex-1 items-center gap-1 justify-center">
                        <button title="Undo" className="p-1 rounded hover:bg-orange-100" onClick={handleUndo}><UndoIcon /></button>
                        <button title="Redo" className="p-1 rounded hover:bg-orange-100" onClick={handleRedo}><RedoIcon /></button>
                        <button title="Export as Image" className="p-1 rounded hover:bg-orange-100" onClick={handleExportImage}><ImageIconIcon /></button>
                        <button title="Export as PDF" className="p-1 rounded hover:bg-orange-100" onClick={handleExportPDF}><FileText /></button>
                        <div className="relative group">
                          <button title="More" className="p-1 rounded hover:bg-orange-100">•••</button>
                          {/* More dropdown: add more advanced/less-used features here */}
                          <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-900 border border-orange-200 dark:border-orange-700 rounded shadow-lg p-2 hidden group-hover:block z-50 min-w-[180px]">
                            <button className="block w-full text-left p-1 hover:bg-orange-50 dark:hover:bg-orange-800 rounded">Zoom In</button>
                            <button className="block w-full text-left p-1 hover:bg-orange-50 dark:hover:bg-orange-800 rounded">Zoom Out</button>
                            <button className="block w-full text-left p-1 hover:bg-orange-50 dark:hover:bg-orange-800 rounded">Lock</button>
                            <button className="block w-full text-left p-1 hover:bg-orange-50 dark:hover:bg-orange-800 rounded">Unlock</button>
                            {/* Add more features as needed */}
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
            <div className="max-w-7xl mx-auto p-12 md:p-16 rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-900/80 transition-all duration-300">
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