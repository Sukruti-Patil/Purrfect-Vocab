
import React from 'react';

interface DifficultySelectorProps {
  value: 'all' | 'easy' | 'medium' | 'hard';
  onChange: (difficulty: 'all' | 'easy' | 'medium' | 'hard') => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">Difficulty:</span>
      <select 
        className="px-2 py-1 rounded border" 
        value={value}
        onChange={(e) => onChange(e.target.value as any)}
      >
        <option value="all">All Levels</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};
