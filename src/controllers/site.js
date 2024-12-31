import { Site } from "../models/site.js";

export const getData = async (req, res) => {
	try {
		const site = await Site.find().populate("user");
		res.status(200).json(site);
	} catch (error) {
		res.status(500).json({ message: error.message });
		throw new Error(error);
	}
};

export const getOneData = async (req, res) => {
	try {
		const site = await Site.findById(req.params.id).populate("user");
		res.status(200).json(site);
	} catch (error) {
		res.status(500).json({ message: error.message });
		throw new Error(error);
	}
};

export const postData = async (req, res) => {
	try {
		const site = new Site(req.body);
		await site.save();
		res.status(201).json(site);
	} catch (error) {
		res.status(500).json({ message: error.message });
		throw new Error(error);
	}
};

export const putData = async (req, res) => {
	try {
		const site = await Site.findByIdAndUpdate(req.params, req.body, {
			new: true,
		});
		res.status(200).json(site);
	} catch (error) {
		res.status(500).json({ message: error.message });
		throw new Error(error);
	}
};

export const deleteData = async (req, res) => {
	try {
		await Site.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Data has been deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
		throw new Error(error);
	}
};
