import { HeroSection } from "@/components/blocks/hero-section-dark"

function HeroSectionDemo() {
  return (
    <HeroSection
      title="AI-Powered Workspace Platform"
      subtitle={{
        regular: "The Future of ",
        gradient: "Creative Work",
      }}
      description="NOV8 combines AI-powered tools for mind mapping, presentations, meetings, strategy, simulation, and digital whiteboarding into one seamless platform."
      ctaText="Start Creating"
      ctaHref="/mindmaps"
      gridOptions={{
        angle: 65,
        opacity: 0.4,
        cellSize: 50,
        lightLineColor: "#4a4a4a",
        darkLineColor: "#2a2a2a",
      }}
    />
  )
}
export { HeroSectionDemo } 