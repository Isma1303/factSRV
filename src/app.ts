import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import db from "./db";
import cors from "cors";
import authroutes from "./auth/auth.route";
import clientRoutes from "./client/client.route";
import abonosRoutes from "./abonos/abonos.route";
import saleRoutes from "./compras/compras.route";
import dotenv from "dotenv";

dotenv.config();

const app = express();

db();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173/",
    credentials: true,
  })
);

app.use("/api", authroutes, clientRoutes, abonosRoutes, saleRoutes);

export default app;
