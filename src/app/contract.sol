// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
import "hardhat/console.sol";

contract App{
    // fund, withdraw, transfer
    mapping(address=>uint256) public balances;
    constructor(){
        balances[msg.sender]=msg.sender.balance;
    }

    function Fund() public payable{
        require(balances[msg.sender]>=msg.value,"The balance is not enough in sender's account");
        balances[msg.sender]-=msg.value;

    }

    function Withdraw(uint256 amount) public{
        require(address(this).balance>=amount,"The balance is not enough in contract");
        
        (bool callSuccess, ) = msg.sender.call{value: amount}("");
        require(callSuccess, "Call failed");

    }

    function balanceSender()public  view returns(uint256){
        return balances[msg.sender];
    }
    function balanceContract()public view returns(uint256){
        return address(this).balance;
    }

}
