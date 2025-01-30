import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		tcp: {
			type: Boolean,
			required: true,
		},
		sites: [{ type: Schema.Types.ObjectId, ref: "Site" }],
	},
	{ timestamps: true }
);

export const User = model("User", userSchema);
