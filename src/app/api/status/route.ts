import { NextResponse } from 'next/server';

const SERVICES = [
  { key: 'apps', url: process.env.APPS_SERVICE_URL || 'https://apps.codiner.online' },
  { key: 'drive', url: process.env.DRIVE_SERVICE_URL || 'https://drive.codiner.online' },
  { key: 'mail', url: process.env.MAIL_SERVICE_URL || 'https://mail.codiner.online' },
  { key: 'vpn', url: process.env.VPN_SERVICE_URL || 'https://vpn.codiner.online' },
];

async function checkStatus(url: string) {
  const start = Date.now();
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000); 
    
    const response = await fetch(url, { 
      method: 'HEAD', 
      signal: controller.signal,
      cache: 'no-store' 
    });
    
    clearTimeout(id);
    const latency = Date.now() - start;
    return { 
        status: response.ok || response.status < 500 ? 'online' : 'offline',
        latency: `${latency}ms`
    };
  } catch (e) {
    return { status: 'offline', latency: '0ms' };
  }
}

export async function GET() {
  const statusResults: Record<string, any> = {};
  
  await Promise.all(
    SERVICES.map(async (service) => {
      statusResults[service.key] = await checkStatus(service.url);
    })
  );

  return NextResponse.json(statusResults);
}
