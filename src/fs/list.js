import { readdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const list = async () => {
  try {
    // go over files in dir
    const files = await readdir(join(__dirname, 'files'));
    console.log(files);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw err;
    }
  }
};

await list();