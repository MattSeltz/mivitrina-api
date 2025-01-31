import { Site } from "../models/site.js";

import cloudinary from "../configs/cloudiary.js";

export const getData = async (req, res) => {
	try {
		const site = await Site.find().populate("user");
		res.status(200).json(site);
	} catch (error) {
		res.status(500).json({ message: "Error al obtener sitios" });
	}
};

export const getOneData = async (req, res) => {
	try {
		const site = await Site.findById(req.params.id).populate("user");
		res.status(200).json(site);
	} catch (error) {
		res.status(500).json({ message: "Error al obtener el sitio" });
	}
};

export const postData = async (req, res) => {
	try {
		const site = new Site(req.body);
		await site.save();
		res.status(201).json(site);
	} catch (error) {
		res.status(500).json({ message: "Error al crear el sitio" });
	}
};

export const putData = async (req, res) => {
	try {
		const site = await Site.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json(site);
	} catch (error) {
		res.status(500).json({ message: "Error al actualizar el sitio" });
	}
};

export const deleteData = async (req, res) => {
	try {
		await Site.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Data has been deleted" });
	} catch (error) {
		res.status(500).json({ message: "Error al eliminar el sitio" });
	}
};

export const populateData = async (req, res) => {
	const { id } = req.params;
	const { user } = req.body;

	try {
		await Site.findByIdAndUpdate(id, { user });
		res.status(200).json({ message: "Data has been updated" });
	} catch (error) {
		res.status(500).json({ message: "Error" });
	}
};

export const getOneDataByTitle = async (req, res) => {
	const { slug } = req.params;

	const formattedInput = slug.replace(/\s+/g, "").toLowerCase();
	const regex = new RegExp(formattedInput.split("").join("\\s*"), "i");

	try {
		const site = await Site.findOne({ title: { $regex: regex } }).populate(
			"user"
		);
		res.json(site);
	} catch (error) {
		res.status(500).json({ error: "Error" });
	}
};

export const upload = async (req, res) => {
	const file = req.body.image;
	const { id } = req.params;

	try {
		const result = await cloudinary.uploader.upload(file, {
			folder: "mivitrina",
		});

		const { galery } = await Site.findById(id);

		const site = await Site.findByIdAndUpdate(
			id,
			{ galery: [...galery, { uri: result.secure_url, id: result.public_id }] },
			{ new: true }
		);
		res.json(site);
	} catch (error) {
		res.status(500).json({ error: "Error" });
	}
};

export const uploadAndUpdate = async (req, res) => {
	const file = req.body.image;
	const { id } = req.params;
	const { photoId } = req.body;

	try {
		const result = await cloudinary.uploader.upload(file, {
			folder: "mivitrina",
		});

		const site = await Site.findOne({ _id: id, "galery.id": photoId });

		if (!site) {
			return res
				.status(404)
				.json({ error: "No se encontró el sitio o la foto." });
		}

		const updatedSite = await Site.findOneAndUpdate(
			{ _id: id, "galery.id": photoId },
			{
				$set: {
					"galery.$.uri": result.secure_url,
					"galery.$.id": result.public_id,
				},
			},
			{ new: true }
		);

		if (!updatedSite) {
			return res.status(404).json({
				error: "No se pudo actualizar la foto en el sitio.",
			});
		}

		res.json({ message: "Imagen actualizada correctamente", updatedSite });
	} catch (error) {
		res.status(500).json({ error: "Error al actualizar la foto" });
	}
};
