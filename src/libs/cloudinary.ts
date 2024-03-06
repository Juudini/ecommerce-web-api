import { v2 as cloudinary } from "cloudinary";
import { envs, logger } from "../config";
import { CustomError } from "../domain";
cloudinary.config({
    cloud_name: envs.CLOUDINARY_NAME,
    api_key: envs.CLOUDINARY_API_KEY,
    api_secret: envs.CLOUDINARY_SECRET
});

export const uploadImages = async (images: File[]) => {
    try {
        const uploadPromises = images.map(async image => {
            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString("base64");

                const cloudinaryResponse = await cloudinary.uploader.upload(`data:${image.type};base64,${base64Image}`);

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
