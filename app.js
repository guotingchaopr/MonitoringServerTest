var restify = require('restify');

var server = restify.createServer({
    name: "montiBigScreen",

});


server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
