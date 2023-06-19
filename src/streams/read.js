import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(filePath);

    readStream.on('data', (buffer) => {
      process.stdout.write(buffer.toString());
    });

    readStream.on('error', (error) => {
      reject(error);
    });

    readStream.on('end', () => {
      resolve();
    });
  });
};

try {
  await read();
} catch (err) {
  throw err;
}