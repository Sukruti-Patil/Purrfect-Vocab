
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AnimationState } from './types';

interface UseSpeechProps {
  setAnimationState: (state: AnimationState) => void;
}

export const useSpeech = ({ setAnimationState }: UseSpeechProps) => {
  // Voice recognition states
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Speech synthesis
  const synth = window.speechSynthesis;
  const { toast } = useToast();
  
  // Handle speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported in this browser');
      return;
    }
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event);
        setIsListening(false);
        toast({
          title: "Recognition Error",
          description: "There was an issue with the voice recognition feature.",
          variant: "destructive",
        });
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [toast]);
  
  const toggleListening = (onResult: (text: string) => void) => {
    if (isListening) {
      recognitionRef.current?.abort();
      setIsListening(false);
    } else {
      try {
        // Set up the result handler
        if (recognitionRef.current) {
          recognitionRef.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
          };
          
          recognitionRef.current.start();
          setIsListening(true);
          setAnimationState('thinking');
          
          toast({
            title: "Listening...",
            description: "Speak now and I'll look up your word!",
          });
        }
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast({
          title: "Recognition Error",
          description: "Could not start voice recognition. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  
  const speakText = (text: string) => {
    if (!text) return;
    
    if (synth.speaking) {
      synth.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Set voices - try to use a better voice if available
    const voices = synth.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Premium') || 
      voice.name.includes('Samantha')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Show talking animation while speaking
    utterance.onstart = () => {
      setAnimationState('talking');
    };
    
    utterance.onend = () => {
      setAnimationState('default');
    };
    
    utterance.onerror = () => {
      setAnimationState('confused');
      toast({
        title: "Speech Error",
        description: "There was an issue with text-to-speech. Please try again.",
        variant: "destructive",
      });
    };
    
    synth.speak(utterance);
  };
  
  return { isListening, toggleListening, speakText };
};
