import * as React from "react"
import { Search, Command, Palette } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ActionSearchBarProps {
  placeholder?: string
  actions?: Array<{
    id: string
    label: string
    description?: string
    icon?: React.ReactNode
    color?: string
    onClick: () => void
  }>
  className?: string
  onOpenChange?: (open: boolean) => void
  compact?: boolean
  currentThemeData?: {
    id: string
    label: string
    description?: string
    color?: string
  }
  systemTheme?: 'light' | 'dark'
}

export function ActionSearchBar({
  placeholder = "Search actions...",
  actions = [],
  className,
  onOpenChange,
  compact = false,
  currentThemeData,
  systemTheme,
}: ActionSearchBarProps) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  if (compact) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "relative h-8 w-full justify-start rounded-md text-xs text-muted-foreground shadow-sm border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-700/50 transition-all duration-200 ease-in-out hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md",
              className
            )}
            onClick={() => setOpen(true)}
          >
            {currentThemeData && (
              <div className="flex items-center gap-2 w-full">
                <div
                  className={cn(
                    "w-3.5 h-3.5 rounded-full border-2 shadow-sm transition-all duration-200 flex-shrink-0 hover:shadow-md hover:scale-110",
                    currentThemeData.id === 'aura' 
                      ? "border-transparent"
                      : "border-gray-300 dark:border-gray-600"
                  )}
                  style={currentThemeData.id === 'aura' ? { background: currentThemeData.color } : { backgroundColor: currentThemeData.color }}
                />
                <span className="truncate font-medium text-gray-700 dark:text-gray-300">
                  {placeholder}
                </span>
                <Search className="ml-auto h-3 w-3 opacity-50 flex-shrink-0" />
              </div>
            )}
            {!currentThemeData && (
              <>
                <span className="truncate">{placeholder}</span>
                <Search className="ml-auto h-3 w-3 opacity-50" />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-64 p-0 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-lg" 
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <div className="flex items-center border-b border-gray-200/50 dark:border-gray-700/50 px-3 py-2.5">
            <Palette className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              placeholder="Search themes..."
              className="flex h-8 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0"
            />
          </div>
          <div className="max-h-[220px] overflow-y-auto">
            {actions.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Palette className="w-4 h-4 opacity-50" />
                </div>
                <p>No themes found.</p>
              </div>
            ) : (
              <div className="p-1.5">
                {actions.map((action, index) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      action.onClick()
                      setOpen(false)
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-150 ease-in-out group dropdown-item"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {action.icon && (
                      <div 
                        className="flex h-4 w-4 items-center justify-center flex-shrink-0"
                        style={action.color ? { color: action.color } : undefined}
                      >
                        {action.icon}
                      </div>
                    )}
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="font-medium text-left truncate w-full group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                        {action.label}
                      </span>
                      {action.description && (
                        <span className="text-xs text-muted-foreground text-left truncate w-full">
                          {action.description}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search actions...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            {actions.map((action) => (
              <CommandItem
                key={action.id}
                onSelect={() => {
                  action.onClick()
                  setOpen(false)
                }}
                className="flex items-center gap-2"
              >
                {action.icon && (
                  <div 
                    className="flex h-4 w-4 items-center justify-center"
                    style={action.color ? { color: action.color } : undefined}
                  >
                    {action.icon}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-medium">{action.label}</span>
                  {action.description && (
                    <span className="text-xs text-muted-foreground">
                      {action.description}
                    </span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
} 