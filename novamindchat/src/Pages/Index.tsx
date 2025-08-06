import { useState } from "react";
import { ChatSidebar } from "../components/ChatSidebar";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Hello World",
      lastMessage: "Hello! How can I help you today?",
      timestamp: "2 minutes ago",
      messages: [
        {
          id: "1",
          content: "Hello!",
          sender: "user",
          timestamp: "2:30 PM"
        },
        {
          id: "2",
          content: "Hello! How can I help you today?",
          sender: "assistant",
          timestamp: "2:30 PM"
        }
      ]
    },
    {
      id: "2",
      title: "React Development",
      lastMessage: "I'd be happy to help with React!",
      timestamp: "1 hour ago",
      messages: [
        {
          id: "3",
          content: "Can you help me with React components?",
          sender: "user",
          timestamp: "1:45 PM"
        },
        {
          id: "4",
          content: "I'd be happy to help with React components! React components are the building blocks of any React application. They allow you to split the UI into independent, reusable pieces.",
          sender: "assistant",
          timestamp: "1:45 PM"
        }
      ]
    },
    {
      id: "3",
      title: "JavaScript Tips",
      lastMessage: "Here are some great JavaScript tips...",
      timestamp: "Yesterday",
      messages: []
    }
  ]);

  const [activeConversationId, setActiveConversationId] = useState<string>("1");
  
  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  const handleSendMessage = (content: string) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Simulate assistant response
    const assistantResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: "I understand your message. This is a simulated response from ChatGPT. In a real implementation, this would be connected to an AI API.",
      sender: "assistant",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversationId) {
        const updatedMessages = [...conv.messages, newMessage, assistantResponse];
        return {
          ...conv,
          messages: updatedMessages,
          lastMessage: assistantResponse.content,
          timestamp: "Just now"
        };
      }
      return conv;
    }));
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "New conversation",
      lastMessage: "",
      timestamp: "Just now",
      messages: []
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewConversation={handleNewConversation}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation && activeConversation.messages.length > 0 ? (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              {activeConversation.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
            
            {/* Input */}
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ChatGPT
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                How can I help you today?
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-chat-border rounded-lg hover:bg-chat-hover transition-colors cursor-pointer">
                    <h3 className="font-medium mb-2">💡 Creative writing</h3>
                    <p className="text-sm text-muted-foreground">Help me write a story</p>
                  </div>
                  <div className="p-4 border border-chat-border rounded-lg hover:bg-chat-hover transition-colors cursor-pointer">
                    <h3 className="font-medium mb-2">🔍 Analysis</h3>
                    <p className="text-sm text-muted-foreground">Analyze this data</p>
                  </div>
                  <div className="p-4 border border-chat-border rounded-lg hover:bg-chat-hover transition-colors cursor-pointer">
                    <h3 className="font-medium mb-2">💻 Code help</h3>
                    <p className="text-sm text-muted-foreground">Debug my code</p>
                  </div>
                  <div className="p-4 border border-chat-border rounded-lg hover:bg-chat-hover transition-colors cursor-pointer">
                    <h3 className="font-medium mb-2">🎓 Learning</h3>
                    <p className="text-sm text-muted-foreground">Explain a concept</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Input at bottom */}
            <div className="w-full">
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;