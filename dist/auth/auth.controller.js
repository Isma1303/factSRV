"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const db_1 = __importDefault(require("../db"));
const jwt_1 = require("../libs/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await (0, db_1.default)("users").where({ user_name: userName }).first();
        if (!user) {
            return res.status(404).json({ message: " Usuario no encontrado" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: " Contraseña incorrecta" });
        }
        const token = await (0, jwt_1.createAcccesToken)({ id: user.id });
        res.cookie("token", token, { httpOnly: true, secure: true });
        res.json({
            message: " Login exitoso",
            user: {
                id: user.id,
                userName: user.user_name,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: " Error en login", error });
    }
};
exports.login = login;
const register = async (req, res) => {
    const { userName, password } = req.body;
    async function hashPassword(password) {
        const salt = await bcrypt_1.default.genSalt(10);
        return bcrypt_1.default.hash(password, salt);
    }
    try {
        if (!userName || !password) {
            return res
                .status(400)
                .json({ message: "userName y password son requeridos" });
        }
        const hashedPassword = await hashPassword(password);
        const [userSaved] = await (0, db_1.default)("users")
            .insert({
            user_name: userName,
            password: hashedPassword,
        })
            .returning(["id", "user_name"]);
        const token = await (0, jwt_1.createAcccesToken)({
            id: userSaved.id,
        });
        res.cookie("token", token, { httpOnly: true, secure: true });
        res.json({
            message: " Usuario creado correctamente",
            user: userSaved,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: " Error al crear usuario", error });
    }
};
exports.register = register;
const logout = (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    return res.sendStatus(200);
};
exports.logout = logout;
