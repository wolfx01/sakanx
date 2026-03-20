require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

async function main() {
  try {
    const res = await pool.query(
      `ALTER TABLE residences ADD COLUMN IF NOT EXISTS amenities text[] DEFAULT '{}';`
    );
    console.log("Column added successfully!");
  } catch (err) {
    console.error("Error executing query:", err);
  } finally {
    process.exit(0);
  }
}

main();
