
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Trophy, AlertCircle, ChevronRight } from 'lucide-react';
import { WordData } from '@/components/flashcards/Flashcard';
import confetti from 'canvas-confetti';

interface QuizQuestion {
  id: string;
  questionType: 'definition' | 'example' | 'synonym' | 'antonym';
  word: string;
  correctAnswer: string;
  options: string[];
}

interface QuizProps {
  words: WordData[];
  onComplete: (score: number, totalQuestions: number) => void;
  category?: string;
}

export const QuizComponent: React.FC<QuizProps> = ({ words, onComplete, category = 'General' }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  // Generate quiz questions from words
  useEffect(() => {
    if (words.length > 0) {
      const generatedQuestions = generateQuestions(words);
      setQuestions(generatedQuestions);
    }
  }, [words]);

  const generateQuestions = (wordList: WordData[]): QuizQuestion[] => {
    const questions: QuizQuestion[] = [];
    
    // Create a mix of different question types
    wordList.forEach(word => {
      // Definition question
      if (word.definition) {
        questions.push({
          id: `def-${word.id}`,
          questionType: 'definition',
          word: word.word,
          correctAnswer: word.definition,
          options: [
            word.definition,
            ...getRandomDefinitions(wordList, word.id, 3)
          ].sort(() => Math.random() - 0.5)
        });
      }
      
      // Synonym question
      if (word.synonyms && word.synonyms.length > 0) {
        const correctAnswer = word.synonyms[0];
        questions.push({
          id: `syn-${word.id}`,
          questionType: 'synonym',
          word: word.word,
          correctAnswer,
          options: [
            correctAnswer,
            ...getRandomSynonymsOrAntonyms(wordList, 'synonyms', word.id, 3)
          ].sort(() => Math.random() - 0.5)
        });
      }
      
      // Example fill-in-the-blank questions could be added here
    });
    
    // Shuffle and limit questions
    return questions.sort(() => Math.random() - 0.5).slice(0, Math.min(10, questions.length));
  };

  const getRandomDefinitions = (wordList: WordData[], excludeId: string, count: number): string[] => {
    const otherWords = wordList.filter(w => w.id !== excludeId);
    return otherWords
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map(w => w.definition);
  };

  const getRandomSynonymsOrAntonyms = (
    wordList: WordData[],
    type: 'synonyms' | 'antonyms',
    excludeId: string,
    count: number
  ): string[] => {
    const result: string[] = [];
    const shuffledWords = [...wordList].filter(w => w.id !== excludeId).sort(() => Math.random() - 0.5);
    
    for (const word of shuffledWords) {
      if (word[type] && word[type].length > 0) {
        result.push(word[type][0]);
        if (result.length >= count) break;
      }
    }
    
    // If we don't have enough, add some random words
    if (result.length < count) {
      const moreWords = shuffledWords
        .slice(0, count - result.length)
        .map(w => w.word);
      result.push(...moreWords);
    }
    
    return result;
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return; // Prevent changing answer
    
    setSelectedOption(option);
    const correct = option === currentQuestion?.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      // Trigger confetti for correct answers
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      onComplete(score + (isCorrect ? 1 : 0), questions.length);
      
      // Update meow score
      const currentMeowScore = parseInt(localStorage.getItem('meowScore') || '0', 10);
      const quizBonus = Math.round((score / questions.length) * 20); // Up to 20 points based on performance
      const newScore = currentMeowScore + quizBonus;
      localStorage.setItem('meowScore', newScore.toString());
      
      // Dispatch score update event
      window.dispatchEvent(new CustomEvent('scoreUpdated', {
        detail: { newScore }
      }));
      
      toast({
        title: "Quiz completed!",
        description: `You earned ${quizBonus} Meow Points. Keep learning!`,
      });
      
      // Show bigger confetti for completing the quiz with a good score
      if (score / questions.length >= 0.7) {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const getQuestionText = (question: QuizQuestion) => {
    switch (question.questionType) {
      case 'definition':
        return `Which definition matches the word "${question.word}"?`;
      case 'synonym':
        return `Which word is a synonym for "${question.word}"?`;
      case 'antonym':
        return `Which word is an antonym for "${question.word}"?`;
      case 'example':
        return `Which sentence uses "${question.word}" correctly?`;
      default:
        return `Question about "${question.word}"`;
    }
  };

  if (questions.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center p-8">
            <p>Loading questions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center p-4">
            <Trophy className="h-16 w-16 text-amber-500 mb-4" />
            <h3 className="text-2xl font-bold">Your Score: {score}/{questions.length}</h3>
            <Progress value={percentage} className="w-full h-2 mt-2" />
            <p className="mt-4 text-center">
              {percentage >= 80 ? "Excellent work!" : 
               percentage >= 60 ? "Good job!" : 
               percentage >= 40 ? "Nice effort!" : "Keep practicing!"}
            </p>
          </div>
          
          <div className="border rounded-lg p-4 bg-muted/50">
            <h4 className="font-medium mb-2">You earned:</h4>
            <div className="flex items-center gap-2">
              <Badge className="bg-primary">+{Math.round((score / questions.length) * 20)} Meow Points</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => window.location.reload()}>
            Try Another Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{category} Quiz</Badge>
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
        <Progress 
          value={((currentQuestionIndex) / questions.length) * 100} 
          className="h-1 mt-2" 
        />
      </CardHeader>
      
      <CardContent className="space-y-4">
        <h3 className="text-lg font-medium">
          {getQuestionText(currentQuestion)}
        </h3>
        
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full justify-start p-4 h-auto text-left ${
                selectedOption === option
                  ? option === currentQuestion.correctAnswer
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : ""
              }`}
              onClick={() => handleOptionSelect(option)}
              disabled={selectedOption !== null}
            >
              {option}
            </Button>
          ))}
        </div>
        
        {selectedOption && (
          <div className={`p-3 rounded-md mt-4 ${
            isCorrect 
              ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400" 
              : "bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-900 dark:text-red-400"
          }`}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <Trophy className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <p className="font-medium">
                {isCorrect ? "Correct!" : "Incorrect"}
              </p>
            </div>
            
            {!isCorrect && (
              <p className="mt-1 text-sm">
                The correct answer is: {currentQuestion.correctAnswer}
              </p>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handleNext}
          disabled={selectedOption === null}
        >
          {currentQuestionIndex < questions.length - 1 ? (
            <>Next Question <ChevronRight className="ml-2 h-4 w-4" /></>
          ) : (
            "Complete Quiz"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
