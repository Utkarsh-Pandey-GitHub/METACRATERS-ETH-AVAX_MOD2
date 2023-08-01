"use client"

import React from 'react'

export default function ConnectWallet() {

    async function connect (){
      if (typeof window.ethereum !== "undefined") {
        
        console.log("I see a metamask")
        await window.ethereum.request({method: 'eth_requestAccounts'})
        document.getElementById('connectWalletBtn').innerHTML="Connected"
        console.log("metamask is now connected")
        
      } else {
        document.getElementById('connectWalletBtn').innerHTML="Install Metamask"
        console.log("No metamask")
      }
    }
    
  
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold   text-center md:ml-5 sm:ml-3 ml-7 p-2 mt-32 rounded-full" onClick={()=>{connect();}} id='connectWalletBtn'>
          Connect to your metacraft wallet
        </button>
    )
  }
  