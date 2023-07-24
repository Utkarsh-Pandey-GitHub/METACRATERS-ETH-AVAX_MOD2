
// import burn from "../../assets/fireplace.mp4"
'use client'
import ConnectWallet from './connectWallet.js';

import { useEffect } from 'react';
import {Fund, getBal , getRate, Withdraw} from './operations.js';
import Rate from './rate.js';



export default function Home() {

  return (
    <>
      <ConnectWallet />
      <br />

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold   text-center md:ml-52 sm:ml-36 ml-72 w-1/4 mt-32 rounded-full" onClick={() => { Fund(); }} id='fund'>
        Fund
      </button>
      <label htmlFor="fund" className='m-5'>Enter Amount </label>
      <input id="amt" placeholder='0.1' className='m-5 text-black'/>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold   text-center md:ml-52 sm:ml-36 ml-72 w-1/4 mt-32 rounded-full" onClick={() => { getBal(); }} id='getBalButton'>
          Get Balance
        </button>
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold   text-center md:ml-52 sm:ml-36 ml-72 w-1/4 mt-32 rounded-full" onClick={() => { getRate(); }} id='getRateButton'>
          Get Rate
        </button>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold   text-center md:ml-52 sm:ml-36 ml-72 w-1/4 mt-32 rounded-full" onClick={() => { Rate(); }} id='rate'>
          Rate
        </button>
      </div> */}
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold   text-center md:ml-52 sm:ml-36 ml-72 w-1/4 mt-32 rounded-full" onClick={() => { Withdraw(); }} id='withdraw'>
          Withdraw
        </button> */}
    </>
  )
}
