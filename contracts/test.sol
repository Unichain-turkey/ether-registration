pragma solidity ^0.4.4;
contract Test {
    bytes32 value;

    event valuechanged(bytes32 _newValue);

    function setValue(string _key) public{ //defaultda bu olmucak
        value=keccak256(_key);
        valuechanged(value);
    }

    function setHash(bytes32 _hash) public{
        value=_hash;
    }
    function getKeccak256(string _key) public pure  returns(bytes32){
        return keccak256(_key);
    }
    function getK() public constant returns(bytes32){
        return value;
    }
    function checkEqual(string _key) public constant returns(bool){
        return value==keccak256(_key);
    }


}

    







