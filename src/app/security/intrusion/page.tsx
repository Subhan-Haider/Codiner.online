"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Globe, Crosshair, Ban, Trash2, RefreshCw } from "lucide-react";
import { useState } from "react";

const threats = [
  { ip: "185.220.101.42", country: "Russia", attempts: 154, type: "Brute Force", status: "Banned" },
  { ip: "91.241.19.10", country: "Ukraine", attempts: 12, type: "SSH Probe", status: "Monitoring" },
  { ip: "45.155.205.233", country: "China", attempts: 89, type: "Wordpress Exploit", status: "Banned" },
  { ip: "194.26.135.114", country: "Netherlands", attempts: 5, type: "Port Scan", status: "Monitoring" },
];

export default function IntrusionDetectionPage() {
  const [isBanning, setIsBanning] = useState(false);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight gradient-text">Intrusion Detection</h1>
          <p className="text-muted-foreground mt-1">Real-time threat monitoring and automated IP blacklisting.</p>
        </div>
        <button className="px-6 py-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl font-bold flex items-center gap-2 hover:bg-destructive hover:text-white transition-all">
            <Ban size={18} />
            Flush All Bans
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="glass-card rounded-[2.5rem] overflow-hidden border border-border">
                <div className="bg-secondary/30 p-6 border-b border-border flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2">
                        <Crosshair className="text-primary" size={20} />
                        Active Threat Vectors
                    </h3>
                    <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Monitoring
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                <th className="px-6 py-4">IP Address</th>
                                <th className="px-6 py-4">Region</th>
                                <th className="px-6 py-4">Threat Type</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {threats.map((threat) => (
                                <tr key={threat.ip} className="hover:bg-secondary/20 transition-all group">
                                    <td className="px-6 py-5 font-mono text-xs">{threat.ip}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Globe size={14} className="text-muted-foreground" />
                                            {threat.country}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold ${threat.status === 'Banned' ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-500'}`}>
                                            {threat.type} • {threat.attempts} reqs
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-8 rounded-[2.5rem] primary-gradient text-white flex flex-col gap-6">
                <ShieldAlert size={42} className="opacity-80" />
                <div>
                   <h3 className="text-2xl font-bold italic">Auto-Ban V2</h3>
                   <p className="text-xs opacity-80 leading-relaxed mt-2">
                       AetherGuard AI is currently analyzing network patterns. IPs exceeding 10 failed login attempts within 60 seconds are automatically jailed.
                   </p>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl">
                    <span className="font-bold">Protocol Active</span>
                    <div className="w-12 h-6 bg-white/20 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                </div>
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] border border-border">
                <h3 className="font-bold mb-6">Security Stats</h3>
                <div className="space-y-6">
                    {[
                        { label: "Banned IPs", value: "1,245", color: "text-destructive" },
                        { label: "Deflected Attacks", value: "4.2M", color: "text-primary" },
                        { label: "Safety Score", value: "98/100", color: "text-emerald-500" },
                    ].map(stat => (
                        <div key={stat.label} className="flex justify-between items-center group">
                            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</span>
                            <span className={`font-black tracking-tight ${stat.color}`}>{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
