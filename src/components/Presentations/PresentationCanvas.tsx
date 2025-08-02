import React, { useCallback, useRef, useEffect, useState } from 'react';
import PresentationToolbar from './PresentationToolbar';
import SlideEditor from './SlideEditor';
import { Button } from '../ui/button';
import { Plus, FileText, Download, Upload, Save, RotateCcw, Presentation, Trash2, Copy, Image as ImageIcon, Type, Palette, Quote, Settings, CheckCircle, Undo2 as UndoIcon, Redo2 as RedoIcon, Copy as CopyIcon, Pause as PasteIcon, Bug as BlurIcon, Layers as LayersIcon, Lock as LockIcon, AlignEndVertical as AlignVerticalIcon, AlignEndHorizontal as AlignHorizontalIcon, Image as ImageIconIcon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon, AlignLeft as AlignLeftIcon, AlignCenter as AlignCenterIcon, AlignRight as AlignRightIcon, Play, Pause, Sparkles, Brain, Zap, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PptxGenJS from 'pptxgenjs';
import ShineBorder from './ShineBorder';
import PresentationsSidebar from './PresentationsSidebar';
import AdvancedFeatures from './AdvancedFeatures';

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
    id: 'corporate',
    name: 'Corporate Pro',
    description: 'Executive-level business presentations',
    preview: '🏢',
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    accentColor: '#60a5fa',
    fontFamily: 'inter',
    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'creative',
    name: 'Creative Studio',
    description: 'Modern and innovative designs',
    preview: '🎨',
    primaryColor: '#7c3aed',
    secondaryColor: '#a855f7',
    accentColor: '#c084fc',
    fontFamily: 'poppins',
    backgroundImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    description: 'Clean and sophisticated layouts',
    preview: '⚪',
    primaryColor: '#374151',
    secondaryColor: '#6b7280',
    accentColor: '#9ca3af',
    fontFamily: 'inter',
    backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
  },
  {
    id: 'luxury',
    name: 'Luxury Elite',
    description: 'Premium and elegant designs',
    preview: '💎',
    primaryColor: '#92400e',
    secondaryColor: '#f59e0b',
    accentColor: '#fbbf24',
    fontFamily: 'playfair',
    backgroundImage: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: 'tech',
    name: 'Tech Innovation',
    description: 'Cutting-edge technology presentations',
    preview: '🚀',
    primaryColor: '#059669',
    secondaryColor: '#10b981',
    accentColor: '#34d399',
    fontFamily: 'mono',
    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'finance',
    name: 'Financial',
    description: 'Professional financial reports',
    preview: '📊',
    primaryColor: '#dc2626',
    secondaryColor: '#ef4444',
    accentColor: '#f87171',
    fontFamily: 'inter',
    backgroundImage: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Engaging marketing presentations',
    preview: '📈',
    primaryColor: '#ea580c',
    secondaryColor: '#f97316',
    accentColor: '#fb923c',
    fontFamily: 'poppins',
    backgroundImage: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Research and educational content',
    preview: '🎓',
    primaryColor: '#7c2d12',
    secondaryColor: '#b45309',
    accentColor: '#d97706',
    fontFamily: 'playfair',
    backgroundImage: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
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
    // Get current slide for formatting inheritance
    const currentSlide = slides[currentSlideIndex];
    
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      title,
      content,
      subtitle,
      template,
      backgroundColor: currentSlide?.backgroundColor || selectedTemplate.primaryColor,
      textColor: currentSlide?.textColor || 'hsl(0 0% 100%)',
      accentColor: currentSlide?.accentColor || selectedTemplate.accentColor,
      fontFamily: currentSlide?.fontFamily || selectedTemplate.fontFamily,
      titleSize: currentSlide?.titleSize || titleSize,
      contentSize: currentSlide?.contentSize || contentSize,
      alignment: currentSlide?.alignment || 'left',
      bulletPoints: template === 'bullets' ? ['First point', 'Second point', 'Third point'] : undefined,
      backgroundImage: currentSlide?.backgroundImage || backgroundImages[0],
      letterSpacing: currentSlide?.letterSpacing,
      lineHeight: currentSlide?.lineHeight,
      textShadow: currentSlide?.textShadow,
      textOpacity: currentSlide?.textOpacity,
      textBgColor: currentSlide?.textBgColor,
      textBorderColor: currentSlide?.textBorderColor,
      isLocked: currentSlide?.isLocked,
      isBackgroundBlur: currentSlide?.isBackgroundBlur,
    };
    setSlides([...slides, newSlide]);
    setCurrentSlideIndex(slides.length);
    toast.success(`New ${customType || template} slide added with inherited formatting`);
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

  const handleMoveSlideUp = (slideId: string) => {
    const currentIndex = slides.findIndex(slide => slide.id === slideId);
    if (currentIndex > 0) {
      const newSlides = [...slides];
      const temp = newSlides[currentIndex];
      newSlides[currentIndex] = newSlides[currentIndex - 1];
      newSlides[currentIndex - 1] = temp;
      setSlides(newSlides);
      setCurrentSlideIndex(currentIndex - 1);
      toast.success('Slide moved up');
    }
  };

  const handleMoveSlideDown = (slideId: string) => {
    const currentIndex = slides.findIndex(slide => slide.id === slideId);
    if (currentIndex < slides.length - 1) {
      const newSlides = [...slides];
      const temp = newSlides[currentIndex];
      newSlides[currentIndex] = newSlides[currentIndex + 1];
      newSlides[currentIndex + 1] = temp;
      setSlides(newSlides);
      setCurrentSlideIndex(currentIndex + 1);
      toast.success('Slide moved down');
    }
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

  // Advanced Features Handlers
  const handleAIGenerate = () => {
    toast.success('AI Content Generation activated!');
    // TODO: Implement AI content generation
  };

  const handleSmartLayout = () => {
    toast.success('Smart Layout Engine activated!');
    // TODO: Implement smart layout engine
  };

  const handleAutoAnimate = () => {
    toast.success('Auto Animations activated!');
    // TODO: Implement auto animations
  };

  const handleCollaborate = () => {
    toast.success('Real-time Collaboration activated!');
    // TODO: Implement collaboration features
  };

  const handleExportAdvanced = () => {
    toast.success('Advanced Export activated!');
    // TODO: Implement advanced export options
  };

  const handlePresentMode = () => {
    toast.success('Presentation Mode activated!');
    // TODO: Implement full-screen presentation mode
  };

  const handleDevicePreview = () => {
    toast.success('Multi-Device Preview activated!');
    // TODO: Implement device preview
  };

  const handleAnalytics = () => {
    toast.success('Presentation Analytics activated!');
    // TODO: Implement analytics
  };

  // Advanced Features Handler with Intelligent Algorithms
  const [showAdvancedFeaturesMenu, setShowAdvancedFeaturesMenu] = useState(false);
  
  const handleAdvancedFeatures = () => {
    if (!currentSlide) return;
    setShowAdvancedFeaturesMenu(!showAdvancedFeaturesMenu);
  };

  const features = [
    {
      name: 'AI Content Enhancement',
      description: 'Improve content with AI',
      icon: Brain,
      color: 'from-blue-500 to-purple-500',
      action: () => {
        const enhancedContent = currentSlide.content + '\n\n🤖 AI Enhanced:\n• Improved clarity and professional tone\n• Added strategic insights and data points\n• Enhanced readability with better structure\n• Optimized for audience engagement';
        
        setSlides(slides.map(slide => 
          slide.id === currentSlide.id 
            ? { ...slide, content: enhancedContent }
            : slide
        ));
        toast.success('AI content enhancement applied!');
        setShowAdvancedFeaturesMenu(false);
      }
    },
    {
      name: 'Smart Layout Optimization',
      description: 'Optimize slide layout automatically',
      icon: Zap,
      color: 'from-emerald-500 to-green-500',
      action: () => {
        const optimizedSlide: Slide = {
          ...currentSlide,
          alignment: 'center' as const,
          titleSize: 'large' as const,
          contentSize: 'medium' as const,
          letterSpacing: 0.5,
          lineHeight: 1.4,
          textShadow: true
        };
        
        setSlides(slides.map(slide => 
          slide.id === currentSlide.id ? optimizedSlide : slide
        ));
        toast.success('Smart layout optimization applied!');
        setShowAdvancedFeaturesMenu(false);
      }
    },
    {
      name: 'Professional Animations',
      description: 'Add smooth animations',
      icon: Sparkles,
      color: 'from-orange-500 to-pink-500',
      action: () => {
        const animatedContent = currentSlide.content + '\n\n✨ Animations Applied:\n• Fade-in entrance effects\n• Smooth content transitions\n• Progressive reveal animations\n• Professional timing sequences';
        
        setSlides(slides.map(slide => 
          slide.id === currentSlide.id 
            ? { ...slide, content: animatedContent }
            : slide
        ));
        toast.success('Professional animations added!');
        setShowAdvancedFeaturesMenu(false);
      }
    },
    {
      name: 'Generate Professional Content',
      description: 'Create business content',
      icon: FileText,
      color: 'from-indigo-500 to-blue-500',
      action: () => {
        const professionalContent = {
          title: 'Strategic Business Overview',
          subtitle: 'Q4 2024 Performance & Future Roadmap',
          content: '📊 Key Performance Metrics:\n• Revenue Growth: +23% YoY\n• Market Expansion: 3 new regions\n• Innovation Pipeline: 15 new products\n• Customer Satisfaction: 94%\n\n🎯 Strategic Initiatives:\n• Digital Transformation\n• Market Penetration\n• Product Innovation\n• Customer Experience',
          bulletPoints: [
            'Revenue Growth: +23% YoY',
            'Market Expansion: 3 new regions',
            'Innovation Pipeline: 15 new products',
            'Customer Satisfaction: 94%'
          ]
        };
        
        setSlides(slides.map(slide => 
          slide.id === currentSlide.id 
            ? { ...slide, ...professionalContent }
            : slide
        ));
        toast.success('Professional content generated!');
        setShowAdvancedFeaturesMenu(false);
      }
    },
    {
      name: 'Auto-Format Text',
      description: 'Apply professional formatting',
      icon: Type,
      color: 'from-purple-500 to-pink-500',
      action: () => {
        const formattedSlide: Slide = {
          ...currentSlide,
          fontFamily: 'Inter',
          titleSize: 'large' as const,
          contentSize: 'medium' as const,
          alignment: 'center' as const,
          letterSpacing: 0.3,
          lineHeight: 1.6,
          textShadow: true,
          textOpacity: 0.9
        };
        
        setSlides(slides.map(slide => 
          slide.id === currentSlide.id ? formattedSlide : slide
        ));
        toast.success('Professional formatting applied!');
        setShowAdvancedFeaturesMenu(false);
      }
    },
    {
      name: 'Add Smart Bullets',
      description: 'Convert to bullet points',
      icon: List,
      color: 'from-green-500 to-emerald-500',
      action: () => {
        const bulletContent = currentSlide.content.split('\n').filter(line => line.trim()).map(line => `• ${line.trim()}`).join('\n');
        
        setSlides(slides.map(slide => 
          slide.id === currentSlide.id 
            ? { ...slide, content: bulletContent, template: 'bullets' as const }
            : slide
        ));
        toast.success('Smart bullets added!');
        setShowAdvancedFeaturesMenu(false);
      }
    }
  ];

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
    <div className="h-screen w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-[#0a0a0f] dark:via-[#1a1a2e] dark:to-[#16213e] flex flex-col relative overflow-hidden">
      {/* Enhanced Luxury Background with Corporate Aesthetics */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Light mode luxury gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:opacity-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(147,51,234,0.06)_0%,transparent_50%)] dark:opacity-0"></div>
        
        {/* Dark mode luxury gradients */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/90 via-[#1a1a2e]/95 to-[#16213e]/90"></div>
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(99,102,241,0.15)_0%,transparent_60%)]"></div>
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(147,51,234,0.10)_0%,transparent_70%)]"></div>
        
        {/* Corporate mesh pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        {/* Luxury border accents */}
        <div className="absolute inset-0 border border-white/10 dark:border-gray-700/20 rounded-3xl"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent dark:via-indigo-500/30"></div>
      </div>
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
            onMoveSlideUp={handleMoveSlideUp}
            onMoveSlideDown={handleMoveSlideDown}
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
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 font-playfair text-lg border-b border-gray-200/40 dark:border-gray-700/40 pb-2 uppercase tracking-wide flex items-center gap-2">
                      <Palette className="w-5 h-5 text-blue-500" /> Choose Professional Template
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          onClick={() => handleTemplateChange(template)}
                          className={cn(
                            "p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 group hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-white/90 to-gray-50 dark:from-gray-900/90 dark:to-gray-800/50 backdrop-blur-sm w-full flex-1 relative overflow-hidden",
                            selectedTemplate.id === template.id
                              ? "border-blue-500 ring-2 ring-blue-400 shadow-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/60 dark:from-blue-900/30 dark:to-indigo-900/20"
                              : "border-gray-200/60 dark:border-gray-700/60 hover:border-blue-400 hover:shadow-xl"
                          )}
                        >
                          {/* Template background preview */}
                          {template.backgroundImage && (
                            <div 
                              className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity rounded-xl"
                              style={{ background: template.backgroundImage }}
                            />
                          )}
                          
                          <div className="relative z-10">
                            <div className="flex justify-between items-center mb-3">
                              <div className="text-4xl text-center group-hover:scale-110 transition-transform">{template.preview}</div>
                              {selectedTemplate.id === template.id && (
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="font-bold text-gray-900 dark:text-gray-100 text-center text-sm mb-1">{template.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 text-center leading-tight">{template.description}</div>
                          </div>
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
          {/* Slide Canvas with perfect centering and advanced features */}
          <div className="flex-1 flex flex-col items-center justify-center w-full px-4 py-6 sm:py-8 md:py-10 lg:py-12 overflow-auto relative">
            {/* Enhanced Circular Features Widget - Canvas Level */}
            {!isPreviewMode && (
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={handleAdvancedFeatures}
                  className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border-0 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
                  title="Advanced Slide Features"
                  style={{ background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)' }}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 text-white" />
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
                </button>

                {/* Luxury Advanced Features Dropdown Menu */}
                <AnimatePresence>
                  {showAdvancedFeaturesMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-16 right-0 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 z-50"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Advanced Features</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Enhance your slide</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowAdvancedFeaturesMenu(false)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Features Grid */}
                      <div className="grid grid-cols-1 gap-3">
                        {features.map((feature, index) => (
                          <motion.button
                            key={feature.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={feature.action}
                            className="group relative p-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md"
                          >
                            <div className="flex items-center space-x-3">
                              {/* Icon */}
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
                                <feature.icon className="w-5 h-5 text-white" />
                              </div>
                              
                              {/* Content */}
                              <div className="flex-1 text-left">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                  {feature.name}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  {feature.description}
                                </p>
                              </div>
                              
                              {/* Arrow */}
                              <div className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                            
                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 to-amber-50/50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                          </motion.button>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Powered by AI</span>
                          <span className="text-orange-500">v2.0</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            {/* Advanced slide container with perfect centering */}
            <div
              className="relative w-full max-w-5xl mx-auto"
              style={{ 
                transform: `scale(${zoomLevel})`, 
                transformOrigin: 'center center',
                aspectRatio: '16/9',
                minHeight: 'min(450px, 65vh)',
                maxHeight: 'min(75vh, 700px)'
              }}
            >
              {/* Professional slide frame with enhanced styling */}
              <div className="w-full h-full rounded-3xl shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 transition-all duration-300 relative overflow-hidden">
                {/* Slide content container */}
                <div className="w-full h-full p-6 sm:p-8 md:p-10 lg:p-12 relative">
                  {/* Advanced slide background with multiple layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"></div>
                  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_20%,#3b82f6_0%,transparent_50%),radial-gradient(circle_at_70%_80%,#8b5cf6_0%,transparent_50%)]"></div>
                  
                  {/* Slide content */}
                  <div className="relative z-10 h-full flex flex-col justify-center">
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
              </div>
            </div>
          </div>
          {/* Enhanced Professional Navigation Controls */}
          <div className="sticky bottom-0 left-0 w-full flex justify-center items-center z-20 p-4">
            <div className="mx-auto px-6 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl flex items-center space-x-4 flex-wrap justify-center gap-2">
              <Button
                onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                disabled={currentSlideIndex === 0 || isPlaying}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50/80 dark:bg-blue-900/30 rounded-xl border border-blue-200/50 dark:border-blue-700/50 shadow-sm">
                <Presentation className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-900 dark:text-blue-100 font-semibold text-sm">
                  {currentSlideIndex + 1} of {slides.length}
                </span>
              </div>
              
              <Button
                onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
                disabled={currentSlideIndex === slides.length - 1 || isPlaying}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Next
              </Button>
              
              {/* Play/Pause and Timer */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={handlePlayPause}
                  variant="outline"
                  size="sm"
                  className={cn('border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300', isPlaying && 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-400')}
                  disabled={slides.length <= 1}
                  title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <select
                  value={playInterval}
                  onChange={e => setPlayInterval(Number(e.target.value))}
                  disabled={isPlaying}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  title="Slide Interval (seconds)"
                >
                  {playIntervals.map(sec => (
                    <option key={sec} value={sec}>{sec}s</option>
                  ))}
                </select>
              </div>
              
              {/* Zoom controls */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.1))}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
                  title="Zoom Out"
                >
                  <ZoomOutIcon className="w-4 h-4" />
                </Button>
                <span className="text-gray-900 dark:text-gray-100 font-semibold text-sm min-w-[3rem] text-center">{Math.round(zoomLevel * 100)}%</span>
                <Button
                  onClick={() => setZoomLevel(z => Math.min(2, z + 0.1))}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
                  title="Zoom In"
                >
                  <ZoomInIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Advanced Features Component */}
      <AdvancedFeatures
        onAIGenerate={handleAIGenerate}
        onSmartLayout={handleSmartLayout}
        onAutoAnimate={handleAutoAnimate}
        onCollaborate={handleCollaborate}
        onExportAdvanced={handleExportAdvanced}
        onPresentMode={handlePresentMode}
        onDevicePreview={handleDevicePreview}
        onAnalytics={handleAnalytics}
      />
    </div>
  );
};

export default PresentationCanvas;