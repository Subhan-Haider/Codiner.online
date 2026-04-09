"use client";

import { motion } from "framer-motion";
import { Lock, Plus, Trash2, Shield, ArrowRightLeft, Globe } from "lucide-react";
import { useState } from "react";

const rules = [
  { id: 1, name: "Web Traffic (HTTP)", port: "80", proto: "TCP", action: "Allow", source: "Any" },
  { id: 2, name: "Secure Web (HTTPS)", port: "443", proto: "TCP", action: "Allow", source: "Any" },
  { id: 3, name: "SSH Remote Access", port: "22", proto: "TCP", action: "Limit", source: "142.250.0.1" },
  { id: 4, name: "MySQL External", port: "3306", proto: "TCP", action: "Deny", source: "Any" },
];

export default function FirewallPage() {
  const [systemRules, setSystemRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/system')
      .then(res => res.json())
      .then(data => {
        if(data.firewallRules && data.firewallRules.length > 0) {
            setSystemRules(data.firewallRules);
        } else {
            setSystemRules(rules); // Fallback to mock
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight gradient-text">Firewall Engine</h1>
          <p className="text-muted-foreground mt-1">Configure inbound/outbound traffic rules and port forwarding.</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-all">
          <Plus size={18} />
          New Rule
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
            <div className="glass-card rounded-[2.5rem] overflow-hidden border border-border">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-secondary/30 border-b border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            <th className="px-6 py-4">Rule Name</th>
                            <th className="px-6 py-4">Port / Protocol</th>
                            <th className="px-6 py-4">Action</th>
                            <th className="px-6 py-4">Source</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {systemRules.map((rule) => (
                            <tr key={rule.id} className="hover:bg-secondary/20 transition-all group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${rule.action === 'Allow' ? 'bg-emerald-500' : rule.action === 'Limit' ? 'bg-amber-500' : 'bg-destructive'}`} />
                                        <span className="font-bold">{rule.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-sm">
                                    <span className="bg-secondary px-2 py-1 rounded-md text-[10px] font-mono">{rule.port}/{rule.proto}</span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${rule.action === 'Allow' ? 'text-emerald-500' : rule.action === 'Limit' ? 'text-amber-500' : 'text-destructive'}`}>
                                        {rule.action}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-xs text-muted-foreground">{rule.source}</td>
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

        <div className="xl:col-span-1 space-y-6">
            <div className="glass-card p-8 rounded-[2rem] border border-border">
                <h3 className="font-bold flex items-center gap-2 mb-6">
                    <Shield className="text-primary" size={20} />
                    Engine Status
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <span className="text-emerald-500 font-bold uppercase text-[10px]">Active</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Active Connections</span>
                        <span className="font-bold">1,245</span>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Default Action</span>
                        <span className="text-destructive font-bold uppercase text-[10px]">Deny All</span>
                    </div>
                </div>
                <button className="w-full mt-8 py-3 bg-secondary hover:bg-secondary/80 rounded-xl text-xs font-bold transition-all border border-border">
                    Restart Engine
                </button>
            </div>

            <div className="glass-card p-8 rounded-[2rem] border border-border bg-amber-500/5 border-amber-500/10">
                <h4 className="font-bold flex items-center gap-2 mb-2">
                    <ArrowRightLeft className="text-amber-500" size={18} />
                    Port Forwarding
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    You have **3** active port forwarding rules mapping external traffic to internal Docker services.
                </p>
                <button className="mt-4 text-[10px] font-bold uppercase tracking-widest text-amber-500">Configure Forwarding</button>
            </div>
        </div>
      </div>
    </div>
  );
}
