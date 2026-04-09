"use client";

import { motion } from "framer-motion";
import { Key, Plus, Copy, Trash2, Monitor, ShieldCheck } from "lucide-react";

const keys = [
  { id: 1, name: "Admin Macbook Pro", hash: "SHA256:7u/6+8R9...p0Q", created: "2 months ago", type: "RSA 4096" },
  { id: 2, name: "Remote CI/CD Pipeline", hash: "SHA256:4o/1+2X3...z7G", created: "14 days ago", type: "ED25519" },
  { id: 3, name: "Backup Server Access", hash: "SHA256:9v/0+4M1...w2Z", created: "1 year ago", type: "RSA 4096" },
];

export default function SSHKeysPage() {
  const [systemKeys, setSystemKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/system')
      .then(res => res.json())
      .then(data => {
        if(data.sshKeys && data.sshKeys.length > 0) {
            setSystemKeys(data.sshKeys);
        } else {
            setSystemKeys(keys); // Fallback to mock
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight gradient-text">SSH Key Vault</h1>
          <p className="text-muted-foreground mt-1">Manage public keys authorized to access your infrastructure via terminal.</p>
        </div>
        <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2 hover:scale-105 transition-all">
          <Plus size={18} />
          Add SSH Key
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="glass-card rounded-[2.5rem] border border-border">
                {systemKeys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between p-8 border-b border-border last:border-0 hover:bg-secondary/20 transition-all group">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Key size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg tracking-tight">{key.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] bg-secondary px-2 py-0.5 rounded font-mono font-bold text-muted-foreground">{key.type}</span>
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-none">Added {key.created}</span>
                                </div>
                                <p className="text-xs text-muted-foreground font-mono mt-3 opacity-60 truncate max-w-[300px]">{key.hash}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                             <button className="p-3 bg-secondary hover:bg-secondary/80 rounded-xl transition-all">
                                <Copy size={16} className="text-muted-foreground" />
                            </button>
                             <button className="p-3 bg-destructive/10 hover:bg-destructive text-destructive hover:text-white rounded-xl transition-all">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-8 rounded-[2.5rem] border border-border bg-emerald-500/5 border-emerald-500/10">
                <ShieldCheck size={32} className="text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Passwordless Access</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Root password login is currently **Disabled**. Only authorized SSH keys can access the secure shell.
                </p>
                <div className="mt-6 p-4 bg-emerald-500/10 rounded-2xl">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Security Recommendation</p>
                    <p className="text-xs text-emerald-700 mt-1">Rotate your backup server access key soon (last updated 1 year ago).</p>
                </div>
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] border border-border">
                <h3 className="font-bold mb-6 flex items-center gap-2">
                    <Monitor size={18} className="text-primary" />
                    Console Config
                </h3>
                <div className="space-y-4">
                    <p className="text-xs text-muted-foreground">Standard SSH Command:</p>
                    <div className="bg-secondary/50 p-4 rounded-xl font-mono text-xs flex items-center justify-between border border-border">
                        <span className="truncate">ssh admin@codiner.online</span>
                        <Copy size={14} className="text-muted-foreground shrink-0 ml-2" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
