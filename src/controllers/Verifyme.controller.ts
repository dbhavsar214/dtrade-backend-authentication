import { success } from "zod";
import { verifyMe } from "../utils/jwt";
import { Request, Response } from "express";
import { tr } from "zod/v4/locales";

export const verifyUser = (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  const verifiedUser = verifyMe(token);

  if (!verifiedUser) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }

  return res.status(200).json({ success: true });
};

