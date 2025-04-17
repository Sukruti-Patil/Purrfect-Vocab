
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Flame, CheckCheck, Star, Crown, Award, Trophy, Brain } from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress?: number;
  maxProgress?: number;
  icon: JSX.Element;
  category: 'learning' | 'streak' | 'quiz' | 'misc';
  reward: number;
  dateCompleted?: Date;
}

interface AchievementsProps {
  achievements: Achievement[];
  filter?: string;
}

export const AchievementSystem: React.FC<AchievementsProps> = ({ achievements, filter = 'all' }) => {
  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === filter || 
        (filter === 'completed' && a.completed) || 
        (filter === 'in-progress' && !a.completed));

  // Sort achievements: completed first, then by progress
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (a.completed && !b.completed) return -1;
    if (!a.completed && b.completed) return 1;
    
    // For incomplete achievements, sort by progress percentage
    if (!a.completed && !b.completed) {
      const aProgress = a.progress && a.maxProgress ? (a.progress / a.maxProgress) : 0;
      const bProgress = b.progress && b.maxProgress ? (b.progress / b.maxProgress) : 0;
      return bProgress - aProgress;
    }
    
    // For completed achievements, sort by completion date if available
    if (a.dateCompleted && b.dateCompleted) {
      return b.dateCompleted.getTime() - a.dateCompleted.getTime();
    }
    
    return 0;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sortedAchievements.map((achievement) => (
        <Card 
          key={achievement.id} 
          className={`transition-colors ${achievement.completed ? 'border-primary bg-primary/5' : ''}`}
        >
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${achievement.completed ? 'bg-primary text-white' : 'bg-muted'}`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{achievement.title}</h3>
                  {achievement.completed ? (
                    <Badge className="bg-primary">Completed</Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">In Progress</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    +{achievement.reward} Meow Points
                  </Badge>
                </div>
                
                {achievement.progress !== undefined && achievement.maxProgress && (
                  <div className="mt-2 space-y-1">
                    <div className="text-xs flex justify-between">
                      <span>{achievement.progress} / {achievement.maxProgress}</span>
                      <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1.5" />
                  </div>
                )}
                
                {achievement.completed && achievement.dateCompleted && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Completed on {achievement.dateCompleted.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const generateAchievements = (): Achievement[] => {
  // Get data from localStorage
  const wordsLearned = parseInt(localStorage.getItem('words-learned') || '0', 10);
  const daysStreak = parseInt(localStorage.getItem('days-streak') || '0', 10);
  const score = parseInt(localStorage.getItem('meowScore') || '0', 10);
  const quizzesTaken = JSON.parse(localStorage.getItem('quiz-history') || '[]').length;
  
  // Generate all achievements
  return [
    {
      id: '1',
      title: 'Word Explorer',
      description: 'Learn 50 new vocabulary words',
      completed: wordsLearned >= 50,
      progress: Math.min(wordsLearned, 50),
      maxProgress: 50,
      icon: <BookOpen className="h-6 w-6" />,
      category: 'learning',
      reward: 20,
      dateCompleted: wordsLearned >= 50 ? new Date() : undefined,
    },
    {
      id: '2',
      title: 'Vocabulary Enthusiast',
      description: 'Learn 100 new vocabulary words',
      completed: wordsLearned >= 100,
      progress: Math.min(wordsLearned, 100),
      maxProgress: 100,
      icon: <BookOpen className="h-6 w-6" />,
      category: 'learning',
      reward: 30,
      dateCompleted: wordsLearned >= 100 ? new Date() : undefined,
    },
    {
      id: '3',
      title: '7-Day Streak',
      description: 'Practice vocabulary for 7 consecutive days',
      completed: daysStreak >= 7,
      progress: Math.min(daysStreak, 7),
      maxProgress: 7,
      icon: <Flame className="h-6 w-6" />,
      category: 'streak',
      reward: 25,
      dateCompleted: daysStreak >= 7 ? new Date() : undefined,
    },
    {
      id: '4',
      title: '30-Day Streak',
      description: 'Practice vocabulary for 30 consecutive days',
      completed: daysStreak >= 30,
      progress: Math.min(daysStreak, 30),
      maxProgress: 30,
      icon: <Flame className="h-6 w-6" />,
      category: 'streak',
      reward: 50,
      dateCompleted: daysStreak >= 30 ? new Date() : undefined,
    },
    {
      id: '5',
      title: 'Quiz Master',
      description: 'Complete 10 vocabulary quizzes',
      completed: quizzesTaken >= 10,
      progress: Math.min(quizzesTaken, 10),
      maxProgress: 10,
      icon: <Trophy className="h-6 w-6" />,
      category: 'quiz',
      reward: 30,
      dateCompleted: quizzesTaken >= 10 ? new Date() : undefined,
    },
    {
      id: '6',
      title: 'Vocabulary Virtuoso',
      description: 'Reach Level 10',
      completed: Math.floor(score / 100) + 1 >= 10,
      progress: Math.floor(score / 100) + 1,
      maxProgress: 10,
      icon: <Crown className="h-6 w-6" />,
      category: 'misc',
      reward: 100,
      dateCompleted: Math.floor(score / 100) + 1 >= 10 ? new Date() : undefined,
    },
    {
      id: '7',
      title: 'Knowledge Seeker',
      description: 'Complete achievements in all categories',
      completed: false, // This would need more complex logic to determine
      icon: <Brain className="h-6 w-6" />,
      category: 'misc',
      reward: 50,
    },
    {
      id: '8',
      title: 'First Steps',
      description: 'Complete your first day of learning',
      completed: daysStreak >= 1,
      icon: <Award className="h-6 w-6" />,
      category: 'streak',
      reward: 10,
      dateCompleted: daysStreak >= 1 ? new Date() : undefined,
    },
  ];
};
