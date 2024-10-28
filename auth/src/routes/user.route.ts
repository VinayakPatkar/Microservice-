import { Router } from "express";

import { usersignup, loginUser, verifyEmail, resetpasswordreqbyemail, resetpassword } from "../controllers";

const router = Router();

router.post("/signup", usersignup);
router.post("/signin", loginUser);
router.get("/verify",verifyEmail);
//router.post("/getmail",sendVerificationEmail)
router.post("/resetemail", resetpasswordreqbyemail)
router.post("/reset",resetpassword)
export { router as userrouter };