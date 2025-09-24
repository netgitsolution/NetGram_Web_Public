import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save in /uploads
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + "-cv" + ext);
    },
});

// File filter (only PDF, DOC, DOCX)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, DOC, DOCX files are allowed"), false);
    }
};

export const uploadCV = multer({ storage, fileFilter });