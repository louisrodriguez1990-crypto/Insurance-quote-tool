"use client";

import { useEffect, useState } from "react";
import { CalendarDaysIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { emitConversionEvent } from "@/lib/conversionEvents";

const fallbackCalUrl = "https://cal.com/bestquote/life-insurance-review";

export function BookingCTA() {
  const [open, setOpen] = useState(false);
  const calUrl = process.env.NEXT_PUBLIC_CAL_URL || fallbackCalUrl;

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const raw = event.data;
      const serialized = typeof raw === "string" ? raw : JSON.stringify(raw);
      if (serialized.includes("bookingSuccessfulV2")) {
        emitConversionEvent("booking_completed", { source: "cal_embed" });
      }
    }

    window.addEventListener("message", handleMessage);
    if (window.Cal) {
      window.Cal("on", {
        action: "bookingSuccessfulV2",
        callback: () => emitConversionEvent("booking_completed", { source: "cal_embed" }),
      });
    }

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  function openBooking() {
    emitConversionEvent("booking_opened", { source: "workflow" });
    setOpen(true);
  }

  return (
    <section className="my-7 bg-brand-900 text-white rounded-xl p-6 md:p-8">
      <div className="grid md:grid-cols-[1fr_auto] gap-6 md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Ready to get the exact number?</h2>
          <p className="text-brand-200 mt-2 max-w-2xl">
            Book a 10-minute call with a licensed agent to verify your health class and submit your formal carrier application.
          </p>
        </div>
        <button
          type="button"
          onClick={openBooking}
          className="inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-white font-bold px-6 py-3 rounded-lg transition-colors"
        >
          <CalendarDaysIcon className="w-5 h-5" />
          Book 10 Minutes
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] bg-black/60 p-4 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-4xl h-[80vh] shadow-2xl overflow-hidden">
            <div className="h-12 border-b border-neutral-200 flex items-center justify-between px-4">
              <p className="text-sm font-semibold text-neutral-900">Schedule with BestQuote</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-900"
                aria-label="Close booking modal"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <iframe src={calUrl} title="Book a life insurance review" className="w-full h-[calc(80vh-3rem)]" />
          </div>
        </div>
      )}
    </section>
  );
}
