import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="chat-bubble-ai max-w-[80%]">
        <div className="p-4 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center flex-shrink-0">
            <div className="w-4 h-4 rounded-full bg-secondary animate-pulse-neon" />
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-foreground-secondary">AI is thinking</span>
            <div className="typing-dots ml-2">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};