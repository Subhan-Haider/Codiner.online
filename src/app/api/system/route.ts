import { NextResponse } from 'next/server';

export async function GET() {
  // Mocking system data
  return NextResponse.json({
    cpu: Math.floor(Math.random() * (45 - 20) + 20),
    ram: Math.floor(Math.random() * (65 - 40) + 40),
    disk: 71,
    uptime: "12h 30m"
  });
}
