pragma solidity ^0.4.4;

import "./Ownable.sol";

contract Activitycontract is Ownable
{

    mapping(address => Activity) activities;        //owner of activity to map  Activity struct 
    mapping(uint => address) activitiestIndex;      //index of activity to map  address of activity owner 
    uint numberOfActivity;                          

    struct Activity {
        string   activityName;
        address   activityOwner;
        bool  isActive;             
        bool  isPayActive;
        uint price;
        uint participantLimit;
        uint registeredUserCount;   
        string    participationUrl ;//we should change this ,string is visible :)
        bytes32   validateNumber ;//this is a hash  to participant verify themselves for payback money

        mapping(address => Participant) participants; //address of user to map Participant struct
        mapping(uint => address) participantIndex;    //index of user to map address of user

    }



    struct Participant {
        string email;
        bool validated; 
        bool payBack;   
        address addr;
        bool deleted;
        uint256 value; //amount of deposid ,maybe this is unnecassry :)
    }

    event ParticipantRegisteredAt(string activityName,address _activityOwner,address usr, string email,uint value);
    event ParticipantDeletedAt(string activityName,address _activityOwner, address usr, string email,uint value);
    event ParticipantPayBackAt(string activityName,address _activityOwner, address usr, string email,uint value);

    event ActivityCreated(string _activityName,address _owner,uint _participantLimit);
    event ActivityOwnershipTransferred(string  _activityName,address indexed previousOwner, address indexed newOwner);

    function Activitycontract(bool _isActive,bool _isPayActive) public {
        owner = msg.sender; //this owner is us :)
        isActive=_isActive;
        isPayActive=_isPayActive;
    }

    modifier onlyActiveActivity(address _act) {
        require(activities[_act].isActive);
        _;
    }
    modifier onlyOwnerActivity(address _act) {
        require(activities[_act].activityOwner == msg.sender);
        _;
    }

    function createActivity(string _activityName,uint _participantLimit)
    onlyActive
    payable
    public
    {

        if (msg.value != 1* 10**17 ){ //assume 0.1 ether to prevent DDOS, 0.01 ether :)
            revert();
        }
        require(activities[msg.sender].activityOwner == address(0)); //if has not  create an activity before
        activities[msg.sender] = Activity(
            {
            activityName:_activityName,
            activityOwner:msg.sender,
            isActive:true,
            isPayActive:false,
            price:1,    //only  owner of activity  can change
            participantLimit:_participantLimit,
            registeredUserCount:0,
            participationUrl:"",
            validateNumber:0
            });
        numberOfActivity++;//start with index 1
        activitiestIndex[numberOfActivity] = msg.sender;

        ActivityCreated(_activityName,msg.sender,_participantLimit);


    }

    function registerToActivity(address _activity,string _email)
    onlyActive
    onlyActiveActivity(_activity)
    payable
    public {
        require(!isRegistered(_activity,msg.sender));

        Activity storage activity = activities[_activity];
        require(activity.registeredUserCount < activity.participantLimit);


        require(msg.value >= activity.price * 10**17); //price control 1*ether value,now 0.1 ether

        activity.registeredUserCount++;
        activity.participants[msg.sender] = Participant(_email, false,false, msg.sender, false,msg.value);
        activity.participantIndex[activity.registeredUserCount] = msg.sender;

        ParticipantRegisteredAt(activity.activityName,activity.activityOwner,msg.sender,_email,msg.value);
    }

    function isRegistered(address _activity,address _partipantaddr) public constant returns (bool) {
        Activity storage activity = activities[_activity];//may be this is unnecassry

        return  activity.activityOwner!=address(0) &&
        activity.participants[_partipantaddr].addr != address(0)  &&
        !activity.participants[_partipantaddr].deleted;
    }


    function getMeParticipationUrl(address _activity) public
    onlyActive
    onlyActiveActivity(_activity)
    constant returns (string) {
        require(isRegistered(_activity,msg.sender));
        require(activities[_activity].participants[msg.sender].validated);
        return activities[_activity].participationUrl;
    }
    function getTotalActivity() public constant returns (uint) {
        return numberOfActivity;
    }

    function getTotalParticipant(address _activity) public constant returns (uint) {
        return activities[_activity].registeredUserCount;
    }


    function getParticipantLimit(address _activity) public constant returns (uint) {
        return activities[_activity].participantLimit;
    }

    function leaveActivity(address _activity)
    onlyActive
    onlyActiveActivity(_activity)
    public view{
        require(isRegistered(_activity,msg.sender));
    }

    //Admin methods
    function getParticipiant(address _activity,uint idx) public
    onlyActive
    onlyOwnerActivity(_activity)
    constant
    returns (uint index, string email, address addr,uint256 value)
    {
        Activity storage activity = activities[_activity];
        address userAddr = activity.participantIndex[idx];
        Participant storage participant = activity.participants[userAddr];
        return (idx, participant.email, participant.addr,participant.value);
    }

    function deleteParticipiant(address _activity,uint idx) public
    onlyActive
    onlyOwnerActivity(_activity)
    {
        Activity storage activity = activities[_activity];
        address userAddr = activity.participantIndex[idx];
        Participant storage participant = activity.participants[userAddr];


        require(!participant.deleted); //is not deleted
        require(!participant.payBack);  //is not payBack

        participant.deleted = true;
        participant.payBack=true;
        activity.registeredUserCount--;

        participant.addr.transfer(participant.value);//if is it fail ,throws on failure
        ParticipantDeletedAt(activity.activityName,address(_activity),msg.sender,participant.email,participant.value);

    }

    function validateStudentStatus(address _activity,uint idx, bool isValidated)
    onlyActive
    onlyOwnerActivity(_activity)
    public
    {
        Activity storage activity = activities[_activity];
        address userAddr = activity.participantIndex[idx];
        Participant storage participant = activity.participants[userAddr];
        participant.validated = isValidated;
    }


    // if we will share invitation link like this,we must change this method because string is visibile on blockexplorer :)
    function setParticipationLink(address _activity,string url) public
    onlyActive
    onlyOwnerActivity(_activity) {
        activities[_activity].participationUrl = url;
    }

    function setPrice(address _activity,uint _price) public
    onlyActive
    onlyOwnerActivity(_activity) {
        activities[_activity].price = _price;
    }
    function getPrice(address _activity) public view returns(uint) {
        return activities[_activity].price;
    }

    function closeParticipation(address _activity) public
    onlyActive
    onlyOwnerActivity(_activity) {
        activities[_activity].isActive = false;
    }

    function openParticipation(address _activity) public
    onlyActive
    onlyOwnerActivity(_activity) {
        activities[_activity].isActive = true;
    }

    function closePayActive(address _activity) public  onlyActive
    onlyOwnerActivity(_activity) {
        activities[_activity].isPayActive = false;
    }

    function openPayActive(address _activity) public  onlyActive
    onlyOwnerActivity(_activity) {
        activities[_activity].isPayActive = true;
    }



    //only Owner set validateNumber=keccak256(key), during lesson we will share only key to participants
    function validateMeReturnMoney(address _activity,string _key) public
    onlyActive
    onlyActiveActivity(_activity)
    {
        require(isRegistered(_activity,msg.sender));
        Activity storage activity = activities[_activity];
        require(activity.validateNumber==keccak256(_key));

        Participant storage participant = activity.participants[msg.sender];

        require(!participant.deleted); //is not deleted
        require(!participant.payBack);  //is not payBack


        participant.payBack=true;

        participant.addr.transfer(participant.value * 5);//if is it fail ,throws on failure
        //multipy 5 for only test
        ParticipantPayBackAt(activity.activityName,activity.activityOwner,msg.sender,participant.email,participant.value);


    }
    function setValidateHash(address _activity,bytes32 _hash) public
    onlyActive
    onlyOwnerActivity(_activity){
        Activity storage activity = activities[_activity];
        activity.validateNumber=_hash;
    }
    function getValidateHash(address _activity)
    onlyOwnerActivity(_activity)
    public constant returns(bytes32)
    {
        return activities[_activity].validateNumber;
    }
    function transferOwnershipActivity(address _activity,address newOwner)
    onlyActive
    onlyOwnerActivity(_activity)
    public{
        Activity storage activity = activities[_activity];
        require(newOwner != address(0));
        ActivityOwnershipTransferred(activity.activityName,owner, newOwner);
        activity.activityOwner = newOwner;
    }
    
    function getActivityName(address _activity) public constant returns(string){
        return activities[_activity].activityName;
    }
    function getActive() public constant returns(bool){
        return isActive;
    }
    function setActive() onlyOwner public {
        isActive=true;
    }
}