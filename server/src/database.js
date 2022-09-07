import mysql from "mysql2/promise";
// import { config } from "./config";

export const connect = async () => {
  return await mysql.createConnection(
    {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATA_BASE
    }
  );
};