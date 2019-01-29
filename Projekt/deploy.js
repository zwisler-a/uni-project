/**
 * Script to deploy the project.
 * Uploads the dist folder via scp (npm package scp2)
 * Installs dependencies on remote (npm install)
 * Starts the server on remote end via ssh (npm package ssh2)
 * @author Zwisler
 */
const { Client } = require("ssh2");
const { scp } = require("scp2");
const { 
	buildPath, docsPath,
	deployAppPath, deployDocPath
} = require(process.argv[2] || './config');

/**
 * Little helper class to combine ssh2 and scp2
 */
class Deployer {
	constructor() {
		this.client = new Client();
	}

	/**
	 * Connects with the desired server
	 */
	connect(config) {
		this.config = config;
		return new Promise((res, rej) => {
			this.client.on("ready", () => {
				res(this);
			});
			this.client.on("error", err => {
				rej(err);
			});
			this.client.connect(config);
		});
	}

	/**
	 * Runs a single command on the remote path
	 * @param {string} remotePath Where to exectue the command in
	 * @param {string} cmd Command to run
	 */
	run(remotePath, cmd) {
		return new Promise((res, rej) => {
			this.client.shell((err, stream) => {
				if (err) rej(err);
				stream
					.on("close", function () {
						res();
					})
					.on("data", function (data) {
						process.stdout.write(data);
					})
					.stderr.on("data", function (data) {
						console.log(`${data}`);
						rej(`${data}`);
					});
				stream.write(`cd ${remotePath} \r\n`);
				stream.write(`${cmd}\r\n`);
				stream.end("exit \r\n");
			});
		});
	}

	/**
	 * Uploads a folder to a remote server
	 * @param {string} localPath Local path to dir
	 * @param {string} remotePath Remote path to dir
	 */
	uploadBuild(localPath, remotePath) {
		return new Promise((res, rej) => {
			scp(
				localPath,
				{
					host: this.config.host,
					username: this.config.username,
					password: this.config.password,
					path: remotePath
				},
				err => {
					if (err) {
						rej(err);
					} else {
						res();
					}
				}
			);
		});
	}

	/**
	 * Closes the ssh connection
	 */
	close() {
		this.client.end();
	}
}

// -------------------------------------------------
// -------------------------------------------------
// -------------------------------------------------
const deploy = async () => {
	// easier to do the || for ENV Vars
	const error = err => {
		throw new Error(err);
	};

	const deployer = new Deployer();
	try {
		console.log("'Reading' config");
		const config = {
			host: process.env["PRAKSERV_HOST"] || error("Missing host!"),
			port: 22,
			username: process.env["PRAKSERV_USER"] || error("Missing user!"),
			password: process.env["PRAKSERV_PW"] || error("Missing pw!")
		};

		console.log("Connecting ...");
		await deployer.connect(config);

		console.log("Trying to stop old server ...");
		await deployer.run(deployAppPath, "npm run stop");

		console.log("Clearing client folder ...");
		await deployer.run(deployAppPath, 'rm -rf public');

		console.log("Uploading build ...");
		await deployer.uploadBuild(buildPath, deployAppPath);
		
		console.log("Uploading documentation ...");
		await deployer.uploadBuild(docsPath, deployDocPath);

		console.log("Installing dependencies ...");
		await deployer.run(deployAppPath, "npm i");

		console.log("Starting new Server ...");
		await deployer.run(deployAppPath, "npm run start");
		deployer.close();
		console.log("Deployed!");
	} catch (err) {
		console.error("Something went wrong!");
		console.error(err);
		deployer.close();
	}
};

deploy();
