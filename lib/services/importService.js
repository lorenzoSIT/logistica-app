// lib/services/importService.js
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import Barcode from '../../models/Barcode.js';
import { Readable } from 'stream';

/**
 * Importa dati barcode da un file CSV nella cartella public
 * @param {string} fileName - Nome del file nella cartella public
 * @param {Object} options - Opzioni di importazione
 * @returns {Promise<Object>} - Risultato dell'importazione
 */
export async function importBarcodeFromPublic(fileName, options = {}) {
  // Costruisci il percorso completo del file
  const filePath = path.join(process.cwd(), 'public', fileName);
  
  // Verifica che il file esista
  if (!fs.existsSync(filePath)) {
    throw new Error(`File non trovato: ${filePath}`);
  }
  
  // Utilizza il servizio di importazione esistente
  return importBarcodeCSV(filePath, options);
}

/**
 * Importa dati barcode da un file CSV
 * @param {Buffer|string} fileContent - Contenuto del file o percorso
 * @param {Object} options - Opzioni di importazione
 * @returns {Promise<Object>} - Risultato dell'importazione
 */
export async function importBarcodeCSV(fileContent, options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      // Statistiche di importazione
      const stats = {
        total: 0,
        success: 0,
        errors: 0,
        errorItems: []
      };

      // Configurazione parser CSV
      const parserOptions = {
        delimiter: options.delimiter || ';',
        skipEmptyLines: true,
        from_line: options.headerRow ? 2 : 1, // Salta intestazione se presente
      };

      // Crea stream dal buffer o file
      let dataStream;
      if (typeof fileContent === 'string') {
        // È un percorso file
        dataStream = fs.createReadStream(fileContent);
      } else {
        // È un buffer (caricamento file)
        dataStream = Readable.from(fileContent.toString());
      }

      // Crea il parser
      const parser = dataStream.pipe(parse(parserOptions));

      // Processa le righe
      for await (const row of parser) {
        stats.total++;
        
        try {
          // Validazione riga
          if (row.length < 6) {
            throw new Error(`Riga con dati insufficienti: ${row.join(';')}`);
          }

          // Mappa i campi come nell'esempio Laravel
          // Si assume che l'ordine dei campi nel CSV sia:
          // [0] bccolle, [1] bcart, [2] bccol, [3] bcpostag, [4] bctaglia, [5] bccode, [?] altri campi ignorati
          
          const barcodeData = {
            bccolle: parseInt(row[0]),
            bcart: row[1].replace(/"/g, ''), // Rimuove le virgolette
            bccol: parseInt(row[2]),
            bcpostag: parseInt(row[3]),
            bctaglia: row[4].replace(/"/g, ''), // Rimuove le virgolette
            bccode: row[5].replace(/"/g, ''), // Rimuove le virgolette
            created_at: new Date(),
            updated_at: new Date('1970-01-01')
          };

          // Inserisci o aggiorna il record
          await Barcode.upsert(barcodeData, {
            conflictFields: ['bccode'] // Chiave primaria
          });

          stats.success++;
        } catch (error) {
          stats.errors++;
          stats.errorItems.push({
            row: stats.total,
            data: row.join(';'),
            error: error.message
          });
          
          console.error(`Errore importazione riga ${stats.total}:`, error);
          
          // Se l'opzione continueOnError è false, interrompi l'importazione
          if (options.continueOnError === false) {
            throw error;
          }
        }
      }

      resolve({
        message: `Importazione completata: ${stats.success} record importati, ${stats.errors} errori`,
        stats
      });

    } catch (error) {
      reject(error);
    }
  });
}