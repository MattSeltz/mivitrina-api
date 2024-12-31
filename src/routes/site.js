import { Router } from "express";

import {
	getData,
	getOneData,
	postData,
	putData,
	deleteData,
} from "../controllers/site.js";

const router = Router();

router.get("/", getData);
router.get("/:id", getOneData);
router.post("/", postData);
router.put("/:id", putData);
router.delete("/:id", deleteData);

export default router;
