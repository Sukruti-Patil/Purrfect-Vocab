
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LucideIcon, Award, CheckCircle, Calendar } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-md ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

interface ProgressTrackerProps {
  score: number;
  wordsLearned: number;
  daysStreak: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  score, 
  wordsLearned, 
  daysStreak 
}) => {
  // Calculate levels based on score
  const level = Math.floor(score / 100) + 1;
  const nextLevelScore = level * 100;
  const progressToNextLevel = (score % 100);
  
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Level {level}</h3>
          <span className="text-sm text-muted-foreground">{score}/{nextLevelScore} points</span>
        </div>
        <Progress value={progressToNextLevel} className="h-2" />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <StatCard 
          title="Meow Score" 
          value={score} 
          icon={Award} 
          color="bg-primary" 
        />
        <StatCard 
          title="Words Learned" 
          value={wordsLearned} 
          icon={CheckCircle} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Days Streak" 
          value={daysStreak} 
          icon={Calendar} 
          color="bg-amber-500" 
        />
      </div>
      
      <Button variant="outline" className="w-full" size="sm">
        View All Achievements
      </Button>
    </div>
  );
};
