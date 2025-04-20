
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Trophy, RefreshCw, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { oxfordWords } from '@/services/dictionaryService';

interface GrammarQuestion {
  id: string;
  sentence: string;
  blankWord: string;
  options?: string[];
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  grammarRule: string;
}

// Sample grammar questions
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

// Create additional questions based on Oxford dictionary words
const generateAdditionalQuestions = (): GrammarQuestion[] => {
  const grammarWords = oxfordWords.filter(word => word.category === 'Grammar');
  
  return grammarWords.map(word => {
    const options = [word.word];
    // Add 3 random synonyms or words from the same category
    const allWords = oxfordWords.map(w => w.word).filter(w => w !== word.word);
    while (options.length < 4 && allWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * allWords.length);
      options.push(allWords[randomIndex]);
      allWords.splice(randomIndex, 1);
    }
    
    // Shuffle options
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
    // Combine predefined questions with generated ones
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
      
      if (Math.random() > 0.7) { // occasionally trigger confetti
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
      
      // Update learning streak and score
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

  const formatSentence = (sentence: string, answer: string) => {
    const parts = sentence.split('___');
    
    if (isSubmitted) {
      return (
        <>
          {parts[0]}
          <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {userAnswer || "[blank]"}
          </span>
          {parts[1]}
        </>
      );
    }
    
    return (
      <>
        {parts[0]}
        <span className="border-b-2 border-dashed border-primary inline-block min-w-16 text-center">
          {answer}
        </span>
        {parts[1]}
      </>
    );
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
        
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Difficulty:</span>
          <select 
            className="px-2 py-1 rounded border" 
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
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
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Complete the sentence</CardTitle>
          <CardDescription>
            Fill in the blank with the correct word
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6 leading-relaxed">
            {formatSentence(currentQuestion.sentence, userAnswer)}
          </p>
          
          {!isSubmitted && (
            <>
              {currentQuestion.options ? (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={userAnswer === option ? "default" : "outline"}
                      className="h-12"
                      onClick={() => setUserAnswer(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="mt-4">
                  <Input
                    placeholder="Type your answer here..."
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    className="mb-4"
                  />
                </div>
              )}
              
              {currentQuestion.hint && (
                <div className="mt-4 p-3 bg-muted rounded flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{currentQuestion.hint}</p>
                </div>
              )}
            </>
          )}
          
          {isSubmitted && (
            <div className={`mt-4 p-4 rounded-md ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                ) : (
                  <X className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                )}
                <div>
                  <p className="font-medium mb-1">
                    {isCorrect ? 'Correct!' : `The correct answer is "${currentQuestion.blankWord}"`}
                  </p>
                  <p className="text-sm mb-2">{currentQuestion.explanation}</p>
                  <div className="text-sm bg-white bg-opacity-50 p-2 rounded">
                    <strong>Grammar Rule:</strong> {currentQuestion.grammarRule}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isSubmitted ? (
            <Button
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="w-full"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Next Question
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
