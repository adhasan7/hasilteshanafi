import { Router } from "express";
import { Login, logOut, Me } from "../controllers/Auth.js";

const router = Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", logOut);

export default router;
