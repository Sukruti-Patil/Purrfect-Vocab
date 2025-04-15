
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { WordOfDay } from '@/components/word-of-day/WordOfDay';
import { FlashcardComponent } from '@/components/flashcards/FlashcardComponent';
import { StoryGenerator } from '@/components/story/StoryGenerator';
import { ProgressTracker } from '@/components/progress/ProgressTracker';
import { RecentActivity } from '@/components/progress/RecentActivity';
import { ChevronRight, BookOpen, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Load score from localStorage
    const savedScore = localStorage.getItem('meowScore');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    } else {
      // Set initial score
      localStorage.setItem('meowScore', '100');
      setScore(100);
    }
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Welcome to PurrfectVocab</h1>
        <p className="text-muted-foreground">Expand your vocabulary with our friendly learning tools</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <WordOfDay date={new Date()} />
        </div>
        
        <Card className="p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Your Progress</h2>
            <ProgressTracker score={score} wordsLearned={42} daysStreak={7} />
          </div>
          
          <Button 
            onClick={() => navigate('/progress')} 
            variant="ghost" 
            className="mt-4 w-full justify-between"
          >
            View detailed progress
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Quick Flashcard</h2>
          <FlashcardComponent previewMode={true} />
          <Button 
            onClick={() => navigate('/flashcards')}
            variant="outline" 
            className="mt-4 w-full"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Open Flashcards
          </Button>
        </Card>
        
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Vocabulary Stories</h2>
          <StoryGenerator previewMode={true} />
          <Button 
            onClick={() => navigate('/stories')}
            variant="outline" 
            className="mt-4 w-full"
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            Explore Stories
          </Button>
        </Card>
      </div>
      
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <RecentActivity />
      </Card>
    </div>
  );
};

export default Index;
