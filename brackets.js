// Builds pairs of key and value params where the key is an array of strings representing
// the key path through the object.
// Example:
//   { a: 1 } => a=1
//   { a: { b: 1 }} => a[b]=1
//   { a: [1]} => a[]=1
//   { a: [1, 2]} => a[]=1&a[]=2
//   { a: {b: {c: 3}}} => a[b][c]=3

function buildParamPairs(params) {
  let pairs = [];
  Object.entries(params).forEach(([key, value]) => {
    let keys = [key];
    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (Array.isArray(val)) {
          // Not needed for Stripe API patterns, skipping
        } else if (typeof val === "object") {
          let subPairs = buildParamPairs(val);
          subPairs.forEach(([_keys, value]) => {
            pairs.push([keys.concat('').concat(_keys), value]);
          });
        } else {
          pairs.push([keys.concat(''), val]);
        }
      });
    } else if (typeof value === "object") {
      let subPairs = buildParamPairs(value);
      subPairs.forEach(([_keys, value]) => {
        pairs.push([keys.concat(_keys), value])
      });
    } else {
      pairs.push([keys, value])
    }
  });
  return pairs;
}

function stringify(params) {
  let pairs = [], keyPath = '', bracketedKeys = '';
  buildParamPairs(params).forEach(([keys, value]) => {
    if(keys.length === 1) {
      keyPath = keys[0];
    } else {
      bracketedKeys = keys.slice(1, keys.length).map(k => `[${k}]`).join('');
      keyPath = `${keys[0]}${bracketedKeys}`
    }
    pairs.push(`${keyPath}=${value}`);
  })
  return pairs.join("&");
}

module.exports = {
  buildParamPairs,
  stringify
}
