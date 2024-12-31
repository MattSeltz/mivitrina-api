import { Schema, model } from "mongoose";

const siteSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		galery: {
			type: Array,
			required: true,
		},
		ubication: {
			type: String,
			required: true,
		},
		dates: [
			{
				d: {
					type: String,
					required: true,
				},
				h: {
					type: Array,
					required: true,
				},
			},
		],
		email: {
			type: String,
		},
		tel: {
			type: String,
		},
		whatsapp: {
			type: String,
		},
		instagram: {
			type: String,
		},
		facebook: {
			type: String,
		},
		user: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

export const Site = model("Site", siteSchema);
