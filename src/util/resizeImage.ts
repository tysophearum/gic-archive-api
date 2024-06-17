import sharp from 'sharp';

async function resizeImage(file: Express.Multer.File, maxSizeMB: number): Promise<Express.Multer.File> {
  const fileSizeMB = file.size / 1024 / 1024;
  
  if (fileSizeMB <= maxSizeMB) {
    // If the file size is already within the limit, return the original file
    return file;
  }

  const targetFileSizeBytes = maxSizeMB * 1024 * 1024;

  // Get the original dimensions of the image
  const metadata = await sharp(file.buffer).metadata();
  let width = metadata.width!;
  let height = metadata.height!;

  // Determine the reduction ratio required
  const reductionRatio = Math.sqrt(targetFileSizeBytes / file.size);

  // Apply the reduction ratio to dimensions
  width = Math.floor(width * reductionRatio);
  height = Math.floor(height * reductionRatio);

  // Resize the image
  const resizedBuffer = await sharp(file.buffer)
    .resize(width, height)
    .toBuffer();

  // Return the resized file as a new object
  return {
    ...file,
    buffer: resizedBuffer,
    size: resizedBuffer.length
  };
}

export default resizeImage;
