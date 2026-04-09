"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Play, Clock, Search, ShieldCheck, Bug } from "lucide-react";

const scans = [
  { id: 1, name: "Daily Infrastructure Scan", status: "Completed", date: "Today, 08:30 AM", findings: 0 },
  { id: 2, name: "Docker Container Audit", status: "Completed", date: "Yesterday, 11:45 PM", findings: 2 },
  { id: 3, name: "Rootkit Analysis", status: "Failed", date: "2 days ago", findings: "-" },
];

export default function ThreatScansPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight gradient-text">Threat Analytics</h1>
          <p className="text-muted-foreground mt-1">Automated vulnerability scanning and rootkit detection.</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-all">
          <Play size={18} />
          Scan Now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="glass-card rounded-[2.5rem] overflow-hidden border border-border">
                <div className="p-6 bg-secondary/30 border-b border-border flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2">
                        <Clock className="text-primary" size={20} />
                        Recent Scan History
                    </h3>
                </div>
                <div className="p-0">
                    {scans.map((scan) => (
                        <div key={scan.id} className="flex items-center justify-between p-6 border-b border-border last:border-0 hover:bg-secondary/20 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${scan.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                                    {scan.status === 'Completed' ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm tracking-tight">{scan.name}</h4>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{scan.date} • {scan.status}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className={`text-sm font-black ${scan.findings === 0 ? 'text-emerald-500' : scan.findings === '-' ? 'text-muted-foreground' : 'text-amber-500'}`}>
                                        {scan.findings} Findings
                                    </p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Critical Threats</p>
                                </div>
                                <button className="p-2 bg-secondary rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                    <Search size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-8 rounded-[2.5rem] primary-gradient text-white">
                <Bug size={42} className="opacity-50 mb-6" />
                <h3 className="text-2xl font-bold mb-2 italic">AetherGuard AI</h3>
                <p className="text-sm opacity-80 leading-relaxed mb-6">
                    Our AI-driven scanner identifies zero-day vulnerabilities in deployed Docker stacks before they can be exploited.
                </p>
                <div className="p-4 bg-white/10 rounded-2xl flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest">Next Scheduled Scan</span>
                    <span className="text-xs font-mono font-bold">In 4 hours</span>
                </div>
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] border border-border">
                <h3 className="font-bold mb-6">Scanner Modules</h3>
                <div className="space-y-4">
                    {["CVE Database", "Rootkit Hunter", "Docker Audit", "Malware Signatures"].map(mod => (
                        <div key={mod} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span className="text-xs font-medium">{mod}</span>
                            <span className="ml-auto text-[10px] font-bold text-muted-foreground uppercase">Active</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
