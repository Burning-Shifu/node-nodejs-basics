import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pipe = promisify(pipeline);

const compress = async () => {
  try {
    const gzip = createGzip();
    const source = createReadStream(join(__dirname, 'files', 'fileToCompress.txt'));
    const destination = createWriteStream(join(__dirname, 'files', 'archive.gz'));
    await pipe(source, gzip, destination);
  } catch (err) {
    process.exitCode = 1;
    throw err;
  }
}

await compress();