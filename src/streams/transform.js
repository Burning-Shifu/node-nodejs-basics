import { Transform, pipeline } from 'stream';

const reverseTransform = new Transform({
  transform(chunk, _, callback) {
    const reversedString = chunk.toString().split('').reverse().join('');
    callback(null, reversedString + "\n");
  }
});

const transform = async () => {
  // process.stdin.pipe(reverseTransform).pipe(process.stdout);
  pipeline(
    process.stdin,
    reverseTransform,
    process.stdout,
    (err) => console.error(err)
  );
};

await transform();