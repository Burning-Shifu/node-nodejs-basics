import { Worker } from 'worker_threads';
import { availableParallelism } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
  // Get the number of CPU cores
  const cpuCount = availableParallelism();

  // An array to hold all promises (one per worker)
  const promises = [];

  // Create as many workers as there are CPU cores
  for (let i = 0; i < cpuCount; i++) {
    promises.push(new Promise((resolve, reject) => {
      const worker = new Worker(join(__dirname, 'worker.js'));

      worker.once('message', (result) => {
        resolve({ status: 'resolved', data: result });
      });

      worker.once('error', (error) => {
        console.error(`Worker error: ${error}`);
        resolve({ status: 'error', data: null });
      });

      worker.postMessage(i + 10);
    }));
  }

  // Wait for all workers to finish and gather results
  const results = await Promise.all(promises);
  console.log(results);
};

performCalculations().catch(console.error);