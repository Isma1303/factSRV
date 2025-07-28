"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAb = exports.updateAb = exports.getAb = exports.createAb = void 0;
const db_1 = __importDefault(require("../db"));
const createAb = async (req, res) => {
    const { compra_id, cliente_id, monto_abono, fecha_abono, description } = req.body;
    try {
        if (!compra_id || !monto_abono) {
            return res.status(400).json({ message: "compra y monto son requeridos" });
        }
        const [montSaved] = await (0, db_1.default)("abonos")
            .insert({
            compra_id,
            cliente_id,
            monto_abono,
            fecha_abono,
            description,
        })
            .returning(["id", "description"]);
        res.json({
            message: " ✅abonos creado correctamente",
            user: montSaved,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error al crear abono", error });
    }
};
exports.createAb = createAb;
const getAb = async (req, res) => {
    try {
        const abonos = await (0, db_1.default)("abonos").select("*");
        res.json({
            message: "✅ Lista de abonos obtenida",
            data: abonos,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error al obtener abonos", error });
    }
};
exports.getAb = getAb;
const updateAb = async (req, res) => {
    const { id } = req.params;
    const { compra_id, monto_abono, cliente_id, fecha_abono, description } = req.body;
    try {
        const updated = await (0, db_1.default)("abonos")
            .where({ id })
            .update({ compra_id, monto_abono, fecha_abono, description, cliente_id })
            .returning("*");
        if (!updated.length) {
            return res.status(404).json({ message: "❌ Abonos no encontrado" });
        }
        res.json({
            message: "✅ Abonos actualizado correctamente",
            data: updated[0],
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error al actualizar abonos", error });
    }
};
exports.updateAb = updateAb;
const deleteAb = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await (0, db_1.default)("abonos").where({ id }).del();
        if (!deleted) {
            return res.status(404).json({ message: "❌ Abonos no encontrado" });
        }
        res.json({
            message: "✅ Abonos eliminado correctamente",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error al eliminar abonos", error });
    }
};
exports.deleteAb = deleteAb;
