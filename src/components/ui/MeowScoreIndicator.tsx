
import React from 'react';
import { Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface MeowScoreIndicatorProps {
  score: number;
}

export const MeowScoreIndicator: React.FC<MeowScoreIndicatorProps> = ({ score }) => {
  // Calculate level based on score (every 100 points is a new level)
  const level = Math.floor(score / 100) + 1;
  
  // Calculate progress to next level (0-100)
  const progressToNextLevel = score % 100;
  
  return (
    <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full">
      <Star className="h-4 w-4 text-whiskerbeige-dark fill-whiskerbeige-dark" />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold">Level {level}</span>
          <span className="text-xs text-muted-foreground">{score} pts</span>
        </div>
        <Progress value={progressToNextLevel} className="h-1 w-16" />
      </div>
    </div>
  );
};
