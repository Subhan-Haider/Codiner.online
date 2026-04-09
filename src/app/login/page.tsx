"use client";

import { motion } from "framer-motion";
import { Cloud, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-primary rounded-2xl mb-6 shadow-lg shadow-primary/20">
            <Cloud className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to manage Codiner Cloud</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="admin"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium text-muted-foreground ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs px-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded-sm bg-white/5 border-white/10 text-primary focus:ring-primary/50" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-primary hover:underline">Forgot password?</a>
          </div>

          <Link 
            href="/dashboard"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group transition-all shadow-lg shadow-primary/25"
          >
            Sign In
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </form>

        <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
                Protected by WireGuard Encryption
            </p>
        </div>
      </motion.div>
    </div>
  );
}
