const parseEnv = () => {
  const envVars = [];

  // Loop over the process.env object
  for (let key in process.env) {
    // Check if the key starts with "RSS_"
    if (key.startsWith("RSS_")) {
      // collect key and value
      envVars.push(`${key}=${process.env[key]}`);
    }
  }

  console.log(envVars.join("; "));
};

parseEnv();