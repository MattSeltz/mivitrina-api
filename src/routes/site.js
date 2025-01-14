import { Router } from "express";

import {
	getData,
	getOneData,
	postData,
	putData,
	deleteData,
	populateData,
} from "../controllers/site.js";

const router = Router();

router.get("/", getData);
router.get("/:id", getOneData);
router.post("/", postData);
router.put("/:id", putData);
router.delete("/:id", deleteData);
router.put("/populate/:id", populateData);

export default router;
