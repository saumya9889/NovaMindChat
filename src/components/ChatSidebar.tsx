import { MessageSquare, Plus, MoreHorizontal, Edit, Trash } from "lucide-react";
import  Button  from "../components/ui/button";
import { cn } from "../components/library/utils";

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

export const ChatSidebar = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
}: ChatSidebarProps) => {
  return (
    <div className="w-80 bg-sidebar-bg border-r border-chat-border flex flex-col h-full">
      {/* New Chat Button */}
      <div className="p-4 border-b border-chat-border">
        <Button
          onClick={onNewConversation}
          variant="outline"
          className="w-full justify-start gap-2 bg-transparent border-sidebar-hover text-sidebar-fg hover:bg-sidebar-hover"
        >
          <Plus className="w-4 h-4" />
          New chat
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "group relative rounded-lg p-3 mb-1 cursor-pointer transition-all duration-200",
                "hover:bg-sidebar-hover",
                activeConversationId === conversation.id
                  ? "bg-sidebar-active text-white"
                  : "text-sidebar-fg"
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {conversation.title}
                  </div>
                  <div className="text-xs opacity-70 truncate mt-1">
                    {conversation.lastMessage}
                  </div>
                  <div className="text-xs opacity-50 mt-1">
                    {conversation.timestamp}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-sidebar-fg hover:bg-sidebar-hover"
                >
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-chat-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-sidebar-fg">User</div>
            <div className="text-xs text-sidebar-fg opacity-70">Free Plan</div>
          </div>
        </div>
      </div>
    </div>
  );
};