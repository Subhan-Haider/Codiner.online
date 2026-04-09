"use client";

import { motion } from "framer-motion";
import { Fingerprint, Smartphone, Key, ShieldCheck, Mail, AlertCircle } from "lucide-react";

export default function IdentityPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-foreground">Identity & Access</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">Configure multi-factor authentication and session security for your Codiner dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-10 rounded-[3rem] border border-border flex flex-col items-center text-center group hover:border-primary/50 transition-all">
            <div className="w-20 h-20 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <Smartphone size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Authenticaton App</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Use Google Authenticator, Authy, or Microsoft Authenticator to generate secure one-time passwords.
            </p>
            <div className="mt-auto w-full">
                <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                    Enable TOTP
                </button>
            </div>
        </div>

        <div className="glass-card p-10 rounded-[3rem] border border-border flex flex-col items-center text-center group hover:border-emerald-500/50 transition-all">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform">
                <Key size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Hardware Keys</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                The most secure method. Use a physical YubiKey or Titan Security Key via FIDO2 / WebAuthn.
            </p>
             <div className="mt-auto w-full">
                <button className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">
                    Register Key
                </button>
            </div>
        </div>
      </div>

      <div className="glass-card p-10 rounded-[3rem] border border-border">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <ShieldCheck className="text-primary" size={24} />
              Security Hardening
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
                <div className="flex gap-6">
                    <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shrink-0">
                        <Mail size={24} className="text-muted-foreground" />
                    </div>
                    <div>
                        <h4 className="font-bold">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground mt-1">Receive alerts for every login from a new device or IP address.</p>
                        <button className="mt-3 text-[10px] font-bold uppercase tracking-widest text-primary">Configure Alerts</button>
                    </div>
                </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shrink-0">
                        <AlertCircle size={24} className="text-destructive" />
                    </div>
                    <div>
                        <h4 className="font-bold">Session Auto-Timeout</h4>
                        <p className="text-sm text-muted-foreground mt-1">Automatically log out users after 15 minutes of inactivity.</p>
                        <div className="mt-4 flex items-center gap-4">
                             <div className="w-10 h-5 bg-primary/20 rounded-full relative">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-primary rounded-full" />
                             </div>
                             <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Enabled</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-secondary rounded-[2rem] border border-border flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Account Recovery</p>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                    Generate one-time recovery codes to access your account if you lose your 2FA device.
                </p>
                <button className="w-fit px-6 py-2.5 bg-secondary hover:bg-white/10 rounded-xl text-xs font-bold border border-border transition-all">
                    Generate Codes
                </button>
            </div>
          </div>
      </div>
    </div>
  );
}
