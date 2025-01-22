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
} from "../controllers/site.js";

const router = Router();

router.get("/", authenticate, getData);
router.get("/:id", getOneData);
router.post("/", authenticate, postData);
router.put("/:id", authenticate, putData);
router.delete("/:id", authenticate, deleteData);
router.put("/populate/:id", authenticate, populateData);

router.post("/:id/upload", authenticate, upload);

export default router;
