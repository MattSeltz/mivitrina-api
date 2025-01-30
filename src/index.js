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
import emailRoutes from "./email/email.js";
import messageRoutes from "./routes/message.js";

//MIDDLEWARES
import { authenticate } from "./middlewares/auth.js";

await db();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("Api de la aplicación MIVITRINA");
});

app.use("/auth", authRoutes);
app.use("/user", authenticate, userRoutes);
app.use("/site", siteRoutes);
app.use("/email", emailRoutes);
app.use("/message", messageRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
