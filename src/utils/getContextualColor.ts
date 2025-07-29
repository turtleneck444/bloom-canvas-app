// Utility to get a color for a given category
const colorMap: Record<string, string> = {
  general: 'hsl(267 85% 66%)',
  idea: 'hsl(200 80% 60%)',
  important: 'hsl(340 80% 60%)',
  // Add more categories as needed
};

export default function getContextualColor(category: string): string {
  return colorMap[category] || colorMap.general;
} 