import { NextResponse } from 'next/server';

export async function GET() {
  // Mocking service status
  // In a real scenario, you'd ping these services or check a health-check endpoint
  return NextResponse.json({
    apps: "online",
    drive: "online",
    mail: "online",
    vpn: "online"
  });
}
