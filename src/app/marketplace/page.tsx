"use client";

import { motion } from "framer-motion";
import { Download, Plus, Search, Filter, AppWindow } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const apps = [
  { name: "Plex", desc: "Media server for streaming movies and TV.", icon: "🎥", category: "Media" },
  { name: "Home Assistant", desc: "Open source home automation hub.", icon: "🏠", category: "IoT" },
  { name: "Bitwarden", desc: "Open source password manager.", icon: "🔑", category: "Security" },
  { name: "VS Code Server", desc: "Run VS Code in your browser.", icon: "💻", category: "Dev" },
  { name: "Ghost", desc: "Professional publishing platform.", icon: "👻", category: "Web" },
  { name: "Pi-hole", desc: "Network-wide ad blocking.", icon: "🛡️", category: "Network" },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [installing, setInstalling] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "installed" | "updates">("all");
  const [installedApps, setInstalledApps] = useState<string[]>(["Plex"]); // Plex starting as installed

  const handleInstall = async (appId: string) => {
    setInstalling(appId);
    try {
        const res = await fetch("/api/install", {
            method: "POST",
            body: JSON.stringify({ appId }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        if (data.success) {
            setInstalledApps(prev => [...prev, appId]);
            alert(`${appId} installation started successfully!`);
        }
    } catch (err) {
        alert("Installation failed. Check server logs.");
    } finally {
        setInstalling(null);
    }
  };
  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    
    if (activeTab === "installed") return installedApps.includes(app.name);
    if (activeTab === "updates") return app.name === "Plex" || app.name === "Ghost"; // Mock update availability
    return true; // "all" tab
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight gradient-text">App Marketplace</h1>
          <p className="text-muted-foreground mt-1">One-click deployment for your private cloud.</p>
        </div>
        <div className="flex items-center gap-4 bg-secondary/50 p-1.5 rounded-2xl border border-border">
            <button 
                onClick={() => setActiveTab("all")}
                className={cn("px-4 py-2 text-xs font-bold rounded-xl transition-all", activeTab === 'all' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground")}
            >All Apps</button>
            <button 
                onClick={() => setActiveTab("installed")}
                className={cn("px-4 py-2 text-xs font-bold rounded-xl transition-all", activeTab === 'installed' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground")}
            >Installed</button>
            <button 
                onClick={() => setActiveTab("updates")}
                className={cn("px-4 py-2 text-xs font-bold rounded-xl transition-all", activeTab === 'updates' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground")}
            >Updates (2)</button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search for apps, categories, or tags..."
            className="w-full bg-secondary/30 border border-border rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-6 bg-secondary border border-border rounded-2xl flex items-center gap-2 hover:bg-secondary/80 transition-all">
          <Filter size={18} />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app, i) => (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-6 rounded-[2rem] flex flex-col gap-4 group"
          >
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {app.icon}
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-primary/10 text-primary rounded-md">
                {app.category}
              </span>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-1">{app.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{app.desc}</p>
            </div>

            <div className="pt-4 mt-auto border-t border-white/5 flex gap-3">
              <button 
                onClick={() => handleInstall(app.name)}
                disabled={!!installing}
                className="flex-1 bg-white hover:bg-white/90 text-black py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {installing === app.name ? (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                    <Download size={14} />
                )}
                {installing === app.name ? "Installing..." : "Install"}
              </button>
              <button className="p-2.5 bg-secondary hover:bg-secondary/80 rounded-xl transition-all border border-border">
                <Plus size={16} className="text-muted-foreground" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
