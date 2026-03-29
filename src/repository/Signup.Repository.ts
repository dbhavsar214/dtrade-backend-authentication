import pool from "../config/DB";
import type { UserRegistration } from "../types";

export const findbyUserEmail = async (userEmail: string) => {
  try {
    
    const result = await pool.query(
      "SELECT 1 FROM Users WHERE email = $1 LIMIT 1",
      [userEmail],
    ); 

    return result.rowCount === 1;

  } catch (error) {
    throw new Error("Error Finding User in Database");
  }
};

export const createUser = async (data: UserRegistration) => {
  try {
    
    const query = `
      INSERT INTO Users 
      (first_name, last_name, email, password, registration_time)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
   
    const values = [
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.registrationTime,
    ];
    
    const result = await pool.query(query, values);

    return result.rows[0];

  } catch (error: any) {
    if (error.code === "23505") {
      throw new Error("DB_DUPLICATE_EMAIL", error);
    }
    console.error("ERROR INSERTING USER IN DATABASE", error)
    throw new Error("ERROR_INSERTING_USER_IN_DATABASE", error);
  }
};
   