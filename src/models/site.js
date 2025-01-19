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
		},
		ubication: {
			type: String,
			required: true,
		},
		dates: {
			lunes: {
				checked: Boolean,
				open: String,
				close: String,
			},
			martes: {
				checked: Boolean,
				open: String,
				close: String,
			},
			miercoles: {
				checked: Boolean,
				open: String,
				close: String,
			},
			jueves: {
				checked: Boolean,
				open: String,
				close: String,
			},
			viernes: {
				checked: Boolean,
				open: String,
				close: String,
			},
			sabado: {
				checked: Boolean,
				open: String,
				close: String,
			},
			domingo: {
				checked: Boolean,
				open: String,
				close: String,
			},
		},
		contact: {
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
		},
		user: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

export const Site = model("Site", siteSchema);
