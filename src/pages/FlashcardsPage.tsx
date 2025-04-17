
import React, { useState, useEffect } from 'react';
import { FlashcardComponent } from '@/components/flashcards/FlashcardComponent';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizComponent } from '@/components/quiz/QuizComponent';
import { wordData } from '@/data/flashcard-data';
import { oxfordWords } from '@/services/dictionaryService';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Trophy, CheckCircle2 } from 'lucide-react';

const FlashcardsPage: React.FC = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('flashcards');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  // Combine regular words and Oxford words
  const allWords = [...wordData, ...oxfordWords];
  
  // Filter words by category if one is selected
  const filteredWords = selectedCategory && selectedCategory !== 'all' 
    ? allWords.filter(word => word.category.toLowerCase() === selectedCategory.toLowerCase())
    : allWords;
  
  const handleQuizComplete = (score: number, total: number) => {
    setQuizCompleted(true);
    
    // Calculate percentage
    const percentage = Math.round((score / total) * 100);
    
    // Show toast with result
    toast({
      title: `Quiz Completed! ${score}/${total}`,
      description: `You scored ${percentage}%. ${percentage >= 80 ? "Great job!" : "Keep practicing!"}`,
      variant: percentage >= 80 ? "default" : "destructive",
    });
    
    // Update localStorage to track words learned
    const wordsLearned = parseInt(localStorage.getItem('words-learned') || '0', 10);
    localStorage.setItem('words-learned', (wordsLearned + 5).toString());
    
    // Update learning streak
    const currentDate = new Date().toDateString();
    const lastLearnDate = localStorage.getItem('last-learn-date');
    
    if (lastLearnDate !== currentDate) {
      localStorage.setItem('last-learn-date', currentDate);
      const streak = parseInt(localStorage.getItem('days-streak') || '0', 10);
      localStorage.setItem('days-streak', (streak + 1).toString());
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const resetQuiz = () => {
    setQuizCompleted(false);
  };

  const categoryStats = allWords.reduce((acc, word) => {
    const category = word.category.toLowerCase();
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Vocabulary Practice</h1>
        <p className="text-muted-foreground">Review, learn, and test your vocabulary knowledge</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(categoryStats).map(([category, count]) => (
          <Badge 
            key={category} 
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={() => handleCategorySelect(category)}
          >
            {category} ({count})
          </Badge>
        ))}
        <Badge 
          variant={selectedCategory === null || selectedCategory === 'all' ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/10 transition-colors"
          onClick={() => handleCategorySelect('all')}
        >
          All ({allWords.length})
        </Badge>
      </div>
      
      <Tabs 
        defaultValue="flashcards" 
        className="w-full"
        value={activeTab}
        onValueChange={value => {
          setActiveTab(value);
          if (value === 'quiz') {
            resetQuiz();
          }
        }}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>
        
        <TabsContent value="flashcards" className="space-y-6">
          <Card className="p-6">
            <FlashcardComponent 
              initialWords={filteredWords.length > 0 ? filteredWords : undefined}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="quiz" className="space-y-6">
          {quizCompleted ? (
            <Card className="p-6 text-center">
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <CheckCircle2 className="h-16 w-16 text-primary" />
                <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                <p className="text-muted-foreground">
                  Great job on completing the quiz. Your progress has been saved.
                </p>
                <div className="flex gap-4 mt-4">
                  <button 
                    onClick={resetQuiz}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setActiveTab('flashcards')}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
                  >
                    Back to Flashcards
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6">
              <QuizComponent 
                words={filteredWords.length > 0 ? filteredWords : allWords} 
                onComplete={handleQuizComplete}
                category={selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'All'}
              />
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlashcardsPage;
