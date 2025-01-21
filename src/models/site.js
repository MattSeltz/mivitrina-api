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
				corrido: Boolean,
				openC: String,
				closeC: String,
			},
			martes: {
				checked: Boolean,
				open: String,
				close: String,
				corrido: Boolean,
				openC: String,
				closeC: String,
			},
			miercoles: {
				checked: Boolean,
				open: String,
				close: String,
				corrido: Boolean,
				openC: String,
				closeC: String,
			},
			jueves: {
				checked: Boolean,
				open: String,
				close: String,
				corrido: Boolean,
				openC: String,
				closeC: String,
			},
			viernes: {
				checked: Boolean,
				open: String,
				close: String,
				corrido: Boolean,
				openC: String,
				closeC: String,
			},
			sabado: {
				checked: Boolean,
				open: String,
				close: String,
				corrido: Boolean,
				openC: String,
				closeC: String,
			},
			domingo: {
				checked: Boolean,
				open: String,
				close: String,
				corrido: Boolean,
				openC: String,
				closeC: String,
			},
		},
		contact: {
			email: {
				type: String,
				required: true,
			},
			telefono: {
				type: String,
				required: true,
			},
			whatsapp: {
				type: String,
				required: true,
			},
			instagram: {
				type: String,
				required: true,
			},
			facebook: {
				type: String,
				required: true,
			},
		},
		user: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

export const Site = model("Site", siteSchema);
