import { FileUpload } from 'graphql-upload-minimal';
const fs = require('fs');
const { createWriteStream } = require('fs');

export default async function saveFile(fileUpload: FileUpload) {
  // try {
    if (!fileUpload) {
      throw new Error('FileUpload is required');
    }

    const { filename, mimetype, encoding, createReadStream } = fileUpload;

    // Directory where you want to save the file
    const uploadDir = 'uploads';

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Path where you want to save the file
    const filePath = `${uploadDir}/${filename}`;

    const stream = createReadStream();
    const writeStream = createWriteStream(filePath);

    // Pipe the file stream to the write stream
    await new Promise((resolve, reject) => {
      stream.pipe(writeStream).on('finish', resolve).on('error', reject);
    });

    return 'File saved successfully:' + filePath;
  // } catch (error) {
  //   throw new Error('Something went wrong when saving file.');
  // }
}
