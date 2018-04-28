var Activity  = artifacts.require("./Activitycontract.sol");


var activities=[["egitim",100], ["hayir",3],  ["mevlut",2],]; //3 account use
var participants=["altuntasfatih42@gmail.com" ,"marmarablockchain@gmail.com","marmara@marmara.edu.tr","unichain@unichain.com"]; // use 4 acounts
  /*  ["amme hizmeti",1000],
    ["hayir",3],
    ["mevlut",2],
    ["kına",50],
    ["helva",70],
    ["cenaze",90],
    ["gun",120],

];
 */


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
                const result = await _contract.registerToActivity(accounts[0], user, {
                    value: web3.toWei(0.1, 'ether'),
                    from: accounts[index + 5]
                });
                assert(result.logs[0].args.email == user, "Patladi")
            });

        })

        it("Check number of registered Users", async () => {
            _contract = await Activity.deployed();
            const result = await _contract.getTotalParticipant(accounts[0]);
            assert(result.c[0],participants.length,"Sayilar Eşit Değil")
        });

    });


    


});