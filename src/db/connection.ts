import mysql from "mysql2/promise";
import type { Pool } from "mysql2/promise";

const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST || "172.18.176.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "M@sterkey1",
  database: process.env.DB_NAME || "star_wars",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
