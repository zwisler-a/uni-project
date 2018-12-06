const path = require('path');

module.exports = {
	clientPath: path.resolve(__dirname, 'client'),
	serverPath: path.resolve(__dirname, 'server'),
	buildPath: path.resolve(__dirname, 'dist'),
	deployPath: 'demo/',
	configFile: 'config.json',
	production: true
};