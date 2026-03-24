import PlanContent from "./PlanContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Safari Planner",
  description: "Tell Engai your travel dates, budget and interests. Get a personalised Kenya safari recommendation in minutes.",
  alternates: { canonical: "https://www.engaisafaris.com/plan-my-safari" },
};

export default function PlanMySafariPage() {
  return <PlanContent />;
}
