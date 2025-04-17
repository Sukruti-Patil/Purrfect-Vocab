
import React, { useState } from 'react';
import { BotpressChatBuddy } from '@/components/cat-buddy/BotpressChatBuddy';
import { ObjectDetection } from '@/components/object-detection/ObjectDetection';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, BookOpen, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ChatBuddyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('object-detection');
  const { toast } = useToast();
  
  const handleShowTip = () => {
    toast({
      title: "Learning Tip!",
      description: "Use the camera to identify objects around you or try the advanced chat for complex vocabulary learning!",
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Meowford</h1>
          <p className="text-muted-foreground">Your vocabulary assistant</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleShowTip}>
          <Info className="h-4 w-4 mr-2" />
          Tips
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card className="p-4">
            <Tabs defaultValue="object-detection" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="object-detection">
                  <Camera className="h-4 w-4 mr-2" />
                  Object Detection
                </TabsTrigger>
                <TabsTrigger value="botpress">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Advanced Chat
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="object-detection" className="min-h-[600px]">
                <ObjectDetection />
              </TabsContent>
              
              <TabsContent value="botpress" className="min-h-[600px]">
                <BotpressChatBuddy />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card className="p-4">
            <h3 className="font-bold mb-3">Learning Features</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg flex items-start space-x-3">
                <Camera className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Object Detection</p>
                  <p className="text-sm text-muted-foreground">Learn vocabulary by scanning objects</p>
                </div>
              </div>
              
              <div className="p-3 bg-muted rounded-lg flex items-start space-x-3">
                <BookOpen className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Advanced Chat</p>
                  <p className="text-sm text-muted-foreground">More complex language learning</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-bold mb-2">Recent Words</h3>
              <div className="flex flex-wrap gap-2">
                {["ubiquitous", "ephemeral", "gregarious", "eloquent", "pragmatic"]
                  .map(word => (
                    <Badge key={word} variant="outline" className="hover-scale cursor-pointer">
                      {word}
                    </Badge>
                  ))
                }
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatBuddyPage;
