import {
  LockClosedIcon,
  ShieldCheckIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

type TrustBadgeVariant = "privacy" | "ambest" | "licensed" | "noobligation";

const content: Record<TrustBadgeVariant, { Icon: React.ComponentType<{ className?: string }>; text: string }> = {
  privacy: {
    Icon: LockClosedIcon,
    text: "Your information is encrypted and never sold. Used only to generate your rates.",
  },
  ambest: {
    Icon: ShieldCheckIcon,
    text: "All quotes from carriers rated A or better by AM Best.",
  },
  licensed: {
    Icon: UserIcon,
    text: "Licensed insurance advisors available to answer questions at no charge.",
  },
  noobligation: {
    Icon: XCircleIcon,
    text: "No commitment required. See rates with no obligation to purchase.",
  },
};

export function TrustBadge({ variant = "privacy" }: { variant?: TrustBadgeVariant }) {
  const { Icon, text } = content[variant];
  return (
    <div className="flex items-start gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3">
      <Icon className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-neutral-600">{text}</p>
    </div>
  );
}
