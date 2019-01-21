const { EQUALS_SYMBOL , ARGS_SEPARATOR } = require('./constants')

const splitKeyValue = pair => pair.split(EQUALS_SYMBOL);

const placeInObject = function (object, keyValuePair) {
  let [key, value] = splitKeyValue(keyValuePair);
  object[key] = value;
  return object;
}

const readArgs = content => {
  return content.split(ARGS_SEPARATOR).reduce(placeInObject, {});
};

module.exports = {
  splitKeyValue,
  placeInObject,
  readArgs
}
