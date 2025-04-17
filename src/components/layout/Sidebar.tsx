
import React from 'react';
import { Book, Heart, Home, MessageCircle, Star, Trophy, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItem {
  id: string;
  name: string;
  icon: React.ElementType;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab }) => {
  const navItems: NavItem[] = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'flashcards', name: 'Flashcards', icon: Book },
    { id: 'quizzes', name: 'Quizzes', icon: Trophy },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'chat', name: 'Chat Buddy', icon: MessageCircle },
    { id: 'progress', name: 'Progress', icon: Star },
  ];

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 bg-background border-r border-border pt-16 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
