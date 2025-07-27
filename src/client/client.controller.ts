import { Request, Response } from "express";
import { IClient } from "./client.interface";
import db from "../db";

export const createClient = async (req: Request, res: Response) => {
  const { nombre, telefono } = req.body as unknown as IClient;
  try {
    if (!nombre || !telefono) {
      return res
        .status(400)
        .json({ message: "nombre y telefono son requeridos" });
    }
    const [userSaved] = await db("clientes")
      .insert({
        nombre,
        telefono,
      })
      .returning(["id", "nombre"]);
    res.json({
      message: " ✅ Cliente creado correctamente",
      user: userSaved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al crear cliente", error });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await db("clientes").select("*");

    res.json({
      message: "✅ Lista de clientes obtenida",
      data: clients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al obtener clientes", error });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, telefono } = req.body;

  if (!nombre && !telefono) {
    return res
      .status(400)
      .json({ message: "❌ Debes enviar al menos un campo para actualizar" });
  }

  const updateFields: Record<string, any> = {};
  if (nombre) updateFields.nombre = nombre;
  if (telefono) updateFields.telefono = telefono;

  try {
    const updated = await db("clientes")
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al actualizar cliente", error });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await db("clientes").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ message: "❌ Cliente no encontrado" });
    }

    res.json({
      message: "✅ Cliente eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al eliminar cliente", error });
  }
};
