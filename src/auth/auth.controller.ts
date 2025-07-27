import db from "../db";
import { createAcccesToken } from "../libs/jwt";
import { Request, Response } from "express";
import { IUser } from "./auth.interface";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  try {
    const user = await db("users").where({ user_name: userName }).first();
    if (!user) {
      return res.status(404).json({ message: " Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: " Contraseña incorrecta" });
    }

    const token = await createAcccesToken({ id: user.id });

    res.cookie("token", token, { httpOnly: true, secure: true });
    res.json({
      message: " Login exitoso",
      user: {
        id: user.id,
        userName: user.user_name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Error en login", error });
  }
};

export const register = async (req: Request, res: Response) => {
  const { userName, password } = req.body as unknown as IUser;
  async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  try {
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "userName y password son requeridos" });
    }
    const hashedPassword = await hashPassword(password);

    const [userSaved] = await db("users")
      .insert({
        user_name: userName,
        password: hashedPassword,
      })
      .returning(["id", "user_name"]);

    const token = await createAcccesToken({
      id: userSaved.id,
    });

    res.cookie("token", token, { httpOnly: true, secure: true });
    res.json({
      message: " Usuario creado correctamente",
      user: userSaved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Error al crear usuario", error });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};
