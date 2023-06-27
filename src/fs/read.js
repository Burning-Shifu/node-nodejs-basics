import { access, readFile } from 'fs/promises';
import { constants } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  try {
    // check if the file exists
    await access(filePath, constants.F_OK);
    // read
    const contents = await readFile(filePath, { encoding: 'utf8' });
    console.log(contents);
  } catch (err) {
    // check if error means file or directory doesn't exist
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw err;
    }
  }
};

await read();