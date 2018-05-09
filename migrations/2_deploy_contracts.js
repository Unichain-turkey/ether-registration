var Activitycontract   = artifacts.require("./Activitycontract.sol");

module.exports = function(deployer) {
    deployer.deploy(Activitycontract,true,true);
};
