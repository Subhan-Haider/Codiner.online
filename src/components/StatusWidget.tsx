"use client";

import { motion } from "framer-motion";

interface StatusWidgetProps {
  label: string;
  value: number | string;
  unit?: string;
  progress?: number;
  color?: string;
}

export default function StatusWidget({ label, value, unit, progress, color = "bg-primary" }: StatusWidgetProps) {
  return (
    <div className="glass-card p-5 rounded-2xl flex flex-col gap-3">
      <div className="flex justify-between items-end">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{label}</span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{value}</span>
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        </div>
      </div>
      
      {progress !== undefined && (
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn("h-full", color)}
          />
        </div>
      )}
    </div>
  );
}

// Internal helper for Tailwind merge if needed
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
