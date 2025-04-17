
import React, { useState, useEffect } from 'react';
import { Heart, Volume, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/contexts/FavoritesContext';

interface WordOfDayProps {
  date: Date;
}

// Dictionary of words with definitions, examples, etc.
const wordDictionary = [
  {
    word: "Serendipity",
    pronunciation: "/ˌsɛrənˈdɪpɪti/",
    partOfSpeech: "noun",
    definition: "The occurrence and development of events by chance in a happy or beneficial way.",
    example: "A fortunate stroke of serendipity brought us together.",
    synonyms: ["luck", "chance", "fortuity", "providence"],
    antonyms: ["misfortune", "design", "plan"],
    funFact: "The word 'serendipity' was coined by Horace Walpole in 1754 based on the Persian fairy tale 'The Three Princes of Serendip,' whose heroes were always making discoveries by accident."
  },
  {
    word: "Ubiquitous",
    pronunciation: "/juːˈbɪkwɪtəs/",
    partOfSpeech: "adjective",
    definition: "Present, appearing, or found everywhere.",
    example: "His ubiquitous influence was felt throughout the organization.",
    synonyms: ["omnipresent", "ever-present", "pervasive"],
    antonyms: ["rare", "scarce", "uncommon"],
    funFact: "The word comes from the Latin 'ubique' meaning 'everywhere', which was also used as a motto by some military units to indicate their ability to deploy anywhere."
  },
  {
    word: "Ephemeral",
    pronunciation: "/ɪˈfɛm(ə)rəl/",
    partOfSpeech: "adjective",
    definition: "Lasting for a very short time.",
    example: "The ephemeral beauty of cherry blossoms.",
    synonyms: ["fleeting", "transient", "momentary", "brief"],
    antonyms: ["permanent", "enduring", "everlasting"],
    funFact: "This term is derived from the Greek word 'ephemeros', meaning 'lasting only a day'. It was originally used to describe insects with very short lifespans."
  },
  {
    word: "Eloquent",
    pronunciation: "/ˈɛləkwənt/",
    partOfSpeech: "adjective",
    definition: "Fluent or persuasive in speaking or writing.",
    example: "Her eloquent speech moved the entire audience.",
    synonyms: ["articulate", "fluent", "expressive", "persuasive"],
    antonyms: ["inarticulate", "awkward", "halting"],
    funFact: "The word comes from the Latin 'eloqui', which means 'to speak out'. Ancient Romans placed enormous value on eloquence as a political skill."
  },
  {
    word: "Tenacious",
    pronunciation: "/təˈneɪʃəs/",
    partOfSpeech: "adjective",
    definition: "Tending to keep a firm hold of something; clinging or adhering closely.",
    example: "She's a tenacious defender who never gives up.",
    synonyms: ["persistent", "determined", "dogged", "stubborn"],
    antonyms: ["irresolute", "yielding", "weak-willed"],
    funFact: "The term comes from the Latin word 'tenax', meaning 'holding fast'. The animal kingdom's most tenacious creature might be the barnacle, which creates the strongest natural glue known to science."
  },
  {
    word: "Pragmatic",
    pronunciation: "/præɡˈmætɪk/",
    partOfSpeech: "adjective",
    definition: "Dealing with things sensibly and realistically in a way that is based on practical considerations.",
    example: "We need a pragmatic approach to solving this problem.",
    synonyms: ["practical", "realistic", "sensible", "rational"],
    antonyms: ["idealistic", "impractical", "unrealistic"],
    funFact: "Pragmatism as a philosophical movement was developed in the United States in the late 19th century, particularly by Charles Sanders Peirce and William James."
  },
  {
    word: "Quintessential",
    pronunciation: "/ˌkwɪntɪˈsɛnʃ(ə)l/",
    partOfSpeech: "adjective",
    definition: "Representing the most perfect or typical example of a quality or class.",
    example: "She is the quintessential English rose.",
    synonyms: ["typical", "classic", "archetypal", "definitive"],
    antonyms: ["atypical", "uncharacteristic", "untypical"],
    funFact: "The word derives from 'quinta essentia' or 'fifth essence' in medieval philosophy, which was thought to be the substance of the heavenly bodies, latent in all things."
  }
];

export const WordOfDay: React.FC<WordOfDayProps> = ({ date }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const [wordData, setWordData] = useState(wordDictionary[0]);
  
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric'
  }).format(date);
  
  // Get a word based on the day of the year
  useEffect(() => {
    const dayOfYear = getDayOfYear(date);
    const wordIndex = dayOfYear % wordDictionary.length;
    setWordData(wordDictionary[wordIndex]);
    
    // Check if this word is already favorited
    const isWordFavorited = favorites.some(fav => fav.id === `word-${wordData.word.toLowerCase()}`);
    setIsFavorited(isWordFavorited);
  }, [date, favorites, wordData.word]);
  
  // Get day of year (0-365)
  const getDayOfYear = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wordItem = {
      id: `word-${wordData.word.toLowerCase()}`,
      word: wordData.word,
      definition: wordData.definition,
      partOfSpeech: wordData.partOfSpeech,
      pronunciation: wordData.pronunciation,
      example: wordData.example,
      category: "Word of the Day",
      difficulty: "medium" as "easy" | "medium" | "hard",
    };
    
    if (!isFavorited) {
      addFavorite(wordItem);
      toast.success("Added to favorites!", {
        description: `${wordData.word} has been added to your favorites.`
      });
    } else {
      removeFavorite(wordItem.id);
      toast("Removed from favorites", {
        description: `${wordData.word} has been removed from your favorites.`
      });
    }
    
    setIsFavorited(!isFavorited);
  };
  
  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const lookUpDictionary = () => {
    window.open(`https://www.merriam-webster.com/dictionary/${wordData.word.toLowerCase()}`, '_blank');
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
                <Volume className="h-5 w-5" />
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

              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-muted"
                onClick={lookUpDictionary}
              >
                <ExternalLink className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">{wordData.definition}</p>
            <p className="italic text-sm border-l-2 border-purrple pl-3 py-1">{wordData.example}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
