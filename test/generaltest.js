var Activity  = artifacts.require("./Activitycontract.sol");


var activities=[["egitim",3], ["hayir",3],  ["mevlut",2],]; //3 account use
var participants=["altuntasfatih42@gmail.com" ,"marmarablockchain@gmail.com","marmara@marmara.edu.tr","unichain@unichain.com"]; // use 4 acounts


const isRevertError = (error) => {
    const invalidOpcode = error.message.search('invalid opcode') >= 0;
    const outOfGas = error.message.search('out of gas') >= 0;
    const revert = error.message.search('revert') >= 0;
    return invalidOpcode || outOfGas || revert;
}



contract("Creating Activities",function(accounts){
    let _contract;
    it('initial state',function(){
        var contractInstance;
        Activity.deployed().then(function(instance){
            contractInstance=instance;
            return instance.getTotalActivity();
        }).then(function(result) {
            assert(result.c[0]==0,"Patladi");
        });
    });
    activities.forEach(function (item, index) {

        it(item[0] + ' Activity created', function () {
            var contractInstance;
            Activity.deployed().then(function (instance) {
                contractInstance = instance;
                return instance.createActivity(item[0], item[1], {
                    value: web3.toWei(0.1, 'ether'),
                    from: accounts[index]
                });
            }).then(function (result) {
                assert(result.logs[0].event == 'ActivityCreated', "Patladi")

            })
        });

    });
    it('all activities is created',function(){
        var contractInstance;
        Activity.deployed().then(function(instance){
            contractInstance=instance;
            return instance.getTotalActivity();
        }).then(function(result) {
            assert.equal(result.c,activities.length,"Patladi" )
        });
    });
    it('all activities name  is okey',function(){

        activities.forEach(function(item,index) {
            var contractInstance;
            Activity.deployed().then(function(instance){
                contractInstance=instance;
                return instance.getActivityName(accounts[index]);
            }).then(function(result) {
                assert.equal(result,item[0],"Patladi" )
            });
        })

    });
    it('balance of contracts is okey ',function(){
        var contractInstance;
        Activity.deployed().then(function(instance){
            contractInstance=instance;
            return web3.eth.getBalance(contractInstance.address).toNumber();
        }).then(function(result) {
            assert.equal(result, web3.toWei(activities.length*0.1, 'ether'), 'The Balance is not same');
        });
    });

    describe('Registering Operations', function () {

        participants.forEach(function (user, index) {

            it(user + ' registered to ' + activities[0][0], async () => {
                _contract = await Activity.deployed();
                try {
                    const result = await _contract.registerToActivity(accounts[0], user, {
                        value: web3.toWei(0.1, 'ether'),
                        from: accounts[index + 5]
                    });
                    assert(result.logs[0].args.email == user, "Patladi")
                }
                catch (error) {
                    if(isRevertError(error))
                        assert(false,'Failed reason of exceess participant limit ');
                }

            });

        })

        it("checking participants", async () => {
            _contract = await Activity.deployed();
            for (i = 0; i < activities[0][1]; i++) {
                const result = await _contract.getParticipiant(accounts[0],i+1);
                assert(result[1] == participants[i], "Patladi")
            }

        });
        it("try to set setValidateNumber without being admin", async () => {
            _contract = await Activity.deployed();
            const result = await _contract.setValidateNumber("c29aac4eb2f2ad0984ef1b2631a65d50b113fd86cd88961818929f10693ac036",accounts[0],i+1);
                assert(result[1] == participants[i], "Patladi")


        });

    });


    


});