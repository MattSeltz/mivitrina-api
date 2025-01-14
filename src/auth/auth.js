import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { Router } from "express";

import { User } from "../models/user.js";

//ENV
import { SECRET_KEY } from "../configs/configs.js";

const router = Router();

const register = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const hashedPassword = await hash(password, 10);
		const newUser = new User({ name, email, password: hashedPassword });
		await newUser.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ error: "Error registering user" });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		const isMatch = await compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
			expiresIn: "1h",
		});
		res.cookie("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.status(200).json({ message: "Logged in successfully", id: user._id });
	} catch (error) {
		res.status(500).json({ error: "Error logging in" });
	}
};

router.post("/register", register);
router.post("/login", login);

export default router;
