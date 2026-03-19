import SafariPlannerChat from "@/components/ai/SafariPlannerChat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Safari Planner",
  description: "Tell Engai your travel dates, budget and interests. Get a personalised Kenya safari recommendation in minutes.",
};

export default function PlanMySafariPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🤖🦁</div>
        <h1 className="font-display text-4xl font-bold mb-3">AI Safari Planner</h1>
        <p className="text-gray-600 text-lg">
          Chat with Engai — our AI safari planner. Tell it your dates, group size, budget and interests.
          It will recommend the perfect Kenya safari from our catalogue.
        </p>
      </div>
      <SafariPlannerChat />
    </div>
  );
}
