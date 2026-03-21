import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  label?: string;
}

function Progress({ value, max = 100, className, label }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-warm-700">{label}</span>
          <span className="text-sm text-warm-500">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className="h-2 w-full rounded-full bg-warm-200"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || "Progress"}
      >
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export { Progress, type ProgressProps };
