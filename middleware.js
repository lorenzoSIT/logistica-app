// middleware.js
import { NextResponse } from 'next/server';
import * as jose from 'jose';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Ottieni il percorso corrente per ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carica le variabili d'ambiente
dotenv.config({ path: join(__dirname, '.env.local') });

// JWT secret key
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

// Funzione per verificare il token
async function verifyJWT(token) {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request) {
  // Ottieni il token dai cookie in modo sicuro
  const token = request.cookies.get('token')?.value;
  
  // Percorso attuale
  const path = request.nextUrl.pathname;
  
  // Percorsi pubblici (non protetti)
  const publicPaths = ['/login'];
  const isPublicPath = publicPaths.includes(path) || 
                       path.startsWith('/api/auth/') || 
                       path.startsWith('/_next/') ||
                       path.includes('favicon.ico');
  
  // Se il percorso è pubblico, consenti l'accesso
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Se non c'è token, redirigi al login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // Verifica il token
  const payload = await verifyJWT(token);
  if (!payload) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // Continua con la richiesta
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (API routes that need to be accessible for login/logout)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};