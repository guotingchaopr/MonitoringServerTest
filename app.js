var restify = require('restify');
var ip_addr = '127.0.0.1';
var port = '80'
var server = restify.createServer({
	name: "MonitoringServer"
});

var errors = function (req, res, next) {
	return next(new restify.ConflictError("i just don't like u"));
}

server.get("/transfers", function (req, res, next) {
	var transfers = [];
	for (var i = 0; i < 12; i++) {
		transfers.push(Math.ceil(Math.random() * 9999 + 1));
	}
	res.set("Access-Control-Allow-Origin", "*");
	res.json(transfers);
});

server.get(/[\s\S]*/, errors);
server.listen(port, ip_addr, function () {
	console.log('%s listening at %s', server.name, server.url);
});
