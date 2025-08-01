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

app.use(cors());
db();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authroutes, clientRoutes, abonosRoutes, saleRoutes);

export default app;
