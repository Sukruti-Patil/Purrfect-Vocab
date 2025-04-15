
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Cat } from 'lucide-react';

interface MeowScoreIndicatorProps {
  score: number;
}

export const MeowScoreIndicator: React.FC<MeowScoreIndicatorProps> = ({ score }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayScore, setDisplayScore] = useState(score);
  
  useEffect(() => {
    if (score !== displayScore) {
      setIsAnimating(true);
      setDisplayScore(score);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [score, displayScore]);
  
  useEffect(() => {
    // Listen for score updates from other components
    const handleScoreUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.newScore) {
        setDisplayScore(customEvent.detail.newScore);
        setIsAnimating(true);
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      }
    };
    
    window.addEventListener('scoreUpdated', handleScoreUpdate);
    
    return () => {
      window.removeEventListener('scoreUpdated', handleScoreUpdate);
    };
  }, []);
  
  return (
    <div className="flex items-center gap-1 bg-primary/10 px-2.5 py-1 rounded-full">
      <Cat className="h-4 w-4 text-primary" />
      <span 
        className={cn(
          "font-medium text-sm transition-all",
          isAnimating ? "animate-scale-up text-primary" : "text-foreground"
        )}
      >
        {displayScore}
      </span>
    </div>
  );
};
