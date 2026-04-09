"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  Server, 
  Monitor, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  ChevronLeft,
  Cloud
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: AppWindow, label: "Marketplace", href: "/marketplace" },
  { icon: Server, label: "Services", href: "/services" },
  { icon: Monitor, label: "Monitoring", href: "/monitoring" },
  { icon: ShieldCheck, label: "Security", href: "/security" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      className={cn(
        "h-screen bg-card border-r border-border transition-all duration-300 flex flex-col relative z-50",
        collapsed ? "w-20" : "w-64"
      )}
      animate={{ width: collapsed ? 80 : 256 }}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-primary rounded-xl flex items-center justify-center">
            <Cloud className="text-white" size={24} />
        </div>
        {!collapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold tracking-tighter"
          >
            CODINER
          </motion.span>
        )}
      </div>

      <nav className="flex-1 px-4 py-8 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 p-3 rounded-xl transition-all group",
              pathname === item.href 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <item.icon size={20} />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
         <button className={cn(
            "w-full flex items-center gap-4 p-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all",
            collapsed && "justify-center"
         )}>
            <LogOut size={20} />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
         </button>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-background border border-border rounded-full p-1 text-muted-foreground hover:text-foreground shadow-lg"
      >
        <ChevronLeft size={16} className={cn("transition-transform", collapsed && "rotate-180")} />
      </button>
    </motion.aside>
  );
}
