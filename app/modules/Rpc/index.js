export default (options = {}) => {
	return (module, controller) => {
		var Client = require('electron-rpc/client');
		var client = new Client();
    module.addServices({
			client
		})
	};
}
