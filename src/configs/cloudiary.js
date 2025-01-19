import { v2 as cloudinary } from "cloudinary";

import { CLOUD_NAME, API_KEY, API_SECRET } from "./configs.js";

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET,
	secure: true,
});

export default cloudinary;
