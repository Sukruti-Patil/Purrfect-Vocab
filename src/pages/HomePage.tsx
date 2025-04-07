
import React from 'react';
import { WordOfDay } from '@/components/word-of-day/WordOfDay';
import { ProgressStats } from '@/components/ui/ProgressStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Book, MessageCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const today = new Date();
  
  const progressStats = {
    wordsLearned: 45,
    wordsGoal: 100,
    currentStreak: 3,
    bestStreak: 7,
    completedCategories: 2,
    totalCategories: 8
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Welcome Back!</h1>
      <p className="text-muted-foreground">Continue your vocabulary journey today.</p>
      
      <WordOfDay date={today} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProgressStats stats={progressStats} />
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer" onClick={() => onNavigate('flashcards')}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purrple/20 flex items-center justify-center">
                    <Book className="h-5 w-5 text-purrple" />
                  </div>
                  <div>
                    <h3 className="font-medium">Continue Flashcards</h3>
                    <p className="text-sm text-muted-foreground">Nature & Animals</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer" onClick={() => onNavigate('chat')}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-meowblue/20 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-meowblue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Chat with Meowford</h3>
                    <p className="text-sm text-muted-foreground">Your vocabulary buddy</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Daily Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Learn 5 new words</p>
                  <p className="text-sm text-muted-foreground">2/5 completed today</p>
                </div>
                <Button onClick={() => onNavigate('flashcards')}>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
