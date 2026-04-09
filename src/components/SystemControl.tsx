"use client";

import { Play, Square, RotateCcw, Boxes } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const containers = [
  { name: "nextcloud-app", status: "running", port: "8080" },
  { name: "mailcow-dockerized", status: "running", port: "443" },
  { name: "wireguard-server", status: "running", port: "51820" },
  { name: "nginx-proxy", status: "stopped", port: "80" },
];

export default function SystemControl() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = (container: string) => {
    setLoading(container);
    setTimeout(() => setLoading(null), 1500);
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Boxes size={20} className="text-primary" />
        <h3 className="text-lg font-semibold">System Control</h3>
      </div>

      <div className="space-y-3">
        {containers.map((container) => (
          <div key={container.name} className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-2 h-2 rounded-full",
                container.status === "running" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-destructive"
              )} />
              <div>
                <p className="text-sm font-medium">{container.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Port: {container.port}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleAction(container.name)}
                disabled={loading === container.name}
                className="p-1.5 rounded-lg hover:bg-primary/20 text-primary transition-all disabled:opacity-50"
                title="Restart"
              >
                <RotateCcw size={16} className={cn(loading === container.name && "animate-spin")} />
              </button>
              <button 
                className={cn(
                  "p-1.5 rounded-lg transition-all",
                  container.status === "running" ? "hover:bg-destructive/20 text-destructive" : "hover:bg-green-500/20 text-green-500"
                )}
                title={container.status === "running" ? "Stop" : "Start"}
              >
                {container.status === "running" ? <Square size={16} /> : <Play size={16} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
