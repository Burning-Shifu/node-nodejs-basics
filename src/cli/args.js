const parseArgs = () => {
  // Get command line arguments, excluding the first two
  const args = process.argv.slice(2);
  const argPairs = [];

  // Loop over the arguments
  for (let i = 0; i < args.length; i += 2) {
    // Remove the leading '--' from the argument name
    const argName = args[i].replace('--', '');

    // Get the value of the argument
    const argValue = args[i + 1];

    // collect the argument and its value
    argPairs.push(`${argName} is ${argValue}`);
  }

  console.log(argPairs.join(', '));
};

parseArgs();