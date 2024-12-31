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

export const postData = async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
		throw new Error(error);
	}
};

export const putData = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params, req.body, {
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
