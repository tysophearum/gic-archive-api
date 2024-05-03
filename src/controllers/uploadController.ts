import express, { Request, Response } from 'express';
import multer from 'multer';


// Configure Multer for handling file uploads
const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory
    limits: { fileSize: 5 * 1024 * 1024 } // Example limit: 5MB per file
});

const router = express.Router();

router.post('/files', upload.array('files', 5), (req: Request, res: Response) => {
    console.log(req.files); // Access uploaded files using req.files

    // Your logic for handling file uploads here

    res.json({ message: 'Files uploaded successfully' });
});

router.post('/image', upload.single('image'), (req: Request, res: Response) => {
    console.log(req.file); // Access uploaded file using req.file

    // Your logic for handling image uploads here

    res.json({ message: 'Image uploaded successfully' });
});

export default router;
