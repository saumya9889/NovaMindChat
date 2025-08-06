import { Copy, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { useToast } from "../components/hooks/use.toast";
import { cn } from "../components/library/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "user";
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast({
        description: "Message copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy message",
        duration: 2000,
      });
    }
  };
  
  return (
    <div className={cn(
      "group relative px-4 py-6",
      isUser ? "bg-background" : "bg-chat-background"
    )}>
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
            isUser 
              ? "bg-user-message" 
              : "bg-assistant-message border border-chat-border"
          )}>
            <span className={cn(
              "text-sm font-medium",
              isUser ? "text-user-message-foreground" : "text-assistant-message-foreground"
            )}>
              {isUser ? "U" : "A"}
            </span>
          </div>

          {/* Message Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-sm">
                {isUser ? "You" : "ChatGPT"}
              </span>
              <span className="text-xs text-muted-foreground">
                {message.timestamp}
              </span>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </div>

            {/* Message Actions - Only for assistant messages */}
            {!isUser && (
              <div className="flex items-center gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  <ThumbsUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  <ThumbsDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};