


import { abi, contractAddress } from './constants'
import { ethers } from "ethers";

let d = null

async function Rate() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        console.log(contract);
        d=await getData(contract);
    }
}

async function getData(contract) {
    try {
      const data = await contract.rates();
      
      console.log("Data from the contract:", data);
      return data;
    } catch (error) {
      console.error("Error calling getData:", error);
    }
  }
Rate().then(()=>{console.log(d);})
  


