"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, Database, Gauge, Radio } from "lucide-react";
import StatusWidget from "@/components/StatusWidget";
import NetworkGraph from "@/components/NetworkGraph";

export default function MonitoringPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight gradient-text">Real-time Monitoring</h1>
        <p className="text-muted-foreground mt-1">Granular telemetry data for your server and network stacks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusWidget label="Load Avg (1m)" value="0.42" />
        <StatusWidget label="Load Avg (5m)" value="0.38" />
        <StatusWidget label="Load Avg (15m)" value="0.45" />
        <StatusWidget label="IO Wait" value="0.2" unit="ms" progress={2} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <NetworkGraph />
        <div className="glass-card p-8 rounded-[2rem] flex flex-col justify-center gap-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <Gauge className="text-primary" size={24} />
                Resource Efficiency
            </h3>
            <div className="space-y-6">
                {[
                    { label: "CPU Efficiency", val: 92, color: "bg-primary" },
                    { label: "Memory Optimization", val: 78, color: "bg-purple-500" },
                    { label: "Cache Hit Rate", val: 99, color: "bg-blue-500" },
                ].map(item => (
                    <div key={item.label} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            <span>{item.label}</span>
                            <span>{item.val}%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.val}%` }}
                                className={`h-full ${item.color}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center gap-3 mb-2">
                <Radio className="text-emerald-500" size={18} />
                <h4 className="font-bold">Health Check</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">All 24 system checks passed successfully. Heartbeat detected every 500ms.</p>
        </div>
         <div className="glass-card p-6 rounded-2xl border border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3 mb-2">
                <Activity className="text-primary" size={18} />
                <h4 className="font-bold">Process Count</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">System is running 154 tasks and 420 threads correctly across all cores.</p>
        </div>
         <div className="glass-card p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5">
            <div className="flex items-center gap-3 mb-2">
                <Database className="text-blue-500" size={18} />
                <h4 className="font-bold">DB Integrity</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Main SQL and Redis instances are optimized. Buffer pool hit ratio is 99.8%.</p>
        </div>
      </div>
    </div>
  );
}
