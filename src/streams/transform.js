import { Transform, pipeline } from 'stream';

const reverseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().split('').reverse().join(''));
    callback();
  }
});

const transform = async () => {
  return new Promise((resolve, reject) => {
    pipeline(
      process.stdin,
      reverseTransform,
      process.stdout,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

try {
  await transform();
} catch (err) {
  console.error(err);
}