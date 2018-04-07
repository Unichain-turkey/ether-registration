var activity  = artifacts.require("./Activitycontract.sol");



var activities=[["egitim",100],
  /*  ["amme hizmeti",1000],
    ["hayir",3],
    ["mevlut",2],
    ["kına",50],
    ["helva",70],
    ["cenaze",90],
    ["gun",120],
    */
];
var productAddress=[];

contract("Creating Activities",function(accounts){

    it('Number of Activity',function(){
        var contractInstance;
        activity.deployed().then(function(instance){
            contractInstance=instance;
            return instance.getTotalActivity();
        }).then(function(result) {
            console.log(result.c);
        });
    });

    activities.forEach(function(product) {
        
        it('Activity '+product[0]+' created:',function(){
            var contractInstance;
            activity.deployed().then(function(instance){
                contractInstance=instance;
                return instance.createActivity(product[0],product[1],{value:web3.toWei(0.1,'ether'),from:accounts[0]});
            }).then(function(result){
                 console.log(web3.eth.getBalance(contractInstance.address));
            })
        });

    });
    it('Number of Activity',function(){
        var contractInstance;
        activity.deployed().then(function(instance){
            contractInstance=instance;
            return instance.getTotalActivity();
        }).then(function(result) {
            console.log(result.c);
        });
    });
    


});