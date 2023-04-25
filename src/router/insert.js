import express from "express";

import insertController from "../controllers/insert";
let router = express.Router();

router.get("/",insertController.insertCategory );


module.exports = router;
