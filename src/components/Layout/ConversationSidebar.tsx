import React, { useState } from 'react';
import { Search, Plus, MessageSquare, Clock, Trash2 } from 'lucide-react';

interface ConversationSidebarProps {
  isOpen: boolean;
}

interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  isActive?: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Chest Pain Consultation',
    preview: 'I have been experiencing chest pain...',
    timestamp: '2 hours ago',
    isActive: true,
  },
  {
    id: '2',
    title: 'Blood Pressure Questions',
    preview: 'My blood pressure readings have been...',
    timestamp: '1 day ago',
  },
  {
    id: '3',
    title: 'Skin Rash Analysis',
    preview: 'Can you help me identify this rash...',
    timestamp: '3 days ago',
  },
  {
    id: '4',
    title: 'Medication Interactions',
    preview: 'I want to check if these medications...',
    timestamp: '1 week ago',
  },
];

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({ isOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  
  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
  };

  const handleNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      preview: '',
      timestamp: 'now',
      isActive: true,
    };
    
    setConversations(prev => [
      newConv,
      ...prev.map(c => ({ ...c, isActive: false }))
    ]);
  };

  return (
    <aside className={`glass-panel border-r border-primary/20 transition-all duration-300 ${
      isOpen ? 'w-80' : 'w-0 overflow-hidden'
    }`}>
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="space-y-4 mb-6">
          <button
            onClick={handleNewConversation}
            className="btn-neon-primary w-full py-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <Plus size={18} />
            <span>New Conversation</span>
          </button>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-secondary" size={16} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-neon w-full pl-10 py-2"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 space-y-2 custom-scrollbar overflow-y-auto">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  conversation.isActive
                    ? 'glass-panel border-primary/50 shadow-primary-glow'
                    : 'hover:bg-muted/10 border border-transparent hover:border-primary/20'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <MessageSquare className="text-primary mt-1 flex-shrink-0" size={16} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-foreground truncate">
                      {conversation.title}
                    </h3>
                    <p className="text-xs text-foreground-secondary mt-1 line-clamp-2">
                      {conversation.preview}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-foreground-secondary">
                      <Clock size={12} className="mr-1" />
                      {conversation.timestamp}
                    </div>
                  </div>
                </div>
                
                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteConversation(conversation.id);
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/20 rounded"
                >
                  <Trash2 size={12} className="text-destructive" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto text-foreground-secondary mb-2" size={32} />
              <p className="text-foreground-secondary text-sm">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};