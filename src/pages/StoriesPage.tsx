
import React, { useState } from 'react';
import { StoryGenerator } from '@/components/story/StoryGenerator';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, BookText, Plus, Bookmark, Users, Trophy } from 'lucide-react';
import { FillInTheBlanks } from '@/components/grammar/FillInTheBlanks';

const StoriesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('browse');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Vocabulary Stories</h1>
        <p className="text-muted-foreground">Learn words in context through engaging stories and grammar exercises</p>
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
              <TabsTrigger value="grammar">
                <BookText className="h-4 w-4 mr-2" />
                Grammar Exercises
              </TabsTrigger>
              <TabsTrigger value="social">
                <Users className="h-4 w-4 mr-2" />
                Community Stories
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
            
            <TabsContent value="grammar" className="mt-0">
              <FillInTheBlanks />
            </TabsContent>
            
            <TabsContent value="social" className="mt-0">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold">A Journey Through Time</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          <span>125 reads</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        A fascinating story about time travel and the consequences of altering the past.
                        Features advanced vocabulary related to physics and philosophy.
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                            <img src="https://i.pravatar.cc/150?img=3" alt="Author" className="h-full w-full object-cover" />
                          </div>
                          <span className="text-xs text-muted-foreground">by Jamie Rivera</span>
                        </div>
                        <div className="flex items-center">
                          <Trophy className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-xs">Top Story</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold">The Language of Flora</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          <span>92 reads</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        Explore botanical terms through this enchanting story about a botanist who discovers plants
                        can communicate in their own secret language.
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                            <img src="https://i.pravatar.cc/150?img=2" alt="Author" className="h-full w-full object-cover" />
                          </div>
                          <span className="text-xs text-muted-foreground">by Sam Chen</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground">3 days ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold">Linguistic Detectives</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          <span>78 reads</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        A mystery story where detectives solve crimes by analyzing language patterns and 
                        linguistic clues left by criminals.
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                            <img src="https://i.pravatar.cc/150?img=4" alt="Author" className="h-full w-full object-cover" />
                          </div>
                          <span className="text-xs text-muted-foreground">by Taylor Kim</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground">1 week ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold">Grammar Island</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          <span>63 reads</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        A fantasy story set on an island where different grammatical concepts are 
                        represented by unique regions and characters.
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                            <img src="https://i.pravatar.cc/150?img=5" alt="Author" className="h-full w-full object-cover" />
                          </div>
                          <span className="text-xs text-muted-foreground">by Jordan Patel</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground">2 weeks ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoriesPage;
