// lib/db.js
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Carica le variabili d'ambiente
dotenv.config();

// Log delle configurazioni del database (senza password per sicurezza)

// Configurazione pool per database utenti
const usersPool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'logistics',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Test della connessione
usersPool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('[ERROR] Connessione al database fallita:', err.message);
  } else {
    console.log('[DEBUG] Connessione al database riuscita:', res.rows[0].now);
  }
});

export default usersPool;