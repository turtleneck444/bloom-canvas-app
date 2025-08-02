import React, { useRef, useEffect, useState, useCallback } from 'react';
import { fabric } from 'fabric';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface WhiteboardCanvasProps {
  currentTool: string;
  brushSize: number;
  opacity: number;
  currentColor: string;
  onElementsChange: (elements: any[]) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

const WorkingWhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  currentTool,
  brushSize,
  opacity,
  currentColor,
  onElementsChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  zoom,
  onZoomChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth - 400, // Account for sidebar
      height: window.innerHeight - 200, // Account for header and toolbar
      backgroundColor: '#ffffff',
      selection: false,
      preserveObjectStacking: true
    });

    setCanvas(fabricCanvas);

    // Set up grid
    const gridSize = 20;
    for (let i = 0; i < fabricCanvas.width!; i += gridSize) {
      const line = new fabric.Line([i, 0, i, fabricCanvas.height!], {
        stroke: 'rgba(0,0,0,0.1)',
        selectable: false,
        evented: false
      });
      fabricCanvas.add(line);
    }
    for (let i = 0; i < fabricCanvas.height!; i += gridSize) {
      const line = new fabric.Line([0, i, fabricCanvas.width!, i], {
        stroke: 'rgba(0,0,0,0.1)',
        selectable: false,
        evented: false
      });
      fabricCanvas.add(line);
    }

    // Set up event listeners
    fabricCanvas.on('object:added', () => {
      saveToHistory();
    });

    fabricCanvas.on('object:modified', () => {
      saveToHistory();
    });

    fabricCanvas.on('object:removed', () => {
      saveToHistory();
    });

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Save to history
  const saveToHistory = useCallback(() => {
    if (!canvas) return;
    
    const json = canvas.toJSON();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(json);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [canvas, history, historyIndex]);

  // Handle tool changes
  useEffect(() => {
    if (!canvas) return;

    // Clear any existing drawing mode
    canvas.isDrawingMode = false;
    canvas.selection = false;

    switch (currentTool) {
      case 'brush':
      case 'pencil':
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = brushSize;
        canvas.freeDrawingBrush.color = currentColor;
        canvas.freeDrawingBrush.opacity = opacity / 100;
        break;

      case 'spray':
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
        canvas.freeDrawingBrush.width = brushSize;
        canvas.freeDrawingBrush.color = currentColor;
        canvas.freeDrawingBrush.opacity = opacity / 100;
        break;

      case 'eraser':
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = brushSize;
        canvas.freeDrawingBrush.color = '#ffffff';
        canvas.freeDrawingBrush.opacity = 1;
        break;

      case 'select':
        canvas.selection = true;
        canvas.defaultCursor = 'default';
        break;

      case 'text':
        canvas.defaultCursor = 'text';
        canvas.on('mouse:down', (options) => {
          if (options.target) return;
          
          const pointer = canvas.getPointer(options.e);
          const text = new fabric.IText('Double click to edit', {
            left: pointer.x,
            top: pointer.y,
            fontSize: 16,
            fill: currentColor,
            fontFamily: 'Arial'
          });
          canvas.add(text);
          canvas.setActiveObject(text);
          text.enterEditing();
        });
        break;

      case 'rectangle':
        canvas.defaultCursor = 'crosshair';
        canvas.on('mouse:down', (options) => {
          if (options.target) return;
          
          const pointer = canvas.getPointer(options.e);
          const rect = new fabric.Rect({
            left: pointer.x,
            top: pointer.y,
            width: 100,
            height: 100,
            fill: 'transparent',
            stroke: currentColor,
            strokeWidth: 2
          });
          canvas.add(rect);
        });
        break;

      case 'circle':
        canvas.defaultCursor = 'crosshair';
        canvas.on('mouse:down', (options) => {
          if (options.target) return;
          
          const pointer = canvas.getPointer(options.e);
          const circle = new fabric.Circle({
            left: pointer.x,
            top: pointer.y,
            radius: 50,
            fill: 'transparent',
            stroke: currentColor,
            strokeWidth: 2
          });
          canvas.add(circle);
        });
        break;

      case 'triangle':
        canvas.defaultCursor = 'crosshair';
        canvas.on('mouse:down', (options) => {
          if (options.target) return;
          
          const pointer = canvas.getPointer(options.e);
          const triangle = new fabric.Triangle({
            left: pointer.x,
            top: pointer.y,
            width: 100,
            height: 100,
            fill: 'transparent',
            stroke: currentColor,
            strokeWidth: 2
          });
          canvas.add(triangle);
        });
        break;

      case 'line':
        canvas.defaultCursor = 'crosshair';
        canvas.on('mouse:down', (options) => {
          if (options.target) return;
          
          const pointer = canvas.getPointer(options.e);
          const line = new fabric.Line([pointer.x, pointer.y, pointer.x + 100, pointer.y], {
            stroke: currentColor,
            strokeWidth: brushSize
          });
          canvas.add(line);
        });
        break;

      case 'star':
        canvas.defaultCursor = 'crosshair';
        canvas.on('mouse:down', (options) => {
          if (options.target) return;
          
          const pointer = canvas.getPointer(options.e);
          const star = new fabric.Path('M 50 10 L 61 35 L 90 35 L 68 57 L 79 82 L 50 70 L 21 82 L 32 57 L 10 35 L 39 35 Z', {
            left: pointer.x,
            top: pointer.y,
            scaleX: 0.5,
            scaleY: 0.5,
            fill: 'transparent',
            stroke: currentColor,
            strokeWidth: 2
          });
          canvas.add(star);
        });
        break;

      case 'heart':
        canvas.defaultCursor = 'crosshair';
        canvas.on('mouse:down', (options) => {
          if (options.target) return;
          
          const pointer = canvas.getPointer(options.e);
          const heart = new fabric.Path('M 50 90 C 50 90, 20 60, 20 40 C 20 20, 40 10, 50 20 C 60 10, 80 20, 80 40 C 80 60, 50 90, 50 90 Z', {
            left: pointer.x,
            top: pointer.y,
            scaleX: 0.5,
            scaleY: 0.5,
            fill: 'transparent',
            stroke: currentColor,
            strokeWidth: 2
          });
          canvas.add(heart);
        });
        break;

      case 'arrow':
        canvas.defaultCursor = 'crosshair';
        canvas.on('mouse:down', (options) => {
          if (options.target) return;
          
          const pointer = canvas.getPointer(options.e);
          const arrow = new fabric.Path('M 0 0 L 80 0 L 70 -10 M 80 0 L 70 10', {
            left: pointer.x,
            top: pointer.y,
            stroke: currentColor,
            strokeWidth: brushSize,
            fill: 'transparent'
          });
          canvas.add(arrow);
        });
        break;

      case 'move':
        canvas.defaultCursor = 'move';
        canvas.selection = false;
        break;

      default:
        canvas.defaultCursor = 'default';
        break;
    }

    // Clear event listeners for non-drawing tools
    if (!['brush', 'pencil', 'spray', 'eraser'].includes(currentTool)) {
      canvas.off('mouse:down');
    }
  }, [currentTool, brushSize, opacity, currentColor, canvas]);

  // Handle brush size changes
  useEffect(() => {
    if (!canvas || !canvas.freeDrawingBrush) return;
    canvas.freeDrawingBrush.width = brushSize;
  }, [brushSize, canvas]);

  // Handle color changes
  useEffect(() => {
    if (!canvas || !canvas.freeDrawingBrush) return;
    if (currentTool !== 'eraser') {
      canvas.freeDrawingBrush.color = currentColor;
    }
  }, [currentColor, currentTool, canvas]);

  // Handle opacity changes
  useEffect(() => {
    if (!canvas || !canvas.freeDrawingBrush) return;
    canvas.freeDrawingBrush.opacity = opacity / 100;
  }, [opacity, canvas]);

  // Handle zoom changes
  useEffect(() => {
    if (!canvas) return;
    canvas.setZoom(zoom);
  }, [zoom, canvas]);

  // Undo functionality
  const handleUndo = useCallback(() => {
    if (historyIndex > 0 && canvas) {
      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      canvas.loadFromJSON(state, () => {
        canvas.renderAll();
      });
      setHistoryIndex(newIndex);
      onUndo();
    }
  }, [history, historyIndex, canvas, onUndo]);

  // Redo functionality
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1 && canvas) {
      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      canvas.loadFromJSON(state, () => {
        canvas.renderAll();
      });
      setHistoryIndex(newIndex);
      onRedo();
    }
  }, [history, historyIndex, canvas, onRedo]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
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
      } else {
        // Tool shortcuts
        switch (e.key.toLowerCase()) {
          case 'v':
            e.preventDefault();
            onElementsChange([]); // This will trigger tool change in parent
            break;
          case 'b':
            e.preventDefault();
            onElementsChange([]); // This will trigger tool change in parent
            break;
          case 'p':
            e.preventDefault();
            onElementsChange([]); // This will trigger tool change in parent
            break;
          case 'e':
            e.preventDefault();
            onElementsChange([]); // This will trigger tool change in parent
            break;
          case 't':
            e.preventDefault();
            onElementsChange([]); // This will trigger tool change in parent
            break;
          case 'l':
            e.preventDefault();
            onElementsChange([]); // This will trigger tool change in parent
            break;
          case 'r':
            e.preventDefault();
            onElementsChange([]); // This will trigger tool change in parent
            break;
          case 'c':
            e.preventDefault();
            onElementsChange([]); // This will trigger tool change in parent
            break;
          case 'g':
            e.preventDefault();
            onElementsChange([]); // This will trigger tool change in parent
            break;
          case 's':
            e.preventDefault();
            onElementsChange([]); // This will trigger tool change in parent
            break;
          case 'h':
            e.preventDefault();
            onElementsChange([]); // This will trigger tool change in parent
            break;
          case 'a':
            e.preventDefault();
            onElementsChange([]); // This will trigger tool change in parent
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, onZoomChange, zoom, onElementsChange]);

  // Resize canvas on window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvas) {
        canvas.setDimensions({
          width: window.innerWidth - 400,
          height: window.innerHeight - 200
        });
        canvas.renderAll();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [canvas]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-white dark:bg-gray-900">
      <canvas
        ref={canvasRef}
        className="border border-gray-300"
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

      {/* Debug Info */}
      <div className="absolute top-16 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Objects: {canvas?.getObjects().length || 0} | Drawing: {isDrawing ? 'Yes' : 'No'}
        </div>
        <button
          onClick={() => {
            if (canvas) {
              const rect = new fabric.Rect({
                left: 100,
                top: 100,
                width: 50,
                height: 50,
                fill: '#EF4444'
              });
              canvas.add(rect);
              canvas.renderAll();
              toast.success('Test rectangle added');
            }
          }}
          className="mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded"
        >
          Test Draw
        </button>
      </div>
    </div>
  );
};

export default WorkingWhiteboardCanvas; 