import express from "express";
import verifyToken from "../middlewares/verify_token";
import userController from "../controllers/user";
import {isAdmin, isAdminOrModerator} from "../middlewares/verify_roles"
let router = express.Router();
// Đây là middlewares nên chạy trước hàm getCurrentUser
router.use(verifyToken)
// Chạy xong verify token sẽ chạy vào phân quyền user
// router.use(isAdminOrModerator);


router.get("/verify", userController.getCurrentUser)


module.exports = router;
