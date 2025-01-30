import { Router } from "express";

import { postData } from "../controllers/message.js";

const router = Router();

router.post("/", postData);

export default router;
