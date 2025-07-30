import { Request, Response } from "express";
import { CloudStorageService } from "../services/cloudStorageService";
import { FileUpload } from "../types";
import { randomUUID } from "crypto";

const cloudStorageService = new CloudStorageService(process.env.YC_BUCKET_NAME || "ars.avatar");

class AvarController {
	public async uploadAvatar(req: Request, res: Response): Promise<void> {
		try {
			const file = req.file;
			if (!file) {
				res.status(400).send("No file uploaded.");
				return;
			}

			file.originalname = `${randomUUID()}-${file.originalname}`;

			const data = await cloudStorageService.saveImage({
				originalname: file.originalname,
				buffer: file.buffer,
				mimetype: file.mimetype,
			} as FileUpload);

			res.status(201).json({ url: data });
		} catch (error) {
			res.status(500).send("Error uploading file.");
		}
	}

	public async getAvatarByKey(req: Request, res: Response): Promise<void> {
		try {
			const key = req.params.key;

			const data = await cloudStorageService.getImage(key);
			res.setHeader("Content-Type", data.ContentType || 'application/octet-stream');
            res.setHeader("Content-Length", data.ContentLength?.toString() || '0');
            res.setHeader('Cache-Control', 'public, max-age=86400');

			res.status(200).json(data.Body);
		} catch (error) {
			res.status(404).send("Image not found." + error);
		}
	}

	public async deleteAvatarByKey(req: Request, res: Response) {
		try {
			const key = req.params.key;

			await cloudStorageService.deleteImage(key);

			res.status(200).json({ message: "Image deleted successfully" });
		} catch (error) {
			res.status(500).json({ error: "Failed to delete image" });
		}
	}
}

export const avatarController = new AvarController();
