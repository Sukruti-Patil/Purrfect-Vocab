
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressStats } from '@/components/ui/ProgressStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CheckCircle, Clock, Trophy } from 'lucide-react';

const ProgressPage: React.FC = () => {
  const progressStats = {
    wordsLearned: 45,
    wordsGoal: 100,
    currentStreak: 3,
    bestStreak: 7,
    completedCategories: 2,
    totalCategories: 8
  };
  
  // Sample achievements data
  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Learned your first 10 words',
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      completed: true,
      progress: 100
    },
    {
      id: '2',
      title: 'Word Explorer',
      description: 'Try all word categories',
      icon: <Trophy className="h-6 w-6 text-whiskerbeige-dark" />,
      completed: false,
      progress: 25
    },
    {
      id: '3',
      title: 'Consistency Champion',
      description: 'Maintain a 7-day streak',
      icon: <Calendar className="h-6 w-6 text-meowblue" />,
      completed: false,
      progress: 43
    },
    {
      id: '4',
      title: 'Speed Learner',
      description: 'Complete 5 flashcards in under 2 minutes',
      icon: <Clock className="h-6 w-6 text-pawpink" />,
      completed: true,
      progress: 100
    }
  ];
  
  // Sample activity data
  const recentActivity = [
    {
      id: '1',
      action: 'Learned 5 new words',
      category: 'Emotions',
      date: '2h ago'
    },
    {
      id: '2',
      action: 'Completed daily goal',
      category: '',
      date: 'Yesterday'
    },
    {
      id: '3',
      action: 'Added "Serendipity" to favorites',
      category: '',
      date: 'Yesterday'
    },
    {
      id: '4',
      action: 'Chatted with Meowford',
      category: '',
      date: '2 days ago'
    }
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Progress</h1>
        <p className="text-muted-foreground">Track your learning journey</p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProgressStats stats={progressStats} />
            
            <Card>
              <CardHeader>
                <CardTitle>Learning Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold text-purrple-dark">45</span>
                    <span className="text-sm text-muted-foreground">Words Learned</span>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold text-meowblue-dark">12</span>
                    <span className="text-sm text-muted-foreground">Favorites</span>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold text-pawpink-dark">3</span>
                    <span className="text-sm text-muted-foreground">Days Streak</span>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold text-whiskerbeige-dark">2</span>
                    <span className="text-sm text-muted-foreground">Categories</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={achievement.completed ? "border-green-200" : ""}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purrple"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{achievement.progress}%</span>
                      {achievement.completed && (
                        <span className="text-xs font-medium text-green-600">Completed</span>
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
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        {activity.category && (
                          <p className="text-sm text-muted-foreground">Category: {activity.category}</p>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressPage;
