"use client";

import { Globe, ShieldCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const domains = [
  { host: "codiner.online", status: "secure", expiry: "240 days" },
  { host: "apps.codiner.online", status: "secure", expiry: "85 days" },
  { host: "drive.codiner.online", status: "warning", expiry: "3 days" },
  { host: "vpn.codiner.online", status: "secure", expiry: "120 days" },
];

export default function DomainStatus() {
  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Globe size={20} className="text-primary" />
        <h3 className="text-lg font-semibold">Domain & SSL</h3>
      </div>

      <div className="space-y-4">
        {domains.map((domain) => (
          <div key={domain.host} className="flex items-center justify-between p-3 bg-secondary/20 rounded-xl hover:bg-secondary/40 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                domain.status === "secure" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
              )}>
                {domain.status === "secure" ? <ShieldCheck size={18} /> : <AlertCircle size={18} />}
              </div>
              <div>
                <p className="text-sm font-bold group-hover:text-primary transition-colors">{domain.host}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Expires in {domain.expiry}</p>
              </div>
            </div>
            
            <span className={cn(
                "px-2 py-1 rounded text-[10px] font-bold uppercase",
                domain.status === "secure" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
            )}>
                {domain.status}
            </span>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2.5 text-xs font-bold bg-secondary hover:bg-secondary/80 rounded-xl border border-border transition-all">
        Renew All Certificates
      </button>
    </div>
  );
}
