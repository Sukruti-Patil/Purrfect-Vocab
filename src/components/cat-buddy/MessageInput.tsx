
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Mic, MicOff } from 'lucide-react';

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  isListening: boolean;
  toggleListening: () => void;
  handleSendMessage: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  message, 
  setMessage, 
  isListening, 
  toggleListening, 
  handleSendMessage
}) => {
  return (
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
  );
};
