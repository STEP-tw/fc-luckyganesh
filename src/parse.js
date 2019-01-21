const splitKeyValue = pair => pair.split("=");

const placeInObject = function(object,keyValuePair){
  let [key,value] = splitKeyValue(keyValuePair);
  object[key] = value;
  return object;
}

const readArgs = content => {
  return content.split('&').reduce(placeInObject,{});
};

module.exports = {
  splitKeyValue,
  placeInObject,
  readArgs
}
