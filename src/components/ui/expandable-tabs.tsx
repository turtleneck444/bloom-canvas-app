import * as React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { motion, AnimatePresence } from "framer-motion"

interface ExpandableTabsProps {
  items: Array<{
    id: string
    label: string
    icon: React.ReactNode
    color?: string
    onClick: () => void
    description?: string
  }>
  className?: string
  defaultOpen?: boolean
  compact?: boolean
  nodeId?: string
  nodePosition?: { x: number; y: number }
}

export function ExpandableTabs({
  items,
  className,
  defaultOpen = false,
  compact = false,
  nodeId,
  nodePosition,
}: ExpandableTabsProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const [menuPosition, setMenuPosition] = React.useState<'left' | 'right'>('right')

  // Node awareness logic
  React.useEffect(() => {
    if (isOpen && nodeId) {
      // Check for nearby nodes and determine best position
      const checkNodePosition = () => {
        const currentElement = document.querySelector(`[data-nodeid="${nodeId}"]`)
        if (currentElement) {
          const rect = currentElement.getBoundingClientRect()
          const viewportWidth = window.innerWidth
          const viewportHeight = window.innerHeight
          
          // Check for nearby nodes on both sides
          const allNodes = document.querySelectorAll('[data-nodeid]')
          let leftNodes = 0
          let rightNodes = 0
          
          allNodes.forEach(node => {
            if (node !== currentElement) {
              const nodeRect = node.getBoundingClientRect()
              const distance = Math.abs(nodeRect.left - rect.left)
              
              // Count nodes within 200px on each side
              if (distance < 200) {
                if (nodeRect.left < rect.left) {
                  leftNodes++
                } else {
                  rightNodes++
                }
              }
            }
          })
          
          // Determine best position based on node density and viewport position
          if (rect.left > viewportWidth * 0.7 || leftNodes < rightNodes) {
            setMenuPosition('left')
          } else {
            setMenuPosition('right')
          }
        }
      }
      
      checkNodePosition()
    }
  }, [isOpen, nodeId])

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("w-full expandable-tabs-node", className)}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center justify-between w-full bg-gradient-to-r from-white/95 to-gray-50/95 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 hover:from-white/98 hover:to-gray-50/98 dark:hover:from-gray-800/98 dark:hover:to-gray-900/98 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105",
            compact ? "h-8 px-2 text-xs" : "h-10 px-4 text-sm"
          )}
        >
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-md ring-2 ring-white/20 dark:ring-gray-800/20">
              <span className="text-white text-xs font-bold">+</span>
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Actions</span>
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </motion.div>
        </Button>
      </CollapsibleTrigger>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "overflow-hidden bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-2xl",
              menuPosition === 'left' ? "absolute right-full mr-3" : "absolute left-full ml-3"
            )}
          >
            <CollapsibleContent className="p-2 space-y-1">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: menuPosition === 'left' ? 10 : -10, y: 5 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-100/80 hover:to-gray-200/80 dark:hover:from-gray-700/80 dark:hover:to-gray-600/80 rounded-lg group",
                      compact ? "h-8 px-3 text-xs" : "h-10 px-4 text-sm"
                    )}
                    onClick={item.onClick}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 ring-2 ring-white/20 dark:ring-gray-800/20 action-icon",
                        item.color ? "" : "bg-gray-200 dark:bg-gray-700"
                      )}
                      style={item.color ? { 
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                        boxShadow: `0 4px 12px ${item.color}40`
                      } : undefined}
                    >
                      <div className="text-white text-xs drop-shadow-sm">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="font-medium text-gray-700 dark:text-gray-300 truncate w-full group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground truncate w-full group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </Button>
                </motion.div>
              ))}
            </CollapsibleContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Collapsible>
  )
} 