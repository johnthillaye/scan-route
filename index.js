var fs = require("fs");
var path = require("path");

function scanRoute (app, options) {
	if (!options) options = {};
	options = {verbose: options.verbose || false, errorHandler: options.errorHandler || errorHandler, src: options.src || []};

	options.src.push("/routes");
	options.src.forEach(function (source) {
		var routesDir = path.join(path.dirname(path.dirname(__dirname)), source);
		var files = fs.readdirSync(routesDir);

		files.forEach(function (filename) {
			//match .js files in directory excluding index.js and files starting with an underscore
			if (filename.match(/^((?!(index|_)).)*\.js$/)) {

				//get readable name
				var routeName = filename.substring(0, filename.length - 3);
				var routes = require(path.join(routesDir, filename));

				if (options.verbose) console.log("#### " + routeName.toUpperCase() + " ####")

				for (methodName in routes) {
					var route = routes[methodName];

					if (options.verbose) console.log(route.method.toUpperCase() + ":" + route.path + " -> " + methodName)

					//add some validation
					app[route.method](route.path, route.callback, options.errorHandler);
				}
			}

		})
	})
}

function errorHandler (err) {
	if (err) console.log(err)
}

module.exports = scanRoute;