
import React from 'react';
import { FlashcardComponent } from '@/components/flashcards/FlashcardComponent';
import { Card } from '@/components/ui/card';

const FlashcardsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Flashcards</h1>
        <p className="text-muted-foreground">Review and learn new vocabulary words</p>
      </div>
      
      <Card className="p-6">
        <FlashcardComponent />
      </Card>
    </div>
  );
};

export default FlashcardsPage;
