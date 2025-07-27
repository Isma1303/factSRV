import jwt from "jsonwebtoken";
import { IJwt } from "../interface/jwt.interface";
import dotenv from "dotenv";
dotenv.config();

export function createAcccesToken(payload: object): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) console.log(err);
        resolve(token!);
      }
    );
  });
}
