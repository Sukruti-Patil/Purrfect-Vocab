
import React from 'react';
import { StoryGenerator } from '@/components/story/StoryGenerator';

const StoriesPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Vocabulary Stories</h1>
        <p className="text-muted-foreground">Learn words in context through engaging stories</p>
      </div>
      
      <StoryGenerator />
    </div>
  );
};

export default StoriesPage;
