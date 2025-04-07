
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VolumeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface WordData {
  id: string;
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  pronunciation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface FlashcardProps {
  wordData: WordData;
  onNext: () => void;
  onPrevious: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ wordData, onNext, onPrevious }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-pawpink-light text-pawpink-dark';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={cn("flashcard relative", isFlipped ? "flipped" : "")}
        onClick={handleFlip}
      >
        <div className="flashcard-inner h-64 sm:h-80">
          {/* Front of card */}
          <div className="flashcard-front rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg bg-gradient-to-br from-purrple-light to-purrple border border-purrple-light/50">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{wordData.word}</h2>
              <p className="text-lg text-white/80">{wordData.pronunciation}</p>
              <div className="flex justify-center">
                <span className={cn("text-xs px-2 py-1 rounded-full", getDifficultyColor(wordData.difficulty))}>
                  {wordData.difficulty}
                </span>
              </div>
              <p className="text-sm text-white/70 italic">(Tap to flip)</p>
            </div>
          </div>
          
          {/* Back of card */}
          <div className="flashcard-back rounded-2xl p-6 flex flex-col shadow-lg bg-white dark:bg-card border border-border">
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{wordData.word}</h3>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); speakWord(); }}>
                    <VolumeIcon className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="inline-block px-2 py-1 bg-muted rounded-md text-sm">
                  {wordData.partOfSpeech}
                </div>
                
                <p className="font-medium">{wordData.definition}</p>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Example:</p>
                  <p className="italic text-sm">{wordData.example}</p>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground">
                Category: {wordData.category}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrevious}>Previous</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};
