import "dotenv/config";
import express from "express";
import { image } from "./routers/image.router";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: ["http://localhost:3002", "http://localhost:8081"],
		methods: ["GET", "POST", "DELETE", "PUT"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(express.json());

app.use("/avatar", image);

app.listen(port, () => {
	console.log(`Image storage service is running on http://localhost:${port}`);
});
