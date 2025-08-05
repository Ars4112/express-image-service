import { Request, Response } from "express";
import { CloudStorageService } from "../services/cloudStorageService";
import { FileUpload } from "../types";
import { randomUUID } from "crypto";
import { imagesModule } from "@/models/images";
import { IImageRepository } from "@/types/image";

const cloudStorageService = new CloudStorageService("ars.avatar");

class AvarController {
	public async uploadAvatar(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.params.id);
			const file = req.file;
			if (!file) {
				res.status(400).send("No file uploaded.");
				return;
			}

			const newOriginalName = `${randomUUID()}-${file.originalname}`;

			const image: IImageRepository = {
				user_id: id,
				bucket_key: newOriginalName,
				image_type: "avatar",
				mime_type: file.mimetype,
				file_size: file.size,
				width: 100,
				height: 100,
			};

			const isExist = await imagesModule.getImageUser(id, "avatar");
			if (isExist) {
				await cloudStorageService.deleteImage(isExist.bucket_key);
				await cloudStorageService.saveImage({
					originalname: newOriginalName,
					buffer: file.buffer,
					mimetype: file.mimetype,
				} as FileUpload);
				const isUpdate = await imagesModule.updateImageUser(image);
				if (!isUpdate) {
					res.status(400).send({ error: "Error updating avatar in database" });
					return;
				}

				res.status(200).json(isUpdate);
			}

			const data = await cloudStorageService.saveImage({
				originalname: file.originalname,
				buffer: file.buffer,
				mimetype: file.mimetype,
			} as FileUpload);

			const saveImage = await imagesModule.saveImageUser(image);

			res.status(201).json(saveImage);
		} catch (error) {
			res.status(500).send("Error uploading file." + error);
		}
	}

	public async getAvatarByKey(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.params.id);

			const data = await imagesModule.getImageUser(id, "avatar");
			if (!data) {
				res.status(404).json({ message: "Avatar not found" });
				return;
			}

			res.status(200).json(data);
		} catch (error) {
			res.status(500).send({ error });
		}
	}

	public async updateAvatarByKey(req: Request, res: Response): Promise<void> {
		try {
			const id = Number(req.params.id);
			const file = req.file;
			if (!file) {
				res.status(400).send("No file uploaded.");
				return;
			}
			const isExist = await imagesModule.getImageUser(id, "avatar");
			if (isExist) {
				await cloudStorageService.deleteImage(isExist.bucket_key);
				const isDeleted = await imagesModule.deleteImageUser(id, "avatar");
				if (isDeleted) {
					await this.uploadAvatar(req, res);
					return;
				} else {
					res.status(400).send({ error: "Error deleting image from database" });
					return;
				}
			}
		} catch (error) {
			res.status(500).send("Error uploading file." + error);
		}
	}

	public async deleteAvatarByKey(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const key = req.params.key;
			const isExist = await imagesModule.getImageUser(id, "avatar");
			if (!isExist) {
				res.status(404).json({ message: "Image not found" });
				return;
			}

			await cloudStorageService.deleteImage(isExist.bucket_key);

			await imagesModule.deleteImageUser(id, "avatar");

			res.status(200).json({ message: "Image deleted successfully" });
		} catch (error) {
			res.status(500).json({ error: "Failed to delete image" + error });
		}
	}
}

export const avatarController = new AvarController();
