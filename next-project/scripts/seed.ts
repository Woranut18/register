const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hospital',
  password: 'password_jel',
  port: 5432,
});

async function seed() {
  console.log("🌱 Seeding database...");

  // 1. users table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK (role IN ('doctor', 'staff')) NOT NULL
    );
  `);

  const hashDoctor = await bcrypt.hash('1234', 10);
  const hashStaff = await bcrypt.hash('5678', 10);

  await pool.query(`
    INSERT INTO users (username, password, role) VALUES
      ('doctor1', $1, 'doctor'),
      ('staff1', $2, 'staff')
    ON CONFLICT (username) DO NOTHING;
  `, [hashDoctor, hashStaff]);

  // 2. drug_requests table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS drug_requests (
      id SERIAL PRIMARY KEY,
      doctor_name TEXT NOT NULL,
      drug_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit TEXT NOT NULL,
      date DATE NOT NULL,
      status TEXT CHECK (status IN ('pending', 'approved', 'completed', 'rejected')) NOT NULL
    );
  `);

  await pool.query(`
    INSERT INTO drug_requests (doctor_name, drug_name, quantity, unit, date, status) VALUES
      ('Dr. Smith', 'Paracetamol', 50, 'tablets', '2024-07-05', 'pending'),
      ('Dr. Johnson', 'Amoxicillin', 25, 'capsules', '2024-07-05', 'approved'),
      ('Dr. Brown', 'Insulin', 10, 'vials', '2024-07-04', 'completed')
    ON CONFLICT DO NOTHING;
  `);

  // 3. equipment_requests table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS equipment_requests (
      id SERIAL PRIMARY KEY,
      doctor_name TEXT NOT NULL,
      equipment_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      date DATE NOT NULL,
      status TEXT CHECK (status IN ('pending', 'approved', 'completed', 'rejected')) NOT NULL
    );
  `);

  await pool.query(`
    INSERT INTO equipment_requests (doctor_name, equipment_name, quantity, date, status) VALUES
      ('Dr. Wilson', 'Stethoscope', 2, '2024-07-05', 'pending'),
      ('Dr. Davis', 'Blood Pressure Monitor', 1, '2024-07-04', 'approved')
    ON CONFLICT DO NOTHING;
  `);

  // 4. drug_inventory table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS drug_inventory (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit TEXT NOT NULL,
      expiry DATE NOT NULL,
      category TEXT NOT NULL,
      min_stock INTEGER NOT NULL
    );
  `);

  await pool.query(`
    INSERT INTO drug_inventory (id, name, quantity, unit, expiry, category, min_stock) VALUES
      ('D001', 'Paracetamol', 500, 'tablets', '2025-12-31', 'Analgesic', 100),
      ('D002', 'Amoxicillin', 250, 'capsules', '2025-08-15', 'Antibiotic', 50),
      ('D003', 'Insulin', 45, 'vials', '2025-03-20', 'Hormone', 20),
      ('D004', 'Ibuprofen', 320, 'tablets', '2025-11-10', 'Anti-inflammatory', 80)
    ON CONFLICT (id) DO NOTHING;
  `);

  // 5. equipment_inventory table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS equipment_inventory (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      category TEXT NOT NULL,
      min_stock INTEGER NOT NULL
    );
  `);

  await pool.query(`
    INSERT INTO equipment_inventory (id, name, quantity, category, min_stock) VALUES
      ('E001', 'Stethoscope', 25, 'Diagnostic', 5),
      ('E002', 'Blood Pressure Monitor', 15, 'Monitoring', 3),
      ('E003', 'Thermometer', 50, 'Diagnostic', 10),
      ('E004', 'Syringe', 200, 'Consumable', 50)
    ON CONFLICT (id) DO NOTHING;
  `);

  console.log("✅ Done seeding all tables.");
  process.exit(0);
}

seed();
