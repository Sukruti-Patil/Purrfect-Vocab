
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [score, setScore] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Set active tab based on current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/flashcards') return 'flashcards';
    if (path === '/favorites') return 'favorites';
    if (path === '/chat') return 'chat';
    if (path === '/progress') return 'progress';
    if (path === '/stories') return 'stories';
    return 'home';
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTab());
  
  useEffect(() => {
    // Update active tab when route changes
    setActiveTab(getActiveTab());
  }, [location]);
  
  useEffect(() => {
    // Load theme preference from localStorage
    const storedTheme = localStorage.getItem('purrfect-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkTheme(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkTheme(false);
    }
    
    // Load score from localStorage
    const savedScore = localStorage.getItem('meowScore');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
    
    // Listen for score updates
    const handleScoreUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.newScore) {
        setScore(customEvent.detail.newScore);
      }
    };
    
    window.addEventListener('scoreUpdated', handleScoreUpdate);
    
    return () => {
      window.removeEventListener('scoreUpdated', handleScoreUpdate);
    };
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleTheme = () => {
    if (isDarkTheme) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('purrfect-theme', 'light');
      setIsDarkTheme(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('purrfect-theme', 'dark');
      setIsDarkTheme(true);
    }
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
    
    // Navigate to the corresponding route
    switch (tab) {
      case 'home':
        navigate('/');
        break;
      case 'flashcards':
        navigate('/flashcards');
        break;
      case 'favorites':
        navigate('/favorites');
        break;
      case 'chat':
        navigate('/chat');
        break;
      case 'progress':
        navigate('/progress');
        break;
      case 'stories':
        navigate('/stories');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        isOpen={sidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
      />
      
      <div className="flex-1 flex flex-col md:ml-64">
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleTheme={toggleTheme} 
          isDarkTheme={isDarkTheme}
          score={score}
        />
        
        <main className="flex-1 p-4 md:p-6 pt-20">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
