
import React, { useState } from 'react';
import { FlashcardComponent } from '@/components/flashcards/FlashcardComponent';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizComponent } from '@/components/quiz/QuizComponent';
import { wordData } from '@/data/flashcard-data';
import { oxfordWords } from '@/services/dictionaryService';

const FlashcardsPage: React.FC = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Combine regular words and Oxford words
  const allWords = [...wordData, ...oxfordWords];
  
  const handleQuizComplete = (score: number, total: number) => {
    setQuizCompleted(true);
    
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Vocabulary Practice</h1>
        <p className="text-muted-foreground">Review, learn, and test your vocabulary knowledge</p>
      </div>
      
      <Tabs defaultValue="flashcards" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>
        
        <TabsContent value="flashcards" className="space-y-6">
          <Card className="p-6">
            <FlashcardComponent />
          </Card>
        </TabsContent>
        
        <TabsContent value="quiz" className="space-y-6">
          <Card className="p-6">
            <QuizComponent 
              words={allWords} 
              onComplete={handleQuizComplete}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlashcardsPage;
