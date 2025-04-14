
import React, { useState, useEffect } from 'react';
import { CatAnimation } from './CatAnimation';
import { MessageDisplay } from './MessageDisplay';
import { MessageInput } from './MessageInput';
import { useSpeech } from './useSpeech';
import { lookupWord } from './cat-buddy-api';
import { Message, AnimationState } from './types';

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
  const [animationState, setAnimationState] = useState<AnimationState>('waving');
  
  const { isListening, toggleListening, speakText } = useSpeech({ 
    setAnimationState 
  });

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

  const handleVoiceRecognition = (text: string) => {
    setMessage(text);
    // Submit the voice message after receiving it
    handleSendMessage(text);
  };

  const handleToggleListening = () => {
    toggleListening(handleVoiceRecognition);
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
    setAnimationState('thinking');
    const wordData = await lookupWord(text.trim());
    
    if (wordData) {
      setAnimationState('happy');
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
          word: wordData.word,
          meaning: wordData.meaning,
          synonyms: wordData.synonyms,
          antonyms: wordData.antonyms,
          example: wordData.example
        }
      };
      
      setMessages(prev => [...prev, catResponse]);
      
      // Speak the definition
      setTimeout(() => {
        speakText(`${wordData.word}. ${wordData.meaning}. For example: ${wordData.example}`);
      }, 500);
    } else {
      setAnimationState('confused');
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'cat',
        text: "Meow! I couldn't find information about that word. Can you try another one?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
      
      setTimeout(() => {
        speakText("I couldn't find information about that word. Can you try another one?");
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <CatAnimation animationState={animationState} />
        <MessageDisplay 
          messages={messages} 
          onSpeakText={speakText} 
        />
      </div>
      
      <div className="border-t border-border p-4">
        <MessageInput 
          message={message}
          setMessage={setMessage}
          isListening={isListening}
          toggleListening={handleToggleListening}
          handleSendMessage={() => handleSendMessage()}
        />
      </div>
    </div>
  );
};
