import express from "express";
import homeController from "../controllers/homeController";
import authController from "../controllers/auth";
let router = express.Router();


router.post('/register', authController.register)
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);

module.exports = router