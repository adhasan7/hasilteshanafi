import { Router } from "express";
import {
  getWorkdays,
  getWorkdayById,
  createWorkday,
  updateWorkday,
  deleteWorkday,
} from "../controllers/Workday.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = Router();

router.get("/", verifyUser, getWorkdays);
router.get("/:id", getWorkdayById);
router.post("/", verifyUser, adminOnly, createWorkday);
router.patch("/:id", updateWorkday);
router.put("/:id", updateWorkday);
router.delete("/:id", verifyUser, adminOnly, deleteWorkday);

export default router;
