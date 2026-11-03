import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (!data || typeof data.name !== 'string' || typeof data.email !== 'string') {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
  }

  if (!data.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: 'Enter a valid name and email.' }, { status: 400 });
  }

  // TODO before launch: forward `data` to an email/CRM provider (e.g. Resend, SendGrid)
  // instead of only logging it server-side.
  console.log('New inquiry:', data);

  return NextResponse.json({ ok: true });
}
