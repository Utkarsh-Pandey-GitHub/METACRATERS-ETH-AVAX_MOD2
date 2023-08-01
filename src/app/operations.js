'use client'
/*
For a transaction we need

provider / connection to the Blockchain / read only access

signer / wallet / someone withsome gas/ transaction access / write access

//contract ->ABI &Address
*/
import { abi, contractAddress } from './constants'
import { ethers } from "ethers";


function Fund() {
  let amount = document.getElementById('amt').value
  console.log(`Funding the contract with ${amount}`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    
    const contract = new ethers.Contract(contractAddress, abi, signer)
    console.log(contract);
    try {
      let txRes = {}
      contract.fund({
        value: ethers.utils.parseEther(amount)
      })
      .then((data) => { 
        listenForTransactionMine(data,provider).then((data)=>{console.log(data);}).catch((err)=>{console.log(err);}); })
      .catch((err) => { console.log(err); })

      
      document.getElementById('fund').innerHTML = "Funded"
      console.log("done"); 
    } catch (err) {
      console.error(err); 
    }


  }
}


function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}...`)
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations}confirmations`
      );
      resolve("transaction mined")
    })

  })
}

async function getBal() {
  const d = new Date()
  const day = d.getDay()
  const month = d.getMonth()
  const year = d.getFullYear()
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    

    await provider.getBalance(contractAddress).then((data)=>{
      const bal=data 
      console.log(ethers.utils.formatEther(bal));
      document.getElementById('getBalButton').innerHTML = `Funds raised till ${day}-${month}-${year} is 
      ${ethers.utils.formatEther(bal)}`
    }).catch((err)=>{console.error(err);})
  }

}

function getRate() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    contract.rates().call()
      .then((data) => {
        document.getElementById('getBalButton').innerHTML = `Balance is ${ethers.utils.formatEther(bal)}`
      })
      .catch((err) => { console.error(err); })
  }
}


module.exports = { getBal, Fund, getRate }


