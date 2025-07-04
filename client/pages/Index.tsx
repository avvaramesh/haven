import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AIGeneratorTrigger from "@/components/dashboard/AIGeneratorTrigger";

export default function Index() {
  return (
    <>
      <DashboardLayout />
      {/* Floating AI Chart Generator - Always accessible */}
      <AIGeneratorTrigger />
    </>
  );
}
