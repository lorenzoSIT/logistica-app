-- Crea la tabella utenti se non esiste
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserisci un utente di test (password: admin123)
-- La password è già hashata con bcrypt
INSERT INTO users (username, password, email, role)
VALUES 
  ('admin', '$2a$10$X6r0GQS2gUh5xXV9XBnAie1Q5wlW0EFzpgZytGkY7iuYoxyZ0.5jm', 'admin@example.com', 'admin')
ON CONFLICT (username) DO NOTHING;