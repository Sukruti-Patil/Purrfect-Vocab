
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const BotpressChatBuddy: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(Date.now()); // Key for forcing iframe refresh

  useEffect(() => {
    // Alternative approach using iframe instead of script injection
    setIsLoaded(true);
  }, []);

  const handleReload = () => {
    setIsLoaded(false);
    // Use a new key to force the iframe to reload completely
    setIframeKey(Date.now());
    setTimeout(() => setIsLoaded(true), 100);
  };

  return (
    <div className="flex flex-col h-[600px] overflow-hidden">
      <div className="pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Chat Buddy</h2>
          <p className="text-sm text-muted-foreground">Ask me anything about words!</p>
        </div>
        <button 
          onClick={handleReload}
          className="text-xs px-2 py-1 bg-muted hover:bg-muted/80 rounded-md transition-colors"
        >
          Reload Chat
        </button>
      </div>
      
      <div className="relative flex-1 rounded-md overflow-hidden border">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purrple"></div>
          </div>
        )}
        
        <iframe 
          key={iframeKey}
          src="https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/14/10/20250414102350-RYFL60Q4.json" 
          className="w-full h-full"
          onLoad={() => setIsLoaded(true)}
          allow="microphone; camera"
          title="Chat Buddy"
        />
      </div>
    </div>
  );
};
