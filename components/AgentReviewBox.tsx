import { ShieldCheckIcon } from "@heroicons/react/24/outline";

interface Agent {
  name: string;
  npn: string;
  residentState: string;
  licensedStates: string[];
  registries: Record<string, string>;
  licenses?: Record<
    string,
    {
      licenseNumber: string | null;
      status: string;
      authority?: string;
      registryDetailUrl?: string;
    }
  >;
}

export function AgentReviewBox({ agent }: { agent: Agent }) {
  return (
    <section className="my-6 border border-brand-200 bg-brand-50 rounded-xl p-4 md:p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-brand-200">
          <ShieldCheckIcon className="w-5 h-5 text-brand-700" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-brand-900">
            Educational data and workflow reviewed by a licensed life insurance agent.
          </p>
          <p className="text-sm text-brand-800 mt-1">
            Licensing details are available for verification before a formal application is submitted.
          </p>

          <details className="mt-3 group">
            <summary className="cursor-pointer text-sm font-bold text-brand-700 hover:text-brand-900">
              Verify licensing
            </summary>
            <div className="mt-3 rounded-lg bg-white border border-brand-100 p-4">
              <p className="text-sm text-neutral-700">
                {agent.name}, NPN {agent.npn}. Resident state: {agent.residentState}.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 mt-3">
                {agent.licensedStates.map((state) => {
                  const license = agent.licenses?.[state];
                  return (
                    <a
                      key={state}
                      href={license?.registryDetailUrl || agent.registries[state]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 hover:border-brand-700"
                    >
                      <span className="block text-brand-700">{state}</span>
                      <span className="block mt-0.5">
                        {license?.licenseNumber || "Public lookup"} - {license?.status || "Registry"}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
