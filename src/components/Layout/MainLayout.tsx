import React, { useState } from 'react';
import { Menu, X, Mic, Image, Send } from 'lucide-react';
import { ConversationSidebar } from './ConversationSidebar';
import { ChatArea } from '../Chat/ChatArea';
import { VoiceInput } from '../Voice/VoiceInput';
import { ImageUpload } from '../Image/ImageUpload';

export const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleSendMessage = () => {
    if (inputText.trim() || uploadedImages.length > 0) {
      // TODO: Send message to AI
      console.log('Sending message:', inputText, uploadedImages);
      setInputText('');
      setUploadedImages([]);
    }
  };

  return (
    <div className="min-h-screen bg-background particle-bg">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      </div>

      {/* Header */}
      <header className="glass-panel border-b border-primary/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn-neon-primary p-2 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse-neon" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Medical AI Assistant
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="holographic-border">
            <div className="px-3 py-1 rounded-md text-sm text-foreground-secondary">
              Online
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-76px)]">
        {/* Sidebar */}
        <ConversationSidebar isOpen={sidebarOpen} />

        {/* Main Chat Area */}
        <main className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'ml-0' : ''
        }`}>
          <ChatArea />
          
          {/* Input Area */}
          <div className="p-4">
            <div className="glass-panel p-4 space-y-4">
              {/* Image Preview */}
              {uploadedImages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {uploadedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg border border-primary/30"
                      />
                      <button
                        onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-xs"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Input Controls */}
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask me anything about your health..."
                    className="input-neon w-full min-h-[50px] max-h-32 resize-none placeholder:text-foreground-secondary/60"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <ImageUpload
                    onImagesSelected={setUploadedImages}
                    selectedImages={uploadedImages}
                  />
                  
                  <VoiceInput
                    isListening={isListening}
                    onToggleListening={setIsListening}
                    onTranscript={setInputText}
                  />
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() && uploadedImages.length === 0}
                    className="btn-neon-primary p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};