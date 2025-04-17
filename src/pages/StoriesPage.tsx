
import React, { useState } from 'react';
import { StoryGenerator } from '@/components/story/StoryGenerator';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, BookText, Plus, Bookmark } from 'lucide-react';

const StoriesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('browse');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Vocabulary Stories</h1>
        <p className="text-muted-foreground">Learn words in context through engaging stories</p>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Story Library</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="browse" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="browse">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Stories
              </TabsTrigger>
              <TabsTrigger value="create">
                <Plus className="h-4 w-4 mr-2" />
                Create Story
              </TabsTrigger>
              <TabsTrigger value="saved">
                <Bookmark className="h-4 w-4 mr-2" />
                Saved Stories
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse" className="mt-0">
              <StoryGenerator />
            </TabsContent>
            
            <TabsContent value="create" className="mt-0">
              <StoryGenerator initialTab="create" />
            </TabsContent>
            
            <TabsContent value="saved" className="mt-0">
              <StoryGenerator initialTab="saved" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoriesPage;
