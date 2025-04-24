// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  try {
    // Cancella il cookie nel response
    const cookie = serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });
    
    return new NextResponse(
      JSON.stringify({ message: 'Logout effettuato con successo' }),
      {
        status: 200,
        headers: { 'Set-Cookie': cookie }
      }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Si è verificato un errore durante il logout' },
      { status: 500 }
    );
  }
}