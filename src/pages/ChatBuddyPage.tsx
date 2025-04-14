
import React from 'react';
import { BotpressChatBuddy } from '@/components/cat-buddy/BotpressChatBuddy';
import { Card } from '@/components/ui/card';

const ChatBuddyPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Chat Buddy</h1>
        <p className="text-muted-foreground">Your vocabulary assistant</p>
      </div>
      
      <Card className="overflow-hidden p-4">
        <BotpressChatBuddy />
      </Card>
    </div>
  );
};

export default ChatBuddyPage;
