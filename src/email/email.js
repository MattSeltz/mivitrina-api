import { Router } from "express";
import crypto from "crypto";

import { User } from "../models/user.js";

import { transporter } from "../configs/nodemailer.js";

const router = Router();

let code;

const sendPasswordResetEmail = async (req, res) => {
	const { to } = req.body;

	const randCode = crypto.randomUUID({ disableEntropyCache: true });
	code = randCode;

	const mailOptions = {
		from: '"Soporte" <mivitrina.corp@gmail.com>',
		to,
		subject: "Restablece tu contraseña",
		html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
    <div style="width: 100%; max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #4CAF50; text-align: center; padding: 20px; color: white; font-size: 24px;">
            <strong>Restablecer Contraseña</strong>
        </div>
        <div style="padding: 20px; font-size: 16px; line-height: 1.5; color: #555;">
            <p>Hola,</p>
            <p>Has solicitado restablecer tu contraseña. Copia y pega en el navegador el siguiente código para continuar:</p>
            <p style="font-weight: bold; font-size: 18px; color: #4CAF50; background-color: #f0f0f0; padding: 10px; border-radius: 4px;">
                ${randCode}
            </p>
            <p>Si no solicitaste esto, ignora este correo.</p>
        </div>
    </div>

    <footer style="text-align: center; margin-top: 30px; font-size: 12px; color: #777;">
        <p>&copy; 2025 MiVitrina. Todos los derechos reservados.</p>
    </footer>
</div>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("Correo enviado con éxito a:", to);
		res.json({ message: "OK!" });
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

const isMatch = (req, res) => {
	const { id } = req.body;

	if (code === id) {
		res.json({ message: "OK!" });
	} else {
		res.status(400).json({ error: "Código invalido" });
	}
};

const getDataByEmail = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ error: "El campo 'email' es requerido" });
	}

	try {
		const user = await User.findOne({ email });

		if (user) {
			res.json(user);
		} else {
			res.status(400).json({ error: "Usuario no encontrado" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
		throw new Error(error);
	}
};

router.post("/", sendPasswordResetEmail);
router.post("/match", isMatch);
router.post("/user", getDataByEmail);

export default router;
