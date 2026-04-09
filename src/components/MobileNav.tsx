"use client";

import { useState } from "react";
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  AppWindow, 
  Server, 
  Monitor, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Cloud 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: AppWindow, label: "Marketplace", href: "/marketplace" },
  { icon: Server, label: "Services", href: "/services" },
  { icon: Monitor, label: "Monitoring", href: "/monitoring" },
  { icon: ShieldCheck, label: "Security", href: "/security" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-card border-r border-border z-[101] p-6 flex flex-col gap-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary rounded-xl">
                    <Cloud className="text-white" size={24} />
                  </div>
                  <span className="text-xl font-bold tracking-tighter uppercase">Codiner</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground p-1">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col gap-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl transition-all",
                      pathname === item.href 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <item.icon size={20} />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="pt-6 border-t border-border">
                <button className="w-full flex items-center gap-4 p-4 rounded-xl text-destructive bg-destructive/5 font-bold">
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
