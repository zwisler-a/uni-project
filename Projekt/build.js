const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');
const { exec } = require('pkg');

const { clientPath, serverPath, buildPath,
		targetPlatforms, targetArch, production } = require('./config');
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
		{ env: process.env, cwd: clientPath }
	);
}

const prepareDirectory = () => {
	fs.removeSync(buildPath);

	const publicPath = path.join(buildPath, 'public');
	fs.mkdirsSync(publicPath);
	fs.copySync(path.join(clientPath, 'dist', 'client'), publicPath);

	fs.copyFileSync(path.join(serverPath, 'package.json'), buildPackage);
	fs.copySync(path.join(serverPath, 'src'), buildPath);
};

const prepareServer = () => {
	childProcess.execFileSync(
		getNpmPath(buildPath),
		[ 'install', '--production' ],
		{ env: process.env, cwd: buildPath }
	);
};

const bundle = async () => {
	const dist = path.join(buildPath, 'dist');
	fs.mkdirsSync(dist);
	process.chdir(dist);

	for(platform of targetPlatforms) {
		for(arch of targetArch) {
			await exec([ buildPath, '--target', `latest-${platform}-${arch}`, '--output', `latest-${platform}-${arch}` ]);
		}
	}

	const target = path.join(__dirname, '..', 'dist');
	fs.copySync(dist, target);
};

buildClient();
prepareDirectory();
prepareServer();
bundle().catch(error => {
	console.error(error);
	process.exit(1);
});
