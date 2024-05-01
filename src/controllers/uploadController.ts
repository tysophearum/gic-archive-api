import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

// Configure Multer for handling file uploads
const upload = multer({ 
    dest: 'uploads/',
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            const extension = path.extname(file.originalname);
            cb(null, Date.now() + '-' + file.originalname.replace(extension, '') + extension);
        }
    })
    // storage: multer.memoryStorage(), // Store files in memory
    // limits: { fileSize: 5 * 1024 * 1024 } // Example limit: 5MB per file
});

const router = express.Router();

// Handle file uploads
router.post('/', upload.array('files', 5), (req: Request, res: Response) => {
    console.log(req.files); // Access uploaded files using req.files

    // Your logic for handling file uploads here

    res.json({ message: 'Files uploaded successfully' });
});

export default router;
