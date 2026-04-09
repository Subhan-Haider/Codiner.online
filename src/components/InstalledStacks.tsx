"use client";

import { Box, Play, Square, RefreshCcw } from "lucide-react";

interface InstalledStacksProps {
  apps?: {
    name: string;
    status: string;
    cpu: string;
    mem: string;
  }[]
}

export default function InstalledStacks({ apps = [] }: InstalledStacksProps) {
  return (
    <div className="glass-card p-6 rounded-[2rem] border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
            <Box className="text-primary" size={20} />
            Installed Stacks
        </h3>
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md font-bold uppercase tracking-widest">
            {apps.length} Containers
        </span>
      </div>

      <div className="space-y-4">
        {apps.map((app) => (
          <div key={app.name} className="flex items-center justify-between p-4 bg-secondary/20 rounded-2xl border border-border group hover:bg-secondary/40 transition-all">
            <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${app.status === 'Running' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-destructive'}`} />
                <div>
                    <p className="font-bold text-sm tracking-tight">{app.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                        CPU: {app.cpu} • RAM: {app.mem}
                    </p>
                </div>
            </div>
            
            <div className="flex gap-2">
                {app.status === 'Running' ? (
                    <button className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all">
                        <Square size={14} fill="currentColor" />
                    </button>
                ) : (
                    <button className="p-2 hover:bg-emerald-500/10 hover:text-emerald-500 rounded-lg transition-all">
                        <Play size={14} fill="currentColor" />
                    </button>
                )}
                <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all">
                    <RefreshCcw size={14} />
                </button>
            </div>
          </div>
        ))}

        {apps.length === 0 && (
            <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No marketplace apps installed yet.</p>
            </div>
        )}
      </div>
    </div>
  );
}
