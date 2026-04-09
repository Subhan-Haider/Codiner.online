"use client";

import { CheckCircle2, AlertTriangle, Info, Clock } from "lucide-react";

const activities = [
  { id: 1, type: "login", user: "admin", action: "User login from 192.168.1.5", time: "10 mins ago", status: "success" },
  { id: 2, type: "vpn", user: "setup", action: "VPN connected to US-East-1", time: "25 mins ago", status: "success" },
  { id: 3, type: "mail", user: "system", action: "Email received: 50 new messages", time: "1 hour ago", status: "info" },
  { id: 4, type: "system", user: "system", action: "System started after updates", time: "12 hours ago", status: "warning" },
];

export default function ActivityPanel() {
  return (
    <div className="glass-card p-6 rounded-2xl h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock size={20} className="text-primary" />
          Recent Activity
        </h3>
        <button className="text-xs text-muted-foreground hover:text-foreground">View all</button>
      </div>

      <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-border">
        {activities.map((item) => (
          <div key={item.id} className="flex gap-4 relative">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10",
              item.status === "success" ? "bg-green-500/20 text-green-500" : 
              item.status === "warning" ? "bg-amber-500/20 text-amber-500" : "bg-primary/20 text-primary"
            )}>
              {item.status === "success" ? <CheckCircle2 size={14} /> : 
               item.status === "warning" ? <AlertTriangle size={14} /> : <Info size={14} />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium">
                  <span className="text-primary font-bold">{item.user}</span> {item.action}
                </p>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
