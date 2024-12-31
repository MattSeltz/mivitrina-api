import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//DB
import { db } from "./db/db.js";

//ENV
import { PORT } from "./configs/configs.js";

//ROUTES
import userRoutes from "./routes/user.js";
import siteRoutes from "./routes/site.js";
import authRoutes from "./auth/auth.js";

//MIDDLEWARES
import { authenticate } from "./middlewares/auth.js";

await db();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("Api de la aplicación MIVITRINA");
});

app.use("/auth", authRoutes);
app.use("/user", authenticate, userRoutes);
app.use("/site", authenticate, siteRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
