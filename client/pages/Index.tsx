import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AIGeneratorTrigger from "@/components/dashboard/AIGeneratorTrigger";
import AICopilot from "@/components/dashboard/AICopilot";

export default function Index() {
  return (
    <>
      <DashboardLayout />
      {/* Floating AI Chart Generator - Always accessible */}
      <AIGeneratorTrigger />
      {/* AI Copilot - Persistent assistant */}
      <AICopilot />
    </>
  );
}
