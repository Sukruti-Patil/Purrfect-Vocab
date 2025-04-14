
export interface WordResponse {
  word: string;
  meaning: string;
  synonyms: string[];
  antonyms: string[];
  example: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'cat';
  text: string;
  timestamp: Date;
  wordData?: {
    word?: string;
    meaning: string;
    synonyms: string[];
    antonyms: string[];
    example: string;
  };
}

export type AnimationState = 'default' | 'waving' | 'talking' | 'thinking' | 'happy' | 'confused';
