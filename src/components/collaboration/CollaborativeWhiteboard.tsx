import React, { useCallback, useEffect, useRef, useState } from 'react';
import WorkingWhiteboardCanvas from '@/components/Whiteboard/WorkingWhiteboardCanvas';
import CollaborationToolbar from './CollaborationToolbar';
import PresenceCursors from './PresenceCursors';
import { useCollaboration } from '@/hooks/useCollaboration';
import { DocumentOperation, UserPresence } from '@/services/collaborationService';
import { toast } from 'sonner';

interface CollaborativeWhiteboardProps {
  className?: string;
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

export default function CollaborativeWhiteboard({
  className,
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
}: CollaborativeWhiteboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const whiteboardRef = useRef<any>(null);
  const [presenceData, setPresenceData] = useState<Map<string, UserPresence>>(new Map());
  const [isCollaborationActive, setIsCollaborationActive] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const handleOperation = useCallback((operation: DocumentOperation) => {
    if (!whiteboardRef.current) return;

    try {
      switch (operation.operation_type) {
        case 'draw_stroke':
          whiteboardRef.current.handleDrawStrokeFromCollaboration?.(operation.operation_data);
          break;
        case 'add_shape':
          whiteboardRef.current.handleAddShapeFromCollaboration?.(operation.operation_data);
          break;
        case 'add_text':
          whiteboardRef.current.handleAddTextFromCollaboration?.(operation.operation_data);
          break;
        case 'move_object':
          whiteboardRef.current.handleMoveObjectFromCollaboration?.(operation.operation_data);
          break;
        case 'delete_object':
          whiteboardRef.current.handleDeleteObjectFromCollaboration?.(operation.operation_data);
          break;
        case 'clear_canvas':
          whiteboardRef.current.handleClearCanvasFromCollaboration?.(operation.operation_data);
          break;
        default:
          console.warn('Unknown operation type:', operation.operation_type);
      }
    } catch (error) {
      console.error('Failed to apply collaborative operation:', error);
    }
  }, []);

  const handlePresenceUpdate = useCallback((presence: UserPresence) => {
    setPresenceData(prev => {
      const newMap = new Map(prev);
      if (presence.is_online) {
        newMap.set(presence.user_id, presence);
      } else {
        newMap.delete(presence.user_id);
      }
      return newMap;
    });
  }, []);

  const {
    isConnected,
    sessionId,
    participants,
    canEdit,
    sendOperation,
    updateCursor
  } = useCollaboration({
    sessionType: 'whiteboard',
    onOperation: handleOperation,
    onPresenceUpdate: handlePresenceUpdate
  });

  // Handle mouse movement for cursor tracking
  useEffect(() => {
    if (!isConnected || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const position = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        setLastMousePosition(position);
        
        // Throttle cursor updates
        clearTimeout(cursorUpdateTimeout);
        cursorUpdateTimeout = setTimeout(() => {
          updateCursor(position);
        }, 100);
      }
    };

    let cursorUpdateTimeout: NodeJS.Timeout;
    containerRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(cursorUpdateTimeout);
    };
  }, [isConnected, updateCursor]);

  // Whiteboard event handlers with collaboration
  const handleDrawStroke = useCallback((strokeData: any) => {
    if (isConnected && canEdit) {
      sendOperation('draw_stroke', strokeData);
    }
  }, [isConnected, canEdit, sendOperation]);

  const handleAddShape = useCallback((shapeData: any) => {
    if (isConnected && canEdit) {
      sendOperation('add_shape', shapeData);
    }
  }, [isConnected, canEdit, sendOperation]);

  const handleAddText = useCallback((textData: any) => {
    if (isConnected && canEdit) {
      sendOperation('add_text', textData);
    }
  }, [isConnected, canEdit, sendOperation]);

  const handleMoveObject = useCallback((moveData: any) => {
    if (isConnected && canEdit) {
      sendOperation('move_object', moveData);
    }
  }, [isConnected, canEdit, sendOperation]);

  const handleDeleteObject = useCallback((deleteData: any) => {
    if (isConnected && canEdit) {
      sendOperation('delete_object', deleteData);
    }
  }, [isConnected, canEdit, sendOperation]);

  const handleClearCanvas = useCallback(() => {
    if (isConnected && canEdit) {
      sendOperation('clear_canvas', {});
    }
  }, [isConnected, canEdit, sendOperation]);

  const handleSessionJoin = useCallback((sessionId: string) => {
    setIsCollaborationActive(true);
    toast.success('Collaboration started! Changes will sync in real-time.');
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {/* Collaboration Toolbar */}
      <div className="absolute top-4 left-4 z-40">
        <CollaborationToolbar
          sessionType="whiteboard"
          onSessionJoin={handleSessionJoin}
          onOperationReceived={handleOperation}
        />
      </div>

      {/* Connection Status */}
      {isConnected && (
        <div className="absolute top-4 right-4 z-40">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg border border-green-200 dark:border-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">
              Live with {participants.length - 1} others
            </span>
          </div>
        </div>
      )}

      {/* Read-only overlay when user can't edit */}
      {isConnected && !canEdit && (
        <div className="absolute inset-0 z-30 bg-black/5 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border">
            <div className="text-center">
              <div className="font-medium">Viewing Mode</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                You have view-only access to this session
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Whiteboard Canvas */}
      <WorkingWhiteboardCanvas
        currentTool={currentTool}
        brushSize={brushSize}
        opacity={opacity}
        currentColor={currentColor}
        onElementsChange={onElementsChange}
        onUndo={onUndo}
        onRedo={onRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        zoom={zoom}
        onZoomChange={onZoomChange}
      />

      {/* Presence Cursors */}
      {isConnected && (
        <PresenceCursors
          presenceData={presenceData}
          containerRef={containerRef}
        />
      )}
    </div>
  );
}