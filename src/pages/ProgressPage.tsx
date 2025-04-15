
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { RecentActivity } from '@/components/progress/RecentActivity';
import { Award, Flame, BookOpen, CheckCheck, LineChart, Star, Crown } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress?: number;
  maxProgress?: number;
  icon: JSX.Element;
}

const ProgressPage: React.FC = () => {
  const [score, setScore] = useState(0);
  const [date, setDate] = useState<Date>(new Date());
  
  useEffect(() => {
    // Load score from localStorage
    const savedScore = localStorage.getItem('meowScore');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    } else {
      // Set initial score
      localStorage.setItem('meowScore', '100');
      setScore(100);
    }
  }, []);
  
  // Daily activity data for chart
  const dailyActivity = [
    { name: 'Mon', words: 12 },
    { name: 'Tue', words: 19 },
    { name: 'Wed', words: 5 },
    { name: 'Thu', words: 20 },
    { name: 'Fri', words: 15 },
    { name: 'Sat', words: 8 },
    { name: 'Sun', words: 16 },
  ];
  
  // Achievements data
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Word Explorer',
      description: 'Learn 50 new vocabulary words',
      completed: false,
      progress: 42,
      maxProgress: 50,
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      id: '2',
      title: 'Story Scholar',
      description: 'Complete 10 vocabulary stories',
      completed: false,
      progress: 3,
      maxProgress: 10,
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      id: '3',
      title: '7-Day Streak',
      description: 'Practice vocabulary for 7 consecutive days',
      completed: true,
      icon: <Flame className="h-6 w-6" />,
    },
    {
      id: '4',
      title: 'Flashcard Master',
      description: 'Complete 15 flashcard sessions',
      completed: false,
      progress: 10,
      maxProgress: 15,
      icon: <CheckCheck className="h-6 w-6" />,
    },
    {
      id: '5',
      title: 'Chat Champion',
      description: 'Use 50 vocabulary words in chat conversations',
      completed: false,
      progress: 28,
      maxProgress: 50,
      icon: <Star className="h-6 w-6" />,
    },
    {
      id: '6',
      title: 'Vocabulary Virtuoso',
      description: 'Reach Level 10',
      completed: false,
      progress: Math.floor(score / 100) + 1,
      maxProgress: 10,
      icon: <Crown className="h-6 w-6" />,
    },
  ];
  
  // Calculate levels based on score
  const level = Math.floor(score / 100) + 1;
  const nextLevelScore = level * 100;
  const progressToNextLevel = (score % 100);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Progress Tracker</h1>
        <p className="text-muted-foreground">Track your vocabulary learning journey</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>Your vocabulary learning activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyActivity}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="words" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Current Level</CardTitle>
            <CardDescription>Your Meow Score: {score}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <div className="flex flex-col items-center justify-center p-6 bg-primary/10 rounded-full">
                <span className="text-4xl font-bold text-primary">{level}</span>
                <span className="text-sm text-muted-foreground">Level</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {level + 1}</span>
                <span>{progressToNextLevel}%</span>
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="achievements">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`${achievement.completed ? 'border-primary bg-primary/5' : ''}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${achievement.completed ? 'bg-primary text-white' : 'bg-muted'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold">{achievement.title}</h3>
                        {achievement.completed && (
                          <Badge className="bg-primary">Completed</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      
                      {achievement.progress !== undefined && achievement.maxProgress && (
                        <div className="mt-2 space-y-1">
                          <div className="text-xs flex justify-between">
                            <span>{achievement.progress} / {achievement.maxProgress}</span>
                            <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                          </div>
                          <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Calendar</CardTitle>
              <CardDescription>Track your daily learning consistency</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border rounded-md p-3"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivity />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;
