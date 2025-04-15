
import React, { useState } from 'react';
import { CatBuddy } from '@/components/cat-buddy/CatBuddy';
import { ObjectDetection } from '@/components/object-detection/ObjectDetection';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Camera, Cat } from 'lucide-react';

const ChatBuddyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Meowford</h1>
        <p className="text-muted-foreground">Your vocabulary assistant</p>
      </div>
      
      <Card className="p-4">
        <Tabs defaultValue="chat" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="chat">
              <Cat className="h-4 w-4 mr-2" />
              Chat with Meowford
            </TabsTrigger>
            <TabsTrigger value="object-detection">
              <Camera className="h-4 w-4 mr-2" />
              Object Detection
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat">
            <CatBuddy />
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
