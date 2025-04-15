
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface WordData {
  id: string;
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  pronunciation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  synonyms: string[];
  antonyms: string[];
}

interface FlashcardProps {
  wordData: WordData;
  onNext: () => void;
  onPrevious: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ wordData, onNext, onPrevious }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showExtraInfo, setShowExtraInfo] = useState(false);
  
  // Now using handleFlip as the direct click handler
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

  const speakExample = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData.example);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-pawpink-light text-pawpink-dark dark:bg-pawpink-dark dark:text-pawpink-light';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={cn("flashcard relative cursor-pointer", isFlipped ? "flipped" : "")}
        onClick={handleFlip}
      >
        <div className="flashcard-inner h-[420px] sm:h-[480px]">
          {/* Front of card */}
          <div className="flashcard-front rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg bg-gradient-to-br from-purrple-light to-purrple border border-purrple-light/50">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{wordData.word}</h2>
              <p className="text-lg text-white/80">{wordData.pronunciation}</p>
              <div className="flex justify-center">
                <Badge className={cn("text-xs", getDifficultyColor(wordData.difficulty))}>
                  {wordData.difficulty}
                </Badge>
              </div>
              <Button 
                variant="ghost" 
                className="bg-white/20 hover:bg-white/30 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  speakWord();
                }}
              >
                <Volume className="h-4 w-4 mr-2" />
                Pronounce
              </Button>
              <p className="text-sm text-white/70 italic">(Click to flip)</p>
            </div>
          </div>
          
          {/* Back of card */}
          <div className="flashcard-back rounded-2xl p-6 flex flex-col shadow-lg bg-white dark:bg-card border border-border overflow-y-auto">
            <div className="flex-1 flex flex-col">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">{wordData.word}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      speakWord(); 
                    }}
                  >
                    <Volume className="h-4 w-4" />
                  </Button>
                </div>
                
                <Badge className="text-xs">
                  {wordData.partOfSpeech}
                </Badge>
                
                <div>
                  <h4 className="font-semibold mb-1">Definition:</h4>
                  <p>{wordData.definition}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1 flex justify-between items-center">
                    Example:
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        speakExample(); 
                      }}
                    >
                      <Volume className="h-3 w-3" />
                    </Button>
                  </h4>
                  <p className="italic">{wordData.example}</p>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowExtraInfo(!showExtraInfo);
                  }}
                  className="w-full"
                >
                  {showExtraInfo ? "Hide" : "Show"} Synonyms & Antonyms
                </Button>
                
                {showExtraInfo && (
                  <div className="space-y-3 animate-fade-in">
                    <div>
                      <h4 className="font-semibold mb-1">Synonyms:</h4>
                      <div className="flex flex-wrap gap-1">
                        {wordData.synonyms.map((synonym, index) => (
                          <Badge 
                            key={index} 
                            variant="outline"
                            className="bg-green-100/50 hover:bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          >
                            {synonym}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-1">Antonyms:</h4>
                      <div className="flex flex-wrap gap-1">
                        {wordData.antonyms.map((antonym, index) => (
                          <Badge 
                            key={index} 
                            variant="outline"
                            className="bg-red-100/50 hover:bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          >
                            {antonym}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground flex justify-between items-center">
                <span>Category: {wordData.category}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={(e) => {
          e.stopPropagation();
          onPrevious();
          setIsFlipped(false);
          setShowExtraInfo(false);
        }}>
          <ChevronLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        <Button onClick={(e) => {
          e.stopPropagation();
          onNext();
          setIsFlipped(false);
          setShowExtraInfo(false);
        }}>
          Next <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
