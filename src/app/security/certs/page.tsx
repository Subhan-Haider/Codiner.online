"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Plus, Globe, Clock, RefreshCw, Lock } from "lucide-react";

const certs = [
  { domain: "codiner.online", issuer: "Let's Encrypt", expiry: "62 days left", status: "Active" },
  { domain: "drive.codiner.online", issuer: "Let's Encrypt", expiry: "14 days left", status: "Pending Renewal" },
  { domain: "vpn.infra.internal", issuer: "Private CA", expiry: "2 years left", status: "Active" },
];

export default function CertificatesPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight gradient-text">SSL / TLS Certificates</h1>
          <p className="text-muted-foreground mt-1">Manage encryption certificates for your domains and subdomains.</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-all">
          <Plus size={18} />
          Issue New Cert
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
            <div className="glass-card rounded-[2.5rem] border border-border">
                {certs.map((cert) => (
                    <div key={cert.domain} className="flex items-center justify-between p-8 border-b border-border last:border-0 hover:bg-secondary/20 transition-all group">
                        <div className="flex items-center gap-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${cert.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                <Lock size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg tracking-tight">{cert.domain}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] bg-secondary px-2 py-0.5 rounded font-bold text-muted-foreground">{cert.issuer}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${cert.status === 'Active' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {cert.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right flex items-center gap-6">
                            <div>
                                <p className="text-sm font-bold flex items-center gap-1 justify-end">
                                    <Clock size={12} className="text-muted-foreground" />
                                    {cert.expiry}
                                </p>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Until Expiry</p>
                            </div>
                            <button className="p-3 bg-secondary hover:bg-white/10 rounded-xl transition-all">
                                <RefreshCw size={16} className="text-muted-foreground" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="xl:col-span-1 space-y-8">
            <div className="glass-card p-10 rounded-[3rem] primary-gradient text-white flex flex-col items-center text-center">
                <ShieldCheck size={48} className="mb-6 opacity-80" />
                <h3 className="text-2xl font-bold italic mb-2">Automated Renewal</h3>
                <p className="text-sm opacity-80 leading-relaxed mb-8">
                    Your Certbot agent is currently monitoring **3** active certificates. Renewal attempts begin automatically 30 days before expiry.
                </p>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-full animate-pulse" />
                </div>
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] border border-border">
                <h3 className="font-bold mb-6">Global Settings</h3>
                 <div className="space-y-6">
                    <div className="flex justify-between items-center group">
                        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">HSTS Headers</span>
                        <span className="text-emerald-500 font-bold uppercase text-[10px]">Enabled</span>
                    </div>
                    <div className="flex justify-between items-center group">
                         <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Force HTTPS (301)</span>
                        <span className="text-emerald-500 font-bold uppercase text-[10px]">Enabled</span>
                    </div>
                     <div className="flex justify-between items-center group">
                        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">TLS 1.3 Only</span>
                        <span className="text-destructive font-bold uppercase text-[10px]">Disabled</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
