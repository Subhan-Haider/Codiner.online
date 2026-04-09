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
    const fetchLogs = async () => {
        try {
            const res = await fetch("/api/system");
            const data = await res.json();
            if (data.logs && data.logs.length > 0) {
                setLogs(data.logs);
            }
        } catch {}
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-[400px] border border-border shadow-2xl">
      <div className="bg-secondary/80 px-4 py-3 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-primary" />
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-foreground">Live System Logs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <div className="w-3 h-3 rounded-full bg-destructive" />
        </div>
      </div>
      
      <div className="flex-1 p-6 font-mono text-[11px] leading-6 overflow-y-auto bg-[#f8f8f8] dark:bg-[#0a0a0c] text-slate-600 dark:text-slate-300 scrollbar-hide border-t border-border">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-4 group">
            <span className="text-slate-700 select-none w-4 text-right">{i + 1}</span>
            <span className={cn(
                "whitespace-pre-wrap flex-1",
                log.includes("[WARN]") ? "text-amber-600 dark:text-amber-400 font-bold" : 
                log.includes("[SYSTEM]") ? "text-blue-600 dark:text-blue-400" : 
                log.includes("[AUTH]") ? "text-emerald-600 dark:text-emerald-400" : 
                log.includes("[DOCKER]") ? "text-purple-600 dark:text-purple-400" : "text-slate-600 dark:text-slate-300"
            )}>
                {log}
            </span>
          </div>
        ))}
        <div className="flex gap-4">
            <span className="text-slate-700 select-none w-4 text-right">{logs.length + 1}</span>
            <div className="animate-pulse inline-block w-2 h-4 bg-primary align-middle" />
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
