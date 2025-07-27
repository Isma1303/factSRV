import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

declare global {
  namespace Express {
    export interface Request {
      user?: string | JwtPayload;
    }
  }
}

export const authRequire = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "❌ Acceso no autorizado. Inicia sesión para obtener un token.",
    });
  }

  const secret = process.env.SECRET_KEY;
  if (!secret) {
    throw new Error("SECRET_KEY no está definido en .env");
  }

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "❌ Token inválido" });

    req.user = decoded as JwtPayload;

    next();
  });
};
