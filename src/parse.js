const splitKeyValue = pair => pair.split("=");

const readArgs = content => {
  let args = {};
  const assignKeyValueToArgs = ([key, value]) => (args[key] = value);
  content
    .split("&")
    .map(splitKeyValue)
    .forEach(assignKeyValueToArgs);
  return args;
};

module.exports = {
  splitKeyValue,
  readArgs
}
