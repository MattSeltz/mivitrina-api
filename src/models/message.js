import { Schema, model } from "mongoose";

const messageSchema = new Schema(
	{
		asunto: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Message = model("Message", messageSchema);
