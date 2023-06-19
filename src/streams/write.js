import { createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
  return new Promise((resolve, reject) => {
    const writeStream = createWriteStream(filePath);

    process.stdin.pipe(writeStream);

    writeStream.on('error', (error) => {
      reject(error);
    });

    writeStream.on('finish', () => {
      resolve();
    });

    process.on('SIGINT', () => {
      process.stdin.unpipe(writeStream);
      resolve();
    });
  });
};

try {
  await write();
} catch (err) {
  throw err;
}