import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const aqiColorVariants = cva("flex h-full items-center justify-center rounded-full text-white font-medium", {
  variants: {
    level: {
      1: "bg-green-500", // Good
      2: "bg-lime-500", // Fair
      3: "bg-yellow-500", // Moderate
      4: "bg-orange-500", // Poor
      5: "bg-red-500", // Very Poor
      unknown: "bg-gray-500",
    },
    size: {
      sm: "h-8 w-8 text-xs",
      md: "h-12 w-12 text-sm",
      lg: "h-16 w-16 text-lg",
    },
  },
  defaultVariants: {
    level: "unknown",
    size: "md",
  },
});

const aqiLabels = {
  1: "Good",
  2: "Fair",
  3: "Moderate",
  4: "Poor",
  5: "Very Poor",
  unknown: "Unknown",
};

export function AQIIndicator({ 
  aqi, 
  size = "md", 
  className,
  showLabel = false
}) {
  const level = aqi && aqi >= 1 && aqi <= 5 ? aqi : "unknown";
  const label = aqiLabels[level];
  
  return (
    <div className="flex flex-col items-center">
      <div className={cn(aqiColorVariants({ level, size }), className)}>
        {level !== "unknown" ? aqi : "?"}
      </div>
      {showLabel && (
        <span className="mt-1 text-xs text-muted-foreground">{label}</span>
      )}
    </div>
  );
}