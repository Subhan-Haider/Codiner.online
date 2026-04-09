"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Media", value: 40, color: "#6366f1" },
  { name: "Backups", value: 25, color: "#a855f7" },
  { name: "System", value: 15, color: "#3b82f6" },
  { name: "Free", value: 20, color: "rgba(255,255,255,0.05)" },
];

export default function StorageBreakdown() {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col items-center">
      <h3 className="text-lg font-semibold w-full mb-6">Storage Allocation</h3>
      
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
                 contentStyle={{ 
                    backgroundColor: 'rgba(15, 15, 20, 0.9)', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px'
                }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full space-y-3 mt-4">
        {data.filter(d => d.name !== 'Free').map((item) => (
          <div key={item.name} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-bold">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
