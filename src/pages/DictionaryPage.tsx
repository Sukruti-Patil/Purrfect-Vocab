
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import { searchWord, oxfordWords } from '@/services/dictionaryService';
import { FlashcardComponent } from '@/components/flashcards/FlashcardComponent';
import { useToast } from '@/hooks/use-toast';

const DictionaryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const { toast } = useToast();
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a word to search",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    try {
      const result = await searchWord(searchTerm);
      setSearchResult(result);
      if (!result) {
        toast({
          title: "Word not found",
          description: "Try a different word or check your spelling",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error searching word:", error);
      toast({
        title: "Search failed",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Dictionary</h1>
        <p className="text-muted-foreground">Search and explore new vocabulary words</p>
      </div>
      
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="flex gap-2">
            <Input
              placeholder="Search for a word..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Search Result */}
      {searchResult && (
        <Card className="p-4">
          <CardContent className="p-0">
            <FlashcardComponent 
              previewMode={false} 
              initialWords={[searchResult]} 
              autoFlip={false}
            />
          </CardContent>
        </Card>
      )}
      
      {/* Featured Oxford Words */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Featured Oxford Words</h2>
        <Card className="p-4">
          <CardContent className="p-0">
            <FlashcardComponent 
              previewMode={false} 
              initialWords={oxfordWords} 
              autoFlip={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DictionaryPage;
