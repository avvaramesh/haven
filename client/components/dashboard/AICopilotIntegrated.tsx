import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Send,
  Lightbulb,
  TrendingUp,
  Zap,
  MessageSquare,
  Sparkles,
  Target,
  AlertTriangle,
} from "lucide-react";

interface Suggestion {
  id: string;
  type: "insight" | "optimization" | "best-practice" | "error";
  title: string;
  description: string;
  action?: string;
  priority: "high" | "medium" | "low";
}

interface Message {
  id: string;
  type: "user" | "copilot";
  content: string;
  timestamp: Date;
}

export default function AICopilotIntegrated() {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "suggestions">(
    "suggestions",
  );
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "copilot",
      content:
        "👋 Hi! I'm your AI Copilot. I'm here to help you build better dashboards. I notice you have some charts in your canvas - would you like me to analyze their effectiveness?",
      timestamp: new Date(),
    },
  ]);

  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: "1",
      type: "optimization",
      title: "Improve Chart Hierarchy",
      description:
        "Your KPI cards could be more prominent. Consider moving them to the top-left for better visual hierarchy.",
      action: "Auto-arrange layout",
      priority: "medium",
    },
    {
      id: "2",
      type: "insight",
      title: "Data Relationship Opportunity",
      description:
        "Your revenue chart and customer segments could be connected with a filter relationship.",
      action: "Add cross-filtering",
      priority: "high",
    },
    {
      id: "3",
      type: "best-practice",
      title: "Color Consistency",
      description:
        "Using consistent color schemes across charts improves readability by 23%.",
      action: "Apply brand colors",
      priority: "low",
    },
  ]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    const copilotResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: "copilot",
      content: getCopilotResponse(input),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, copilotResponse]);
    setInput("");
  };

  const getCopilotResponse = (userInput: string): string => {
    const responses = [
      "I can help you optimize that chart layout. Based on best practices, I recommend using a 12-column grid system for better responsiveness.",
      "Great question! For better user engagement, consider adding interactive filters that connect your charts. This increases dashboard usage by 40%.",
      "I notice you're working with revenue data. Would you like me to suggest some advanced analytics widgets like trend indicators or forecast models?",
      "For better performance, I recommend implementing lazy loading for charts below the fold. This can improve load times by 60%.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const applySuggestion = (suggestionId: string) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId));
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "insight":
        return TrendingUp;
      case "optimization":
        return Zap;
      case "best-practice":
        return Lightbulb;
      case "error":
        return AlertTriangle;
      default:
        return Target;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "low":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="bg-dashboard-background border-r border-dashboard-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-dashboard-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-dashboard-accent rounded-lg">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-dashboard-text">AI Copilot</h3>
            <p className="text-xs text-dashboard-text-muted">
              Always here to help
            </p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full ml-auto">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400">Active</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-dashboard-surface rounded-lg p-1">
          <Button
            variant={activeTab === "suggestions" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("suggestions")}
            className={
              activeTab === "suggestions"
                ? "bg-dashboard-accent text-white"
                : "text-dashboard-text hover:bg-dashboard-muted"
            }
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Suggestions ({suggestions.length})
          </Button>
          <Button
            variant={activeTab === "chat" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("chat")}
            className={
              activeTab === "chat"
                ? "bg-dashboard-accent text-white"
                : "text-dashboard-text hover:bg-dashboard-muted"
            }
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Chat
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === "suggestions" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {suggestions.length === 0 ? (
              <div className="text-center py-8">
                <Lightbulb className="w-8 h-8 text-dashboard-text-muted mx-auto mb-2" />
                <p className="text-dashboard-text-muted text-sm">
                  Great job! No suggestions right now. Keep building your
                  dashboard.
                </p>
              </div>
            ) : (
              suggestions.map((suggestion) => {
                const Icon = getSuggestionIcon(suggestion.type);
                return (
                  <div
                    key={suggestion.id}
                    className="p-3 bg-dashboard-surface border border-dashboard-border rounded-lg hover:border-dashboard-accent transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-dashboard-muted rounded-lg">
                        <Icon className="w-4 h-4 text-dashboard-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-dashboard-text text-sm">
                            {suggestion.title}
                          </h4>
                          <Badge
                            className={`text-xs ${getPriorityColor(suggestion.priority)}`}
                          >
                            {suggestion.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-dashboard-text-muted mb-2">
                          {suggestion.description}
                        </p>
                        {suggestion.action && (
                          <Button
                            size="sm"
                            onClick={() => applySuggestion(suggestion.id)}
                            className="h-6 px-2 text-xs bg-dashboard-accent hover:bg-dashboard-accent-light text-white"
                          >
                            {suggestion.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === "chat" && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "copilot" && (
                    <div className="p-1 bg-dashboard-accent rounded-full mt-1">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-xs ${
                      message.type === "user"
                        ? "bg-dashboard-accent text-white"
                        : "bg-dashboard-surface text-dashboard-text border border-dashboard-border"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-dashboard-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about your dashboard..."
                  className="flex-1 bg-dashboard-surface border-dashboard-border text-dashboard-text text-xs"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-dashboard-accent hover:bg-dashboard-accent-light"
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
