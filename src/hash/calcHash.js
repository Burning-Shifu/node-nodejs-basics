import { readFile } from 'fs/promises';
import crypto from 'crypto';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {

  try {
    const fileContents = await readFile(filePath);

    const sha256Hash = crypto.createHash('sha256');

    sha256Hash.update(fileContents);

    const hashDigest = sha256Hash.digest('hex');

    console.log('SHA256 hash as hex:', hashDigest);
  } catch (error) {
    throw error;
  }

};

await calculateHash();