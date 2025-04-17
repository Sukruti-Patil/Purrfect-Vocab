
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { RecentActivity } from '@/components/progress/RecentActivity';
import { AchievementSystem, generateAchievements } from '@/components/progress/AchievementSystem';
import { Flame, LineChart, PieChart, Trophy, Brain } from 'lucide-react';

const ProgressPage: React.FC = () => {
  const [score, setScore] = useState(0);
  const [date, setDate] = useState<Date>(new Date());
  const [achievements, setAchievements] = useState(generateAchievements());
  const [achievementFilter, setAchievementFilter] = useState('all');
  
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

    // Every time we visit the page, increment words learned and streak
    // In a real app, this would be based on actual user activity
    const incrementUserProgress = () => {
      // Increment words learned
      const wordsLearned = parseInt(localStorage.getItem('words-learned') || '0', 10);
      localStorage.setItem('words-learned', (wordsLearned + 2).toString());
      
      // Update streak
      const lastVisit = localStorage.getItem('last-visit-date');
      const today = new Date().toDateString();
      
      if (lastVisit !== today) {
        const daysStreak = parseInt(localStorage.getItem('days-streak') || '0', 10);
        localStorage.setItem('days-streak', (daysStreak + 1).toString());
        localStorage.setItem('last-visit-date', today);
      }

      // Re-generate achievements with updated data
      setAchievements(generateAchievements());
    };

    incrementUserProgress();
    
    // Set up interval to check for achievement updates
    const intervalId = setInterval(() => {
      setAchievements(generateAchievements());
    }, 10000);

    return () => clearInterval(intervalId);
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
  
  // Calculate levels based on score
  const level = Math.floor(score / 100) + 1;
  const nextLevelScore = level * 100;
  const progressToNextLevel = (score % 100);

  // User stats
  const wordsLearned = parseInt(localStorage.getItem('words-learned') || '0', 10);
  const daysStreak = parseInt(localStorage.getItem('days-streak') || '0', 10);
  const completedAchievements = achievements.filter(a => a.completed).length;
  
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle>Words Learned</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{wordsLearned}</div>
            <Progress 
              value={(wordsLearned / 100) * 100}
              className="h-1 mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">Goal: 100 words</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <CardTitle>Current Streak</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{daysStreak} days</div>
            <p className="text-sm text-muted-foreground">Keep the momentum going!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <CardTitle>Achievements</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedAchievements}/{achievements.length}</div>
            <Progress 
              value={(completedAchievements / achievements.length) * 100}
              className="h-1 mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              {completedAchievements > 0 
                ? `Latest: ${achievements.find(a => a.completed)?.title}`
                : "Complete your first achievement!"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="achievements">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="stats">Detailed Stats</TabsTrigger>
          <TabsTrigger value="activity">Activity Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="achievements" className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge 
              className={`cursor-pointer ${achievementFilter === 'all' ? 'bg-primary' : 'bg-muted hover:bg-muted/80'}`}
              onClick={() => setAchievementFilter('all')}
            >
              All
            </Badge>
            <Badge 
              className={`cursor-pointer ${achievementFilter === 'completed' ? 'bg-primary' : 'bg-muted hover:bg-muted/80'}`}
              onClick={() => setAchievementFilter('completed')}
            >
              Completed
            </Badge>
            <Badge 
              className={`cursor-pointer ${achievementFilter === 'in-progress' ? 'bg-primary' : 'bg-muted hover:bg-muted/80'}`}
              onClick={() => setAchievementFilter('in-progress')}
            >
              In Progress
            </Badge>
            <Badge 
              className={`cursor-pointer ${achievementFilter === 'learning' ? 'bg-primary' : 'bg-muted hover:bg-muted/80'}`}
              onClick={() => setAchievementFilter('learning')}
            >
              Learning
            </Badge>
            <Badge 
              className={`cursor-pointer ${achievementFilter === 'streak' ? 'bg-primary' : 'bg-muted hover:bg-muted/80'}`}
              onClick={() => setAchievementFilter('streak')}
            >
              Streak
            </Badge>
            <Badge 
              className={`cursor-pointer ${achievementFilter === 'quiz' ? 'bg-primary' : 'bg-muted hover:bg-muted/80'}`}
              onClick={() => setAchievementFilter('quiz')}
            >
              Quiz
            </Badge>
          </div>
          
          <AchievementSystem achievements={achievements} filter={achievementFilter} />
        </TabsContent>
        
        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  <span>Word Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Academic</span>
                    <span className="text-sm font-medium">24 words</span>
                  </div>
                  <Progress value={40} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Business</span>
                    <span className="text-sm font-medium">16 words</span>
                  </div>
                  <Progress value={25} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Technology</span>
                    <span className="text-sm font-medium">18 words</span>
                  </div>
                  <Progress value={30} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Literature</span>
                    <span className="text-sm font-medium">10 words</span>
                  </div>
                  <Progress value={15} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-green-600" />
                  <span>Learning Growth</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-lg font-medium">{wordsLearned}</span>
                    <span className="text-sm text-muted-foreground">Total Words</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium">{Math.round(wordsLearned / daysStreak || 1)}</span>
                    <span className="text-sm text-muted-foreground">Words/Day</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium">
                      {JSON.parse(localStorage.getItem('quiz-history') || '[]').length}
                    </span>
                    <span className="text-sm text-muted-foreground">Quizzes Taken</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium">{level}</span>
                    <span className="text-sm text-muted-foreground">Current Level</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">This Month's Progress</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
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
