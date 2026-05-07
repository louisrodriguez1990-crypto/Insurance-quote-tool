import type { Metadata } from "next";
import { PseoLifeInsurancePage } from "@/components/PseoLifeInsurancePage";
import { getStateBySlug, launchStates } from "@/lib/lifeInsurance";

export async function generateStaticParams() {
  return launchStates.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const state = getStateBySlug(params.state);
  if (!state) return {};

  return {
    title: `Guaranteed Issue Final Expense Insurance in ${state.name}`,
    description: `Estimate guaranteed issue final expense coverage in ${state.name} using local funeral, cremation, and estate-cost assumptions.`,
    alternates: { canonical: `/guaranteed-issue-final-expense/${state.slug}` },
  };
}

export default function Page({ params }: { params: { state: string } }) {
  return <PseoLifeInsurancePage stateSlug={params.state} intent="final-expense" />;
}
