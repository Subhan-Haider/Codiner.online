"use client";

import { Bell, Search, User, ChevronDown, Clock, CloudIcon, ShieldCheck, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const [adBlocked, setAdBlocked] = useState(true);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 md:gap-8 flex-1">
        <MobileNav />
        
        <div className="relative w-full max-w-96 hidden sm:flex items-center">
            <Search className="absolute left-3 text-muted-foreground" size={18} />
            <input
            type="text"
            placeholder="Search containers..."
            className="w-full bg-secondary/30 border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-medium"
            />
        </div>

        <div className="hidden xl:flex items-center gap-4 text-muted-foreground border-l border-border pl-6">
            <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="text-sm font-mono">{mounted && time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}</span>
            </div>
            <div className="flex items-center gap-2">
                <CloudIcon size={16} />
                <span className="text-sm">22°C</span>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Ad Block Toggle */}
        <button 
            onClick={() => setAdBlocked(!adBlocked)}
            className={cn(
                "hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl border transition-all font-bold text-xs",
                adBlocked 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                    : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
            )}
        >
            <ShieldCheck size={16} className={adBlocked ? "animate-pulse" : ""} />
            {adBlocked ? "Protection Active" : "Ads Allowed"}
        </button>

        <div className="h-6 w-px bg-border mx-1 hidden lg:block" />

        <ThemeToggle />

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all relative"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-4 w-80 glass border border-border rounded-2xl shadow-2xl p-4 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Notifications</h3>
                  <button className="text-xs text-primary hover:underline">Mark all read</button>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Storage Alert", message: "Disk usage reached 71%", time: "2m ago", type: "warning" },
                    { title: "System Update", message: "New security patch available", time: "1h ago", type: "info" },
                    { title: "VPN Connected", message: "User setup connected from London", time: "3h ago", type: "success" },
                  ].map((notif, i) => (
                    <div key={i} className="flex gap-3 text-sm p-2 hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-1.5 shrink-0",
                        notif.type === "warning" ? "bg-amber-500" : notif.type === "success" ? "bg-green-500" : "bg-primary"
                      )} />
                      <div>
                        <p className="font-medium text-foreground">{notif.title}</p>
                        <p className="text-muted-foreground text-xs">{notif.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
