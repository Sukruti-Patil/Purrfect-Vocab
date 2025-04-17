
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Trash2, Volume, Search } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  // Get all unique categories from favorites
  const categories = ['all', ...Array.from(new Set(favorites.map(word => word.partOfSpeech)))];
  
  // Filter favorites based on search term and selected category
  const filteredFavorites = favorites.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         word.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || word.partOfSpeech === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort favorites by date added (newest first)
  const sortedFavorites = [...filteredFavorites].sort((a, b) => 
    new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
  
  // Get recent favorites (last 7 days)
  const recentFavorites = favorites.filter(word => {
    const addedDate = new Date(word.dateAdded);
    const daysDiff = (new Date().getTime() - addedDate.getTime()) / (1000 * 3600 * 24);
    return daysDiff <= 7;
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Favorites</h1>
        <p className="text-muted-foreground">Words you've saved for later</p>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search favorites..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({favorites.length})</TabsTrigger>
          <TabsTrigger value="recent">Recent ({recentFavorites.length})</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {sortedFavorites.length > 0 ? (
            sortedFavorites.map((word) => (
              <Card key={word.id} className="animate-fade-in">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      {word.word}
                      <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        {word.partOfSpeech}
                      </span>
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => speakWord(word.word)}>
                      <Volume className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{word.definition}</p>
                  {word.pronunciation && (
                    <p className="text-sm text-muted-foreground mt-2">{word.pronunciation}</p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    Added {formatDistanceToNow(new Date(word.dateAdded))} ago
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => {
                        removeFavorite(word.id);
                        toast({
                          title: "Removed from favorites",
                          description: `${word.word} has been removed from your favorites.`,
                        });
                      }}
                    >
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
          {recentFavorites.length > 0 ? (
            <div className="space-y-4">
              {recentFavorites.map((word) => (
                <Card key={word.id} className="animate-fade-in">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2">
                        {word.word}
                        <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                          {word.partOfSpeech}
                        </span>
                      </CardTitle>
                      <Button variant="ghost" size="icon" onClick={() => speakWord(word.word)}>
                        <Volume className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{word.definition}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-xs text-muted-foreground">
                      Added {formatDistanceToNow(new Date(word.dateAdded))} ago
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => {
                        removeFavorite(word.id);
                        toast({
                          title: "Removed from favorites",
                          description: `${word.word} has been removed from your favorites.`,
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg text-center">
              <p className="text-lg font-medium">No recent favorites</p>
              <p className="text-muted-foreground">You haven't added any favorites in the last 7 days</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="by-category">
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category}
                  className={`cursor-pointer ${selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          {filteredFavorites.length > 0 ? (
            <div className="space-y-4">
              {filteredFavorites.map((word) => (
                <Card key={word.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>{word.word}</CardTitle>
                      <Button variant="ghost" size="icon" onClick={() => speakWord(word.word)}>
                        <Volume className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{word.definition}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-xs text-muted-foreground">
                      {word.partOfSpeech}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => {
                        removeFavorite(word.id);
                        toast({
                          title: "Removed from favorites",
                          description: `${word.word} has been removed from your favorites.`,
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg text-center">
              <p className="text-lg font-medium">No words in this category</p>
              <p className="text-muted-foreground">Try selecting a different category</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FavoritesPage;
