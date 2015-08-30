# ScanRoute

A simple route scanning module

## How to use

> npm install scan-route

Place your routes in a 'routes' folder at the root of your project.

Require the module and pass your express app object as an argument.

````
var scanRoute = require('scan-route');

scanRoute(app);
````

### Sample of a route format, `./routes/sample.js`

````
var sampleRoutes = {
	'create': {
		method: 'post',
		path: '/users',
		callback: function (req, res, next) {
			//save user in db for example
			res.json(200, {msg: 'success'})
		}
	},
	'findById': {
		method: 'get',
		path: '/users/:id',
		callback: function (req, res, next) {
			//find user in db
		}
	}
}

module.exports = sampleRoutes;
````