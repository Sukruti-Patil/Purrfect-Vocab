
export interface GrammarQuestion {
  id: string;
  sentence: string;
  blankWord: string;
  options?: string[];
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  grammarRule: string;
}
