import { toast } from 'sonner';

export interface DrawingPath {
  id: string;
  tool: string;
  color: string;
  brushSize: number;
  opacity: number;
  points: Array<{
    x: number;
    y: number;
    pressure?: number;
    timestamp: number;
  }>;
  isComplete: boolean;
}

export interface WhiteboardElement {
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

export interface WhiteboardTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  elements: WhiteboardElement[];
}

export class WhiteboardService {
  private static instance: WhiteboardService;
  
  public static getInstance(): WhiteboardService {
    if (!WhiteboardService.instance) {
      WhiteboardService.instance = new WhiteboardService();
    }
    return WhiteboardService.instance;
  }

  // AI Cleanup - Clean and structure drawings
  async cleanupDrawings(paths: DrawingPath[]): Promise<DrawingPath[]> {
    console.log('🤖 AI cleaning up drawings...');
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clean up paths by removing noise and smoothing
    const cleanedPaths = paths.map(path => ({
      ...path,
      points: this.smoothPath(path.points),
      brushSize: Math.max(2, path.brushSize * 0.8) // Slightly reduce brush size for cleaner look
    }));
    
    toast.success('AI cleanup completed!', {
      description: 'Drawings have been cleaned and optimized'
    });
    
    return cleanedPaths;
  }

  // Generate mind map from drawings
  async generateMindMap(paths: DrawingPath[]): Promise<WhiteboardElement[]> {
    console.log('🧠 Generating mind map from drawings...');
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Analyze drawings and generate structured elements
    const mindMapElements: WhiteboardElement[] = [];
    
    // Extract shapes and convert to structured elements
    paths.forEach((path, index) => {
      if (path.points.length > 10) { // Only process substantial drawings
        const bounds = this.getPathBounds(path.points);
        const center = {
          x: (bounds.minX + bounds.maxX) / 2,
          y: (bounds.minY + bounds.maxY) / 2
        };
        
        mindMapElements.push({
          id: `mindmap-${index}`,
          type: 'shape',
          x: center.x,
          y: center.y,
          width: bounds.maxX - bounds.minX + 50,
          height: bounds.maxY - bounds.minY + 50,
          content: `Generated Node ${index + 1}`,
          style: {
            color: path.color,
            backgroundColor: this.lightenColor(path.color),
            fontSize: 16,
            fontWeight: 'normal',
            borderWidth: 2,
            borderColor: path.color,
            borderRadius: 8,
            opacity: path.opacity / 100,
            brushSize: path.brushSize,
            brushType: 'round'
          },
          locked: false,
          selected: false,
          createdBy: 'AI',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });
    
    toast.success('Mind map generated!', {
      description: `${mindMapElements.length} structured elements created`
    });
    
    return mindMapElements;
  }

  // Suggest optimal layout
  async suggestLayout(elements: WhiteboardElement[]): Promise<WhiteboardElement[]> {
    console.log('🎨 AI suggesting optimal layout...');
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Analyze element relationships and suggest better positioning
    const reorganizedElements = [...elements];
    
    // Group related elements
    const groups = this.groupRelatedElements(elements);
    
    // Position groups optimally
    let currentX = 100;
    let currentY = 100;
    const spacing = 200;
    
    groups.forEach((group, groupIndex) => {
      group.forEach((element, elementIndex) => {
        const updatedElement = {
          ...element,
          x: currentX + (elementIndex * 150),
          y: currentY + (groupIndex * 120),
          updatedAt: new Date()
        };
        
        const existingIndex = reorganizedElements.findIndex(e => e.id === element.id);
        if (existingIndex !== -1) {
          reorganizedElements[existingIndex] = updatedElement;
        }
      });
      
      currentX += spacing;
      if (groupIndex % 3 === 2) {
        currentX = 100;
        currentY += spacing;
      }
    });
    
    toast.success('Layout suggestions applied!', {
      description: 'Elements have been optimally positioned'
    });
    
    return reorganizedElements;
  }

  // Export whiteboard
  async exportWhiteboard(elements: WhiteboardElement[], paths: DrawingPath[]): Promise<string> {
    console.log('📄 Exporting whiteboard...');
    
    // Simulate export processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const exportData = {
      elements,
      paths,
      metadata: {
        exportDate: new Date().toISOString(),
        version: '1.0',
        totalElements: elements.length,
        totalPaths: paths.length
      }
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `whiteboard-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast.success('Whiteboard exported!', {
      description: 'Your whiteboard has been saved as JSON'
    });
    
    return url;
  }

  // Apply effects to drawings
  applyEffect(paths: DrawingPath[], effect: string): DrawingPath[] {
    console.log(`✨ Applying ${effect} effect...`);
    
    const effectedPaths = paths.map(path => {
      switch (effect) {
        case 'blur':
          return this.applyBlurEffect(path);
        case 'sharpen':
          return this.applySharpenEffect(path);
        case 'smudge':
          return this.applySmudgeEffect(path);
        case 'dodge':
          return this.applyDodgeEffect(path);
        case 'burn':
          return this.applyBurnEffect(path);
        case 'sponge':
          return this.applySpongeEffect(path);
        default:
          return path;
      }
    });
    
    toast.success(`${effect} effect applied!`);
    return effectedPaths;
  }

  // Transform elements
  transformElements(elements: WhiteboardElement[], transform: string): WhiteboardElement[] {
    console.log(`🔄 Applying ${transform} transform...`);
    
    const transformedElements = elements.map(element => {
      switch (transform) {
        case 'rotate':
          return this.rotateElement(element);
        case 'scale':
          return this.scaleElement(element);
        case 'flip-h':
          return this.flipElement(element, 'horizontal');
        case 'flip-v':
          return this.flipElement(element, 'vertical');
        case 'crop':
          return this.cropElement(element);
        default:
          return element;
      }
    });
    
    toast.success(`${transform} transform applied!`);
    return transformedElements;
  }

  // Private helper methods
  private smoothPath(points: Array<{ x: number; y: number; pressure?: number; timestamp: number }>) {
    if (points.length < 3) return points;
    
    const smoothed = [points[0]];
    
    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1];
      const current = points[i];
      const next = points[i + 1];
      
      // Simple smoothing: average of three points
      smoothed.push({
        x: (prev.x + current.x + next.x) / 3,
        y: (prev.y + current.y + next.y) / 3,
        pressure: current.pressure,
        timestamp: current.timestamp
      });
    }
    
    smoothed.push(points[points.length - 1]);
    return smoothed;
  }

  private getPathBounds(points: Array<{ x: number; y: number }>) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    points.forEach(point => {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    });
    
    return { minX, minY, maxX, maxY };
  }

  private lightenColor(color: string): string {
    // Simple color lightening for background
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = Math.min(255, parseInt(hex.slice(0, 2), 16) + 50);
      const g = Math.min(255, parseInt(hex.slice(2, 4), 16) + 50);
      const b = Math.min(255, parseInt(hex.slice(4, 6), 16) + 50);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    return color;
  }

  private groupRelatedElements(elements: WhiteboardElement[]): WhiteboardElement[][] {
    // Simple grouping based on proximity
    const groups: WhiteboardElement[][] = [];
    const used = new Set<string>();
    
    elements.forEach(element => {
      if (used.has(element.id)) return;
      
      const group = [element];
      used.add(element.id);
      
      elements.forEach(other => {
        if (used.has(other.id)) return;
        
        const distance = Math.sqrt(
          Math.pow(element.x - other.x, 2) + Math.pow(element.y - other.y, 2)
        );
        
        if (distance < 200) {
          group.push(other);
          used.add(other.id);
        }
      });
      
      groups.push(group);
    });
    
    return groups;
  }

  private applyBlurEffect(path: DrawingPath): DrawingPath {
    return {
      ...path,
      brushSize: path.brushSize * 1.5,
      opacity: Math.min(100, path.opacity * 0.8)
    };
  }

  private applySharpenEffect(path: DrawingPath): DrawingPath {
    return {
      ...path,
      brushSize: Math.max(1, path.brushSize * 0.7),
      opacity: Math.min(100, path.opacity * 1.2)
    };
  }

  private applySmudgeEffect(path: DrawingPath): DrawingPath {
    return {
      ...path,
      brushSize: path.brushSize * 1.3,
      opacity: Math.min(100, path.opacity * 0.9)
    };
  }

  private applyDodgeEffect(path: DrawingPath): DrawingPath {
    return {
      ...path,
      color: this.lightenColor(path.color),
      opacity: Math.min(100, path.opacity * 1.1)
    };
  }

  private applyBurnEffect(path: DrawingPath): DrawingPath {
    return {
      ...path,
      color: this.darkenColor(path.color),
      opacity: Math.min(100, path.opacity * 0.9)
    };
  }

  private applySpongeEffect(path: DrawingPath): DrawingPath {
    return {
      ...path,
      opacity: Math.min(100, path.opacity * 0.7)
    };
  }

  private darkenColor(color: string): string {
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - 30);
      const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - 30);
      const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - 30);
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    return color;
  }

  private rotateElement(element: WhiteboardElement): WhiteboardElement {
    return {
      ...element,
      width: element.height,
      height: element.width,
      updatedAt: new Date()
    };
  }

  private scaleElement(element: WhiteboardElement): WhiteboardElement {
    return {
      ...element,
      width: element.width * 1.2,
      height: element.height * 1.2,
      updatedAt: new Date()
    };
  }

  private flipElement(element: WhiteboardElement, direction: 'horizontal' | 'vertical'): WhiteboardElement {
    return {
      ...element,
      x: direction === 'horizontal' ? -element.x : element.x,
      y: direction === 'vertical' ? -element.y : element.y,
      updatedAt: new Date()
    };
  }

  private cropElement(element: WhiteboardElement): WhiteboardElement {
    return {
      ...element,
      width: Math.max(50, element.width * 0.8),
      height: Math.max(50, element.height * 0.8),
      updatedAt: new Date()
    };
  }
}

export const whiteboardService = WhiteboardService.getInstance(); 