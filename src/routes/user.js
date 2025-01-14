import { Router } from "express";

import {
	getData,
	getOneData,
	putData,
	deleteData,
	populateData,
} from "../controllers/user.js";

const router = Router();

router.get("/", getData);
router.get("/:id", getOneData);
router.put("/:id", putData);
router.delete("/:id", deleteData);
router.put("/populate/:id", populateData);

export default router;
