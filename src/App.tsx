
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import ChatBuddyPage from "./pages/ChatBuddyPage";

const App = () => {
  // Create QueryClient inside the component
  const [queryClient] = useState(() => new QueryClient());

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      // Check for user in localStorage
      const user = localStorage.getItem('purrfect-user');
      if (user) {
        const userData = JSON.parse(user);
        setIsAuthenticated(userData.isLoggedIn === true);
      }
      setIsLoading(false);
    }, []);

    if (isLoading) {
      // Show loading state
      return <div className="flex h-screen w-screen items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      return <Navigate to="/auth" />;
    }

    // If authenticated, show the protected content
    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chat-buddy" 
              element={
                <ProtectedRoute>
                  <ChatBuddyPage />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
