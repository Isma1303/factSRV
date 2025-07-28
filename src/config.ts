import dotenv from "dotenv";
dotenv.config();

export const config = {
  corsUrl: process.env.CORS,
};
