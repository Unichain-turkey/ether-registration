pragma solidity ^0.4.4;


contract Ownable {

  address public owner;
  bool  isActive;
  bool  isPayActive;
  uint price;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  function Ownable() public {
    owner = msg.sender;
  }

  modifier onlyActive() {
    require(isActive);
    _;
  }

  modifier onlyPayActive() {
    require(isPayActive);
    _;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
  // these are dangerous lands :)
  function kill() public onlyOwner{
  selfdestruct(owner);
  }

  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}
