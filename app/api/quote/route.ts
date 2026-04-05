import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { age, gender, smoker, health, coverageAmount, productType } = body;

  // Rate calculation
  const base = coverageAmount / 1000 * 0.05;
  const ageMultiplier = age < 30 ? 1.0 : age < 40 ? 1.4 : age < 50 ? 2.1 : age < 60 ? 3.5 : 5.2;
  const smokerMultiplier = smoker ? 2.5 : 1.0;
  const genderMultiplier = gender === "Male" ? 1.15 : 1.0;
  const healthMultiplier = health === "Excellent" ? 0.85 : health === "Good" ? 1.0 : health === "Average" ? 1.25 : 1.6;

  const monthlyBase = base * ageMultiplier * smokerMultiplier * genderMultiplier * healthMultiplier;

  return NextResponse.json({
    quotes: [
      {
        tier: "Basic",
        monthly: Math.round(monthlyBase * 0.85 * 100) / 100,
        features: ["Death benefit", "Renewable", "Convertible option"],
      },
      {
        tier: "Standard",
        monthly: Math.round(monthlyBase * 100) / 100,
        features: ["Death benefit", "Renewable", "Convertible option", "Waiver of premium", "Living benefits"],
      },
      {
        tier: "Premium",
        monthly: Math.round(monthlyBase * 1.3 * 100) / 100,
        features: ["Death benefit", "Renewable", "Convertible option", "Waiver of premium", "Living benefits", "Accelerated death benefit", "Child rider"],
      },
    ],
  });
}
