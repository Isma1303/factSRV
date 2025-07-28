"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.getClients = exports.createClient = void 0;
const db_1 = __importDefault(require("../db"));
const createClient = async (req, res) => {
    const { nombre, telefono } = req.body;
    try {
        if (!nombre || !telefono) {
            return res
                .status(400)
                .json({ message: "nombre y telefono son requeridos" });
        }
        const [userSaved] = await (0, db_1.default)("clientes")
            .insert({
            nombre,
            telefono,
        })
            .returning(["id", "nombre"]);
        res.json({
            message: " ✅ Cliente creado correctamente",
            user: userSaved,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error al crear cliente", error });
    }
};
exports.createClient = createClient;
const getClients = async (req, res) => {
    try {
        const clients = await (0, db_1.default)("clientes").select("*");
        res.json({
            message: "✅ Lista de clientes obtenida",
            data: clients,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error al obtener clientes", error });
    }
};
exports.getClients = getClients;
const updateClient = async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono } = req.body;
    if (!nombre && !telefono) {
        return res
            .status(400)
            .json({ message: "❌ Debes enviar al menos un campo para actualizar" });
    }
    const updateFields = {};
    if (nombre)
        updateFields.nombre = nombre;
    if (telefono)
        updateFields.telefono = telefono;
    try {
        const updated = await (0, db_1.default)("clientes")
            .where({ id })
            .update(updateFields)
            .returning("*");
        if (!updated.length) {
            return res.status(404).json({ message: "❌ Cliente no encontrado" });
        }
        res.json({
            message: "✅ Cliente actualizado correctamente",
            data: updated[0],
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error al actualizar cliente", error });
    }
};
exports.updateClient = updateClient;
const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await (0, db_1.default)("clientes").where({ id }).del();
        if (!deleted) {
            return res.status(404).json({ message: "❌ Cliente no encontrado" });
        }
        res.json({
            message: "✅ Cliente eliminado correctamente",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Error al eliminar cliente", error });
    }
};
exports.deleteClient = deleteClient;
