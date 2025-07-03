import express from "express";
import apiRouter from "./routes/router";
import pool from "../db/connection";
import type { RowDataPacket } from "mysql2";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use("/api", apiRouter);

interface NowRow extends RowDataPacket {
  now: Date;
}

const testDbConnection = async () => {
  try {
    const [rows] = await pool.query<NowRow[]>("SELECT NOW() AS now");
    console.log("✅ Database connected:", rows[0].now);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
};

async function startServer() {
  await testDbConnection();
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
}

startServer();
