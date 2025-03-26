CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO users (id, name) VALUES ('1', 'Alice');
INSERT INTO users (id, name) VALUES ('2', 'Bob');

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert some test data
INSERT INTO messages (content) VALUES
  ('Hello from D1!'),
  ('Welcome to Cloudflare Fullstack Starter!');
