import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { oxfordWords } from '@/services/dictionaryService';
import { GrammarQuestionDisplay } from './GrammarQuestion';
import { DifficultySelector } from './DifficultySelector';
import { GrammarQuestion } from './types';

// Sample grammar questions remain the same
const grammarQuestions: GrammarQuestion[] = [
  {
    id: 'g1',
    sentence: 'She always arrives ___ time for meetings.',
    blankWord: 'on',
    options: ['in', 'on', 'at', 'with'],
    hint: 'This preposition relates to punctuality.',
    difficulty: 'easy',
    explanation: "'On time' is the correct phrase for punctuality.",
    grammarRule: "We use 'on time' to indicate punctuality, 'in time' for doing something before it's too late."
  },
  {
    id: 'g2',
    sentence: 'They were disappointed ___ the results of the experiment.',
    blankWord: 'with',
    options: ['with', 'by', 'at', 'on'],
    hint: 'This preposition is often used with feelings toward things.',
    difficulty: 'medium',
    explanation: "'Disappointed with' is the correct collocation.",
    grammarRule: "After 'disappointed', we typically use 'with' for things and 'in' for people."
  },
  {
    id: 'g3',
    sentence: 'She speaks English ___ than her brother.',
    blankWord: 'better',
    options: ['good', 'better', 'well', 'best'],
    hint: 'You need a comparative form here.',
    difficulty: 'medium',
    explanation: "'Better' is the comparative form of 'well'.",
    grammarRule: "We use 'better' as the comparative form of both 'good' (adjective) and 'well' (adverb)."
  },
  {
    id: 'g4',
    sentence: 'If I ___ known about the party, I would have come.',
    blankWord: 'had',
    options: ['have', 'had', 'would', 'did'],
    hint: 'This is a conditional sentence about the past.',
    difficulty: 'hard',
    explanation: "'Had' is used for the third conditional.",
    grammarRule: "In third conditional sentences, we use 'had + past participle' in the if-clause."
  },
  {
    id: 'g5',
    sentence: 'The book, ___ was a bestseller, is now being made into a movie.',
    blankWord: 'which',
    options: ['that', 'which', 'who', 'whose'],
    hint: 'You need a relative pronoun for a non-restrictive clause.',
    difficulty: 'hard',
    explanation: "'Which' is used in non-restrictive clauses with commas.",
    grammarRule: "We use 'which' with commas for non-restrictive clauses, and 'that' without commas for restrictive clauses."
  },
  {
    id: 'g6',
    sentence: 'I ___ to the gym three times a week.',
    blankWord: 'go',
    options: ['go', 'goes', 'going', 'went'],
    hint: 'You need the simple present tense for a regular activity.',
    difficulty: 'easy',
    explanation: "'Go' is the correct form for 'I' in present simple.",
    grammarRule: "For regular activities or habits, we use the simple present tense."
  },
  {
    id: 'g7',
    sentence: 'Neither the students nor the teacher ___ prepared for the change.',
    blankWord: 'was',
    options: ['was', 'were', 'are', 'is'],
    hint: 'The verb should agree with the noun closest to it.',
    difficulty: 'hard',
    explanation: "In 'neither/nor' constructions, the verb agrees with the closer subject.",
    grammarRule: "With 'neither/nor', the verb agrees with the noun or pronoun closest to it."
  },
  {
    id: 'g8',
    sentence: 'She has been working ___ the project since last month.',
    blankWord: 'on',
    options: ['on', 'in', 'at', 'with'],
    hint: 'This preposition is used with projects and tasks.',
    difficulty: 'medium',
    explanation: "'On' is the correct preposition with 'work' for projects.",
    grammarRule: "We use 'work on' for projects, but 'work in' for places and 'work with' for people or tools."
  }
];

// Function to generate additional questions remains the same
const generateAdditionalQuestions = (): GrammarQuestion[] => {
  const grammarWords = oxfordWords.filter(word => word.category === 'Grammar');
  
  return grammarWords.map(word => {
    const options = [word.word];
    const allWords = oxfordWords.map(w => w.word).filter(w => w !== word.word);
    while (options.length < 4 && allWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * allWords.length);
      options.push(allWords[randomIndex]);
      allWords.splice(randomIndex, 1);
    }
    
    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
    
    return {
      id: `gen-${word.id}`,
      sentence: `${word.example.replace(word.word, '___')}`,
      blankWord: word.word,
      options: shuffledOptions,
      hint: `This is a ${word.partOfSpeech}.`,
      difficulty: word.difficulty,
      explanation: word.definition,
      grammarRule: `This demonstrates the use of a ${word.partOfSpeech}.`
    };
  });
};

export const FillInTheBlanks: React.FC = () => {
  const [allQuestions, setAllQuestions] = useState<GrammarQuestion[]>([...grammarQuestions]);
  const [currentQuestion, setCurrentQuestion] = useState<GrammarQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const { toast } = useToast();

  useEffect(() => {
    const additionalQuestions = generateAdditionalQuestions();
    setAllQuestions([...grammarQuestions, ...additionalQuestions]);
  }, []);

  useEffect(() => {
    if (allQuestions.length > 0) {
      getRandomQuestion();
    }
  }, [allQuestions, difficultyFilter]);

  const getRandomQuestion = () => {
    const filteredQuestions = difficultyFilter === 'all' 
      ? allQuestions 
      : allQuestions.filter(q => q.difficulty === difficultyFilter);
    
    if (filteredQuestions.length === 0) {
      toast({
        title: "No questions available",
        description: "Try selecting a different difficulty level.",
        variant: "destructive"
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    setCurrentQuestion(filteredQuestions[randomIndex]);
    setUserAnswer('');
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;
    
    const isAnswerCorrect = userAnswer.toLowerCase() === currentQuestion.blankWord.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setIsSubmitted(true);
    
    if (isAnswerCorrect) {
      setScore(prevScore => prevScore + 1);
      
      if (Math.random() > 0.7) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      
      toast({
        title: "Correct!",
        description: currentQuestion.explanation,
      });
      
      updateScore(10);
    } else {
      toast({
        title: "Not quite right",
        description: `The correct answer is "${currentQuestion.blankWord}". ${currentQuestion.explanation}`,
        variant: "destructive"
      });
    }
  };

  const handleNextQuestion = () => {
    setQuestionNumber(prev => prev + 1);
    getRandomQuestion();
  };

  const updateScore = (amount: number) => {
    const currentScoreStr = localStorage.getItem('meowScore');
    const currentScore = currentScoreStr ? parseInt(currentScoreStr, 10) : 100;
    const newScore = currentScore + amount;
    localStorage.setItem('meowScore', newScore.toString());
    
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('scoreUpdated', { detail: { newScore } }));
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Fill in the Blanks</h2>
          <p className="text-muted-foreground">Practice your grammar by completing sentences</p>
        </div>
        <DifficultySelector value={difficultyFilter} onChange={setDifficultyFilter} />
      </div>
      
      <div className="flex items-center gap-2">
        <Badge className="bg-primary text-primary-foreground">Question {questionNumber}</Badge>
        <Badge variant="outline">Score: {score}</Badge>
        <Badge 
          className={
            currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }
        >
          {currentQuestion.difficulty}
        </Badge>
      </div>
      
      <GrammarQuestionDisplay
        question={currentQuestion}
        userAnswer={userAnswer}
        isSubmitted={isSubmitted}
        isCorrect={isCorrect}
        onAnswerChange={setUserAnswer}
        onSubmit={handleSubmit}
        onNextQuestion={handleNextQuestion}
      />
    </div>
  );
};
