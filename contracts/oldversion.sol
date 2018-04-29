pragma solidity ^0.4.4;

import "./Ownable.sol";

contract Activity is Ownable
{


    string   activityName;

    string   private participationUrl ;//we should change this ,string is visible :)
    bytes32  private validateNumber ;//this is a hash  to participant verify themselves for payback money


    uint participantLimit;
    uint registeredUserCount;
    uint price;

    mapping(address => Participant) participants;
    mapping(uint => address) participantIndex;

    struct Participant {
        string email;
        bool validated;
        bool payBack;
        address addr;
        bool deleted;
        uint256 value;
    }

    event ParticipantRegistered(string activityName,address addr, string email,uint value);
    event ParticipantDeleted(string activityName, address addr, string email,uint value);
    event ParticipantPayBack(string activityName, address addr, string email,uint value);


    function Activity(uint _participantLimit,string _activityName) public {
        owner = msg.sender;
        activityName=_activityName;

        if (_participantLimit != 0) {
            participantLimit = _participantLimit;
        } else {
            participantLimit = 30;
        }
    }



    function registerToActivity(string email) onlyActive
    payable
    public {
        require(!isRegistered(msg.sender));
        require(registeredUserCount < participantLimit);

        require(msg.value > price); //price control

        registeredUserCount++;
        participants[msg.sender] = Participant(email, false,false, msg.sender, false,msg.value);
        participantIndex[registeredUserCount] = msg.sender;

        ParticipantRegistered(activityName,msg.sender, email,msg.value);
    }

    function isRegistered(address _addr) public constant returns (bool) {
        return participants[_addr].addr != address(0) && !participants[_addr].deleted;
    }

    function getMeParticipationUrl() public
    onlyActive
    constant returns (string) {
        require(isRegistered(msg.sender));
        Participant storage participant = participants[msg.sender];
        require(participant.validated);
        return participationUrl;
    }

    function getTotalCount() public constant returns (uint) {
        return registeredUserCount;
    }

    function getParticipantLimit() public constant returns (uint) {
        return participantLimit;
    }


    //Admin methods
    function getParticipiant(uint idx) public constant onlyOwner
    returns (uint index, string email, address addr,uint256 value) {
        address userAddr = participantIndex[idx];
        Participant storage participant = participants[userAddr];
        return (idx, participant.email, participant.addr,participant.value);
    }

    function deleteParticipiant(uint idx) public onlyOwner {
        address userAddr = participantIndex[idx];
        Participant storage participant = participants[userAddr];


        require(!participant.deleted); //is not deleted
        require(!participant.payBack);  //is not payBack

        participant.deleted = true;
        participant.payBack=true;
        registeredUserCount--;

        participant.addr.transfer(participant.value);//if is it fail ,throws on failure
        ParticipantDeleted(activityName,msg.sender,participant.email,participant.value);

    }

    function validateStudentStatus(uint idx, bool isValidated) public onlyOwner {
        address userAddr = participantIndex[idx];
        Participant storage participant = participants[userAddr];
        participant.validated = isValidated;
    }


    // if we will share invitation link like this,we must change this method because string is visibile on blockexplorer :)
    function setParticipationLink(string url) public onlyOwner {
        participationUrl = url;
    }

    function setPrice(uint _price) public onlyOwner {
        price = _price;
    }
    function getPrice() public view returns(uint) {
        return price;
    }

    function closeParticipation() public onlyOwner {
        isActive = false;
    }

    function openParticipation() public onlyOwner {
        isActive = true;
    }

    function closePayBack() public onlyOwner {
        isActive = false;
    }

    function openPayBack() public onlyOwner {
        isActive = true;
    }


    //only Owner set validateNumber=keccak256(key), during lesson we will share only key to participants
    function validateMeReturnMoney(string _key) public
    onlyActive
    onlyPayActive
    {
        require(isRegistered(msg.sender));
        require(validateNumber==keccak256(_key));

        Participant storage participant = participants[msg.sender];

        require(!participant.deleted); //is not deleted
        require(!participant.payBack);  //is not payBack


        participant.payBack=true;

        participant.addr.transfer(participant.value);//if is it fail ,throws on failure
        ParticipantPayBack(activityName,msg.sender,participant.email,participant.value);


    }
    function setValidateNumber(bytes32 _hash) public
    onlyOwner
    onlyActive{
        validateNumber=_hash;
    }
    function getValidate() onlyOwner public view returns(bytes32)
    {
        return validateNumber;
    }

}
