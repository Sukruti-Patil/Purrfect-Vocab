
import React, { useState } from 'react';
import { Flashcard, WordData } from '@/components/flashcards/Flashcard';
import { CategorySelector, Category } from '@/components/flashcards/CategorySelector';

const FlashcardsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('emotions');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // Sample categories data
  const categories: Category[] = [
    { id: 'emotions', name: 'Emotions', icon: '😊', color: 'text-yellow-500' },
    { id: 'nature', name: 'Nature', icon: '🌿', color: 'text-green-500' },
    { id: 'science', name: 'Science', icon: '🔬', color: 'text-blue-500' },
    { id: 'technology', name: 'Technology', icon: '💻', color: 'text-indigo-500' },
    { id: 'arts', name: 'Arts', icon: '🎨', color: 'text-purple-500' },
    { id: 'food', name: 'Food', icon: '🍎', color: 'text-red-500' },
    { id: 'travel', name: 'Travel', icon: '✈️', color: 'text-cyan-500' },
    { id: 'business', name: 'Business', icon: '💼', color: 'text-gray-500' },
  ];
  
  // Sample flashcards data by category
  const flashcardsByCategory: Record<string, WordData[]> = {
    'emotions': [
      {
        id: 'e1',
        word: 'Euphoria',
        partOfSpeech: 'noun',
        definition: 'A feeling or state of intense excitement and happiness.',
        example: 'The euphoria of winning the championship was overwhelming.',
        pronunciation: '/juːˈfɔːriə/',
        category: 'Emotions',
        difficulty: 'medium'
      },
      {
        id: 'e2',
        word: 'Melancholy',
        partOfSpeech: 'noun',
        definition: 'A feeling of pensive sadness, typically with no obvious cause.',
        example: 'She felt a wave of melancholy as she looked through old photographs.',
        pronunciation: '/ˈmɛlənkɒli/',
        category: 'Emotions',
        difficulty: 'hard'
      },
      {
        id: 'e3',
        word: 'Exasperation',
        partOfSpeech: 'noun',
        definition: 'A feeling of intense irritation or annoyance.',
        example: 'She sighed in exasperation when her computer crashed again.',
        pronunciation: '/ɪɡˌzæspəˈreɪʃən/',
        category: 'Emotions',
        difficulty: 'hard'
      },
    ],
    'nature': [
      {
        id: 'n1',
        word: 'Deciduous',
        partOfSpeech: 'adjective',
        definition: 'Shedding leaves annually.',
        example: 'Maple trees are deciduous, losing their leaves in autumn.',
        pronunciation: '/dɪˈsɪdjʊəs/',
        category: 'Nature',
        difficulty: 'hard'
      },
      {
        id: 'n2',
        word: 'Ecosystem',
        partOfSpeech: 'noun',
        definition: 'A biological community of interacting organisms and their physical environment.',
        example: 'The pond is a fragile ecosystem containing many different species.',
        pronunciation: '/ˈiːkəʊˌsɪstəm/',
        category: 'Nature',
        difficulty: 'medium'
      }
    ],
    'science': [
      {
        id: 's1',
        word: 'Hypothesis',
        partOfSpeech: 'noun',
        definition: 'A proposed explanation for a phenomenon.',
        example: 'The scientist formed a hypothesis about the chemical reaction.',
        pronunciation: '/haɪˈpɒθɪsɪs/',
        category: 'Science',
        difficulty: 'medium'
      }
    ],
    // Add other categories with their flashcards
  };
  
  const currentCategoryCards = selectedCategory ? flashcardsByCategory[selectedCategory] || [] : [];
  
  const handleNext = () => {
    if (currentCardIndex < currentCategoryCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };
  
  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(currentCategoryCards.length - 1);
    }
  };
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentCardIndex(0);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Flashcards</h1>
        <p className="text-muted-foreground">Learn new words by category</p>
      </div>
      
      <CategorySelector 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleCategorySelect} 
      />
      
      {selectedCategory && currentCategoryCards.length > 0 ? (
        <div className="mt-8">
          <p className="text-sm text-center text-muted-foreground mb-4">
            Card {currentCardIndex + 1} of {currentCategoryCards.length}
          </p>
          
          <Flashcard 
            wordData={currentCategoryCards[currentCardIndex]}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg text-center">
          <p className="text-lg font-medium">No flashcards available for this category yet.</p>
          <p className="text-muted-foreground">Try selecting another category.</p>
        </div>
      )}
    </div>
  );
};

export default FlashcardsPage;
