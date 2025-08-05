import { avatarController } from "@/controllers/avatar.controller";
import { CloudStorageService } from "@/services/cloudStorageService";
import { Router } from "express";
import multer from "multer";

export const image = Router();
const upload = multer({ storage: multer.memoryStorage() });
const cloudStorageService = new CloudStorageService("ars.avatar");

image.get("/:id", avatarController.getAvatarByKey);
image.post("/upload/:id", upload.single("image"), avatarController.uploadAvatar);
image.post("/update/:id", upload.single("image"), avatarController.updateAvatarByKey);
image.delete("/delete/:id", avatarController.deleteAvatarByKey);
image.delete("/api/delete/:key", cloudStorageService.deleteImage1);
