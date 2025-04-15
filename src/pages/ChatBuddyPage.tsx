
import React, { useState } from 'react';
import { BotpressChatBuddy } from '@/components/cat-buddy/BotpressChatBuddy';
import { ObjectDetection } from '@/components/object-detection/ObjectDetection';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Camera } from 'lucide-react';

const ChatBuddyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Chat Buddy</h1>
        <p className="text-muted-foreground">Your vocabulary assistant</p>
      </div>
      
      <Card className="p-4">
        <Tabs defaultValue="chat" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="object-detection">
              <Camera className="h-4 w-4 mr-2" />
              Object Detection
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat">
            <BotpressChatBuddy />
          </TabsContent>
          
          <TabsContent value="object-detection">
            <ObjectDetection />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ChatBuddyPage;
