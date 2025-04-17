
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WordData } from '@/components/flashcards/Flashcard';

interface FavoriteWord {
  id: string;
  word: string;
  definition: string;
  partOfSpeech: string;
  dateAdded: string;
  pronunciation: string;
}

interface FavoritesContextType {
  favorites: FavoriteWord[];
  addFavorite: (word: WordData) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteWord[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('purrfect-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('purrfect-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (word: WordData) => {
    if (!isFavorite(word.id)) {
      const newFavorite: FavoriteWord = {
        id: word.id,
        word: word.word,
        definition: word.definition,
        partOfSpeech: word.partOfSpeech,
        pronunciation: word.pronunciation,
        dateAdded: new Date().toISOString(),
      };
      
      setFavorites([...favorites, newFavorite]);
    }
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(favorite => favorite.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(favorite => favorite.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
