
import React from 'react';
import { CatBuddy } from '@/components/cat-buddy/CatBuddy';
import { Card } from '@/components/ui/card';

const ChatBuddyPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Chat Buddy</h1>
        <p className="text-muted-foreground">Talk with Meowford, your vocabulary assistant</p>
      </div>
      
      <Card className="overflow-hidden">
        <CatBuddy />
      </Card>
    </div>
  );
};

export default ChatBuddyPage;
