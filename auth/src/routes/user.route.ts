import { Router } from "express";

import { usersignup, loginUser, verifyEmail, resetpasswordreqbyemail, resetpassword,  sendVerificationEmail } from "../controllers";
import { protect } from "../middlewares";

const router = Router();

router.post("/signup", usersignup);
router.post("/signin", loginUser);
router.get("/verify",verifyEmail);
//router.post("/getmail",sendVerificationEmail)
router.post("/resetemail", resetpasswordreqbyemail)
router.post("/reset",resetpassword)
router.get("/verifyreq",protect, sendVerificationEmail)
export { router as userrouter };