import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  images?: string[];
}

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your AI medical assistant. I can help you with health questions, analyze symptoms, and provide medical information. How can I assist you today?',
    sender: 'ai',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '2',
    content: 'I\'ve been experiencing some chest pain lately, especially when I exercise. Should I be concerned?',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
  },
  {
    id: '3',
    content: 'Chest pain during exercise can have various causes, ranging from minor to serious. Based on your description, I recommend the following:\n\n• **Immediate action**: If you\'re experiencing severe chest pain, shortness of breath, or pain radiating to your arm/jaw, seek emergency medical attention immediately.\n\n• **Possible causes**: Exercise-induced chest pain could be related to:\n  - Cardiovascular issues (requires medical evaluation)\n  - Muscle strain or inflammation\n  - Acid reflux\n  - Anxiety or stress\n\n• **Recommendation**: Schedule an appointment with your healthcare provider for proper evaluation, including possible tests like an ECG or stress test.\n\nPlease don\'t ignore persistent chest pain. Would you like me to help you find cardiologists in your area?',
    sender: 'ai',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
  },
];

export const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Messages Container */}
      <div className="flex-1 custom-scrollbar overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary animate-pulse-neon" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Welcome to Medical AI
                </h2>
                <p className="text-foreground-secondary mt-2">
                  Start a conversation by asking a health-related question
                </p>
              </div>
              <div className="glass-panel p-4 max-w-md mx-auto">
                <h3 className="font-semibold text-primary mb-2">Example questions:</h3>
                <ul className="text-sm text-foreground-secondary space-y-1">
                  <li>• "I have a persistent headache, what could it be?"</li>
                  <li>• "Can you analyze this skin rash?" (with image)</li>
                  <li>• "What are the side effects of this medication?"</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isTyping && <TypingIndicator />}
          </>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};