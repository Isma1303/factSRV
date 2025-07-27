import db from "../db";
import { Request, Response } from "express";
import { ICompras } from "./compras.interface";

export const create = async (req: Request, res: Response) => {
  const { cliente_id, monto_total, fecha_compra, nombre_compra, pagado } =
    req.body as unknown as ICompras;
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
    const [salesaved] = await db("compras")
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al crear compra", error });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const compras = await db("compras").select("*");

    res.json({
      message: "✅ Lista de compras obtenida",
      data: compras,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al obtener compras", error });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cliente_id, monto_total, fecha_compra, nombre_compra, pagado } =
    req.body;

  try {
    const update = await db("compras")
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al actualizar compras", error });
  }
};

export const deleted = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await db("compras").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ message: "❌ compras no encontrado" });
    }

    res.json({
      message: "✅ compras eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al eliminar compras", error });
  }
};
