"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface NetworkGraphProps {
  history?: { time: string; in: number; out: number }[];
}

const defaultData = [
  { time: '0:00', in: 0, out: 0 },
  { time: '0:00', in: 0, out: 0 },
  { time: '0:00', in: 0, out: 0 },
  { time: '0:00', in: 0, out: 0 },
  { time: '0:00', in: 0, out: 0 },
];

export default function NetworkGraph({ history = defaultData }: NetworkGraphProps) {
  return (
    <div className="glass-card p-6 rounded-2xl h-[350px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Network Throughput</h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Live Traffic Trends (MB/s)</p>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            <span className="text-muted-foreground text-[10px] uppercase">Inbound: {history[history.length-1].in}MB</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
            <span className="text-muted-foreground text-[10px] uppercase">Outbound: {history[history.length-1].out}MB</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 10}}
                hide={true}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 10}}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 15, 20, 0.95)', 
                borderColor: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                fontSize: '12px',
                backdropFilter: 'blur(10px)',
                border: 'none',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
              }} 
            />
            <Area 
                type="monotone" 
                dataKey="in" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorIn)" 
                strokeWidth={3}
                animationDuration={1500}
            />
            <Area 
                type="monotone" 
                dataKey="out" 
                stroke="#a855f7" 
                fillOpacity={1} 
                fill="url(#colorOut)" 
                strokeWidth={3}
                animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
