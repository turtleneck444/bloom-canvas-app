import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from "./pages/Homepage";
import Index from "./pages/Index";
import Presentations from "./pages/Presentations";
import NotFound from "./pages/NotFound";
import Meetings from "./pages/Meetings";
import LayoutDemo from "./pages/LayoutDemo";
import Strategy from "./pages/Strategy";
import Simulation from "./pages/Simulation";
import Whiteboard from "./pages/Whiteboard";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Security from "./pages/Security";
import BookDemo from "./pages/BookDemo";
import Onboarding from "./pages/Onboarding";
import MindMapsDocs from "./pages/MindMapsDocs";
import StrategyDocs from "./pages/StrategyDocs";
import SimulationDocs from "./pages/SimulationDocs";
import PresentationsDocs from "./pages/PresentationsDocs";
import MeetingsDocs from "./pages/MeetingsDocs";
import WhiteboardDocs from "./pages/WhiteboardDocs";

const queryClient = new QueryClient();

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: 'red', color: 'white' }}>
          <h1>Something went wrong!</h1>
          <p>Error: {this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  console.log("App component rendering");
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/mindmaps" element={<Index />} />
              <Route path="/presentations" element={<Presentations />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/strategy" element={<Strategy />} />
              <Route path="/simulation" element={<Simulation />} />
              <Route path="/whiteboard" element={<Whiteboard />} />
              <Route path="/layout-demo" element={<LayoutDemo />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/security" element={<Security />} />
              <Route path="/book-demo" element={<BookDemo />} />
              <Route path="/onboarding" element={<Onboarding />} />
              {/* Documentation Routes */}
              <Route path="/mindmaps/docs" element={<MindMapsDocs />} />
              <Route path="/strategy/docs" element={<StrategyDocs />} />
              <Route path="/simulation/docs" element={<SimulationDocs />} />
              <Route path="/presentations/docs" element={<PresentationsDocs />} />
              <Route path="/meetings/docs" element={<MeetingsDocs />} />
              <Route path="/whiteboard/docs" element={<WhiteboardDocs />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
