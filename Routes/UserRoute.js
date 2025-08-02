import express from "express"
import SignUp from "../controllers/SignUp.js";
import LogIn from "../controllers/LogIn.js";
import getUser from "../controllers/getUser.js";
import updateUser from "../controllers/updateUser.js";


const router = express.Router();




router.post("/signUp",SignUp)
router.post("/login",LogIn)
router.post("/getUser",getUser)
router.post("/updateUser",updateUser)

export default router

