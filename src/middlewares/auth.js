import jwt from "jsonwebtoken";

//ENV
import { SECRET_KEY } from "../configs/configs.js";

export const authenticate = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ error: "Access denied" });
	}
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ error: "Invalid token" });
	}
};
