const express = require('express'); // Import Express for building the API
const { Pool } = require('pg'); // Import PostgreSQL client
const cors = require('cors');

const app = express(); // Create an Express app
const port = 5000;

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// PostgreSQL Connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'namedb',
  password: 'situndsort',
  port: 5432,
});

// Health check endpoint for Kubernetes probes and monitoring
app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

// Get all users from the database
app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users'); // Query the users table
    res.json(rows); // Send users as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add a new user to the database
app.post('/users', async (req, res) => {
  const { name } = req.body; // Get name from request body
  console.log("Empfangen:", req.body);

  if(!name) return res.status(400).json({error: "name fehlt"});

  try {
    // Insert user and return the new record
    const result = await pool.query('INSERT INTO users(name) VALUES($1) RETURNING *', [name]);
    console.log("Eingefügt:", result.rows[0]);
    res.json(result.rows[0]); // Send the new user as JSON
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({error: 'Datenbankfehler'});
  }
});

// Start the server on port 3000
app.listen(port, () => console.log(`Backend running on port ${port}`));