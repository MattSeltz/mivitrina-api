import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { Router } from "express";

import { User } from "../models/user.js";

//ENV
import { SECRET_KEY } from "../configs/configs.js";

const router = Router();

const register = async (req, res) => {
	const { name, email, password, tcp } = req.body;

	try {
		const userEmail = await User.findOne({ email });

		if (userEmail) {
			return res.status(400).json({ error: "El correo electrónico ya existe" });
		}

		const hashedPassword = await hash(password, 10);
		const newUser = new User({ name, email, password: hashedPassword, tcp });
		await newUser.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ error: "Error al registrar usuario" });
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ error: "Nombre de usuario incorrecto" });
		}

		const isMatch = await compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ error: "Contraseña incorrecta" });
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
		res
			.status(200)
			.json({ message: "Iniciado sesión con éxito", id: user._id });
	} catch (error) {
		res.status(500).json({ error: "Error al iniciar sesión" });
	}
};

const recovery = async (req, res) => {
	const { password } = req.body;
	const { id } = req.params;

	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(400).json({ error: "Nombre de usuario no válido" });
		}

		const hashedPassword = await hash(password, 10);
		await User.findByIdAndUpdate(id, { password: hashedPassword });
		res.status(201).json({ message: "Contraseña registrada con éxito" });
	} catch (error) {
		res.status(500).json({ error: "Error al registrar la contraseña" });
	}
};

const removeCookie = (req, res) => {
	const { id } = req.params;

	res.clearCookie("token");
	res.json({ message: "Cookie eliminada" });
};

router.post("/register", register);
router.post("/login", login);
router.put("/recovery/:id", recovery);
router.delete("/cookie/:id", removeCookie);

export default router;
