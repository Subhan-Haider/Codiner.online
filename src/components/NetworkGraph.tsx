"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { time: '09:00', in: 400, out: 240 },
  { time: '10:00', in: 300, out: 139 },
  { time: '11:00', in: 200, out: 980 },
  { time: '12:00', in: 278, out: 390 },
  { time: '13:00', in: 189, out: 480 },
  { time: '14:00', in: 239, out: 380 },
  { time: '15:00', in: 349, out: 430 },
];

export default function NetworkGraph() {
  return (
    <div className="glass-card p-6 rounded-2xl h-[350px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Network Throughput</h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Live data (MB/s)</p>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Inbound</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-muted-foreground">Outbound</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 10}}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 10}}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 15, 20, 0.9)', 
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '12px'
              }} 
            />
            <Area 
                type="monotone" 
                dataKey="in" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorIn)" 
                strokeWidth={2}
            />
            <Area 
                type="monotone" 
                dataKey="out" 
                stroke="#a855f7" 
                fillOpacity={1} 
                fill="url(#colorOut)" 
                strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
