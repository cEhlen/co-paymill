co-paymill
==========

co-paymill is a wrapper to use [paymill-node](https://github.com/komola/paymill-node) with generators.

Installation
============

```
$ npm install co-paymill
```

Setup
=====
Just use it like the `paymill-node` module, but instead of callbacks use generators.

```js
var apiKey = 'abc'; // Paymill Private Key
var paymill = require('co-paymill')(apiKey);
```

Example
=======

Simple client creation:

```js
var client = yield paymill.clients.create({ email: 'test@example.com', description: 'test' });
```

Parallel client creation:
```js
yield [
  paymill.clients.create({ email: 'test@example.com', description: 'test' }),
  paymill.clients.create({ email: 'foo@bar.com', description: 'foobar' });
];
```

License
=======
ISC
