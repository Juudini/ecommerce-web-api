import { envs, logger } from "../config";
import { CustomError } from "../domain";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: envs.CLOUDINARY_NAME,
    api_key: envs.CLOUDINARY_API_KEY,
    api_secret: envs.CLOUDINARY_SECRET
});

export interface ImageProps {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

export const uploadImages = async (images: ImageProps[]) => {
    try {
        const uploadPromises = images.map(async (image: ImageProps) => {
            try {
                const buffer = image.buffer;
                const base64Image = buffer.toString("base64");

                const cloudinaryResponse = await cloudinary.uploader.upload(
                    `data:${image.mimetype};base64,${base64Image}`
                );

                return cloudinaryResponse.secure_url;
            } catch (err) {
                logger.error("Error to upload promises to Cloudinary:", err);
                throw CustomError.badRequest("Error to upload image to Cloudinary");
            }
        });

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;
    } catch (err) {
        logger.error("Error to upload image to Cloudinary:", err);
        throw CustomError.internalServer();
    }
};

export const deleteImages = async (publicIds: string[]) => {
    try {
        const deletePromises = publicIds.map(async (publicId: string) => {
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                logger.error("Error to delete image from Cloudinary:", err);
                throw CustomError.badRequest("Error to delete image from Cloudinary");
            }
        });

        await Promise.all(deletePromises);
    } catch (err) {
        logger.error("Error to delete image from Cloudinary:", err);
        throw CustomError.internalServer();
    }
};
