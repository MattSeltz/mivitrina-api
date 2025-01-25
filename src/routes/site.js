import { Router } from "express";

//MIDDLEWARES
import { authenticate } from "../middlewares/auth.js";

import {
	getData,
	getOneData,
	postData,
	putData,
	deleteData,
	populateData,
	upload,
	getOneDataByTitle,
	uploadAndUpdate,
} from "../controllers/site.js";

const router = Router();

router.get("/", authenticate, getData);
router.get("/:id", authenticate, getOneData);
router.post("/", authenticate, postData);
router.put("/:id", authenticate, putData);
router.delete("/:id", authenticate, deleteData);
router.put("/populate/:id", authenticate, populateData);
router.get("/title/:slug", getOneDataByTitle);

router.post("/:id/upload", authenticate, upload);
router.post("/:id/uploadAndUpdate", authenticate, uploadAndUpdate);

export default router;
