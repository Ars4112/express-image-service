import { Storage } from "@google-cloud/storage";
import { ImageUploadRequest, ImageResponse, FileUpload } from "../types";
import s3 from "../config/s3";
import { S3 } from "aws-sdk";

export class CloudStorageService {
	private storage: Storage;
	private bucketName: string;

	constructor(bucketName: string) {
		this.storage = new Storage();
		this.bucketName = bucketName;
	}

	async saveImage(file: FileUpload): Promise<S3.ManagedUpload.SendData> {
		try {
			const params = {
				Bucket: this.bucketName,
				Key: `image/${file.originalname}`,
				Body: file.buffer,
				ContentType: file.mimetype,
				ACL: "public-read",
			};
			return await s3.upload(params).promise();
		} catch (error) {
			throw new Error("Error uploading file: " + error);
		}
	}
	async getImage(key: string): Promise<S3.GetObjectOutput> {
		try {
			const params = {
				Bucket: this.bucketName,
				Key: `image/${key}`,
			};
			return await s3.getObject(params).promise();
		} catch (error) {
			throw new Error("Error retrieving image: " + error);
		}
	}

	async deleteImage(key: string): Promise<S3.DeleteObjectOutput> {
		try {
			const params = {
				Bucket: this.bucketName,
				Key: `image/${key}`,
			};
			return await s3.deleteObject(params).promise();
		} catch (error) {
			throw new Error("Error retrieving image: " + error);
		}
	}
}
