/**
 * Module dependencies.
 */
var thunkify = require('thunkify'),
    paymillNode = require('paymill-node');

/**
 * Categories / methods to wrap
 * @type {Object}
 */
var categories = {
  payments: ['create','details','list','remove'],
  preauthorizations: ['create','details','remove','list'],
  transactions: ['create','details','update','list'],
  refunds: ['refund','details','list'],
  clients: ['create','details','update','remove','list'],
  offers: ['create','details','update','remove','list'],
  subscriptions: ['create','details','update','remove','list'],
  webhooks: ['create','details','update','remove','list']
};

/**
 * Creates the paymill object with thunkified methods so it can be used with
 * javascript generators.
 * @param  {String} apiKey Paymill Private Key
 * @return {Object}        The modified paymill object
 */
module.exports = function (apiKey) {
  var paymill = paymillNode(apiKey);

  for (var category in categories) {
    categories[category].forEach(function (method) {
      paymill[category][method] = thunkify(paymill[category][method]);
    });
  }

  return paymill;
};
