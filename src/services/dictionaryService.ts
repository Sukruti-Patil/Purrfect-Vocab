
import { WordData } from '@/components/flashcards/Flashcard';

// Mock Oxford dictionary API as we don't have actual API keys
export async function searchWord(word: string): Promise<WordData | null> {
  try {
    // In a real app, this would be an API call to Oxford Dictionary API
    // For now, we'll simulate a response with sample data
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    
    const mockResponse = {
      id: `oxford-${Date.now()}`,
      word: word,
      definition: `Definition of ${word} (Oxford Dictionary)`,
      partOfSpeech: ["noun", "verb", "adjective"][Math.floor(Math.random() * 3)],
      pronunciation: `/${word}/`,
      example: `Example sentence using "${word}".`,
      synonyms: [`similar to ${word}`, `like ${word}`],
      antonyms: [`opposite of ${word}`],
      category: "Oxford",
      difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)] as "easy" | "medium" | "hard"
    };
    
    return mockResponse;
  } catch (error) {
    console.error("Error fetching word data:", error);
    return null;
  }
}

// Sample Oxford dictionary words
export const oxfordWords: WordData[] = [
  {
    id: "oxford-1",
    word: "serendipity",
    definition: "The occurrence and development of events by chance in a happy or beneficial way",
    partOfSpeech: "noun",
    pronunciation: "/ˌser.ənˈdɪp.ɪ.ti/",
    example: "They found each other by serendipity.",
    synonyms: ["chance", "fate", "fortune"],
    antonyms: ["misfortune", "design"],
    category: "Oxford",
    difficulty: "hard"
  },
  {
    id: "oxford-2",
    word: "ephemeral",
    definition: "Lasting for a very short time",
    partOfSpeech: "adjective",
    pronunciation: "/ɪˈfem.ər.əl/",
    example: "The ephemeral nature of fashion trends",
    synonyms: ["fleeting", "transient", "momentary"],
    antonyms: ["permanent", "enduring", "eternal"],
    category: "Oxford",
    difficulty: "hard"
  },
  {
    id: "oxford-3",
    word: "meticulous",
    definition: "Showing great attention to detail; very careful and precise",
    partOfSpeech: "adjective",
    pronunciation: "/məˈtɪk.jə.ləs/",
    example: "She was meticulous in her research.",
    synonyms: ["thorough", "careful", "precise"],
    antonyms: ["careless", "sloppy", "negligent"],
    category: "Oxford",
    difficulty: "medium"
  }
];
