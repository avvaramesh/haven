import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "👋 Hi! I'm your AI analytics companion. I can help you analyze your data, generate insights, and create visualizations. Try asking me something like 'What are our top performing products?' or 'Show me revenue trends'",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    const assistantResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: getAIResponse(input),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, assistantResponse]);
    setInput("");
  };

  const getAIResponse = (query: string): string => {
    const responses = [
      "🔍 Based on your data, I've identified that Q4 shows a 23% increase in sales compared to Q3. Would you like me to create a visualization for this trend?",
      "📊 I notice an interesting pattern in your customer data. The retention rate has improved by 15% since implementing the new onboarding flow. Shall I generate a detailed report?",
      "💡 Insight: Your top-performing product category is generating 34% more revenue than last quarter. I can help you understand the driving factors.",
      "🎯 I recommend focusing on the mobile segment - it shows the highest growth potential with a 45% conversion rate improvement.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="h-full flex flex-col bg-dashboard-surface border border-dashboard-border rounded-lg">
      <div className="p-4 border-b border-dashboard-border">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-dashboard-accent rounded-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-dashboard-text">
              AI Analytics Assistant
            </h3>
            <p className="text-xs text-dashboard-text-muted">
              Powered by Gen AI
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.type === "assistant" && (
              <div className="p-1.5 bg-dashboard-accent rounded-full mt-1">
                <Bot className="w-3 h-3 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                message.type === "user"
                  ? "bg-dashboard-accent text-white"
                  : "bg-dashboard-muted text-dashboard-text"
              }`}
            >
              {message.content}
            </div>
            {message.type === "user" && (
              <div className="p-1.5 bg-dashboard-muted rounded-full mt-1">
                <User className="w-3 h-3 text-dashboard-text" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-dashboard-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about your data..."
            className="flex-1 bg-dashboard-muted border-dashboard-border text-dashboard-text"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-dashboard-accent hover:bg-dashboard-accent-light"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
