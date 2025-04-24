// hash-password.js
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  console.log(`Password originale: ${password}`);
  console.log(`Password hash: ${hash}`);
  
  // Verifica hash
  const isValid = await bcrypt.compare(password, hash);
  console.log(`Hash valido: ${isValid}`);
  
  // Crea query SQL
  console.log(`\nSQL per inserire utente con questa password:`);
  console.log(`
INSERT INTO users (username, password, email, role)
VALUES ('admin', '${hash}', 'admin@example.com', 'admin')
ON CONFLICT (username) DO UPDATE SET password = '${hash}';
  `);
}

// Genera hash per "admin123"
hashPassword('admin123');