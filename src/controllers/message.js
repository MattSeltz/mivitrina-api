import { Message } from "../models/message.js";

export const postData = async (req, res) => {
	try {
		const message = new Message(req.body);
		await message.save();
		res.json(message);
	} catch (error) {
		res.status(500).json({ message: "Error al enviar el mensaje" });
	}
};
