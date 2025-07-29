import React, { useCallback, useRef, useEffect, useState } from 'react';
import PresentationToolbar from './PresentationToolbar';
import SlideEditor from './SlideEditor';
import { Button } from '../ui/button';
import { Plus, FileText, Download, Upload, Save, RotateCcw, Presentation, Trash2, Copy, Image as ImageIcon, Type, Palette, Quote, Settings, CheckCircle, Undo2 as UndoIcon, Redo2 as RedoIcon, Copy as CopyIcon, Pause as PasteIcon, Bug as BlurIcon, Layers as LayersIcon, Lock as LockIcon, AlignEndVertical as AlignVerticalIcon, AlignEndHorizontal as AlignHorizontalIcon, Image as ImageIconIcon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon, AlignLeft as AlignLeftIcon, AlignCenter as AlignCenterIcon, AlignRight as AlignRightIcon, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PptxGenJS from 'pptxgenjs';
import ShineBorder from './ShineBorder';
import PresentationsSidebar from './PresentationsSidebar';

interface Slide {
  id: string;
  title: string;
  content: string;
  subtitle?: string;
  template: 'title' | 'content' | 'two-column' | 'image-text' | 'conclusion' | 'quote' | 'bullets' | 'aura';
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
  {
    id: 'aura',
    name: 'Aura',
    description: 'Animated shine border, inspired by 21st.dev',
    preview: '✨',
    primaryColor: '#7F5FFF',
    secondaryColor: '#00E0FF',
    accentColor: '#FF61A6',
    fontFamily: 'poppins',
    backgroundImage: undefined,
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playInterval, setPlayInterval] = useState(5); // seconds
  const playIntervals = [2, 5, 10];
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

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
        alignment: 'left',
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

  // Add this function inside PresentationCanvas:
  const handleExportPPTX = () => {
    const pptx = new PptxGenJS();
    slides.forEach((slide) => {
      const s = pptx.addSlide();
      // Set background
      if (slide.backgroundImage && (slide.backgroundImage.startsWith('http') || slide.backgroundImage.startsWith('data:image'))) {
        s.background = { data: slide.backgroundImage };
      } else if (slide.backgroundColor) {
        s.background = { fill: slide.backgroundColor };
      }
      // Add title
      s.addText(slide.title || '', {
        x: 0.5, y: 0.5, w: 9, h: 1,
        fontSize: slide.titleSize === 'xl' ? 36 : slide.titleSize === 'large' ? 28 : slide.titleSize === 'medium' ? 22 : 18,
        bold: true,
        color: slide.textColor || '000000',
        align: slide.alignment || 'center',
      });
      // Add subtitle
      if (slide.subtitle) {
        s.addText(slide.subtitle, {
          x: 0.5, y: 1.2, w: 9, h: 0.7,
          fontSize: 18,
          color: slide.textColor || '444444',
          italic: true,
          align: slide.alignment || 'center',
        });
      }
      // Add main content
      if (slide.template === 'bullets' && slide.bulletPoints) {
        s.addText(slide.bulletPoints.map(b => `• ${b}`).join('\n'), {
          x: 0.7, y: 2, w: 8.5, h: 4,
          fontSize: 18,
          color: slide.textColor || '222222',
          align: slide.alignment || 'left',
        });
      } else if (slide.content) {
        s.addText(slide.content, {
          x: 0.7, y: 2, w: 8.5, h: 4,
          fontSize: 18,
          color: slide.textColor || '222222',
          align: slide.alignment || 'left',
        });
      }
    });
    pptx.writeFile({ fileName: 'presentation.pptx' });
  };

  // Handle template selection from sidebar
  const handleSidebarTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    // Apply to all slides
    setSlides(slides.map(slide => ({
      ...slide,
      backgroundColor: template.primaryColor,
      accentColor: template.accentColor,
      fontFamily: template.fontFamily,
      backgroundImage: template.backgroundImage,
    })));
    toast.success(`Applied ${template.name} template to all slides`);
  };

  // Play/Pause logic
  useEffect(() => {
    if (isPlaying) {
      // If at the end, reset to first slide
      if (currentSlideIndex === slides.length - 1) {
        setCurrentSlideIndex(0);
      }
      playTimerRef.current = setInterval(() => {
        setCurrentSlideIndex(prev => {
          if (prev < slides.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playInterval * 1000);
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current);
      playTimerRef.current = null;
    }
    return () => {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
    };
  }, [isPlaying, playInterval, slides.length]);

  // If play is pressed after reaching the end, reset to first slide and start
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentSlideIndex === slides.length - 1) {
        setCurrentSlideIndex(0);
      }
      setIsPlaying(true);
    }
  };

  // Helper to render a thumbnail preview for a slide
  const renderSlideThumbnail = (slide: Slide) => (
    <div
      className="w-full h-20 rounded-lg overflow-hidden border border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-900 flex items-center justify-center relative"
      style={{
        background:
          slide.backgroundImage && (slide.backgroundImage.startsWith('linear-gradient') || slide.backgroundImage.startsWith('radial-gradient'))
            ? slide.backgroundImage
            : undefined,
        backgroundImage:
          slide.backgroundImage && (slide.backgroundImage.startsWith('data:image') || slide.backgroundImage.startsWith('http'))
            ? `url(${slide.backgroundImage})`
            : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60" style={{ opacity: 0.2 }} />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-2">
        <span className="text-xs font-bold text-orange-900 dark:text-orange-100 truncate w-full text-center">
          {slide.title || 'Untitled'}
        </span>
        {slide.subtitle && (
          <span className="text-[10px] text-orange-700 dark:text-orange-200 truncate w-full text-center">
            {slide.subtitle}
          </span>
        )}
      </div>
    </div>
  );

  // Handler for sidebar slide customization
  const handleSidebarSlideEdit = (slideId: string, key: string, value: any) => {
    setSlides(slides.map(slide =>
      slide.id === slideId
        ? { ...slide, [key]: value }
        : slide
    ));
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-[#18131a] dark:via-[#1a141f] dark:to-[#0e0a13] flex flex-col relative overflow-hidden">
      {/* Enhanced Luxury Dark Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle gold mesh and vignette for dark mode */}
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(255,215,96,0.10)_0%,transparent_60%)]"></div>
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(255,255,255,0.04)_0%,transparent_70%)]"></div>
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-[#18131a]/80 via-[#1a141f]/90 to-[#0e0a13]/95"></div>
        <div className="hidden dark:block absolute inset-0 border-t-2 border-b-2 border-[#ffd760]/10 rounded-b-3xl rounded-t-3xl pointer-events-none"></div>
        {/* Glassmorphism effect */}
        <div className="hidden dark:block absolute inset-0 backdrop-blur-[2.5px]" style={{ WebkitBackdropFilter: 'blur(2.5px)' }}></div>
      </div>
      {/* Existing light mode mesh backgrounds */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 dark:opacity-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(25_95%_53%_/_0.15)_0%,transparent_30%),radial-gradient(circle_at_70%_80%,hsl(45_93%_58%_/_0.1)_0%,transparent_40%)] dark:opacity-0"></div>
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
          <PresentationsSidebar
            slides={slides}
            currentSlideIndex={currentSlideIndex}
            onAddSlide={handleAddSlide}
            onDuplicateSlide={handleDuplicateSlide}
            onDeleteSlide={handleDeleteSlide}
            onSelectSlide={setCurrentSlideIndex}
            onTemplateSelect={handleSidebarTemplateSelect}
            onExport={handleExport}
            onImport={handleImport}
            onSave={handleSave}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed((v) => !v)}
            renderSlideThumbnail={renderSlideThumbnail}
            onSlideEdit={handleSidebarSlideEdit}
          />
        )}
        {/* Main Editor/Preview Area */}
        <div
          className={cn(
            'flex-1 flex flex-col items-center justify-center min-h-0 transition-all duration-300',
            !isPreviewMode && !isSidebarCollapsed ? 'ml-96' : '',
            !isPreviewMode && isSidebarCollapsed ? 'ml-20' : ''
          )}
        >
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
                    <div className="flex items-center gap-2 overflow-x-auto py-2 mb-2 max-w-[80vw]">
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
                    <div className="flex flex-row flex-wrap items-end gap-x-6 gap-y-3 w-full bg-white/60 dark:bg-gray-900/60 rounded-xl p-2 shadow-inner">
                      {/* Font controls */}
                      <div className="flex flex-col items-center min-w-[120px]">
                        <label className="text-xs font-medium text-orange-800 dark:text-orange-200">Font</label>
                        <select value={currentSlide.fontFamily} onChange={e => handleSlideEdit(currentSlide.id, 'fontFamily', e.target.value)} className="w-full p-1.5 rounded-lg border border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800 text-sm" >
                          {fontOptions.map(font => (<option key={font.id} value={font.id}>{font.name}</option>))}
                        </select>
                        <label className="text-xs font-medium text-orange-800 dark:text-orange-200 mt-1">Size</label>
                        <select value={currentSlide.titleSize} onChange={e => handleSlideEdit(currentSlide.id, 'titleSize', e.target.value)} className="w-full p-1.5 rounded-lg border border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-800 text-sm" >
                          {titleSizeOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                        </select>
                      </div>
                      {/* Color controls */}
                      <div className="flex flex-row items-center gap-2 min-w-[180px]">
                        <div className="flex flex-col items-center">
                          <label className="text-xs font-medium text-orange-800 dark:text-orange-200">Text</label>
                          <input type="color" value={currentSlide.textColor} onChange={e => handleSlideEdit(currentSlide.id, 'textColor', e.target.value)} className="w-7 h-7 p-0 border-none rounded shadow" title="Text Color" />
                        </div>
                        <div className="flex flex-col items-center">
                          <label className="text-xs font-medium text-orange-800 dark:text-orange-200">Bg</label>
                          <input type="color" value={currentSlide.textBgColor || '#ffffff'} onChange={e => handleSlideEdit(currentSlide.id, 'textBgColor', e.target.value)} className="w-7 h-7 p-0 border-none rounded shadow" title="Background Color" />
                        </div>
                        <div className="flex flex-col items-center">
                          <label className="text-xs font-medium text-orange-800 dark:text-orange-200">Border</label>
                          <input type="color" value={currentSlide.textBorderColor || '#000000'} onChange={e => handleSlideEdit(currentSlide.id, 'textBorderColor', e.target.value)} className="w-7 h-7 p-0 border-none rounded shadow" title="Border Color" />
                        </div>
                        <div className="flex flex-col items-center">
                          <label className="text-xs font-medium text-orange-800 dark:text-orange-200">Shadow</label>
                          <input type="checkbox" checked={!!currentSlide.textShadow} onChange={e => handleSlideEdit(currentSlide.id, 'textShadow', e.target.checked)} title="Text Shadow" />
                        </div>
                      </div>
                      {/* Formatting controls */}
                      <div className="flex flex-row items-center gap-1 min-w-[180px] bg-orange-50/40 dark:bg-orange-900/20 rounded-lg px-2 py-1">
                        <button title="Bold" className="p-1 rounded hover:bg-orange-100" onClick={() => handleFormatTitle('bold')}><b>B</b></button>
                        <button title="Italic" className="p-1 rounded hover:bg-orange-100" onClick={() => handleFormatTitle('italic')}><i>I</i></button>
                        <button title="Underline" className="p-1 rounded hover:bg-orange-100" onClick={() => handleFormatTitle('underline')}><u>U</u></button>
                        <button title="Strikethrough" className="p-1 rounded hover:bg-orange-100" onClick={() => handleFormatTitle('strikeThrough')}><s>S</s></button>
                        <button title="Quote" className="p-1 rounded hover:bg-orange-100" onClick={() => handleFormatTitle('formatBlock', 'BLOCKQUOTE')}>"</button>
                        <button title="Duplicate" className="p-1 rounded hover:bg-orange-100" onClick={handleCopy}><CopyIcon /></button>
                        <button title="Group" className="p-1 rounded hover:bg-orange-100" onClick={handleGroup}><LayersIcon /></button>
                        <button title="Ungroup" className="p-1 rounded hover:bg-orange-100" onClick={handleUngroup}><LayersIcon /></button>
                      </div>
                      {/* Alignment, spacing, line height */}
                      <div className="flex flex-row items-center gap-1 min-w-[180px] bg-orange-50/40 dark:bg-orange-900/20 rounded-lg px-2 py-1">
                        <button title="Align Left" className={cn("p-1 rounded hover:bg-orange-100", currentSlide.alignment === 'left' && 'bg-orange-200')} onClick={() => handleSlideEdit(currentSlide.id, 'alignment', 'left')}>
                          <AlignLeftIcon className="w-5 h-5" />
                        </button>
                        <button title="Align Center" className={cn("p-1 rounded hover:bg-orange-100", currentSlide.alignment === 'center' && 'bg-orange-200')} onClick={() => handleSlideEdit(currentSlide.id, 'alignment', 'center')}>
                          <AlignCenterIcon className="w-5 h-5" />
                        </button>
                        <button title="Align Right" className={cn("p-1 rounded hover:bg-orange-100", currentSlide.alignment === 'right' && 'bg-orange-200')} onClick={() => handleSlideEdit(currentSlide.id, 'alignment', 'right')}>
                          <AlignRightIcon className="w-5 h-5" />
                        </button>
                        <input type="range" min="0" max="10" value={currentSlide.letterSpacing || 0} onChange={e => handleSlideEdit(currentSlide.id, 'letterSpacing', Number(e.target.value))} className="w-16 mx-2" title="Letter Spacing" />
                        <input type="range" min="1" max="3" step="0.1" value={currentSlide.lineHeight || 1.2} onChange={e => handleSlideEdit(currentSlide.id, 'lineHeight', Number(e.target.value))} className="w-16" title="Line Height" />
                      </div>
                      {/* Overlay controls */}
                      <div className="flex flex-col items-center min-w-[120px]">
                        <label className="text-xs font-medium text-orange-800 dark:text-orange-200">Overlay</label>
                        <input type="color" value={overlayColor} onChange={e => setOverlayColor(e.target.value)} className="w-7 h-7 p-0 border-none rounded shadow" title="Overlay Color" />
                        <input type="range" min="0" max="100" value={overlayStrength} onChange={e => setOverlayStrength(Number(e.target.value))} className="w-full" title="Overlay Strength" />
                        <span className="text-xs text-orange-700">{overlayStrength}%</span>
                          </div>
                      {/* Actions */}
                      <div className="flex flex-row items-center gap-1 min-w-[120px] bg-orange-50/40 dark:bg-orange-900/20 rounded-lg px-2 py-1">
                        <button title="Undo" className="p-1 rounded hover:bg-orange-100" onClick={handleUndo}><UndoIcon /></button>
                        <button title="Redo" className="p-1 rounded hover:bg-orange-100" onClick={handleRedo}><RedoIcon /></button>
                        <button title="Export as Image" className="p-1 rounded hover:bg-orange-100" onClick={handleExportImage}><ImageIconIcon /></button>
                        <button title="Export as PDF" className="p-1 rounded hover:bg-orange-100" onClick={handleExportPDF}><FileText /></button>
                        <button title="Export as PowerPoint" className="p-1 rounded hover:bg-orange-100" onClick={handleExportPPTX}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M16 3v4a1 1 0 0 0 1 1h4"/><circle cx="8.5" cy="12.5" r="1.5"/><path d="M6 16V8h4a2 2 0 0 1 0 4H6"/></svg>
                        </button>
                        <div className="relative group">
                          <button title="More" className="p-1 rounded hover:bg-orange-100">•••</button>
                          <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-900 border border-orange-200 dark:border-orange-700 rounded shadow-lg p-2 hidden group-hover:block z-50 min-w-[180px]">
                            <button className="block w-full text-left p-1 hover:bg-orange-50 dark:hover:bg-orange-800 rounded">Zoom In</button>
                            <button className="block w-full text-left p-1 hover:bg-orange-50 dark:hover:bg-orange-800 rounded">Zoom Out</button>
                            <button className="block w-full text-left p-1 hover:bg-orange-50 dark:hover:bg-orange-800 rounded">Lock</button>
                            <button className="block w-full text-left p-1 hover:bg-orange-50 dark:hover:bg-orange-800 rounded">Unlock</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Slide Canvas with zoom and containment */}
          <div className="flex-1 flex flex-col items-center justify-center w-full px-2 py-8 md:py-16 overflow-auto">
            <div
              className="max-w-4xl w-full mx-auto p-8 md:p-14 rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-900/80 glass-card transition-all duration-300 relative"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center', minHeight: 400, maxHeight: '70vh' }}
            >
              {currentSlide && (
                <div className="slide-preview-content">
                  {currentSlide.template === 'aura' ? (
                    <ShineBorder>
                      <div className="flex flex-col items-center justify-center min-h-[300px]">
                        <h1 className="text-3xl font-bold mb-2">{currentSlide.title}</h1>
                        {currentSlide.subtitle && <p className="text-lg opacity-80 mb-4">{currentSlide.subtitle}</p>}
                        <div className="prose dark:prose-invert max-w-none text-center">
                          {currentSlide.content}
                        </div>
                      </div>
                    </ShineBorder>
                  ) : (
                    <SlideEditor
                      slide={currentSlide}
                      onSlideEdit={handleSlideEdit}
                      isPreviewMode={isPreviewMode}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Enhanced Slide Navigation Controls - sticky footer */}
          <div className="sticky bottom-0 left-0 w-full flex justify-center items-center z-20">
            <div className="mx-auto my-6 px-8 py-4 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/60 dark:to-amber-900/60 rounded-2xl border border-orange-200 dark:border-orange-700 shadow-2xl flex items-center space-x-6">
            <Button
              onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                disabled={currentSlideIndex === 0 || isPlaying}
              variant="outline"
              className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-300"
            >
              Previous
            </Button>
              <div className="flex items-center space-x-2 px-6 py-3 bg-white/80 dark:bg-gray-900/80 rounded-xl border border-orange-200 dark:border-orange-700 shadow">
              <Presentation className="w-4 h-4 text-orange-600 dark:text-orange-300" />
              <span className="text-orange-900 dark:text-orange-100 font-semibold">
                {currentSlideIndex + 1} of {slides.length}
              </span>
            </div>
            <Button
              onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
                disabled={currentSlideIndex === slides.length - 1 || isPlaying}
              variant="outline"
              className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-300"
            >
              Next
            </Button>
              {/* Play/Pause and Timer */}
              <div className="flex items-center gap-2 ml-6">
                <Button
                  onClick={handlePlayPause}
                  variant="outline"
                  className={cn('border-orange-200 text-orange-700 dark:border-orange-700 dark:text-orange-300', isPlaying && 'bg-orange-200/60 dark:bg-orange-800/60')}
                  disabled={slides.length <= 1}
                  title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <select
                  value={playInterval}
                  onChange={e => setPlayInterval(Number(e.target.value))}
                  disabled={isPlaying}
                  className="rounded-lg border border-orange-200 dark:border-orange-700 px-2 py-1 text-sm bg-white dark:bg-gray-900 text-orange-700 dark:text-orange-200"
                  title="Slide Interval (seconds)"
                >
                  {playIntervals.map(sec => (
                    <option key={sec} value={sec}>{sec}s</option>
                  ))}
                </select>
              </div>
              {/* Zoom controls */}
              <div className="flex items-center gap-2 ml-6">
                <Button
                  onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.1))}
                  variant="outline"
                  className="border-orange-200 text-orange-700 dark:border-orange-700 dark:text-orange-300"
                  title="Zoom Out"
                >
                  -
                </Button>
                <span className="text-orange-900 dark:text-orange-100 font-semibold">{Math.round(zoomLevel * 100)}%</span>
                <Button
                  onClick={() => setZoomLevel(z => Math.min(2, z + 0.1))}
                  variant="outline"
                  className="border-orange-200 text-orange-700 dark:border-orange-700 dark:text-orange-300"
                  title="Zoom In"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationCanvas;