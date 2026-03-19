/**
 * Database Configuration Module
 * 
 * This module sets up and manages a PostgreSQL connection pool using the `pg` library.
 * It leverages environment variables for secure configuration and includes an asynchronous
 * verification function to confirm connectivity at startup.
 */
import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load environment variables from .env file
dotenv.config();

// PostgreSQL connection pool configuration using environment variables
const pool = new Pool({
    user : process.env.DB_user,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : Number(process.env.DB_PORT)
});


/**
 * Asynchronously verifies the PostgreSQL connection.
 * Ensures that any issues are logged immediately at application startup.
 */

export const verifyConnection = async (): Promise<void> => {
    try {
        const client = await pool.connect();
        console.log("Connected to User Database");
        client.release();
    } catch (error) {
        console.error("Error Connecting to Database", error);
    }
};



export default pool;
