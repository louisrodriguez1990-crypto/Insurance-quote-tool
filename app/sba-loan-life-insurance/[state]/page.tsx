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
    title: `SBA Loan Life Insurance in ${state.name}: Coverage Calculator`,
    description: `Calculate SBA loan life insurance coverage in ${state.name} using local income, debt, and underwriting context.`,
    alternates: { canonical: `/sba-loan-life-insurance/${state.slug}` },
  };
}

export default function Page({ params }: { params: { state: string } }) {
  return <PseoLifeInsurancePage stateSlug={params.state} intent="sba-loan" />;
}
