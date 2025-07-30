import "dotenv/config";
import express from "express";
import { avatarController } from "./controllers/avatar.controller";

import multer from "multer";

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());

app.post("/upload", upload.single("image"), avatarController.uploadAvatar.bind(avatarController));
app.get("/avatar/:key", avatarController.getAvatarByKey.bind(avatarController));
app.delete("/avatar/:key", avatarController.deleteAvatarByKey.bind(avatarController));

app.listen(port, () => {
	console.log(`Image storage service is running on http://localhost:${port}`);
});
