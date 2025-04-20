
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X, BookOpen, RefreshCw } from 'lucide-react';

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

interface GrammarQuestionProps {
  question: GrammarQuestion;
  userAnswer: string;
  isSubmitted: boolean;
  isCorrect: boolean;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  onNextQuestion: () => void;
}

export const GrammarQuestionDisplay: React.FC<GrammarQuestionProps> = ({
  question,
  userAnswer,
  isSubmitted,
  isCorrect,
  onAnswerChange,
  onSubmit,
  onNextQuestion,
}) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete the sentence</CardTitle>
        <CardDescription>
          Fill in the blank with the correct word
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-6 leading-relaxed">
          {formatSentence(question.sentence, userAnswer)}
        </p>
        
        {!isSubmitted && (
          <>
            {question.options ? (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswer === option ? "default" : "outline"}
                    className="h-12"
                    onClick={() => onAnswerChange(option)}
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
                  onChange={e => onAnswerChange(e.target.value)}
                  className="mb-4"
                />
              </div>
            )}
            
            {question.hint && (
              <div className="mt-4 p-3 bg-muted rounded flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{question.hint}</p>
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
                  {isCorrect ? 'Correct!' : `The correct answer is "${question.blankWord}"`}
                </p>
                <p className="text-sm mb-2">{question.explanation}</p>
                <div className="text-sm bg-white bg-opacity-50 p-2 rounded">
                  <strong>Grammar Rule:</strong> {question.grammarRule}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isSubmitted ? (
          <Button
            onClick={onSubmit}
            disabled={!userAnswer}
            className="w-full"
          >
            Check Answer
          </Button>
        ) : (
          <Button
            onClick={onNextQuestion}
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Next Question
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
