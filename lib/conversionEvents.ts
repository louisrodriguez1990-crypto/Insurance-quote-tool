export type ConversionEventName =
  | "workflow_started"
  | "workflow_step_viewed"
  | "workflow_step_completed"
  | "coverage_result_viewed"
  | "booking_opened"
  | "booking_completed";

export type ConversionEventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    Cal?: (...args: unknown[]) => void;
  }
}

export function emitConversionEvent(name: ConversionEventName, payload: ConversionEventPayload = {}) {
  if (typeof window === "undefined") return;

  const detail = {
    event: name,
    ...payload,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer?.push(detail);
  window.dispatchEvent(new CustomEvent("bestquote:event", { detail }));
}
