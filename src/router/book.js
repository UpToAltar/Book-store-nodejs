import express from "express";
import { isAdmin, isAdminOrCreator } from "../middlewares/verify_roles";
import verifyToken from "../middlewares/verify_token";
import getBookController from "../controllers/book";
import upLoadFile from "../middlewares/cloudinary-upload";
let router = express.Router();

router.get("/get", getBookController.getBooks);


// * Chỉ cho Admin post
router.use(verifyToken);
router.use(isAdminOrCreator)
router.post("/post", upLoadFile.single("image"), getBookController.postBooks);
router.put("/update", upLoadFile.single("image"), getBookController.updateBooks);
router.delete("/delete", getBookController.deleteBooks);

module.exports = router;
