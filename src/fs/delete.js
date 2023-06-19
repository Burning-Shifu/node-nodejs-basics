import { access, unlink } from 'fs/promises';
import { constants } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
  try {
    // check if the file exists
    await access(filePath, constants.F_OK);
    // delete
    await unlink(filePath);
  } catch (err) {
    // check if error means file or directory doesn't exist
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw err;
    }
  }
};

await remove();