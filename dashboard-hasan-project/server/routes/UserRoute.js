import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = Router();

router.get("/", verifyUser, adminOnly, getUsers);
router.get("/:id", verifyUser, adminOnly, getUserById);
router.post("/", verifyUser, adminOnly, createUser);
router.post("/new", createUser);
router.patch("/:id", verifyUser, adminOnly, updateUser);
router.put("/:id", verifyUser, adminOnly, updateUser);
router.delete("/:id", verifyUser, adminOnly, deleteUser);

export default router;
