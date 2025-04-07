
import React from 'react';
import { MeowScoreIndicator } from '@/components/ui/MeowScoreIndicator';
import { Button } from '@/components/ui/button';
import { Menu, Moon, Sun, User } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
  score: number;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleTheme, isDarkTheme, score }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-purrple rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline-block">PurrfectVocab</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <MeowScoreIndicator score={score} />
        
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground">
          {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        
        <Button variant="outline" size="sm" className="gap-1">
          <User size={16} />
          <span className="hidden sm:inline-block">Login</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
