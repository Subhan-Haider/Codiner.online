"use client";

import { motion } from "framer-motion";
import { Settings as SettingsIcon, Save, User, Bell, Shield, Database, Globe } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Networking");

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">System Settings</h1>
        <p className="text-muted-foreground mt-1 font-medium">Configure your Codiner Cloud instance and member permissions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-2">
            {[
                { icon: User, label: "Account" },
                { icon: Globe, label: "Networking" },
                { icon: Shield, label: "Security" },
                { icon: Bell, label: "Notifications" },
                { icon: Database, label: "Backups" },
            ].map((item) => (
                <button 
                    key={item.label}
                    onClick={() => setActiveTab(item.label)}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all", 
                        activeTab === item.label ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                >
                    <item.icon size={18} />
                    {item.label}
                </button>
            ))}
        </div>
        
        <div className="lg:col-span-3 space-y-6">
            {activeTab === "Networking" && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="glass-card p-8 rounded-[2rem] space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                             <Globe className="text-primary" size={24} />
                             Network Configuration
                        </h3>
                        {/* Rendering children from previous Networking content... */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Primary Domain</label>
                        <input type="text" defaultValue="codiner.online" className="w-full bg-secondary/30 border border-border rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-primary/50" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Server IP</label>
                        <input type="text" defaultValue="142.250.190.46" className="w-full bg-secondary/30 border border-border rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-primary/50" />
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-2xl border border-border">
                        <div>
                            <p className="font-bold">Auto-Renew SSL</p>
                            <p className="text-xs text-muted-foreground">Automatically use Let's Encrypt for all subdomains.</p>
                        </div>
                        <div className="w-12 h-6 bg-primary rounded-full relative">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </div>
                    </div>

                     <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-2xl border border-border">
                        <div>
                            <p className="font-bold">Public Dashboard</p>
                            <p className="text-xs text-muted-foreground">Allow read-only access to status page without login.</p>
                        </div>
                        <div className="w-12 h-6 bg-secondary rounded-full relative">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full" />
                        </div>
                    </div>
                </div>

                        <div className="flex justify-end pt-6">
                            <button className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/25">
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab !== "Networking" && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="glass-card p-12 rounded-[2rem] flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground mb-6">
                            <SettingsIcon size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{activeTab} Settings</h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            The {activeTab} management module is currently being synchronized with your primary server core.
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
      </div>
    </div>
  );
}
