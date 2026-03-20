import pool from "../config/DB";
import type { UserLogin } from "../types";

export const findbyUserEmail = async (userEmail: string) => {
  try {
    const result = await pool.query(
      "SELECT id, email, password from Users where email = $1 LIMIT 1",
      [userEmail],
    );

    return result.rows[0];
  } catch (error) {
    throw new Error("ERROR_FINDING_USER_IN_DATABASE");
  }
};
