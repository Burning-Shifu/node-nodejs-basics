import { parentPort } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

let data;

parentPort.once('message', (n) => {
  // Compute nth Fibonacci and store result for sending later
  data = nthFibonacci(n);
  sendResult();
});

const sendResult = () => {
  parentPort.postMessage(data);
};