import { Router } from "express";
import { signup } from "./controllers/Signup.controller";
import { login } from "./controllers/Login.controller";



const router = Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;