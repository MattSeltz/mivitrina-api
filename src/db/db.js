import { connect } from "mongoose";

import { MONGODB_KEY } from "../configs/configs.js";

export const db = async () => {
	try {
		await connect(MONGODB_KEY);
		console.log("Connected to database");
	} catch (error) {
		throw new Error("Error while connecting to database");
	}
};
