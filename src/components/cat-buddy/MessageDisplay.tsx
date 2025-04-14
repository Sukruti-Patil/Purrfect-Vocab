
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { Message } from './types';

interface MessageDisplayProps {
  messages: Message[];
  onSpeakText: (text: string) => void;
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages, onSpeakText }) => {
  return (
    <>
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
              <div className="font-bold">{msg.wordData.word || msg.text.split('\n')[0]}</div>
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
              
              <div className="flex flex-wrap gap-2 mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="bg-background/20 hover:bg-background/30"
                  onClick={() => onSpeakText(msg.wordData?.meaning || "")}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Pronounce Definition
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="bg-background/20 hover:bg-background/30"
                  onClick={() => onSpeakText(msg.wordData?.example || "")}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Pronounce Example
                </Button>
              </div>
            </div>
          ) : (
            <p>{msg.text}</p>
          )}
          <p className="text-xs opacity-70 mt-1">
            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      ))}
    </>
  );
};
