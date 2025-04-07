
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressStatsProps {
  stats: {
    wordsLearned: number;
    wordsGoal: number;
    currentStreak: number;
    bestStreak: number;
    completedCategories: number;
    totalCategories: number;
  };
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({ stats }) => {
  const wordsProgress = Math.round((stats.wordsLearned / stats.wordsGoal) * 100);
  const categoriesProgress = Math.round((stats.completedCategories / stats.totalCategories) * 100);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Words Learned</span>
            <span className="text-sm text-muted-foreground">{stats.wordsLearned}/{stats.wordsGoal}</span>
          </div>
          <Progress value={wordsProgress} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Categories Completed</span>
            <span className="text-sm text-muted-foreground">{stats.completedCategories}/{stats.totalCategories}</span>
          </div>
          <Progress value={categoriesProgress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold text-purrple-dark">{stats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </div>
          <div className="p-4 bg-muted rounded-lg text-center">
            <div className="text-2xl font-bold text-purrple-dark">{stats.bestStreak}</div>
            <div className="text-sm text-muted-foreground">Best Streak</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
