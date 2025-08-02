import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface DrawingPoint {
  x: number;
  y: number;
  pressure?: number;
  timestamp: number;
}

interface DrawingPath {
  id: string;
  tool: string;
  color: string;
  brushSize: number;
  opacity: number;
  points: DrawingPoint[];
  isComplete: boolean;
}

interface WhiteboardElement {
  id: string;
  type: 'drawing' | 'text' | 'shape' | 'image' | 'sticky';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  style: {
    color: string;
    backgroundColor: string;
    fontSize: number;
    fontWeight: string;
    borderWidth: number;
    borderColor: string;
    borderRadius: number;
    opacity: number;
    brushSize: number;
    brushType: string;
  };
  locked: boolean;
  selected: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface WhiteboardCanvasProps {
  currentTool: string;
  brushSize: number;
  opacity: number;
  currentColor: string;
  elements: WhiteboardElement[];
  onElementsChange: (elements: WhiteboardElement[]) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  currentTool,
  brushSize,
  opacity,
  currentColor,
  elements,
  onElementsChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  zoom,
  onZoomChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<DrawingPath | null>(null);
  const [drawingPaths, setDrawingPaths] = useState<DrawingPath[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 });

  // Drawing context
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    setCtx(context);
    
    // Set canvas size
    const resizeCanvas = () => {
      if (containerRef.current && canvas) {
        const rect = containerRef.current.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Clear canvas and redraw
  const redrawCanvas = useCallback(() => {
    if (!ctx || !canvasRef.current) return;

    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid();

    // Draw all drawing paths
    drawingPaths.forEach(path => {
      drawPath(path);
    });

    // Draw all elements
    elements.forEach(element => {
      drawElement(element);
    });
  }, [ctx, drawingPaths, elements]);

  // Draw grid
  const drawGrid = useCallback(() => {
    if (!ctx || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const gridSize = 20 * zoom;
    
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, [ctx, zoom]);

  // Draw a path
  const drawPath = useCallback((path: DrawingPath) => {
    if (!ctx || path.points.length < 2) return;

    ctx.save();
    ctx.strokeStyle = path.color;
    ctx.lineWidth = path.brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = path.opacity / 100;

    ctx.beginPath();
    ctx.moveTo(path.points[0].x, path.points[0].y);

    for (let i = 1; i < path.points.length; i++) {
      const point = path.points[i];
      ctx.lineTo(point.x, point.y);
    }

    ctx.stroke();
    ctx.restore();
  }, [ctx]);

  // Draw an element
  const drawElement = useCallback((element: WhiteboardElement) => {
    if (!ctx) return;

    ctx.save();
    ctx.globalAlpha = element.style.opacity;

    switch (element.type) {
      case 'text':
        drawTextElement(element);
        break;
      case 'shape':
        drawShapeElement(element);
        break;
      case 'sticky':
        drawStickyElement(element);
        break;
      case 'image':
        drawImageElement(element);
        break;
    }

    ctx.restore();
  }, [ctx]);

  const drawTextElement = useCallback((element: WhiteboardElement) => {
    if (!ctx || !element.content) return;

    ctx.fillStyle = element.style.color;
    ctx.font = `${element.style.fontWeight} ${element.style.fontSize}px Arial`;
    ctx.textBaseline = 'top';
    ctx.fillText(element.content, element.x, element.y);
  }, [ctx]);

  const drawShapeElement = useCallback((element: WhiteboardElement) => {
    if (!ctx) return;

    ctx.fillStyle = element.style.backgroundColor;
    ctx.strokeStyle = element.style.borderColor;
    ctx.lineWidth = element.style.borderWidth;
    ctx.globalAlpha = element.style.opacity;

    ctx.beginPath();
    ctx.roundRect(element.x, element.y, element.width, element.height, element.style.borderRadius);
    ctx.fill();
    ctx.stroke();
  }, [ctx]);

  const drawStickyElement = useCallback((element: WhiteboardElement) => {
    if (!ctx) return;

    // Draw sticky note background
    ctx.fillStyle = '#fef3c7';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.globalAlpha = element.style.opacity;

    ctx.beginPath();
    ctx.roundRect(element.x, element.y, element.width, element.height, 8);
    ctx.fill();
    ctx.stroke();

    // Draw text
    if (element.content) {
      ctx.fillStyle = '#92400e';
      ctx.font = '14px Arial';
      ctx.textBaseline = 'top';
      ctx.fillText(element.content, element.x + 8, element.y + 8);
    }
  }, [ctx]);

  const drawImageElement = useCallback((element: WhiteboardElement) => {
    if (!ctx) return;

    // Placeholder for image drawing
    ctx.fillStyle = '#e5e7eb';
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 2;
    ctx.globalAlpha = element.style.opacity;

    ctx.beginPath();
    ctx.roundRect(element.x, element.y, element.width, element.height, 8);
    ctx.fill();
    ctx.stroke();

    // Draw image placeholder text
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Image', element.x + element.width / 2, element.y + element.height / 2);
  }, [ctx]);

  // Redraw when dependencies change
  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Mouse event handlers
  const getMousePos = useCallback((e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };

    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - viewOffset.x) / zoom,
      y: (e.clientY - rect.top - viewOffset.y) / zoom
    };
  }, [viewOffset, zoom]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);

    if (currentTool === 'select') {
      // Handle selection
      const clickedElement = elements.find(element => 
        pos.x >= element.x && pos.x <= element.x + element.width &&
        pos.y >= element.y && pos.y <= element.y + element.height
      );
      
      setSelectedElement(clickedElement?.id || null);
      return;
    }

    if (currentTool === 'move') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewOffset.x, y: e.clientY - viewOffset.y });
      return;
    }

    // Start drawing
    if (['brush', 'pencil', 'spray', 'eraser'].includes(currentTool)) {
      setIsDrawing(true);
      const newPath: DrawingPath = {
        id: `path-${Date.now()}`,
        tool: currentTool,
        color: currentTool === 'eraser' ? '#ffffff' : currentColor,
        brushSize,
        opacity,
        points: [{ x: pos.x, y: pos.y, timestamp: Date.now() }],
        isComplete: false
      };
      setCurrentPath(newPath);
    }

    // Add elements
    if (['text', 'rectangle', 'circle', 'triangle', 'diamond', 'hexagon', 'star', 'heart', 'arrow'].includes(currentTool)) {
      const newElement: WhiteboardElement = {
        id: `element-${Date.now()}`,
        type: currentTool === 'text' ? 'text' : 'shape',
        x: pos.x,
        y: pos.y,
        width: currentTool === 'text' ? 200 : 100,
        height: currentTool === 'text' ? 50 : 100,
        content: currentTool === 'text' ? 'Double click to edit' : '',
        style: {
          color: currentColor,
          backgroundColor: currentColor,
          fontSize: 16,
          fontWeight: 'normal',
          borderWidth: 2,
          borderColor: currentColor,
          borderRadius: ['rectangle', 'circle'].includes(currentTool) ? 8 : 0,
          opacity: opacity / 100,
          brushSize,
          brushType: 'round'
        },
        locked: false,
        selected: false,
        createdBy: 'Current User',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      onElementsChange([...elements, newElement]);
      toast.success(`${currentTool} element added`);
    }
  }, [currentTool, brushSize, opacity, currentColor, elements, onElementsChange, getMousePos, viewOffset]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);

    if (isPanning) {
      setViewOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
      return;
    }

    if (isDrawing && currentPath) {
      const updatedPath = {
        ...currentPath,
        points: [...currentPath.points, { x: pos.x, y: pos.y, timestamp: Date.now() }]
      };
      setCurrentPath(updatedPath);
      
      // Draw the new segment
      if (ctx && updatedPath.points.length >= 2) {
        const lastPoint = updatedPath.points[updatedPath.points.length - 2];
        const currentPoint = updatedPath.points[updatedPath.points.length - 1];
        
        ctx.save();
        ctx.strokeStyle = updatedPath.color;
        ctx.lineWidth = updatedPath.brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = updatedPath.opacity / 100;
        
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }, [isDrawing, currentPath, ctx, getMousePos, isPanning, panStart]);

  const handleMouseUp = useCallback(() => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (isDrawing && currentPath) {
      setIsDrawing(false);
      const completedPath = { ...currentPath, isComplete: true };
      setDrawingPaths(prev => [...prev, completedPath]);
      setCurrentPath(null);
    }
  }, [isDrawing, currentPath]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              onRedo();
            } else {
              onUndo();
            }
            break;
          case '=':
          case '+':
            e.preventDefault();
            onZoomChange(Math.min(3, zoom + 0.1));
            break;
          case '-':
            e.preventDefault();
            onZoomChange(Math.max(0.1, zoom - 0.1));
            break;
          case '0':
            e.preventDefault();
            onZoomChange(1);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUndo, onRedo, onZoomChange, zoom]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-white dark:bg-gray-900"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
        transform: `scale(${zoom})`,
        transformOrigin: '0 0'
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <button
          onClick={() => onZoomChange(Math.max(0.1, zoom - 0.1))}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Zoom Out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="text-sm font-medium min-w-[60px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        
        <button
          onClick={() => onZoomChange(Math.min(3, zoom + 0.1))}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Zoom In"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        
        <button
          onClick={() => onZoomChange(1)}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Reset Zoom"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>

      {/* Tool Info */}
      <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Tool: {currentTool}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Size: {brushSize}px | Opacity: {opacity}%
        </div>
      </div>

      {/* Undo/Redo Info */}
      <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Undo: {canUndo ? 'Available' : 'None'} | Redo: {canRedo ? 'Available' : 'None'}
        </div>
      </div>
    </div>
  );
};

export default WhiteboardCanvas; 