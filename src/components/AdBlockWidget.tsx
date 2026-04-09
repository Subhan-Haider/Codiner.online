"use client";

import { ShieldCheck, Info, BarChart3 } from "lucide-react";

interface AdBlockWidgetProps {
  data?: {
    blocked: number;
    percent: number;
    gravity: number;
    status: string;
    isReal: boolean;
  }
}

export default function AdBlockWidget({ data }: AdBlockWidgetProps) {
  return (
    <div className="glass-card p-6 rounded-[2rem] border border-emerald-500/20 relative overflow-hidden">
      {/* Background Icon */}
      <ShieldCheck className="absolute -right-4 -bottom-4 text-emerald-500/5 rotate-12" size={140} />
      
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">Pi-hole Defense</h3>
                <div className="flex items-center gap-2">
                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{data?.status || "active"}</p>
                    {!data?.isReal && (
                        <a href="/settings" className="text-[9px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/20 hover:bg-amber-500 hover:text-white transition-all">
                            Not Synced
                        </a>
                    )}
                </div>
              </div>
          </div>
          <div className="text-right">
             <p className="text-sm font-bold text-muted-foreground">Gravity</p>
             <p className="text-xl font-black text-emerald-500">{(data?.gravity || 0).toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/30 rounded-2xl border border-border">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                    <BarChart3 size={12} />
                    Blocked Today
                </p>
                <p className="text-2xl font-bold italic">{(data?.blocked || 0).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-2xl border border-border">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                    <Info size={12} />
                    Block Rate
                </p>
                <p className="text-2xl font-bold italic">{data?.percent || 0}%</p>
            </div>
        </div>

        <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest">
            Disable Protection
        </button>
      </div>
    </div>
  );
}
