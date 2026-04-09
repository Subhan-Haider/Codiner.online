"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  name: string;
  url: string;
  icon: LucideIcon;
  status: "online" | "offline";
}

export default function ServiceCard({ name, url, icon: Icon, status }: ServiceCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      className="glass-card group relative p-6 rounded-2xl flex flex-col items-center justify-center gap-4 text-center"
    >
      <div className={cn(
        "p-4 rounded-xl transition-colors",
        status === "online" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
      )}>
        <Icon size={32} />
      </div>

      <div>
        <h3 className="text-lg font-semibold gradient-text">{name}</h3>
        <p className="text-xs text-muted-foreground">{url.replace("https://", "")}</p>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className={cn(
          "w-2 h-2 rounded-full",
          status === "online" ? "bg-green-500 animate-pulse" : "bg-destructive"
        )} />
        <span className="text-[10px] uppercase tracking-wider font-bold opacity-70">
          {status}
        </span>
      </div>
    </motion.a>
  );
}
