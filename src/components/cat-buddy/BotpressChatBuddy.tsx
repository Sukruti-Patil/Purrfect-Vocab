
import React, { useEffect, useState } from 'react';

export const BotpressChatBuddy: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load the Botpress webchat script
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v2.3/inject.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize the webchat once the script is loaded
    script.onload = () => {
      if ((window as any).botpressWebChat) {
        (window as any).botpressWebChat.init({
          configUrl: 'https://files.bpcontent.cloud/2025/04/12/18/20250412180317-PBLFG2DD.json',
          hostUrl: 'https://cdn.botpress.cloud/webchat/v2.3',
          messagingUrl: 'https://messaging.botpress.cloud',
          clientId: 'PBLFG2DD',
        });
        
        // Force open the chat window after initialization
        setTimeout(() => {
          if ((window as any).botpressWebChat) {
            (window as any).botpressWebChat.open();
            setIsLoaded(true);
          }
        }, 1000);
      }
    };

    return () => {
      // Cleanup when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if ((window as any).botpressWebChat) {
        (window as any).botpressWebChat.close();
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-[600px] overflow-hidden">
      <div className="pb-4">
        <h2 className="text-2xl font-bold">Chat Buddy</h2>
        <p className="text-sm text-muted-foreground">Ask me anything about words!</p>
      </div>
      
      {!isLoaded && (
        <div className="flex items-center justify-center h-full w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purrple"></div>
        </div>
      )}
      
      {/* This div will be used as a container for the Botpress webchat */}
      <div id="bp-web-widget-container" className="h-full w-full rounded-md overflow-hidden" />
    </div>
  );
};
