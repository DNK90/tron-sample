pragma solidity ^0.4.23;

contract Exchange {

    // owner who has admin permissions
    address owner;
    // availableTypes are allowed types for the Exchange
    mapping(string => bool) availableTypes;

    // event fired while depositing
    event onDeposit(address sender, string receiver, string destination, uint256 amount);

    modifier onlyadmin {
        require (
            msg.sender == owner,
            "Only admin can call this."
        ) ;
        _;
    }

    constructor() public {
        owner = msg.sender;
        availableTypes["NEO"] = true;
        availableTypes["TRX"] = true;
    }

    // isValidType checks if input type is in availableTypes or not
    function isValidType(string destination) public view returns (bool) {
        if (availableTypes[destination]) return true;
        return false;
    }

    // Deposit: sender call this function and send eth to this function
    function deposit(string receiver, string destination) public payable {
        if (isValidType(destination)) {
            emit onDeposit(msg.sender, receiver, destination, msg.value);
        }
    }

    // addType adds new type to availableTypes
    function addType(string _type) public onlyadmin {
        availableTypes[_type] = true;
    }

    // Release ETH to targeted ETH address
    function release(address receiver, uint256 amount) public onlyadmin {
        receiver.transfer(amount);
    }
}
