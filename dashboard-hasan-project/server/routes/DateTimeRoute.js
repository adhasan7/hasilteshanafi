import { Router } from "express";
import {
  getDateTimes,
  getDateTimeById,
  createDateTime,
  updateDateTime,
  deleteDateTime,
} from "../controllers/DateTime.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = Router();

router.get("/", verifyUser, getDateTimes);
router.get("/:id", verifyUser, getDateTimeById);
router.post("/", verifyUser, adminOnly, createDateTime);
router.patch("/:id", verifyUser, adminOnly, updateDateTime);
router.put("/:id", verifyUser, adminOnly, updateDateTime);
router.delete("/:id", verifyUser, adminOnly, deleteDateTime);

export default router;
