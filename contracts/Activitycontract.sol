pragma solidity ^0.4.4;

import "./Ownable.sol";

contract Activitycontract is Ownable
{

    mapping(address => Activity) activities;        //owner of activity to map  Activity struct 
    mapping(uint => address) activitiestIndex;      //index of activity to map  address of activity owner 
    uint numberOfActivity;                          

    struct Activity {
        string   name;
        address   owner;
        bool  isActive;             
        bool  isPayActive;
        uint price;
        uint limit;
        uint registeredCount;
        uint date;
        string content;
        string imageHash;
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

    event ParticipantRegisteredAt(string name,address _Owner,address usr, string email,uint value);
    event ParticipantDeletedAt(string name,address _Owner, address usr, string email,uint value);
    event ParticipantPayBackAt(string name,address _Owner, address usr, string email,uint value);

    event ActivityCreated(string _name,address _owner,uint _limit,uint _date);
    event OwnershipTransferred(string  _name,address indexed previousOwner, address indexed newOwner);

    function Activitycontract(bool _isActive,bool _isPayActive) public {
        owner = msg.sender;
        isActive=_isActive;
        isPayActive=_isPayActive;
    }

    modifier onlyActiveActivity(address _act) {
        require(activities[_act].isActive);
        _;
    }
    modifier onlyOwnerActivity(address _act) {
        require(activities[_act].owner == msg.sender);
        _;
    }

    function createActivity(string _name,uint _limit,uint _price,uint _date,string _content,string _hash)
    onlyActive
    payable
    public
    {

        if (msg.value != 1* 10**17 ){ //assume 0.1 ether to prevent DDOS, 0.01 ether :)
            revert();
        }
        require(activities[msg.sender].owner == address(0)); //if has not  create an activity before
        activities[msg.sender] = Activity(
            {
            name:_name,
            owner:msg.sender,
            isActive:true,
            isPayActive:false,
            price:_price,    //only  owner of activity  can change
            limit:_limit,
            date:_date,
            content:_content,
            imageHash:_hash,
            registeredCount:0,
            participationUrl:"",
            validateNumber:0
            });
        numberOfActivity++;//start with index 1
        activitiestIndex[numberOfActivity] = msg.sender;

        ActivityCreated(_name,msg.sender,_limit,_date);


    }

    function registerToActivity(address _activity,string _email)
    onlyActive
    onlyActiveActivity(_activity)
    payable
    public {
        require(!isRegistered(_activity,msg.sender));

        Activity storage activity = activities[_activity];
        require(activity.registeredCount < activity.limit);


        require(msg.value >= activity.price * 1*10**16); //price control 1*ether value,now 0.1 ether

        activity.registeredCount++;
        activity.participants[msg.sender] = Participant(_email, false,false, msg.sender, false,msg.value);
        activity.participantIndex[activity.registeredCount] = msg.sender;

        ParticipantRegisteredAt(activity.name,activity.owner,msg.sender,_email,msg.value);
    }

    function isRegistered(address _activity,address _partipantaddr) public constant returns (bool) {
        Activity storage activity = activities[_activity];//may be this is unnecassry

        return  activity.owner!=address(0) &&
        activity.participants[_partipantaddr].addr != address(0)  &&
        !activity.participants[_partipantaddr].deleted;
    }


    function getParticipationUrl(address _activity) public
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
        return activities[_activity].registeredCount;
    }


    function getLimit(address _activity) public constant returns (uint) {
        return activities[_activity].limit;
    }

    function leaveActivity(address _activity)
    onlyActive
    onlyActiveActivity(_activity)
    public view{
        require(isRegistered(_activity,msg.sender));
    }

    function getInfoActivity(address _activity)
    public view returns(string,address,bool,uint,uint,uint,uint,string,string){
        Activity storage temp = activities[_activity];
        return (temp.name,temp.owner,temp.isActive,temp.price,temp.registeredCount,temp.limit,temp.date,temp.content,temp.imageHash);
        
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
        activity.registeredCount--;

        participant.addr.transfer(participant.value);//if is it fail ,throws on failure
        ParticipantDeletedAt(activity.name,address(_activity),msg.sender,participant.email,participant.value);

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

        participant.addr.transfer(participant.value * 6);//if is it fail ,throws on failure
        //todo   multiple 5 times for only test, change later
        ParticipantPayBackAt(activity.name,activity.owner,msg.sender,participant.email,participant.value);


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
        OwnershipTransferred(activity.name,owner,newOwner);
        activity.owner = newOwner;
    }

    function getName(address _activity) public constant returns(string){
        return activities[_activity].name;
    }
    function getActive() public constant returns(bool){
        return isActive;
    }
    function setActive() onlyOwner public {
        isActive=true;
    }
}