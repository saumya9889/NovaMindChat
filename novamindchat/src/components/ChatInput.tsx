import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";


interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [message]);

  return (
    <div className="border-t border-chat-border bg-background p-4">
      <div className="max-w-3xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative rounded-lg border border-input bg-background shadow-sm">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message ChatGPT..."
              className="min-h-[60px] max-h-[200px] resize-none border-0 px-4 py-3 pr-20 focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={disabled}
            />
            
            {/* Action buttons */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1 ">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              
              {message.trim() ? (
                <Button
                  type="submit"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={disabled}
                >
                  <Send className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>ChatGPT can make mistakes. Check important info.</span>
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
        </form>
      </div>
    </div>
  );
};