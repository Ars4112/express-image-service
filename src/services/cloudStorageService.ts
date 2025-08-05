import { Storage } from "@google-cloud/storage";
import { FileUpload } from "../types";
import s3 from "../config/s3";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Request, Response } from "express";

export class CloudStorageService {
	private storage: Storage;
	private bucketName: string;

	constructor(bucketName: string) {
		this.storage = new Storage();
		this.bucketName = bucketName;
	}

	async saveImage(file: FileUpload): Promise<void> {
		try {
			const params = new PutObjectCommand({
				Bucket: this.bucketName,
				Key: `image/${file.originalname}`,
				Body: file.buffer,
				ContentType: file.mimetype,
				ACL: "public-read",
			});
			await s3.send(params);
		} catch (error) {
			throw new Error("Error sending file: " + error);
		}
	}
	// async getImage(key: string): Promise<string> {
	// 	try {
	// 		// const params = new GetObjectCommand({
	// 		// 	Bucket: this.bucketName,
	// 		// 	Key: `image/${key}`,
	// 		// });
	// 		// const response = await s3.send(params);
	// 		// if (!response.Body) {
	// 		// 	throw new Error("Error retrieving image");
	// 		// }
	// 		// return response.Body?.transformToByteArray();
	// 		return `https://${this.bucketName}.storage.yandexcloud.net/image/${key}`
	// 	} catch (error) {
	// 		throw new Error("Error retrieving image: " + error);
	// 	}
	// }

	async deleteImage(key: string): Promise<void> {
		try {
			
			const params = new DeleteObjectCommand({
				Bucket: this.bucketName,
				Key: `image/${key}`,
			});
			await s3.send(params);
		} catch (error) {
			throw new Error("Error retrieving image: " + error);
		}
	}

	async deleteImage1(req: Request, res:Response): Promise<void> {
		try {
			const key = req.params.key;
			const params = new DeleteObjectCommand({
				Bucket: this.bucketName,
				Key: `image/${key}`,
			});
			await s3.send(params);
		} catch (error) {
			throw new Error("Error retrieving image: " + error);
		}
	}
}
