import db from "../db";
import { Request, Response } from "express";
import { IAbonos } from "./abonos.interface";

export const createAb = async (req: Request, res: Response) => {
  const { compra_id, cliente_id, monto_abono, fecha_abono, description } =
    req.body as IAbonos;
  try {
    if (!compra_id || !monto_abono) {
      return res.status(400).json({ message: "compra y monto son requeridos" });
    }
    const [montSaved] = await db("abonos")
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al crear abono", error });
  }
};

export const getAb = async (req: Request, res: Response) => {
  try {
    const abonos = await db("abonos").select("*");

    res.json({
      message: "✅ Lista de abonos obtenida",
      data: abonos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al obtener abonos", error });
  }
};

export const updateAb = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { compra_id, monto_abono, cliente_id, fecha_abono, description } =
    req.body;

  try {
    const updated = await db("abonos")
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al actualizar abonos", error });
  }
};

export const deleteAb = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await db("abonos").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ message: "❌ Abonos no encontrado" });
    }

    res.json({
      message: "✅ Abonos eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al eliminar abonos", error });
  }
};
