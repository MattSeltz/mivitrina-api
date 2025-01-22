import nodemailer from "nodemailer";

import { USER, PASS } from "./configs.js";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: USER,
		pass: PASS,
	},
});
