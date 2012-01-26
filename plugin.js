var express = require('express');
var routing = require('./web/routes');
module.exports = {
	init: function (config)
	{
		var app = express.createServer();
		var server = null;
		config.server.on('startup', function ()
		{
			console.log("\t[RWB] - Starting webserver...");
			app.set('views', __dirname + '/web/views');
			app.set('view engine', 'jade');
			app.set("view options", { layout: false });
			app.use(express.static(__dirname + '/web/static/'));
			app.use(express.bodyParser());

			routing.configure(app, {
				players: config.players,
				npcs: config.npcs,
				rooms: config.rooms,
				items: config.items
			});

			server = app.listen(8080);
			console.log("\t[RWB] - Done.");
		});

		config.server.on('shutdown', function ()
		{
			server.close();
		});
	}
};
