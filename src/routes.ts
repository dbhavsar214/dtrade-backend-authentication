import { Router } from "express";
import { signup } from "./controllers/Signup.controller";
import { login } from "./controllers/Login.controller";
import {  verifyUser } from "./controllers/Verifyme.controller";
import { logoutUser } from "./controllers/Logout.controller";



const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verifyme", verifyUser);
router.post("/logout", logoutUser)

export default router;