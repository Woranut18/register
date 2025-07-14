// src/lib/database.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hospital',
  password: 'password_jel', // ← เปลี่ยนตามจริง
  port: 5432,
});

export default pool;
