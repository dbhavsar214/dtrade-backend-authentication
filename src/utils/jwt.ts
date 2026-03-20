import jwt from "jsonwebtoken";
import { AuthenticatedUser } from "../types";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userLoginInfo: AuthenticatedUser) => {
  return jwt.sign(
    {
      id: userLoginInfo.id,
      email: userLoginInfo.email,
    },
    process.env.JWT_SECERET_KEY as string,
    {
      expiresIn: "10h",
    },
  );
};
