import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.text();

  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: req.headers.get('authorization') || '',
    },
    body,
  });

  const data = await response.text();

  return new NextResponse(data, {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
