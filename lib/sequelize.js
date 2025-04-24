// lib/sequelize.js
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Ottieni il percorso corrente per ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carica le variabili d'ambiente dal file .env
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Configurazione Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'logistics',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false, // Disabilita timestamps automatici
      underscored: true, // Usa lo stile snake_case per i nomi dei campi
    }
  }
);

// Test della connessione
sequelize.authenticate()
  .then(() => {
    console.log('[DEBUG] Connessione Sequelize stabilita con successo.');
  })
  .catch(err => {
    console.error('[ERROR] Impossibile connettersi al database:', err);
  });

export default sequelize;