import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/team");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    }
});

// File filter (allow images: jpg, jpeg, png, svg, bmp, heic)
const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/svg+xml",
        "image/bmp",
        "image/heic"
    ];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, JPEG, PNG, SVG, BMP, HEIC files are allowed"), false);
    }
};

export const upload = multer({ storage, fileFilter });