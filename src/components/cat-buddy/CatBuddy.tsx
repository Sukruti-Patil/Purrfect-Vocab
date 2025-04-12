
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Volume2, Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import Lottie from 'react-lottie';
import catDefault from '@/animations/cat-default.json';
import catTalking from '@/animations/cat-talking.json';
import catThinking from '@/animations/cat-thinking.json';
import catWaving from '@/animations/cat-waving.json';
import catHappy from '@/animations/cat-happy.json';
import catConfused from '@/animations/cat-confused.json';

interface Message {
  id: string;
  sender: 'user' | 'cat';
  text: string;
  timestamp: Date;
  wordData?: {
    meaning: string;
    synonyms: string[];
    antonyms: string[];
    example: string;
  };
}

export const CatBuddy: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'cat',
      text: 'Meow! Hello there! I\'m your vocabulary buddy. Ask me any word and I\'ll help you understand it better!',
      timestamp: new Date()
    }
  ]);
  
  // Animation states
  const [animationState, setAnimationState] = useState<
    'default' | 'waving' | 'talking' | 'thinking' | 'happy' | 'confused'
  >('waving');
  
  // Voice recognition states
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Speech synthesis
  const synth = window.speechSynthesis;
  
  const animationOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  const animationFiles = {
    default: catDefault,
    waving: catWaving,
    talking: catTalking,
    thinking: catThinking,
    happy: catHappy,
    confused: catConfused
  };

  // Initialize animations with greeting
  useEffect(() => {
    // Start with waving animation
    setAnimationState('waving');
    
    // After 3 seconds, return to default
    const timer = setTimeout(() => {
      setAnimationState('default');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported in this browser');
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';
    
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      // Submit the voice message after receiving it
      handleSendMessage(transcript);
    };
    
    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.abort();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setAnimationState('thinking');
    }
  };

  const speakText = (text: string) => {
    if (synth.speaking) {
      synth.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    
    // Show talking animation while speaking
    utterance.onstart = () => {
      setAnimationState('talking');
    };
    
    utterance.onend = () => {
      setAnimationState('default');
    };
    
    synth.speak(utterance);
  };

  // Mock API for word lookup
  const lookupWord = async (word: string) => {
    try {
      setAnimationState('thinking');
      
      // In a real app, this would be an API call to a dictionary service
      // or your backend Flask service
      const mockResponse = await new Promise<{
        word: string;
        meaning: string;
        synonyms: string[];
        antonyms: string[];
        example: string;
      }>((resolve) => {
        setTimeout(() => {
          // This is mock data - would come from API in real app
          const responseData = {
            word,
            meaning: `The definition of "${word}" (simulated response)`,
            synonyms: ['similar1', 'similar2', 'similar3'],
            antonyms: ['opposite1', 'opposite2'],
            example: `Here is an example sentence using "${word}" in context.`
          };
          resolve(responseData);
        }, 1500);
      });
      
      setAnimationState('happy');
      return mockResponse;
    } catch (error) {
      setAnimationState('confused');
      console.error('Error looking up word:', error);
      return null;
    }
  };

  const handleSendMessage = async (text: string = message) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Look up the word
    const wordData = await lookupWord(text.trim());
    
    if (wordData) {
      const formattedResponse = `
        "${wordData.word}"
        
        Meaning: ${wordData.meaning}
        
        Synonyms: ${wordData.synonyms.join(', ')}
        
        Antonyms: ${wordData.antonyms.join(', ')}
        
        Example: ${wordData.example}
      `;
      
      const catResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'cat',
        text: formattedResponse,
        timestamp: new Date(),
        wordData: {
          meaning: wordData.meaning,
          synonyms: wordData.synonyms,
          antonyms: wordData.antonyms,
          example: wordData.example
        }
      };
      
      setMessages(prev => [...prev, catResponse]);
      
      // Speak the definition
      setTimeout(() => {
        speakText(wordData.meaning + ". For example: " + wordData.example);
      }, 500);
    } else {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'cat',
        text: "Meow! I couldn't find information about that word. Can you try another one?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
      setAnimationState('confused');
      
      setTimeout(() => {
        speakText("I couldn't find information about that word. Can you try another one?");
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-48 h-48 relative">
            <Lottie 
              options={{
                ...animationOptions,
                animationData: animationFiles[animationState]
              }}
            />
          </div>
          <h3 className="text-lg font-bold mt-4">Meowford</h3>
          <p className="text-sm text-muted-foreground">Your Vocabulary Buddy</p>
        </div>
        
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={cn(
              "max-w-[85%] rounded-2xl p-4",
              msg.sender === 'user' 
                ? "bg-purrple text-white ml-auto" 
                : "bg-muted mr-auto",
              "animate-scale-up"
            )}
          >
            {msg.sender === 'cat' && msg.wordData ? (
              <div className="space-y-2">
                <div className="font-bold">{msg.text.split('\n')[0]}</div>
                <div>
                  <p className="font-semibold">Meaning:</p>
                  <p>{msg.wordData.meaning}</p>
                </div>
                
                <div>
                  <p className="font-semibold">Synonyms:</p>
                  <div className="flex flex-wrap gap-1">
                    {msg.wordData.synonyms.map((syn, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-background/20 rounded-full text-xs"
                      >
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="font-semibold">Antonyms:</p>
                  <div className="flex flex-wrap gap-1">
                    {msg.wordData.antonyms.map((ant, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-background/20 rounded-full text-xs"
                      >
                        {ant}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="font-semibold">Example:</p>
                  <p className="italic">{msg.wordData.example}</p>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 bg-background/20 hover:bg-background/30"
                  onClick={() => speakText(msg.wordData?.meaning + ". For example: " + msg.wordData?.example)}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Pronounce
                </Button>
              </div>
            ) : (
              <p>{msg.text}</p>
            )}
            <p className="text-xs opacity-70 mt-1">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        ))}
      </div>
      
      <div className="border-t border-border p-4">
        <form 
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a word to look up..."
            className="flex-1"
            disabled={isListening}
          />
          <Button 
            type="button" 
            variant={isListening ? "destructive" : "outline"} 
            size="icon"
            onClick={toggleListening}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button type="submit" size="icon" disabled={isListening || !message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
