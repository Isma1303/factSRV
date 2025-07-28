"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequire = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authRequire = (req, res, next) => {
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
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: "❌ Token inválido" });
        req.user = decoded;
        next();
    });
};
exports.authRequire = authRequire;
