import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

let pool;

const initDb = () => {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
};

const getConnection = () => pool;

export default {
  initDb,
  getConnection,
};
