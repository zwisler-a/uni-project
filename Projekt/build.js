/**
 * Build script for the whole Project.
 * Steps:
 * 1. Build client + server
 * 2. Build client + server docs
 * 3. Copy the just generated files in their respective directories
 * 4. Edit the server's package.json to be deploy ready
 * 
 * @author Maurice
 */

const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');

const { 
	clientPath, serverPath,
	buildPath, docsPath,
	production, processUid
} = require(process.argv[2] || './config');

const buildPackage = path.join(buildPath, 'package.json');

const getNpmPath = (basePath) => {
	const bin = process.platform === 'win32' ? 'npm.cmd' : 'npm'
	const binPath = path.resolve(basePath, 'node_modules', '.bin', bin)
	return fs.existsSync(binPath) ? binPath : bin
}

const buildClient = () => {
	childProcess.execFileSync(
		getNpmPath(clientPath),
		[ 'run', production ? 'build-prod' : 'build-demo' ],
		{ env: process.env, cwd: clientPath, stdio: 'inherit' }
	);
};
const buildServer = () => {
	childProcess.execFileSync(
		getNpmPath(serverPath),
		[ 'run', 'build' ],
		{ env: process.env, cwd: serverPath, stdio: 'inherit' }
	);
};

const buildClientDocs = () => {
	childProcess.execFileSync(
		getNpmPath(clientPath),
		[ 'run', 'compodoc'],
		{ env: process.env, cwd: clientPath, stdio: 'inherit' }
	);
};
const buildServerDocs = () => {
	childProcess.execFileSync(
		getNpmPath(serverPath),
		[ 'run', 'doc'],
		{ env: process.env, cwd: serverPath, stdio: 'inherit' }
	);
};

const prepareBuild = () => {
	fs.removeSync(buildPath);

	// Move client to <buildPath>/public
	const publicPath = path.join(buildPath, 'public');
	fs.mkdirsSync(publicPath);
	fs.copySync(path.join(clientPath, 'dist', 'client'), publicPath);

	// Move server to <buildPath>
	fs.copyFileSync(path.join(serverPath, 'package.json'), buildPackage);
	fs.copyFileSync(path.join(serverPath, 'config.example.json'), path.join(buildPath, 'config.example.json'));
	fs.copySync(path.join(serverPath, 'dist'), buildPath);
};

const prepareDocs = () => {
	fs.removeSync(docsPath);

	fs.copySync(path.join(clientPath, 'documentation'), path.join(docsPath, 'client'));
	fs.copySync(path.join(serverPath, 'documentation'), path.join(docsPath, 'server'));
};

const prepareServer = () => {
	const package = fs.readJsonSync(buildPackage);
	delete package.devDependencies;
	package.scripts = {
		'start': `forever start --uid ${processUid} -o info.log -e error.log index.js config.json`,
		'stop': `forever stop ${processUid}`
	};
	fs.writeJsonSync(buildPackage, package, { spaces: '\t' });
};

buildClient();
buildServer();

buildClientDocs();
buildServerDocs();

prepareBuild();
prepareDocs();

prepareServer();
