pragma solidity ^0.4.23;

contract Exchange {

    struct History {
        uint256 id;
        address sender;
        string receiver;
        uint256 amount;
        string destinationSource;
    }

    // owner who has admin permissions
    address owner;
    // availableTypes are allowed types for the Exchange
    mapping(string => bool) availableTypes;

    // history list
    mapping(address => History[]) histories;

    // id
    uint256 id;

    modifier onlyadmin {
        require (
            msg.sender == owner,
            "Only admin can call this."
        ) ;
        _;
    }

    constructor() public {
        owner = msg.sender;
        availableTypes["ETH-TRX"] = true;
        id = 0;
    }

    // isValidType checks if input type is in availableTypes or not
    function isValidType(string destination) public view returns (bool) {
        if (availableTypes[destination]) return true;
        return false;
    }

    // Deposit: sender call this function and send eth to this function
    function deposit(string receiver, string destination) public payable {
        if (isValidType(destination)) {
            History memory history = History(id, msg.sender, receiver, msg.value, destination);
            histories[msg.sender].push(history);
            id = id + 1;
        }
    }

    // Release TRX to targeted TRX address
    function release(address receiver, uint256 amount) public onlyadmin {
        receiver.transfer(amount);
    }

}
