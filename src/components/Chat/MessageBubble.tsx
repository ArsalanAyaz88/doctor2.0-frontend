import React, { useState } from 'react';
import { Copy, RotateCcw, Bookmark, Share, Check } from 'lucide-react';
import { Message } from './ChatArea';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-muted/20 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/•/g, '<span class="text-primary">•</span>');
  };

  return (
    <div
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`max-w-[80%] ${message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
        {/* Message Content */}
        <div className="p-4">
          {message.images && message.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {message.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Uploaded image ${index + 1}`}
                  className="max-w-48 max-h-48 rounded-lg object-cover border border-primary/30"
                />
              ))}
            </div>
          )}
          
          <div
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
          />
          
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-primary/10">
            <span className="text-xs text-foreground-secondary">
              {formatTime(message.timestamp)}
            </span>
            
            {/* Action Buttons */}
            <div className={`flex items-center space-x-1 transition-opacity duration-200 ${
              showActions ? 'opacity-100' : 'opacity-0'
            }`}>
              <button
                onClick={handleCopy}
                className="p-1 rounded hover:bg-primary/10 transition-colors"
                title="Copy message"
              >
                {copied ? (
                  <Check size={12} className="text-success" />
                ) : (
                  <Copy size={12} className="text-foreground-secondary hover:text-primary" />
                )}
              </button>
              
              {message.sender === 'ai' && (
                <button
                  className="p-1 rounded hover:bg-primary/10 transition-colors"
                  title="Regenerate response"
                >
                  <RotateCcw size={12} className="text-foreground-secondary hover:text-primary" />
                </button>
              )}
              
              <button
                className="p-1 rounded hover:bg-primary/10 transition-colors"
                title="Bookmark message"
              >
                <Bookmark size={12} className="text-foreground-secondary hover:text-primary" />
              </button>
              
              <button
                className="p-1 rounded hover:bg-primary/10 transition-colors"
                title="Share message"
              >
                <Share size={12} className="text-foreground-secondary hover:text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};