module.exports = function(webContents) {
	let Server = require('electron-rpc/server');
	let server = new Server()
	server.configure(webContents);
	return server;
}
