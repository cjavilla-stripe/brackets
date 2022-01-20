# Convert JSON to x-www-form-urlencoded string

The Stripe API expects each request body to be URL Encoded. In some
environments where stripe-node is not available, it can be helpful to have a
utility to convert from ao JSON object into form encoded string request body.

The code in `brackets.js` is mostly meant to be copy / pasted into places like Airtable scripts
so that you can easily convert:

```js
const params = {
  a: 1,
  b: [2, 3],
  c: { d: 4 },
  e: [{ f: 5 }]
}
stringify(params) // => "a=1&b[]=2&b[]=3&c[d]=4&e[][f]=5"
```

The `buildParamPairs` function is a helper and is likely not useful, but I
exported it to make testing easier.

See `brackets.test.js` to see the supported features. There are some edge cases
that aren't covered. Feel free to make a PR to support a new edge case for
arrays of arrays, for instance.
