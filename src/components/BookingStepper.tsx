import { Check } from "lucide-react";

interface BookingStepperProps {
  steps: string[];
  currentStep: number;
}

export default function BookingStepper({ steps, currentStep }: BookingStepperProps) {
  return (
    <ol className="flex items-center gap-2 sm:gap-4">
      {steps.map((step, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        return (
          <li key={step} className="flex flex-1 items-center gap-2 sm:gap-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                isDone
                  ? "bg-brand-blue text-white"
                  : isActive
                  ? "border-2 border-brand-blue text-brand-blue"
                  : "border-2 border-slate-200 text-slate-400"
              }`}
            >
              {isDone ? <Check size={16} /> : stepNum}
            </span>
            <span className={`hidden text-sm font-medium sm:block ${isActive || isDone ? "text-ink" : "text-slate-400"}`}>
              {step}
            </span>
            {stepNum !== steps.length && (
              <span className={`h-px flex-1 ${isDone ? "bg-brand-blue" : "bg-slate-200"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
