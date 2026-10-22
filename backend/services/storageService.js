const cloudinary = require("cloudinary").v2;

// Configure Cloudinary if credentials exist
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

class StorageService {
    /**
     * Upload an image (base64 string or data URI) to Cloudinary
     * Returns the secure HTTPS URL
     */
    static async uploadImage(imageBase64, folder = "fitsnap") {
        if (!imageBase64) {
            throw new Error("No image data provided for upload.");
        }

        // Validate base64 size (max 10MB)
        const sizeInBytes = (imageBase64.length * 3) / 4;
        const maxBytes = 10 * 1024 * 1024;
        if (sizeInBytes > maxBytes) {
            throw new Error("Image exceeds maximum size of 10MB.");
        }

        // Validate image format
        if (imageBase64.startsWith("data:") && !imageBase64.match(/^data:image\/(jpeg|jpg|png|webp|gif);base64,/i)) {
            throw new Error("Invalid image format. Supported formats: JPEG, PNG, WEBP, GIF.");
        }

        // If Cloudinary credentials are configured, upload to Cloudinary
        if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
                    folder,
                    resource_type: "image",
                    transformation: [{ quality: "auto", fetch_format: "auto" }]
                });
                return uploadResponse.secure_url;
            } catch (err) {
                console.error("Cloudinary upload failed:", err.message);
                throw new Error("Failed to upload image to cloud storage: " + err.message);
            }
        }

        // Fallback if Cloudinary credentials are not provided in .env:
        console.warn("Cloudinary credentials missing in .env; saving image as base64 reference.");
        return imageBase64;
    }
}

module.exports = StorageService;
