/**
 * Build script for the whole Project.
 * Steps:
 * - Builds the angular app via 'npm run build-prod' for prod build, 'npm run build' for dev,
 * - copies the angular app into <buildPath>/public,
 * - copies the package.json from the server into the dist folder,
 * - copies the Server src folder into the folder defined in <buildPath>.
 * - delete the devDependencies and unused scripts from package.json
 * 
 * @author Maurice
 */
const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');

const { clientPath, serverPath, buildPath, production } = require('./config');
const buildPackage = path.join(buildPath, 'package.json');

const getNpmPath = (basePath) => {
	const bin = process.platform === 'win32' ? 'npm.cmd' : 'npm'
	const binPath = path.resolve(basePath, 'node_modules', '.bin', bin)
	return fs.existsSync(binPath) ? binPath : bin
}

const buildClient = () => {
	childProcess.execFileSync(
		getNpmPath(clientPath),
		[ 'run', production ? 'build-prod' : 'build' ],
		{ env: process.env, cwd: clientPath, stdio: 'inherit' }
	);
}

const buildDocumentation = () => {
	childProcess.execFileSync(
		getNpmPath(clientPath),
		[ 'run', 'compodoc'],
		{ env: process.env, cwd: clientPath, stdio: 'inherit' }
	);
}

const prepareDirectory = () => {
	fs.removeSync(buildPath);

	const publicPath = path.join(buildPath, 'public');
	fs.mkdirsSync(publicPath);
	fs.copySync(path.join(clientPath, 'dist', 'client'), publicPath);

	fs.copyFileSync(path.join(serverPath, 'package.json'), buildPackage);
	fs.copyFileSync(path.join(serverPath, 'config.example.json'), path.join(buildPath, 'config.example.json'));
	fs.copySync(path.join(serverPath, 'src'), buildPath);
};

const prepareServer = () => {
	const package = fs.readJsonSync(buildPackage);
	delete package.devDependencies;
	package.scripts = {
		'start': `forever start index.js config.json`,
		'stop': 'forever stopall'
	};
	fs.writeJsonSync(buildPackage, package, { spaces: '\t' });
};

buildClient();
buildDocumentation();
prepareDirectory();
prepareServer();
