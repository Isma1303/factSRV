import knex from "knex";
import knexConfig from "./knexfile";

const db = knex(knexConfig);

async function testConnection() {
  try {
    await db.raw("select 1+1 as result");
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
}

testConnection();

export default db;
