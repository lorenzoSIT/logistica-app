// lib/db.js
import pg from 'pg';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { sequelize } from '../models/index.js';

// Ottieni il percorso corrente per ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carica le variabili d'ambiente dal file .env.local
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const { Pool } = pg;

// Configurazione pool per database utenti (mantenuta per retrocompatibilità)
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

// Inizializza Sequelize (senza alterare il database esistente)
sequelize.sync({ alter: false })
  .then(() => {
    console.log('[DEBUG] Modelli Sequelize sincronizzati con il database.');
  })
  .catch(err => {
    console.error('[ERROR] Errore nella sincronizzazione dei modelli:', err);
  });

export default usersPool;