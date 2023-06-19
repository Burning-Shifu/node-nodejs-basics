import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { access, writeFile } from 'fs/promises';
import { constants } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'files', 'fresh.txt');

const create = async () => {
  try {
    // check if the file already exists
    await access(filePath, constants.F_OK);
    throw new Error('FS operation failed');
  } catch (err) {
    // check if error means file or directory doesn't exist
    if (err.code === 'ENOENT') {
      // create & write to file
      await writeFile(filePath, 'I am fresh and young');
    } else {
      throw err;
    }
  }
};

await create();