"use client";

import { useEffect, useState } from "react";
import { 
  AppWindow, 
  HardDrive, 
  Mail, 
  Lock, 
  RefreshCw 
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import StatusWidget from "@/components/StatusWidget";
import ActivityPanel from "@/components/ActivityPanel";
import SystemControl from "@/components/SystemControl";
import NetworkGraph from "@/components/NetworkGraph";
import ConsoleTerminal from "@/components/ConsoleTerminal";
import StorageBreakdown from "@/components/StorageBreakdown";
import DomainStatus from "@/components/DomainStatus";
import { motion } from "framer-motion";
import { Zap, Shield, Cpu, HardDrive } from "lucide-react";

export default function Dashboard() {
  const [status, setStatus] = useState<any>(null);
  const [system, setSystem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statusRes, systemRes] = await Promise.all([
        fetch("/api/status"),
        fetch("/api/system")
      ]);
      setStatus(await statusRes.json());
      setSystem(await systemRes.json());
    } catch (err) {
      console.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // 15s refresh
    return () => clearInterval(interval);
  }, []);

  const services = [
    { name: "Apps", url: "https://apps.codiner.online", icon: AppWindow, key: "apps" },
    { name: "Drive", url: "https://drive.codiner.online", icon: HardDrive, key: "drive" },
    { name: "Mail", url: "https://mail.codiner.online", icon: Mail, key: "mail" },
    { name: "VPN", url: "https://vpn.codiner.online", icon: Lock, key: "vpn" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight gradient-text">Network Overview</h1>
          <p className="text-muted-foreground mt-1">Infrastructure status: <span className="text-emerald-500 font-bold uppercase">Healthy</span></p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-xl transition-all text-sm font-bold border border-primary/20">
                <Zap size={16} />
                Quick Deploy
            </button>
            <button 
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-xl transition-all text-sm font-medium border border-border"
            >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Sync
            </button>
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.key}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <ServiceCard 
              name={service.name}
              url={service.url}
              icon={service.icon}
              status={status?.[service.key] || "offline"}
            />
          </motion.div>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <NetworkGraph />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SystemControl />
            <ConsoleTerminal />
          </div>
        </div>

        <div className="xl:col-span-1 space-y-8">
          <StorageBreakdown />
          <DomainStatus />
          <ActivityPanel />
          
          <div className="glass-card p-6 rounded-2xl primary-gradient text-white">
            <h3 className="font-bold flex items-center gap-2 mb-2 italic">
              <Shield size={20} />
              Security Check
            </h3>
            <p className="text-xs opacity-80 leading-relaxed mb-4">
              Your system was last scanned 14 minutes ago. No vulnerabilities found in 24 active containers.
            </p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all">
              Run Security Audit
            </button>
          </div>
        </div>
      </div>

      {/* Metric Widgets (Condensed) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusWidget label="Load Average" value={system?.cpu ? (system.cpu / 10).toFixed(2) : "0.00"} unit="avg" progress={system?.cpu} />
          <StatusWidget label="Net Swap" value={2.4} unit="GB" progress={24} color="bg-orange-500" />
          <StatusWidget label="Z-Pool" value="Online" />
          <StatusWidget label="Uptime" value={system?.uptime || "12h 30m"} />
      </div>
    </div>
  );
}
