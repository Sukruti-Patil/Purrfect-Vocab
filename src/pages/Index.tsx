
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import HomePage from '@/pages/HomePage';
import FlashcardsPage from '@/pages/FlashcardsPage';
import FavoritesPage from '@/pages/FavoritesPage';
import ChatBuddyPage from '@/pages/ChatBuddyPage';
import ProgressPage from '@/pages/ProgressPage';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [score, setScore] = useState(145); // Sample score
  
  // Handle theme switching
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  
  const renderActiveContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={setActiveTab} />;
      case 'flashcards':
        return <FlashcardsPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'chat':
        return <ChatBuddyPage />;
      case 'progress':
        return <ProgressPage />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        toggleSidebar={toggleSidebar} 
        toggleTheme={toggleTheme} 
        isDarkTheme={isDarkTheme} 
        score={score} 
      />
      
      <div className="flex flex-1">
        <Sidebar 
          isOpen={isSidebarOpen} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        <main className="flex-1 p-4 md:p-6 md:ml-64 transition-all duration-300">
          <div className="max-w-4xl mx-auto">
            {renderActiveContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
