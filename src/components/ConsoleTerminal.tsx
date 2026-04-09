"use client";

import { Terminal as TerminalIcon, Maximize2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";

const mockLogs = [
  "[SYSTEM] Starting Nginx configuration check...",
  "[SYSTEM] Config check passed. Reloading Nginx.",
  "[DOCKER] Container 'nextcloud-app' started on port 8080.",
  "[AUTH] Successful login for user 'admin' from 192.168.1.15",
  "[MAIL] Delivered 12 emails to local queue.",
  "[VPN] WireGuard handshake successful: client-01",
  "[WARN] Disk usage exceeds 70% threshold.",
  "[SYSTEM] Cleaned up 420MB of cache files.",
];

export default function ConsoleTerminal() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setLogs(mockLogs);
    const interval = setInterval(() => {
        setLogs(prev => [...prev.slice(-14), mockLogs[Math.floor(Math.random() * mockLogs.length)]]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-[400px]">
      <div className="bg-secondary/50 px-4 py-2 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-primary" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">Live System Logs</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
        </div>
      </div>
      
      <div className="flex-1 p-4 font-mono text-[11px] leading-relaxed overflow-y-auto bg-black/40 scrollbar-hide">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-4 group">
            <span className="text-muted-foreground/30 select-none">{i + 1}</span>
            <span className={cn(
                "whitespace-pre-wrap",
                log.includes("[WARN]") ? "text-amber-400" : 
                log.includes("[SYSTEM]") ? "text-primary" : "text-emerald-400"
            )}>
                {log}
            </span>
          </div>
        ))}
        <div className="animate-pulse inline-block w-2 h-4 bg-primary ml-1 align-middle" />
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
