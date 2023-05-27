import { Router } from "express";
import ApiSettingRoute from "./ApiSettingRoute.js";
import AuthRoute from "./AuthRoute.js";
import DateTimeRoute from "./DateTimeRoute.js";
import DayOffRoute from "./DayOffRoute.js";
import LedTextRoute from "./LedTextRoute.js";
import UserRoute from "./UserRoute.js";
import WorkdayRoute from "./WorkdayRoute.js";

const router = Router();

router.use("/apisettings", ApiSettingRoute);
router.use("/auth", AuthRoute);
router.use("/datetimes", DateTimeRoute);
router.use("/dayoffs", DayOffRoute);
router.use("/ledtexts", LedTextRoute);
router.use("/users", UserRoute);
router.use("/workdays", WorkdayRoute);

export default router;
