
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  sender: 'user' | 'cat';
  text: string;
  timestamp: Date;
}

export const CatBuddy: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'cat',
      text: 'Meow! Hello there! I\'m your vocabulary buddy. Ask me anything about words or language learning!',
      timestamp: new Date()
    }
  ]);
  const [isWaving, setIsWaving] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Trigger wave animation
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2000);
    
    // Simple responses (in a real app, this would use AI)
    setTimeout(() => {
      const responses = [
        "Purr-fect question! Let me help you with that...",
        "That's an interesting word! Did you know it comes from...",
        "Meow! Here's what I know about that term...",
        "Let me think... Ah! I remember this one!",
        "Great question! In English, we use that word when..."
      ];
      
      const catResponse: Message = {
        id: Date.now().toString(),
        sender: 'cat',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, catResponse]);
      
      // Trigger blink animation
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 300);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            {/* Cat face */}
            <div className="absolute inset-0 bg-purrple-light rounded-full border-4 border-purrple"></div>
            
            {/* Ears */}
            <div className="absolute -top-5 -left-2 w-12 h-12 cat-ear bg-purrple-dark transform -rotate-15"></div>
            <div className="absolute -top-5 -right-2 w-12 h-12 cat-ear bg-purrple-dark transform rotate-15"></div>
            
            {/* Eyes */}
            <div className={cn(
              "absolute left-5 top-10 w-6 h-6 bg-white rounded-full flex items-center justify-center",
              isBlinking && "animate-blink"
            )}>
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            <div className={cn(
              "absolute right-5 top-10 w-6 h-6 bg-white rounded-full flex items-center justify-center",
              isBlinking && "animate-blink"
            )}>
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            
            {/* Nose */}
            <div className="absolute left-1/2 top-16 transform -translate-x-1/2 w-4 h-3 bg-pawpink rounded-full"></div>
            
            {/* Mouth */}
            <div className="absolute left-1/2 top-20 transform -translate-x-1/2 w-8 h-2 border-b-2 border-black"></div>
            
            {/* Headphones */}
            <div className="absolute -left-2 top-2 w-3 h-8 bg-meowblue rounded-full"></div>
            <div className="absolute -right-2 top-2 w-3 h-8 bg-meowblue rounded-full"></div>
            <div className="absolute -top-2 left-0 right-0 h-3 bg-meowblue rounded-full"></div>
            
            {/* Paw (waves) */}
            <div className={cn(
              "absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/4 w-10 h-10 bg-purrple-light rounded-full border-2 border-purrple",
              isWaving && "animate-wave"
            )}></div>
          </div>
          <h3 className="text-lg font-bold mt-4">Meowford</h3>
          <p className="text-sm text-muted-foreground">Your Vocabulary Buddy</p>
        </div>
        
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={cn(
              "max-w-[80%] rounded-2xl p-3",
              msg.sender === 'user' 
                ? "bg-purrple text-white ml-auto" 
                : "bg-muted mr-auto",
              "animate-scale-up"
            )}
          >
            <p>{msg.text}</p>
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
            placeholder="Ask me about words..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
          <Button type="button" variant="outline" size="icon">
            <Volume2 className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
