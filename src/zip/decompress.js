import { createGunzip } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pipe = promisify(pipeline);

const decompress = async () => {
  try {
    const gunzip = createGunzip();
    const source = createReadStream(join(__dirname, 'files', 'archive.gz'));
    const destination = createWriteStream(join(__dirname, 'files', 'fileToCompress.txt'));
    await pipe(source, gunzip, destination);
  } catch (err) {
    process.exitCode = 1;
    throw err;
  }
}

await decompress();