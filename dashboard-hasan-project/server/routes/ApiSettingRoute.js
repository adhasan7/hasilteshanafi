import { Router } from "express";
import {
  getApiSettings,
  getApiSettingById,
  createApiSetting,
  updateApiSetting,
  deleteApiSetting,
} from "../controllers/ApiSetting.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = Router();

// router.get("/apisettings", verifyUser, getApiSettings);
// router.get("/apisettings/:id", verifyUser, getApiSettingById);
// router.post("/apisettings", verifyUser, adminOnly, createApiSetting);
// router.patch("/apisettings/:id", verifyUser, adminOnly, updateApiSetting);
// router.put("/apisettings/:id", verifyUser, adminOnly, updateApiSetting);
// router.delete("/apisettings/:id", verifyUser, adminOnly, deleteApiSetting);

router.get("/", verifyUser, getApiSettings);
router.get("/:id", verifyUser, getApiSettingById);
router.post("", createApiSetting);
router.patch("/:id", verifyUser, adminOnly, updateApiSetting);
router.put("/:id", verifyUser, adminOnly, updateApiSetting);
router.delete("/:id", verifyUser, adminOnly, deleteApiSetting);

export default router;
