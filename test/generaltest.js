var activity  = artifacts.require("./Activitycontract.sol");



var activities=[["egitim",100], ["hayir",3],  ["mevlut",2],];
  /*  ["amme hizmeti",1000],
    ["hayir",3],
    ["mevlut",2],
    ["kına",50],
    ["helva",70],
    ["cenaze",90],
    ["gun",120],

];
 */
var productAddress=[];

contract("Creating Activities",function(accounts){

    it('initial state',function(){
        var contractInstance;
        activity.deployed().then(function(instance){
            contractInstance=instance;
            return instance.getTotalActivity();
        }).then(function(result) {
            assert(result.c[0]==0,"Patladi");
        });
    });

    activities.forEach(function(item,index) {
        
        it(item[0]+' activity created',function(){
            var contractInstance;
            activity.deployed().then(function(instance){
                contractInstance=instance;
                return instance.createActivity(item[0],item[1],{value:web3.toWei(0.1,'ether'),from:accounts[index]});
            }).then(function(result){
                assert(result.logs[0].event=='ActivityCreated',"Patladi")

            })
        });

    });
    it('all activities is created',function(){
        var contractInstance;
        activity.deployed().then(function(instance){
            contractInstance=instance;
            return instance.getTotalActivity();
        }).then(function(result) {
            assert.equal(result.c,activities.length,"Patladi" )
        });
    });
    it('all activities name  is okey',function(){

        activities.forEach(function(item,index) {
            var contractInstance;
            activity.deployed().then(function(instance){
                contractInstance=instance;
                return instance.getActivityName(accounts[index]);
            }).then(function(result) {
                assert.equal(result,item[0],"Patladi" )
            });
        })

    });
    it('balance of contracts is okey ',function(){
        var contractInstance;
        activity.deployed().then(function(instance){
            contractInstance=instance;
            return web3.eth.getBalance(contractInstance.address).toNumber();
        }).then(function(result) {
            assert.equal(result, web3.toWei(activities.length*0.1, 'ether'), 'The Balance is not same');
        });
    });
    it('register to activity ',function(){
        var contractInstance;
        activity.deployed().then(function(instance){
            contractInstance=instance;
            return instance.getActivityName(accounts[index]);
        }).then(function(result) {
            console.log()
        });
    });
    


});