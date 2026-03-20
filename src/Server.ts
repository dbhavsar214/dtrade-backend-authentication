import express from "express";
import type { Express } from "express";
import router from "./routes";
import pool,  {verifyConnection} from "./config/DB";



const app = express();

app.use(express.json());
app.use("/auth", router)

export const startServer = async () => {
    await verifyConnection();

};
export default app;
