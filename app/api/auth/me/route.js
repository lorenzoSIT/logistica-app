// app/api/auth/me/route.js
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    // Prendi il token dai cookie della richiesta
    const tokenCookie = request.cookies.get('token');
    const token = tokenCookie?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'Non autenticato' },
        { status: 401 }
      );
    }
    
    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { message: 'Token non valido' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: 'Si è verificato un errore' },
      { status: 500 }
    );
  }
}