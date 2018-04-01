var Migrations = artifacts.require("./Migrations.sol");
var Activity   = artifacts.require("./Activity.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Activity,80,"Amme hizmeti");
};
