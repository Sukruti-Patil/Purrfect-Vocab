
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import FlashcardsPage from '@/pages/FlashcardsPage';
import FavoritesPage from '@/pages/FavoritesPage';
import ProgressPage from '@/pages/ProgressPage';
import ChatBuddyPage from '@/pages/ChatBuddyPage';
import StoriesPage from '@/pages/StoriesPage';
import QuizPage from '@/pages/QuizPage';
import NotFound from '@/pages/NotFound';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

// Wrapper for HomePage with navigation
const HomePageWrapper = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  return <HomePage onNavigate={handleNavigate} />;
};

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}></div>;
  }
  
  return (
    <Router>
      <ThemeProvider defaultTheme="system" storageKey="meow-vocab-theme">
        <FavoritesProvider>
          <Routes>
            <Route path="/" element={<Layout><HomePageWrapper /></Layout>} />
            <Route path="/flashcards" element={<Layout><FlashcardsPage /></Layout>} />
            <Route path="/favorites" element={<Layout><FavoritesPage /></Layout>} />
            <Route path="/progress" element={<Layout><ProgressPage /></Layout>} />
            <Route path="/chat" element={<Layout><ChatBuddyPage /></Layout>} />
            <Route path="/stories" element={<Layout><StoriesPage /></Layout>} />
            <Route path="/quiz" element={<Layout><QuizPage /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
          <Toaster />
        </FavoritesProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
