import { useEffect, useCallback } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  action: () => void;
  description?: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    for (const shortcut of shortcuts) {
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatch = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey;
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
      const altMatch = shortcut.alt ? event.altKey : !event.altKey;
      const metaMatch = shortcut.meta ? event.metaKey : !event.metaKey;

      if (keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch) {
        event.preventDefault();
        shortcut.action();
        break;
      }
    }
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

// Common keyboard shortcuts for the application
export const commonShortcuts: KeyboardShortcut[] = [
  {
    key: 's',
    ctrl: true,
    action: () => console.log('Save'),
    description: 'Save current work'
  },
  {
    key: 'z',
    ctrl: true,
    action: () => console.log('Undo'),
    description: 'Undo last action'
  },
  {
    key: 'y',
    ctrl: true,
    action: () => console.log('Redo'),
    description: 'Redo last action'
  },
  {
    key: 'n',
    ctrl: true,
    action: () => console.log('New'),
    description: 'Create new item'
  },
  {
    key: 'o',
    ctrl: true,
    action: () => console.log('Open'),
    description: 'Open file'
  },
  {
    key: 'f',
    ctrl: true,
    action: () => console.log('Find'),
    description: 'Find in current view'
  },
  {
    key: 'Escape',
    action: () => console.log('Escape'),
    description: 'Close modal or cancel action'
  }
]; 