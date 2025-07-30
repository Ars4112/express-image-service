export interface ImageUploadRequest {
	image: Buffer;
	filename: string;
	contentType: string;
}

export interface ImageResponse {
	ETag: string;
	Location: string;
	// key: string;
	// Key: string;
	Bucket: string;
}

export type FileUpload = {
    originalname: string;
    buffer: Buffer;
    mimetype: string;
};
