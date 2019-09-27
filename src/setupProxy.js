const proxy = require("http-proxy-middleware");
module.exports = function(app) {
	app.use(
		proxy("/api", {
			target: "http://192.168.1.101:8088",
			// target: "http://106.13.139.118:8088",
			changeOrigin: true, // needed for virtual hosted sites
			ws: true, // proxy websockets
			pathRewrite: {
				"^/api": ""
			}
		})
	);
	app.use(
		proxy("/app", {
			// target: "http://192.168.1.101:8088",
			target: "http://106.13.139.118:8088",
			changeOrigin: true, // needed for virtual hosted sites
			ws: true, // proxy websockets
			pathRewrite: {
				"^/api": ""
			}
		})
	);
	app.use(proxy('/web', {
		target: "http://192.168.1.101:8088",
		// target: "http://106.13.139.118:8088",
		// pathRewrite: {'^/proxyApi': ''},
		changeOrigin: true,
		ws: true
	}));
};