import { access, rename as fsRename } from 'fs/promises';
import { constants } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'files', 'wrongFilename.txt');

const rename = async () => {
  try {
    // check if the file already exists
    await access(filePath, constants.F_OK);
    // rename
    await fsRename(
      filePath,
      join(__dirname, 'files', 'properFilename.md'),
    );
  } catch (err) {
    // check if error means file or directory doesn't exist
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw err;
    }
  }
};

await rename();