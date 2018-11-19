/**
 * Script to deploy the project.
 * Uploads the dist folder via scp (npm package scp2)
 * Installs dependencies on remote (npm install)
 * Starts the server on remote end via ssh (npm package ssh2)
 * @author Zwisler
 */
const ssh2 = require("ssh2");
let client = require("scp2");
let Client = ssh2.Client;

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
          .on("close", function() {
            res();
          })
          .on("data", function(data) {
            process.stdout.write(data);
          })
          .stderr.on("data", function(data) {
            console.log(data + "");
            rej(data + "");
          });
        stream.write("cd " + remotePath + " \r\n");
        stream.write(cmd + "\r\n");
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
      client.scp(
        localPath,
        {
          host: config.host,
          username: config.username,
          password: config.password,
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
    const remotePath = "demo/";
    const localPath = "./dist";
    const runPort =
      process.env["PRAKSERV_SERVER_PORT"] || error("Missing port!");
    const config = {
      host: process.env["PRAKSERV_HOST"] || error("Missing host!"),
      port: 22,
      username: process.env["PRAKSERV_USER"] || error("Missing user!"),
      password: process.env["PRAKSERV_PW"] || error("Missing pw!")
    };

    console.log("Connecting ...");
    await deployer.connect(config);

    console.log("Uploading build ...");
    await deployer.uploadBuild(localPath, remotePath);

    console.log("Installing dependencies ...");
    await deployer.run(remotePath, "npm i");

    console.log("Trying to stop old server ...");
    await deployer.run(remotePath, "npm run stop-build");

    console.log("Starting new Server ...");
    await deployer.run(remotePath, "npm run start-build -- " + runPort);
    deployer.close();
    console.log("Deployed!");
  } catch (err) {
    console.error("Something went wrong!");
    console.error(err);
    deployer.close();
  }
};

deploy();
