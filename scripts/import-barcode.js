// scripts/import-barcode.js
import path from 'path';
import { fileURLToPath } from 'url';
import { importBarcodeFromPublic } from '../lib/services/importService.js';

// Ottieni il percorso corrente per ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runImport() {
  if (process.argv.length < 3) {
    console.error('Utilizzo: node import-barcode.js <nome-file-in-public>');
    process.exit(1);
  }

  const fileName = process.argv[2];
  
  try {
    console.log(`Importazione file da public: ${fileName}`);
    
    const result = await importBarcodeFromPublic(fileName, {
      delimiter: ';',
      headerRow: false,
      continueOnError: true
    });
    
    console.log(result.message);
    console.log(`Totale righe: ${result.stats.total}`);
    console.log(`Successo: ${result.stats.success}`);
    console.log(`Errori: ${result.stats.errors}`);
    
    if (result.stats.errors > 0) {
      console.log('\nDettaglio errori:');
      result.stats.errorItems.forEach(item => {
        console.log(`- Riga ${item.row}: ${item.error}`);
        console.log(`  Dati: ${item.data}`);
      });
    }
    
  } catch (error) {
    console.error('Errore:', error.message);
    process.exit(1);
  }
}

runImport();