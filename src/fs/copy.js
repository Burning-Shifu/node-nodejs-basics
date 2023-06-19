import { mkdir, copyFile, readdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copy = async () => {
  try {

    // create folder
    await mkdir(join(__dirname, 'files_copy'));

    // go over files in dir and copy
    const files = await readdir(join(__dirname, 'files'));
    for (const file of files) {
      await copyFile(
        join(__dirname, 'files', file),
        join(__dirname, 'files_copy', file
      ));
    }

  } catch {
    throw new Error('FS operation failed');
  }
};

await copy();