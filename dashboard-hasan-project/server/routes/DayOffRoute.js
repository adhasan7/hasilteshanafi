import { Router } from "express";
import {
  getDayOffs,
  getDayOffById,
  createDayOff,
  updateDayOff,
  deleteDayOff,
  getDayOffByDate,
} from "../controllers/DayOff.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = Router();

router.get("/", getDayOffs);
router.get("/:id", getDayOffById);
router.get("/:id/:date", getDayOffByDate);
router.post("/", verifyUser, adminOnly, createDayOff);
router.patch("/:id", verifyUser, adminOnly, updateDayOff);
router.put("/:id", verifyUser, adminOnly, updateDayOff);
router.delete("/:id", verifyUser, adminOnly, deleteDayOff);

export default router;
