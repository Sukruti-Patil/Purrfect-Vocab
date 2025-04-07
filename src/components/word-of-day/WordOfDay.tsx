
import React, { useState } from 'react';
import { Heart, VolumeUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface WordOfDayProps {
  date: Date;
}

export const WordOfDay: React.FC<WordOfDayProps> = ({ date }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric'
  }).format(date);
  
  // This would normally come from an API or database
  const wordData = {
    word: "Serendipity",
    pronunciation: "/ˌsɛrənˈdɪpɪti/",
    partOfSpeech: "noun",
    definition: "The occurrence and development of events by chance in a happy or beneficial way.",
    example: "A fortunate stroke of serendipity brought us together.",
    synonyms: ["luck", "chance", "fortuity", "providence"],
    antonyms: ["misfortune", "design", "plan"],
    funFact: "The word 'serendipity' was coined by Horace Walpole in 1754 based on the Persian fairy tale 'The Three Princes of Serendip,' whose heroes were always making discoveries by accident."
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    
    if (!isFavorited) {
      toast.success("Added to favorites!", {
        description: `${wordData.word} has been added to your favorites.`
      });
    } else {
      toast("Removed from favorites", {
        description: `${wordData.word} has been removed from your favorites.`
      });
    }
  };
  
  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };
  
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Word of the Day</CardTitle>
        <span className="text-sm text-muted-foreground">{formattedDate}</span>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-3xl font-bold text-purrple-dark">{wordData.word}</h3>
              <p className="text-sm text-muted-foreground">{wordData.pronunciation} · {wordData.partOfSpeech}</p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-muted"
                onClick={speakWord}
              >
                <VolumeUp className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-muted"
                onClick={toggleFavorite}
              >
                <Heart 
                  className={cn("h-5 w-5 transition-all", 
                    isFavorited ? "fill-pawpink text-pawpink" : "text-muted-foreground"
                  )} 
                />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">{wordData.definition}</p>
            <p className="italic text-sm border-l-2 border-purrple pl-3 py-1">{wordData.example}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Synonyms</h4>
              <div className="flex flex-wrap gap-1">
                {wordData.synonyms.map(synonym => (
                  <span key={synonym} className="text-xs bg-meowblue-light text-meowblue-dark px-2 py-0.5 rounded-full">
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-1">Antonyms</h4>
              <div className="flex flex-wrap gap-1">
                {wordData.antonyms.map(antonym => (
                  <span key={antonym} className="text-xs bg-pawpink-light text-pawpink-dark px-2 py-0.5 rounded-full">
                    {antonym}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold mb-1">Fun Fact</h4>
            <p className="text-sm">{wordData.funFact}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
