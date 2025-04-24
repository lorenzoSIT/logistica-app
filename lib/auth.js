// lib/auth.js
import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import usersPool from './db.js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Ottieni il percorso corrente per ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carica le variabili d'ambiente dal file .env.local
dotenv.config({ path: join(__dirname, '..', '.env.local') });

// JWT secret key - IMPORTANTE: usa una variabile d'ambiente in produzione
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);
const JWT_EXPIRES_IN = '1d'; // Token valido per 1 giorno

// Funzione per generare hash della password
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// Funzione per verificare la password
export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Funzione per generare un token JWT
export async function generateToken(user) {
  // Non includere la password nel token
  const { password, ...userWithoutPassword } = user;
  const token = await new jose.SignJWT(userWithoutPassword)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET);
  return token;
}

// Funzione per verificare un token JWT
export async function verifyToken(token) {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

// Funzione per cercare un utente per username
export async function findUserByUsername(username) {
  try {
    
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await usersPool.query(query, [username]);
    
    return result.rows[0];
  } catch (error) {
    console.error('[ERROR] Auth - Errore nella ricerca utente:', error);
    return null;
  }
}

// Funzione per cercare un utente per ID
export async function findUserById(id) {
  try {
    const result = await usersPool.query(
      'SELECT id, username, email, role FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error finding user by ID:', error);
    return null;
  }
}

// Funzione per creare un nuovo utente
export async function createUser(userData) {
  const { username, password, email, role = 'user' } = userData;
  try {
    const hashedPassword = await hashPassword(password);
    const result = await usersPool.query(
      'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, hashedPassword, email, role]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}