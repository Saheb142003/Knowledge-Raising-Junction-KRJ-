import { Router } from "express";

import { verifyJWT } from "../../../Middlewares/auth.middleware.js";
import { getCurrentUser, loginUser, logoutUser } from "../../../Controllers/Management/User/User.Controllers.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/me").get(verifyJWT, getCurrentUser);
 
export default router;
