var Migrations = artifacts.require("./Migrations.sol");
var Activitycontract   = artifacts.require("./Activitycontract.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Activitycontract);
};
