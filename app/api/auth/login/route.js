// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { findUserByUsername, verifyPassword, generateToken } from '@/lib/auth';
import { serialize } from 'cookie';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    // Verifica campi obbligatori
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username e password sono obbligatori' },
        { status: 400 }
      );
    }
    
    // Cerca l'utente nel database
    const user = await findUserByUsername(username);
    
    // Verifica se l'utente esiste
    if (!user) {
      return NextResponse.json(
        { message: 'Credenziali non valide' },
        { status: 401 }
      );
    }
    
    // Verifica la password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Credenziali non valide' },
        { status: 401 }
      );
    }
    
    // Genera il token JWT
    const token = await generateToken(user);
    
    // Imposta il cookie
    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in produzione, false in development
      sameSite: 'lax', // Meno restrittivo di 'strict'
      maxAge: 86400, // 1 giorno in secondi
      path: '/',
    });
    
    // Prepara risposta
    const { password: _, ...userWithoutPassword } = user;
    
    // Restituisci risposta con cookie e dati utente
    return new NextResponse(
      JSON.stringify({
        user: userWithoutPassword,
        message: 'Login effettuato con successo'
      }),
      {
        status: 200,
        headers: { 'Set-Cookie': cookie }
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Si è verificato un errore durante il login' },
      { status: 500 }
    );
  }
}