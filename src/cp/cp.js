import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'child_process';
// also can use { spawn }

const __dirname = dirname(fileURLToPath(import.meta.url));
const childModule = join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  // const cp = spawn('node', [childModule, ...args]);
  // process.stdin.pipe(cp.stdin);
  // cp.stdout.pipe(process.stdout);

  fork(childModule, args);
};

// Put your arguments in function call to test this functionality
spawnChildProcess([1, "a"]);
