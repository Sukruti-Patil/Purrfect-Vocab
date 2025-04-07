
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Trash2, VolumeUp } from 'lucide-react';

interface FavoriteWord {
  id: string;
  word: string;
  definition: string;
  partOfSpeech: string;
  dateAdded: Date;
}

const FavoritesPage: React.FC = () => {
  // Sample favorite words data
  const favoriteWords: FavoriteWord[] = [
    {
      id: '1',
      word: 'Serendipity',
      definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
      partOfSpeech: 'noun',
      dateAdded: new Date('2024-04-06')
    },
    {
      id: '2',
      word: 'Ethereal',
      definition: 'Extremely delicate and light in a way that seems too perfect for this world.',
      partOfSpeech: 'adjective',
      dateAdded: new Date('2024-04-05')
    },
    {
      id: '3',
      word: 'Eloquent',
      definition: 'Fluent or persuasive in speaking or writing.',
      partOfSpeech: 'adjective',
      dateAdded: new Date('2024-04-04')
    },
  ];
  
  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Favorites</h1>
        <p className="text-muted-foreground">Words you've saved for later</p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {favoriteWords.length > 0 ? (
            favoriteWords.map((word) => (
              <Card key={word.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      {word.word}
                      <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        {word.partOfSpeech}
                      </span>
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => speakWord(word.word)}>
                      <VolumeUp className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{word.definition}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    Added on {word.dateAdded.toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-pawpink">
                      <Heart className="h-4 w-4 fill-pawpink" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg text-center">
              <Heart className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-lg font-medium">No favorite words yet</p>
              <p className="text-muted-foreground">Save words you like by clicking the heart icon</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg text-center">
            <p className="text-lg font-medium">Coming Soon</p>
            <p className="text-muted-foreground">This feature is under development</p>
          </div>
        </TabsContent>
        
        <TabsContent value="by-category">
          <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg text-center">
            <p className="text-lg font-medium">Coming Soon</p>
            <p className="text-muted-foreground">This feature is under development</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FavoritesPage;
