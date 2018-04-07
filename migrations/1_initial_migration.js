var Migrations = artifacts.require("./Migrations.sol");
var Activity   = artifacts.require("./Activitycontract.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Activity);
};
