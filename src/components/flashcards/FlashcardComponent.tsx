
import React, { useState, useEffect } from 'react';
import { Flashcard, WordData } from '@/components/flashcards/Flashcard';
import { CategorySelector, Category } from '@/components/flashcards/CategorySelector';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { wordData } from '@/data/flashcard-data';
import { oxfordWords } from '@/services/dictionaryService';

interface FlashcardComponentProps {
  previewMode?: boolean;
  initialWords?: WordData[];
  autoFlip?: boolean;
}

export const FlashcardComponent: React.FC<FlashcardComponentProps> = ({ 
  previewMode = false, 
  initialWords = null,
  autoFlip = false
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredWords, setFilteredWords] = useState<WordData[]>(initialWords || wordData);
  const { toast } = useToast();

  const categories: Category[] = [
    { id: 'all', name: 'All', icon: '🔠', color: 'text-blue-500' },
    { id: 'academic', name: 'Academic', icon: '🎓', color: 'text-purple-500' },
    { id: 'business', name: 'Business', icon: '💼', color: 'text-green-500' },
    { id: 'technology', name: 'Technology', icon: '💻', color: 'text-indigo-500' },
    { id: 'literature', name: 'Literature', icon: '📚', color: 'text-yellow-500' },
    { id: 'science', name: 'Science', icon: '🔬', color: 'text-pink-500' },
    { id: 'daily', name: 'Daily Life', icon: '🏠', color: 'text-orange-500' },
    { id: 'slang', name: 'Slang', icon: '🗣️', color: 'text-red-500' },
    { id: 'oxford', name: 'Oxford', icon: '📘', color: 'text-teal-500' },
  ];

  useEffect(() => {
    if (previewMode) {
      // In preview mode, randomly select one word
      const randomIndex = Math.floor(Math.random() * wordData.length);
      setFilteredWords([wordData[randomIndex]]);
      setCurrentWordIndex(0);
      return;
    }

    setIsLoading(true);
    
    // If we have initialWords, use those instead of filtering
    if (initialWords) {
      setFilteredWords(initialWords);
      setCurrentWordIndex(0);
      setIsLoading(false);
      return;
    }
    
    // Filter words by category if needed
    if (selectedCategory && selectedCategory !== 'all') {
      // For Oxford category, use words from oxfordWords
      if (selectedCategory === 'oxford') {
        setFilteredWords(oxfordWords.length > 0 ? oxfordWords : wordData);
      } else {
        // Filter by regular category
        const filtered = wordData.filter(word => 
          word.category.toLowerCase() === selectedCategory
        );
        setFilteredWords(filtered.length > 0 ? filtered : wordData);
      }
    } else {
      // Combine regular words and Oxford words
      setFilteredWords([...wordData, ...oxfordWords]);
    }
    
    setCurrentWordIndex(0);
    setIsLoading(false);
  }, [selectedCategory, previewMode, initialWords]);

  const handleCategorySelect = (categoryId: string) => {
    setIsLoading(true);
    setSelectedCategory(categoryId);
  };

  const handleNextWord = () => {
    if (currentWordIndex < filteredWords.length - 1) {
      setCurrentWordIndex(prevIndex => prevIndex + 1);
      updateScore(5);
    } else {
      // Reached the end of the deck
      toast({
        title: "End of deck reached!",
        description: "You've gone through all the flashcards in this category.",
      });
      setCurrentWordIndex(0);
    }
  };

  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prevIndex => prevIndex - 1);
    } else {
      // Already at the beginning
      toast({
        description: "You're already at the first flashcard.",
      });
    }
  };

  const updateScore = (amount: number) => {
    // Get current score from localStorage
    const currentScoreStr = localStorage.getItem('meowScore');
    const currentScore = currentScoreStr ? parseInt(currentScoreStr, 10) : 100;
    
    // Update score
    const newScore = currentScore + amount;
    localStorage.setItem('meowScore', newScore.toString());
    
    // If this component is used on the main page where score state exists
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('scoreUpdated', { detail: { newScore } }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading flashcards...</span>
      </div>
    );
  }

  if (filteredWords.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="mb-4">No flashcards available for this category.</p>
        <Button onClick={() => setSelectedCategory('all')}>
          View All Flashcards
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!previewMode && !initialWords && (
        <CategorySelector 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={handleCategorySelect} 
        />
      )}
      
      <Flashcard 
        wordData={filteredWords[currentWordIndex]} 
        onNext={handleNextWord}
        onPrevious={handlePreviousWord}
        autoFlip={autoFlip}
      />
    </div>
  );
};
