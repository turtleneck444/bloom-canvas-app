"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Bold,
  Italic,
  Link,
  Heading,
  Quote,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Underline,
  Strikethrough,
} from "lucide-react";
import { useState } from "react";

const ToolbarButton = ({
  label,
  icon: Icon,
  isActive,
  onClick,
  tooltip,
  showTooltip,
  hideTooltip,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
  tooltip: string | null;
  showTooltip: (label: string) => void;
  hideTooltip: () => void;
}) => (
  <div
    className="relative"
    onMouseEnter={() => showTooltip(label)}
    onMouseLeave={hideTooltip}
  >
    <button
      className={`h-8 w-8 flex items-center justify-center rounded-md transition-colors duration-200 ${
        isActive ? "bg-primary/10" : ""
      } hover:bg-primary/10 focus:outline-none`}
      aria-label={label}
      onClick={onClick}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </button>
    {tooltip === label && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="text-nowrap font-medium absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-lg"
      >
        {label}
      </motion.div>
    )}
  </div>
);

const Toolbar = ({ onFormat }: { onFormat?: (command: string, value?: string) => void }) => {
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "left"
  );
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const [tooltip, setTooltip] = useState<string | null>(null);

  const toggleActiveButton = (button: string, command: string, value?: string) => {
    setActiveButtons((prev) =>
      prev.includes(button)
        ? prev.filter((b) => b !== button)
        : [...prev, button]
    );
    if (onFormat) onFormat(command, value);
  };

  const showTooltip = (label: string) => {
    setTooltip(label);
  };

  const hideTooltip = () => setTooltip(null);

  return (
    <div className="relative w-full min-h-[300px] flex items-center justify-center rounded-lg p-6">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="absolute z-50 bg-secondary rounded-lg shadow-lg border border-primary/10 flex items-center gap-1 p-1"
        >
          {/* Text Formatting Section */}
          <ToolbarButton
            label="Bold"
            icon={Bold}
            isActive={activeButtons.includes("bold")}
            onClick={() => toggleActiveButton("bold", "bold")}
            tooltip={tooltip}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
          <ToolbarButton
            label="Italic"
            icon={Italic}
            isActive={activeButtons.includes("italic")}
            onClick={() => toggleActiveButton("italic", "italic")}
            tooltip={tooltip}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
          <ToolbarButton
            label="Underline"
            icon={Underline}
            isActive={activeButtons.includes("underline")}
            onClick={() => toggleActiveButton("underline", "underline")}
            tooltip={tooltip}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
          <ToolbarButton
            label="Strikethrough"
            icon={Strikethrough}
            isActive={activeButtons.includes("strikethrough")}
            onClick={() => toggleActiveButton("strikethrough", "strikeThrough")}
            tooltip={tooltip}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
          <ToolbarButton
            label="Link"
            icon={Link}
            isActive={activeButtons.includes("link")}
            onClick={() => {
              const url = window.prompt('Enter URL:');
              if (url && onFormat) onFormat('createLink', url);
            }}
            tooltip={tooltip}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
          <ToolbarButton
            label="Heading"
            icon={Heading}
            isActive={activeButtons.includes("heading")}
            onClick={() => toggleActiveButton("heading", "formatBlock", "H2")}
            tooltip={tooltip}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
          <ToolbarButton
            label="Quote"
            icon={Quote}
            isActive={activeButtons.includes("quote")}
            onClick={() => toggleActiveButton("quote", "formatBlock", "BLOCKQUOTE")}
            tooltip={tooltip}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />

          {/* Divider */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* Highlight and Color Section */}
          <ToolbarButton
            label="Highlight"
            icon={Highlighter}
            isActive={activeButtons.includes("highlight")}
            onClick={() => toggleActiveButton("highlight", "backColor", "yellow")}
            tooltip={tooltip}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
          <ToolbarButton
            label="Change Color"
            icon={Palette}
            isActive={activeButtons.includes("color")}
            onClick={() => toggleActiveButton("color", "foreColor", "#f59e42")}
            tooltip={tooltip}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />

          {/* Divider */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* Text Alignment Section */}
          <ToolbarButton
            label="Align Left"
            icon={AlignLeft}
            isActive={textAlign === "left"}
            onClick={() => {
              setTextAlign("left");
              if (onFormat) onFormat("justifyLeft");
            }}
            tooltip={tooltip}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
          <ToolbarButton
            label="Align Center"
            icon={AlignCenter}
            isActive={textAlign === "center"}
            onClick={() => {
              setTextAlign("center");
              if (onFormat) onFormat("justifyCenter");
            }}
            tooltip={tooltip}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
          <ToolbarButton
            label="Align Right"
            icon={AlignRight}
            isActive={textAlign === "right"}
            onClick={() => {
              setTextAlign("right");
              if (onFormat) onFormat("justifyRight");
            }}
            tooltip={tooltip}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export { Toolbar, ToolbarButton }; 