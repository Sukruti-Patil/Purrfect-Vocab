
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
import { Loader2, BookOpen, Sparkles, Volume2, Save, Share2, Download, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { storyData } from '@/data/story-data';
import confetti from 'canvas-confetti';

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
  const [isCopied, setIsCopied] = useState(false);
  const [savedStories, setSavedStories] = useState<Story[]>([]);
  const [storySaveTitle, setStorySaveTitle] = useState('');
  const { toast } = useToast();

  // Load saved stories from localStorage
  useEffect(() => {
    const savedStoriesJson = localStorage.getItem('saved-stories');
    if (savedStoriesJson) {
      try {
        setSavedStories(JSON.parse(savedStoriesJson));
      } catch (e) {
        console.error('Failed to load saved stories:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (previewMode) {
      // In preview mode, randomly select a story
      const randomIndex = Math.floor(Math.random() * storyData.length);
      setSelectedStory(storyData[randomIndex]);
    }
  }, [previewMode]);

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story);
    setActiveTab('read');
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
    // For now, we'll generate a more detailed story with a timeout
    setTimeout(() => {
      const words = customWords
        .split(',')
        .map(word => word.trim())
        .filter(Boolean);
        
      // Generate a better story with the words integrated
      const storyTitle = `A Tale of ${theme.charAt(0).toUpperCase() + theme.slice(1)}`;
      
      // Create example sentences for each word
      const wordExamples = words.map(word => {
        return `"${word}" - As they traveled, they encountered ${word} in unexpected ways.`;
      }).join(' ');
      
      // Intro paragraph
      const introParagraph = `Once upon a time in a world of ${theme}, there was a fascinating adventure waiting to be discovered. ${words[0]} was the key to unlocking this new world, where ${words[1] || 'magic'} flowed through everything.`;
      
      // Middle paragraph with word usage
      const middleParagraph = `The journey was filled with challenges. ${wordExamples} Each experience taught them something new about themselves and the meaning of ${words[words.length-1] || 'courage'}.`;
      
      // Conclusion
      const conclusionParagraph = `In the end, they realized that the true ${theme} was the friends they made along the way. And with that knowledge, they embraced their ${words[Math.floor(Math.random() * words.length)] || 'destiny'} with open arms.`;
      
      // Full story
      const storyContent = `${introParagraph}\n\n${middleParagraph}\n\n${conclusionParagraph}`;

      const newStory: Story = {
        id: `custom-${Date.now()}`,
        title: storyTitle,
        content: storyContent,
        difficulty: difficulty,
        targetWords: words.map(word => ({ 
          word, 
          meaning: `Definition for ${word} (look up in the dictionary to learn more)` 
        })),
      };

      setGeneratedStory(newStory);
      setSelectedStory(newStory);
      setStorySaveTitle(storyTitle);
      setActiveTab('read');
      setIsLoading(false);
      updateScore(20); // Reward for creating a story

      // Show confetti for creating a story
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      toast({
        title: "Story created!",
        description: "Your custom vocabulary story is ready to read.",
      });
    }, 2000);
  };

  const saveStory = () => {
    if (!selectedStory) return;
    
    // Create a copy with a proper title
    const storyToSave = {
      ...selectedStory,
      title: storySaveTitle || selectedStory.title
    };
    
    // Add to saved stories
    const updatedSaved = [...savedStories, storyToSave];
    setSavedStories(updatedSaved);
    
    // Save to localStorage
    localStorage.setItem('saved-stories', JSON.stringify(updatedSaved));
    
    toast({
      title: "Story saved!",
      description: "The story has been added to your saved stories.",
    });
    
    updateScore(5); // Small reward for saving a story
  };

  const handleCopyStory = () => {
    if (!selectedStory) return;
    
    navigator.clipboard.writeText(selectedStory.content)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        
        toast({
          title: "Copied to clipboard",
          description: "The story has been copied to your clipboard.",
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Copy failed",
          description: "Could not copy text to clipboard.",
          variant: "destructive",
        });
      });
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
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="browse">Browse Stories</TabsTrigger>
          <TabsTrigger value="create">Create Story</TabsTrigger>
          <TabsTrigger value="read" disabled={!selectedStory}>Read Story</TabsTrigger>
          <TabsTrigger value="saved">Saved Stories</TabsTrigger>
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
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => speakText(selectedStory.content)}>
                    <Volume2 className="h-4 w-4 mr-1" />
                    Read Aloud
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleCopyStory}>
                    {isCopied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                    {isCopied ? "Copied!" : "Copy"}
                  </Button>
                </div>
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
                  {selectedStory.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="leading-7">{paragraph}</p>
                  ))}
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
                
                <div className="flex flex-col space-y-2 mt-4">
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Title for saving this story"
                      value={storySaveTitle}
                      onChange={(e) => setStorySaveTitle(e.target.value)}
                    />
                    <Button variant="outline" className="whitespace-nowrap" onClick={saveStory}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Story
                    </Button>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="ghost" className="flex gap-2" onClick={() => window.print()}>
                      <Download className="h-4 w-4" />
                      Print/Save PDF
                    </Button>
                    <Button variant="ghost" className="flex gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Story
                    </Button>
                  </div>
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
        
        <TabsContent value="saved" className="space-y-4">
          <h2 className="text-xl font-bold">Your Saved Stories</h2>
          {savedStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {savedStories.map((story) => (
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
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-lg font-medium">No saved stories yet</p>
              <p className="text-muted-foreground">Create or browse stories and save them to see them here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};
