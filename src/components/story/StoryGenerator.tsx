
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, BookOpen, Sparkles, Volume2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { storyData } from '@/data/story-data';

interface StoryGeneratorProps {
  previewMode?: boolean;
}

interface Story {
  id: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetWords: { word: string; meaning: string }[];
  imageUrl?: string;
}

export const StoryGenerator: React.FC<StoryGeneratorProps> = ({ previewMode = false }) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('browse');
  const [customWords, setCustomWords] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [theme, setTheme] = useState<string>('');
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (previewMode) {
      // In preview mode, randomly select a story
      const randomIndex = Math.floor(Math.random() * storyData.length);
      setSelectedStory(storyData[randomIndex]);
    }
  }, [previewMode]);

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    updateScore(10); // Reward for reading a story
  };

  const handleGenerateStory = () => {
    if (!customWords.trim() || !theme.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both vocabulary words and a theme.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // In a real app, we would call an API here
    // For now, we'll simulate an API call with a timeout
    setTimeout(() => {
      const words = customWords
        .split(',')
        .map(word => word.trim())
        .filter(Boolean)
        .map(word => ({ word, meaning: `Definition for ${word}` }));

      const newStory: Story = {
        id: `custom-${Date.now()}`,
        title: `A Tale of ${theme}`,
        content: `Once upon a time in a world of ${theme}, there was a fascinating adventure. ${words.map(w => w.word).join(', ')} were all part of this exciting journey. [This is where your custom generated story would appear, featuring all the words you specified in a creative narrative about ${theme}.]`,
        difficulty: difficulty,
        targetWords: words,
      };

      setGeneratedStory(newStory);
      setSelectedStory(newStory);
      setActiveTab('read');
      setIsLoading(false);
      updateScore(20); // Reward for creating a story

      toast({
        title: "Story created!",
        description: "Your custom vocabulary story is ready to read.",
      });
    }, 2000);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const updateScore = (amount: number) => {
    // Get current score from localStorage
    const currentScoreStr = localStorage.getItem('meowScore');
    const currentScore = currentScoreStr ? parseInt(currentScoreStr, 10) : 100;
    
    // Update score
    const newScore = currentScore + amount;
    localStorage.setItem('meowScore', newScore.toString());
    
    // If this component is used on the main page where score state exists
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('scoreUpdated', { detail: { newScore } }));
    }
  };

  // For preview mode, show a simplified version
  if (previewMode) {
    return (
      <div className="space-y-4">
        {selectedStory ? (
          <>
            <h3 className="font-bold">{selectedStory.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{selectedStory.content.substring(0, 120)}...</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedStory.targetWords.slice(0, 3).map((word, index) => (
                <Badge key={index} variant="outline" className="bg-primary/10">
                  {word.word}
                </Badge>
              ))}
              {selectedStory.targetWords.length > 3 && (
                <Badge variant="outline">+{selectedStory.targetWords.length - 3} more</Badge>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className="p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="browse">Browse Stories</TabsTrigger>
          <TabsTrigger value="create">Create Story</TabsTrigger>
          <TabsTrigger value="read" disabled={!selectedStory}>Read Story</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="space-y-4">
          <h2 className="text-xl font-bold">Vocabulary Stories</h2>
          <p className="text-muted-foreground">Choose a story to improve your vocabulary in context.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {storyData.map((story) => (
              <Card 
                key={story.id} 
                className={`p-4 cursor-pointer hover:border-primary transition-colors ${selectedStory?.id === story.id ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => handleStorySelect(story)}
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded bg-muted flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold">{story.title}</h3>
                    <Badge className={`
                      ${story.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : ''}
                      ${story.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${story.difficulty === 'advanced' ? 'bg-pawpink-light text-pawpink-dark' : ''}
                    `}>
                      {story.difficulty}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {story.targetWords.length} vocabulary words
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="create" className="space-y-4">
          <h2 className="text-xl font-bold">Create Custom Story</h2>
          <p className="text-muted-foreground">Generate a story using vocabulary words you want to learn.</p>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="vocabularyWords">Vocabulary Words (comma-separated)</Label>
              <Textarea 
                id="vocabularyWords" 
                placeholder="Enter words you want to include, e.g.: serendipity, ephemeral, ubiquitous"
                value={customWords}
                onChange={(e) => setCustomWords(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="theme">Story Theme</Label>
              <Input
                id="theme"
                placeholder="e.g., space adventure, historical mystery, modern romance"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <div className="flex gap-2">
                {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                  <Button
                    key={level}
                    type="button"
                    variant={difficulty === level ? "default" : "outline"}
                    className={`flex-1 ${difficulty === level ? '' : ''}`}
                    onClick={() => setDifficulty(level)}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={handleGenerateStory} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Story...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Story
                </>
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="read" className="space-y-4">
          {selectedStory ? (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{selectedStory.title}</h2>
                <Button variant="ghost" size="sm" onClick={() => speakText(selectedStory.content)}>
                  <Volume2 className="h-4 w-4 mr-2" />
                  Read Aloud
                </Button>
              </div>
              
              <Badge className={`
                ${selectedStory.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : ''}
                ${selectedStory.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${selectedStory.difficulty === 'advanced' ? 'bg-pawpink-light text-pawpink-dark' : ''}
              `}>
                {selectedStory.difficulty}
              </Badge>
              
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  <p className="leading-7">{selectedStory.content}</p>
                </div>
              </ScrollArea>
              
              <Separator />
              
              <div>
                <h3 className="font-bold">Vocabulary Words</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {selectedStory.targetWords.map((word, index) => (
                    <Card key={index} className="p-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{word.word}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0" 
                          onClick={() => speakText(word.word)}
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{word.meaning}</p>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="flex gap-2">
                    <Save className="h-4 w-4" />
                    Save to Favorites
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px]">
              <p>No story selected. Please browse or create a story first.</p>
              <Button 
                variant="link" 
                onClick={() => setActiveTab('browse')}
                className="mt-2"
              >
                Browse Stories
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};
