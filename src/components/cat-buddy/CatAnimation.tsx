
import React from 'react';
import Lottie from 'react-lottie';
import catDefault from '@/animations/cat-default.json';
import catTalking from '@/animations/cat-talking.json';
import catThinking from '@/animations/cat-thinking.json';
import catWaving from '@/animations/cat-waving.json';
import catHappy from '@/animations/cat-happy.json';
import catConfused from '@/animations/cat-confused.json';
import { AnimationState } from './types';

interface CatAnimationProps {
  animationState: AnimationState;
}

const animationFiles = {
  default: catDefault,
  waving: catWaving,
  talking: catTalking,
  thinking: catThinking,
  happy: catHappy,
  confused: catConfused
};

const animationOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export const CatAnimation: React.FC<CatAnimationProps> = ({ animationState }) => {
  return (
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
  );
};
