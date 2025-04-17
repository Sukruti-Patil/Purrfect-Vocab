
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizComponent } from '@/components/quiz/QuizComponent';
import { BookOpen, Brain, School, Trophy, Award } from 'lucide-react';
import { WordData } from '@/components/flashcards/Flashcard';
import { flashcardData } from '@/data/flashcard-data';
import { Badge } from '@/components/ui/badge';

const QuizPage: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [quizHistory, setQuizHistory] = useState<{
    id: string;
    date: Date;
    category: string;
    score: number;
    total: number;
  }[]>([]);

  useEffect(() => {
    // Load quiz history from localStorage
    const savedHistory = localStorage.getItem('quiz-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Convert string dates back to Date objects
        setQuizHistory(parsedHistory.map((item: any) => ({
          ...item,
          date: new Date(item.date)
        })));
      } catch (error) {
        console.error('Error parsing quiz history:', error);
      }
    }
  }, []);

  const saveQuizResult = (category: string, score: number, total: number) => {
    const newQuizResult = {
      id: Date.now().toString(),
      date: new Date(),
      category,
      score,
      total
    };
    
    const updatedHistory = [newQuizResult, ...quizHistory].slice(0, 10); // Keep last 10 quizzes
    setQuizHistory(updatedHistory);
    localStorage.setItem('quiz-history', JSON.stringify(updatedHistory));
  };

  const handleQuizComplete = (category: string) => (score: number, total: number) => {
    saveQuizResult(category, score, total);
    setActiveQuiz(null);
  };

  // Group words by category
  const categories = Object.entries(
    flashcardData.reduce<Record<string, WordData[]>>((acc, word) => {
      if (!acc[word.category]) {
        acc[word.category] = [];
      }
      acc[word.category].push(word);
      return acc;
    }, {})
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Vocabulary Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge and earn points</p>
      </div>
      
      <Tabs defaultValue="quizzes" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="history">Quiz History</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quizzes" className="space-y-6">
          {activeQuiz ? (
            <div className="animate-fade-in">
              <Button variant="ghost" className="mb-4" onClick={() => setActiveQuiz(null)}>
                ← Back to all quizzes
              </Button>
              
              <QuizComponent 
                words={flashcardData.filter(word => word.category === activeQuiz)}
                onComplete={handleQuizComplete(activeQuiz)}
                category={activeQuiz}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map(([category, words]) => (
                <Card key={category} className="hover:border-primary/50 transition-colors hover-scale">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{category}</CardTitle>
                      <Badge>{words.length} words</Badge>
                    </div>
                    <CardDescription>Test your knowledge of {category.toLowerCase()} vocabulary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      {category === 'Academic' && <School className="h-5 w-5 text-amber-500" />}
                      {category === 'Technology' && <Brain className="h-5 w-5 text-indigo-500" />}
                      {category === 'Business' && <Trophy className="h-5 w-5 text-emerald-500" />}
                      {!['Academic', 'Technology', 'Business'].includes(category) && <BookOpen className="h-5 w-5 text-blue-500" />}
                      <p>Words ranging from easy to advanced difficulty</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => setActiveQuiz(category)}>
                      Start Quiz
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          {quizHistory.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Your Recent Quizzes</h2>
              
              {quizHistory.map((quiz) => (
                <Card key={quiz.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{quiz.category} Quiz</h3>
                      <p className="text-sm text-muted-foreground">
                        {quiz.date.toLocaleDateString()} • {Math.round((quiz.score / quiz.total) * 100)}% correct
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={
                          quiz.score / quiz.total >= 0.8 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                            : quiz.score / quiz.total >= 0.5
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }
                      >
                        {quiz.score}/{quiz.total}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg text-center">
              <Trophy className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-lg font-medium">No quiz history yet</p>
              <p className="text-muted-foreground">Complete your first quiz to see your results here</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Quiz Master</CardTitle>
                    <CardDescription>Complete 10 quizzes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm">
                  <span>{Math.min(quizHistory.length, 10)}/10 completed</span>
                  <span>{Math.min(quizHistory.length * 10, 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-full rounded-full transition-all" 
                    style={{width: `${Math.min(quizHistory.length * 10, 100)}%`}}
                  ></div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-amber-100 dark:bg-amber-900/20">
                    <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Perfect Score</CardTitle>
                    <CardDescription>Get 100% on any quiz</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Badge variant={quizHistory.some(q => q.score === q.total) ? "default" : "outline"}>
                    {quizHistory.some(q => q.score === q.total) ? "Completed" : "Not completed"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/20">
                    <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Category Expert</CardTitle>
                    <CardDescription>Complete quizzes in 3 different categories</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm">
                  <span>
                    {new Set(quizHistory.map(q => q.category)).size}/3 categories
                  </span>
                  <span>
                    {Math.min(new Set(quizHistory.map(q => q.category)).size * 33.3, 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-full rounded-full transition-all" 
                    style={{width: `${Math.min(new Set(quizHistory.map(q => q.category)).size * 33.3, 100)}%`}}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuizPage;
