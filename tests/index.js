// WARNING: THESE AR ONLY BASIC TESTS! Since this module is only a wrapper,
// we don't test much. See https://github.com/komola/paymill-node/ for more
// accurate tests.

/**
 * Module dependencies.
 */

var paymill = require('..')('10781a7727f4f7c17b7dc509a450e023'),
    co = require('co');

describe('requests', function(){
  beforeEach(function (done) {
    co(function *() {
      // First list all clients
      var oldClients = yield paymill.clients.list({});
      oldClients = oldClients.data;

      // remove all old clients als cleanup
      for (var i = 0; i < oldClients.length; i++) {
        yield paymill.clients.remove(oldClients[i].id);
      }
    })(done);
  });

  it('should work', function(done){
    co(function *(){
      // create a few clients
      var clients = yield [
        paymill.clients.create({email:'test@example.com', description: 'test'}),
        paymill.clients.create({email:'test2@example.com', description: 'test2'})
      ];

      var client = yield paymill.clients.details(clients[0].data.id);
      console.log(client.data.description);
      client.data.description.should.equal('test');

      var clientList = yield paymill.clients.list({});
      clientList.data.should.have.length(2);
    })(done);
  });
});
