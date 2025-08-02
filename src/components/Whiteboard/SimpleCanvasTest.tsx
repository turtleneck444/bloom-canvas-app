import React, { useRef, useEffect, useState } from 'react';

const SimpleCanvasTest: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    setCtx(context);
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw a test rectangle
    context.fillStyle = '#3B82F6';
    context.fillRect(10, 10, 100, 100);
    
    console.log('Canvas initialized successfully');
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    
    console.log('Started drawing at:', x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    
    console.log('Drawing to:', x, y);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    console.log('Finished drawing');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Canvas Drawing Test</h2>
      <canvas
        ref={canvasRef}
        className="border border-gray-300 bg-white"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: 'crosshair' }}
      />
      <p className="mt-2 text-sm text-gray-600">
        Click and drag to draw on the canvas. You should see red lines appear.
      </p>
    </div>
  );
};

export default SimpleCanvasTest; 