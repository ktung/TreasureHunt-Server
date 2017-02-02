var assert = require('assert');
var io = require('socket.io-client');
var port = process.env.PORT || 8080;
if (process.env.PORT) {
    var socketURL = 'https://treasure-hunt-pns.herokuapp.com';
} else {
    var socketURL = 'http://localhost:'+ port;
}
var options ={
  transports: ['websocket'],
  'force new connection': true
};


describe('SocketEnigma', function() {
  describe('#enigmaRequest()', function() {
    it('should return an enigma', function(done) {
        var client = io.connect(socketURL, options);
        

        client.emit('areasRequest');
        client.on('areas', function(areas) {
            var enigmaRequestData = {
                id: "LesSauvages",
                data: {
                    areaId: areas[0]._id
                }
            }

            client.emit('enigmaRequest', enigmaRequestData);
            client.on('enigmaRequest', function(enigmaResponse) {
                assert.equal(areas[0]._id, enigmaResponse.area._id);
            });
        });
        
        client.disconnect();
        done();
    });
  });
});
