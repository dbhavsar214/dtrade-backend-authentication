import express from "express";
import type { Express } from "express";
import router from "./routes";
import pool,  {verifyConnection} from "./config/DB";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();

app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/auth", router)


export const startServer = async () => {
    await verifyConnection();

};
export default app;
