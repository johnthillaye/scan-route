var fs = require("fs");
var path = require("path");

function scanRoute (app) {
	var routesDir = path.join(path.dirname(path.dirname(__dirname)), "/routes");
	var routesFiles = fs.readdirSync(routesDir);

	routesFiles.forEach(function (filename) {
		//match .js files in directory excluding index.js and files starting with an underscore
		if (filename.match(/^((?!(index|_)).)*\.js$/)) {

			//get readable name
			var routeName = filename.substring(0, filename.length - 3);
			var routes = require(path.join(routesDir, filename));

			for (routeName in routes) {
				var route = routes[routeName];

				//add some validation
				app[route.method](route.path, route.callback, errorHandler);
			}
		}

	})
}

function errorHandler (err) {
	if (err) console.log(err)
}

module.exports = scanRoute;