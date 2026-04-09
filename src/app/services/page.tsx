"use client";

import { motion } from "framer-motion";
import { Server, Activity, Plus, MoreVertical, ExternalLink } from "lucide-react";

const services = [
    { name: "Nextcloud", type: "Storage", status: "Running", uptime: "99.9%", load: "1.2%", url: "https://drive.codiner.online" },
    { name: "Mailcow", type: "Mail", status: "Running", uptime: "99.8%", load: "2.5%", url: "https://mail.codiner.online" },
    { name: "WireGuard", type: "VPN", status: "Running", uptime: "100%", load: "0.4%", url: "https://vpn.codiner.online" },
    { name: "Nginx Proxy", type: "Gateway", status: "Running", uptime: "99.9%", load: "0.1%", url: "https://codiner.online" },
];

export default function ServicesPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight gradient-text">Infrastructure Services</h1>
          <p className="text-muted-foreground mt-1">Manage core cloud services and underlying Docker stacks.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Plus size={20} />
          Add Service
        </button>
      </div>

      <div className="glass-card rounded-[2rem] overflow-hidden border border-border">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-secondary/30 border-b border-border">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Service</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Uptime</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {services.map((service) => (
              <tr key={service.name} className="hover:bg-secondary/20 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Server size={18} />
                    </div>
                    <span className="font-bold">{service.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-muted-foreground">{service.type}</td>
                <td className="px-6 py-5">
                  <span className="flex items-center gap-2 text-emerald-500 text-xs font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{service.uptime}</span>
                        <div className="w-24 h-1 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[90%]" />
                        </div>
                    </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                        onClick={() => window.open(service.url, "_blank")}
                        className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg text-muted-foreground transition-all"
                    >
                        <ExternalLink size={16} />
                    </button>
                    <button 
                        onClick={() => alert(`Opening configuration for ${service.name}...`)}
                        className="p-2 hover:bg-secondary rounded-lg text-muted-foreground transition-all"
                    >
                        <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
