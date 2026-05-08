import type { Metadata } from "next";
import { AgentReviewBox } from "@/components/AgentReviewBox";
import { GuidedNeedsWorkflow } from "@/components/GuidedNeedsWorkflow";
import { agentData, launchStates } from "@/lib/lifeInsurance";

export const metadata: Metadata = {
  title: "Life Insurance Coverage Workflow",
  description:
    "A guided life insurance workflow that estimates coverage and price range before handing off to a licensed agent.",
};

export default function HomePage() {
  return (
    <div className="bg-neutral-50">
      <section className="bg-brand-900 text-white px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-200 mb-4">
            Licensed &amp; reviewed · FL · TX · CA · NC · SC
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            See your life insurance range before talking to anyone.
          </h1>
          <p className="text-lg text-brand-200 mt-5 max-w-2xl">
            4 questions. No email required until you see your number. Reviewed by a licensed agent.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <GuidedNeedsWorkflow state={launchStates[0]} intent="sba-loan" neutralStart />
        <AgentReviewBox agent={agentData} />
      </main>
    </div>
  );
}
