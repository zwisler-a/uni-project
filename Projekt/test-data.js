const Deployer = require('./deploy');
const { deployAppPath } = require(process.argv[2] || './config');

// -------------------------------------------------
// -------------------------------------------------
// -------------------------------------------------
const loadTestData = async () => {
  // easier to do the || for ENV Vars
  const error = err => {
    throw new Error(err);
  };

  const deployer = new Deployer();
  try {
    console.log("'Reading' config");
    const config = {
      host: process.env['PRAKSERV_HOST'] || error('Missing host!'),
      port: 22,
      username: process.env['PRAKSERV_USER'] || error('Missing user!'),
      password: process.env['PRAKSERV_PW'] || error('Missing pw!')
    };

    console.log('Connecting ...');
    await deployer.connect(config);

    console.log('Loading test data ...');
    await deployer.run(deployAppPath, 'node test-data');

    deployer.close();
  } catch (err) {
    console.error('Something went wrong!');
    console.error(err);
    deployer.close();
  }
};

loadTestData();
