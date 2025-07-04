import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  Send,
  Wand2,
  Sparkles,
  TrendingUp,
  BarChart3,
  PieChart,
  Package,
  Users,
  DollarSign,
  Zap,
  Lightbulb,
  Target,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  MessageSquare,
  ChartBar,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "copilot";
  content: string;
  timestamp: Date;
}

interface Suggestion {
  id: string;
  type: "optimization" | "insight" | "best-practice" | "data-quality";
  title: string;
  description: string;
  action: string;
  priority: "high" | "medium" | "low";
}

interface ChartSuggestion {
  id: string;
  type: "line" | "bar" | "pie" | "area" | "kpi" | "table";
  title: string;
  description: string;
  dataSource: string;
  confidence: number;
  icon: any;
  reasoning: string;
}

export default function AIAssistantUnified() {
  const [activeTab, setActiveTab] = useState<"chat" | "generate" | "insights">(
    "insights",
  );

  // Chat functionality
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "copilot",
      content:
        "👋 Hi! I'm your AI Assistant. I can help you analyze your dashboard, generate new charts, and provide optimization suggestions. What would you like to work on?",
      timestamp: new Date(),
    },
  ]);

  // Chart generation functionality
  const [generateQuery, setGenerateQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [chartSuggestions, setChartSuggestions] = useState<ChartSuggestion[]>(
    [],
  );
  const [generationStep, setGenerationStep] = useState<
    "input" | "generating" | "results"
  >("input");

  // Insights functionality
  const [insights, setInsights] = useState<Suggestion[]>([
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
        "Use consistent color schemes across all charts for better visual coherence.",
      action: "Apply theme colors",
      priority: "low",
    },
    {
      id: "4",
      type: "data-quality",
      title: "Missing Data Labels",
      description:
        "Some charts lack proper data labels which reduces readability.",
      action: "Add data labels",
      priority: "medium",
    },
  ]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: chatInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "copilot",
        content: getAIResponse(chatInput),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("chart") || lowerInput.includes("visualization")) {
      return "I can help you create the perfect chart! Try the 'Generate' tab where you can describe what you want to visualize, and I'll suggest the best chart types for your data.";
    }
    if (lowerInput.includes("color") || lowerInput.includes("style")) {
      return "For better visual consistency, I recommend using your dashboard's accent color (#3b82f6) as the primary color and keeping backgrounds neutral. Would you like me to apply this theme to all charts?";
    }
    if (lowerInput.includes("layout") || lowerInput.includes("arrange")) {
      return "I notice your KPI cards could be more prominent. Try arranging them in a row at the top, followed by your main charts below. This creates better visual hierarchy.";
    }
    return "I understand you're looking for help with your dashboard. I can assist with chart creation, layout optimization, color schemes, and data visualization best practices. What specific area would you like to improve?";
  };

  const generateCharts = async () => {
    if (!generateQuery.trim()) return;

    setGenerationStep("generating");
    setIsGenerating(true);

    // Simulate AI analysis
    setTimeout(() => {
      const newSuggestions: ChartSuggestion[] = [
        {
          id: "1",
          type: "line",
          title: "Revenue Trend Analysis",
          description: "Monthly revenue progression with seasonal patterns",
          dataSource: "Sales Database",
          confidence: 94,
          icon: TrendingUp,
          reasoning: "Time-series data shows clear trends and seasonality",
        },
        {
          id: "2",
          type: "bar",
          title: "Product Performance Comparison",
          description: "Top 10 products by revenue and units sold",
          dataSource: "Product Analytics",
          confidence: 89,
          icon: Package,
          reasoning: "Categorical comparison works best with bar charts",
        },
        {
          id: "3",
          type: "pie",
          title: "Customer Segment Distribution",
          description: "Market share by customer demographic",
          dataSource: "Customer Database",
          confidence: 85,
          icon: Users,
          reasoning: "Part-to-whole relationships are ideal for pie charts",
        },
      ];

      setChartSuggestions(newSuggestions);
      setGenerationStep("results");
      setIsGenerating(false);
    }, 2000);
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      default:
        return <Lightbulb className="w-4 h-4 text-dashboard-accent" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "optimization":
        return <Target className="w-4 h-4 text-blue-400" />;
      case "insight":
        return <Lightbulb className="w-4 h-4 text-purple-400" />;
      case "best-practice":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "data-quality":
        return <AlertCircle className="w-4 h-4 text-orange-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-dashboard-accent" />;
    }
  };

  return (
    <div className="bg-dashboard-background border-r border-dashboard-border h-full flex flex-col">
      <div className="p-4 border-b border-dashboard-border">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-5 h-5 text-dashboard-accent" />
          <h3 className="font-semibold text-dashboard-text">AI Assistant</h3>
          <Badge className="bg-dashboard-accent/20 text-dashboard-accent text-xs">
            Powered by GPT
          </Badge>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as any)}
        className="flex-1 flex flex-col"
      >
        <TabsList className="mx-4 mt-4 bg-dashboard-surface border border-dashboard-border">
          <TabsTrigger
            value="insights"
            className="flex items-center gap-2 text-xs"
          >
            <Sparkles className="w-3 h-3" />
            Insights
          </TabsTrigger>
          <TabsTrigger
            value="generate"
            className="flex items-center gap-2 text-xs"
          >
            <ChartBar className="w-3 h-3" />
            Generate
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2 text-xs">
            <MessageSquare className="w-3 h-3" />
            Chat
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="insights" className="h-full m-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-3">
                {insights.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-3 bg-dashboard-surface border border-dashboard-border rounded-lg hover:border-dashboard-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(suggestion.type)}
                        <h4 className="font-medium text-dashboard-text text-sm">
                          {suggestion.title}
                        </h4>
                      </div>
                      {getPriorityIcon(suggestion.priority)}
                    </div>
                    <p className="text-xs text-dashboard-text-muted mb-3">
                      {suggestion.description}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs text-dashboard-accent hover:bg-dashboard-accent/20 w-full"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      {suggestion.action}
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="generate" className="h-full m-0">
            <div className="h-full flex flex-col">
              {generationStep === "input" && (
                <div className="flex-1 p-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-dashboard-text mb-2">
                      Describe what you want to visualize
                    </h4>
                    <Textarea
                      value={generateQuery}
                      onChange={(e) => setGenerateQuery(e.target.value)}
                      placeholder="e.g., Show monthly sales trends for the last year, Compare product performance across regions, Display customer satisfaction scores..."
                      className="bg-dashboard-surface border-dashboard-border text-dashboard-text min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-dashboard-text">
                      Quick Suggestions:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Revenue trends",
                        "Product comparison",
                        "Customer segments",
                        "KPI metrics",
                      ].map((suggestion) => (
                        <Button
                          key={suggestion}
                          variant="outline"
                          size="sm"
                          onClick={() => setGenerateQuery(suggestion)}
                          className="h-6 px-2 text-xs border-dashboard-border text-dashboard-text hover:bg-dashboard-muted"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={generateCharts}
                    disabled={!generateQuery.trim()}
                    className="w-full bg-dashboard-accent hover:bg-dashboard-accent-light text-white"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Chart Suggestions
                  </Button>
                </div>
              )}

              {generationStep === "generating" && (
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-dashboard-accent border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-sm text-dashboard-text-muted">
                      Analyzing your data and generating suggestions...
                    </p>
                  </div>
                </div>
              )}

              {generationStep === "results" && (
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-dashboard-text">
                        Chart Suggestions
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setGenerationStep("input")}
                        className="text-dashboard-text-muted hover:text-dashboard-text"
                      >
                        New Query
                      </Button>
                    </div>

                    {chartSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="p-3 bg-dashboard-surface border border-dashboard-border rounded-lg hover:border-dashboard-accent/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-dashboard-muted rounded-lg">
                            <suggestion.icon className="w-4 h-4 text-dashboard-accent" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-dashboard-text text-sm truncate">
                                {suggestion.title}
                              </h4>
                              <Badge variant="secondary" className="text-xs">
                                {suggestion.confidence}% match
                              </Badge>
                            </div>
                            <p className="text-xs text-dashboard-text-muted mb-2">
                              {suggestion.description}
                            </p>
                            <p className="text-xs text-dashboard-text-muted italic mb-3">
                              {suggestion.reasoning}
                            </p>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-xs text-dashboard-accent hover:bg-dashboard-accent/20 w-full"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add to Canvas
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="h-full m-0">
            <div className="h-full flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.type === "copilot" && (
                        <div className="p-1.5 bg-dashboard-accent rounded-full">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.type === "user"
                            ? "bg-dashboard-accent text-white"
                            : "bg-dashboard-surface border border-dashboard-border text-dashboard-text"
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.type === "user" && (
                        <div className="p-1.5 bg-dashboard-muted rounded-full">
                          <Users className="w-3 h-3 text-dashboard-text" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-dashboard-border">
                <div className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me anything about your dashboard..."
                    className="bg-dashboard-surface border-dashboard-border text-dashboard-text"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!chatInput.trim()}
                    size="sm"
                    className="bg-dashboard-accent hover:bg-dashboard-accent-light text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
