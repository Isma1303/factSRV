"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleted = exports.update = exports.get = exports.create = void 0;
const db_1 = __importDefault(require("../db"));
const create = async (req, res) => {
    const { cliente_id, monto_total, fecha_compra, nombre_compra, pagado } = req.body;
    try {
        const errors = [];
        if (!cliente_id || cliente_id === null || cliente_id === undefined) {
            errors.push("El ID del cliente es requerido");
        }
        if (!monto_total || monto_total === null || monto_total === undefined) {
            errors.push("El monto total es requerido");
        }
        if (!nombre_compra) {
            errors.push("El nombre de la compra es requerido");
        }
        if (errors.length > 0) {
            return res.status(400).json({
                message: errors.join(", "),
                validationErrors: errors,
            });
        }
        if (!cliente_id || cliente_id === null) {
            return res
                .status(400)
                .json({ message: "El ID del cliente es requerido" });
        }
        if (!monto_total || monto_total === null) {
            return res.status(400).json({ message: "El monto total es requerido" });
        }
        const [salesaved] = await (0, db_1.default)("compras")
            .insert({
            cliente_id,
            monto_total,
            fecha_compra,
            pagado,
            nombre_compra,
        })
            .returning(["id", "cliente_id"]);
        res.json({
            message: " ✅ compra creada correctamente",
            user: salesaved,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error al crear compra", error });
    }
};
exports.create = create;
const get = async (req, res) => {
    try {
        const compras = await (0, db_1.default)("compras").select("*");
        res.json({
            message: "✅ Lista de compras obtenida",
            data: compras,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error al obtener compras", error });
    }
};
exports.get = get;
const update = async (req, res) => {
    const { id } = req.params;
    const { cliente_id, monto_total, fecha_compra, nombre_compra, pagado } = req.body;
    try {
        const update = await (0, db_1.default)("compras")
            .where({ id })
            .update({ cliente_id, monto_total, fecha_compra, nombre_compra, pagado })
            .returning("*");
        if (!update.length) {
            return res.status(404).json({ message: "❌ compras no encontrado" });
        }
        res.json({
            message: "✅ Compra actualizado correctamente",
            data: update[0],
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error al actualizar compras", error });
    }
};
exports.update = update;
const deleted = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await (0, db_1.default)("compras").where({ id }).del();
        if (!deleted) {
            return res.status(404).json({ message: "❌ compras no encontrado" });
        }
        res.json({
            message: "✅ compras eliminado correctamente",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error al eliminar compras", error });
    }
};
exports.deleted = deleted;
