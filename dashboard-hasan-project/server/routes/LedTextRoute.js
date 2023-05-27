import { Router } from "express";
import {
  getLedTexts,
  getLedTextById,
  createLedText,
  updateLedText,
  deleteLedText,
} from "../controllers/LedText.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = Router();

router.get("/", verifyUser, getLedTexts);
router.get("/:id", verifyUser, getLedTextById);
router.post("/", verifyUser, adminOnly, createLedText);
router.patch("/:id", verifyUser, adminOnly, updateLedText);
router.put("/:id", verifyUser, adminOnly, updateLedText);
router.delete("/:id", verifyUser, adminOnly, deleteLedText);

export default router;
