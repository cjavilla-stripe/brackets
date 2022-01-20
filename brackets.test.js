const {buildParamPairs, stringify} = require('./brackets');

test('works for top level value a=1', () => {
  const params = {a: 1};
  expect(buildParamPairs(params)).toStrictEqual([[["a"], 1]]);
  expect(stringify(params)).toEqual("a=1")
});

test('works for top level value a=1&b=2', () => {
  const params = {a: 1, b: 2};
  expect(buildParamPairs(params)).toStrictEqual([[["a"], 1], [["b"], 2]]);
  expect(stringify(params)).toEqual("a=1&b=2")
});

test('works for nested level value a[b]=2', () => {
  const params = {a: {b: 2}};
  expect(buildParamPairs(params)).toStrictEqual([[["a", "b"], 2]]);
  expect(stringify(params)).toEqual("a[b]=2")
});

test('works for nested level value a[b][c]=2', () => {
  const params = {a: {b: {c: 2}}};
  expect(buildParamPairs(params)).toStrictEqual([[["a", "b", "c"], 2]]);
  expect(stringify(params)).toEqual("a[b][c]=2")
});

test('works with array a[]=2', () => {
  const params = {a: [2]};
  expect(buildParamPairs(params)).toStrictEqual([[["a", ""], 2]]);
  expect(stringify(params)).toEqual("a[]=2")
});

test('works with array a[]=2&a[]=3', () => {
  const params = {a: [2, 3]};
  expect(buildParamPairs(params)).toStrictEqual([[["a", ""], 2], [["a", ""], 3]]);
  expect(stringify(params)).toEqual("a[]=2&a[]=3")
});

test('works with array with nested object a[][b]=2', () => {
  const params = {a: [{b: 2}]};
  expect(buildParamPairs(params)).toStrictEqual([[["a", "", "b"], 2]]);
  expect(stringify(params)).toEqual("a[][b]=2")
});

test('works with checkout session', () => {
  const params = {
    s_url: 'h.com',
    c_url: 'c.com',
    line_items: [{
      price_data: {
        amount: 1000,
        currency: 'usd',
        product_data: {
          name: 'test'
        }
      }
    }]
  };
  expect(stringify(params)).toEqual("s_url=h.com&c_url=c.com&line_items[][price_data][amount]=1000&line_items[][price_data][currency]=usd&line_items[][price_data][product_data][name]=test")
});

// TODO: This case doesn't work.
// test('works with array with nested arrays a[][b][]=1&a[][b][]=2', () => {
//   const params = {a: [{b: [1, 2]}]};
//   expect(buildParamPairs(params)).toStrictEqual([[["a", "", "b"], 2]]);
//   expect(stringify(params)).toEqual("a[][b][]=1&a[][b][]=2")
// });
