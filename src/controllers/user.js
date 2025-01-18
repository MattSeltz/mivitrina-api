import { User } from "../models/user.js";

export const getData = async (req, res) => {
	try {
		const user = await User.find().populate("sites");
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
		throw new Error(error);
	}
};

export const getOneData = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).populate("sites");
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
		throw new Error(error);
	}
};

export const putData = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
		throw new Error(error);
	}
};

export const deleteData = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Data has been deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
		throw new Error(error);
	}
};

export const populateData = async (req, res) => {
	const { id } = req.params;
	const { site } = req.body;

	try {
		await User.findByIdAndUpdate(id, { $push: { sites: site } });
		res.status(200).json({ message: "Data has been updated" });
	} catch (error) {
		res.status(500).json({ message: error.message });
		throw new Error(error);
	}
};
