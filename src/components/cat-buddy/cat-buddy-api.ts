
import { WordResponse } from './types';

export const lookupWord = async (word: string): Promise<WordResponse | null> => {
  try {
    // In a real production app, this would call your Flask backend API
    // For now, we'll use a free dictionary API for demonstration
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim())}`);
    
    if (!response.ok) {
      throw new Error('Word not found');
    }
    
    const data = await response.json();
    
    if (!data || !data[0]) {
      throw new Error('Invalid response format');
    }
    
    // Extract relevant information
    const entry = data[0];
    const meaning = entry.meanings[0]?.definitions[0]?.definition || 'No definition found';
    const example = entry.meanings[0]?.definitions[0]?.example || 'No example available';
    
    // Extract synonyms and antonyms
    const synonyms: string[] = [];
    const antonyms: string[] = [];
    
    entry.meanings.forEach((meaning: any) => {
      if (meaning.synonyms && meaning.synonyms.length > 0) {
        synonyms.push(...meaning.synonyms.slice(0, 3));
      }
      if (meaning.antonyms && meaning.antonyms.length > 0) {
        antonyms.push(...meaning.antonyms.slice(0, 3));
      }
    });
    
    return {
      word: entry.word,
      meaning,
      synonyms: synonyms.length > 0 ? synonyms : ['No synonyms found'],
      antonyms: antonyms.length > 0 ? antonyms : ['No antonyms found'],
      example: example
    };
  } catch (error) {
    console.error('Error looking up word:', error);
    return null;
  }
};
