import { UserRegisterInput } from '../entities';
import * as csv from 'fast-csv';

export default function parseCsvFile(file: Express.Multer.File): Promise<[UserRegisterInput[], Error | null]> {
  return new Promise((resolve) => {
    if (!file) {
      resolve([[], new Error("No file was received")]);
    }

    const csvData: UserRegisterInput[] = [];
    const stream = csv.parse({ headers: true });

    stream.on('data', (data) => {
      csvData.push(data);
    });

    stream.on('end', () => {
      resolve([csvData, null]);
    });

    stream.on('error', (error) => {
      resolve([[], new Error(error.message)]);
    });

    // Parse the file buffer
    stream.write(file.buffer);
    stream.end();
  });
}
