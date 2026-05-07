import type { Metadata } from "next";
import { PseoLifeInsurancePage } from "@/components/PseoLifeInsurancePage";
import { getStateBySlug, launchStates } from "@/lib/lifeInsurance";

export async function generateStaticParams() {
  return launchStates.flatMap((state) => [
    { state: state.slug, loanAmount: String(state.avgMortgageBalance) },
    { state: state.slug, loanAmount: "300000" },
    { state: state.slug, loanAmount: "500000" },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: { state: string; loanAmount: string };
}): Promise<Metadata> {
  const state = getStateBySlug(params.state);
  if (!state) return {};
  const loanAmount = Number(params.loanAmount);

  return {
    title: `Mortgage Protection in ${state.name} for $${loanAmount.toLocaleString()} Loans`,
    description: `Calculate mortgage protection life insurance in ${state.name} for a $${loanAmount.toLocaleString()} mortgage using local cost assumptions.`,
    alternates: { canonical: `/mortgage-protection/${state.slug}/${params.loanAmount}` },
  };
}

export default function Page({ params }: { params: { state: string; loanAmount: string } }) {
  const loanAmount = Number(params.loanAmount);
  return <PseoLifeInsurancePage stateSlug={params.state} intent="mortgage" loanAmount={Number.isFinite(loanAmount) ? loanAmount : undefined} />;
}
