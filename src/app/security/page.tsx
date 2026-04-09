"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, ShieldAlert, Key, Fingerprint } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight gradient-text">Security Center</h1>
        <p className="text-muted-foreground mt-1">Armor your infrastructure with advanced firewalls and encryption.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
            { icon: Lock, label: "Firewall Settings", desc: "Manage inbound/outbound rules and port forwarding.", color: "text-blue-500" },
            { icon: Eye, label: "Intrusion Detection", desc: "Real-time monitoring for suspicious login patterns.", color: "text-emerald-500" },
            { icon: ShieldAlert, label: "Threat Scans", desc: "Automated vulnerability scanning for Docker images.", color: "text-amber-500" },
            { icon: Key, label: "SSH Keys", desc: "Manage root and user-level SSH authentication keys.", color: "text-primary" },
            { icon: Fingerprint, label: "2FA / Identity", desc: "Configure multi-factor authentication for dashboard.", color: "text-purple-500" },
            { icon: ShieldCheck, label: "Certificates", desc: "Monitor Let's Encrypt and custom SSL certificates.", color: "text-blue-500" },
        ].map((item, i) => (
            <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                    const pageMap: Record<string, string> = {
                        "Firewall Settings": "/security/firewall",
                        "Intrusion Detection": "/security/intrusion",
                        "Threat Scans": "/security/scans",
                        "SSH Keys": "/security/ssh",
                        "2FA / Identity": "/security/auth",
                        "Certificates": "/security/certs"
                    };
                    const target = pageMap[item.label];
                    if (target) {
                        window.location.href = target;
                    }
                }}
                className="glass-card p-8 rounded-[2rem] border border-border group hover:border-primary/50 transition-all cursor-pointer"
            >
                <div className={`p-4 bg-secondary/50 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                    <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                
                <div className="mt-8 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Manage</span>
                    <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                </div>
            </motion.div>
        ))}
      </div>

      <div className="glass-card p-8 rounded-[2.5rem] primary-gradient text-white flex flex-col md:flex-row items-center gap-8">
        <div className="p-6 bg-white/10 rounded-3xl shrink-0">
            <ShieldCheck size={48} />
        </div>
        <div className="space-y-2">
            <h3 className="text-2xl font-bold italic">Deep Armor Enabled</h3>
            <p className="text-sm opacity-90 leading-relaxed max-w-2xl">
                Your private cloud is protected by **Codiner Deep Armor**, an automated security layer that utilizes WireGuard encryption and fail2ban protocol hardening to prevent brute-force attacks.
            </p>
        </div>
        <div className="md:ml-auto">
            <button className="px-8 py-3 bg-white text-black font-bold rounded-xl shadow-xl hover:scale-105 transition-all">Enable Advanced Guard</button>
        </div>
      </div>
    </div>
  );
}
