
// import burn from "../../assets/fireplace.mp4"
'use client'
import ConnectWallet from './connectWallet.js';

import { useEffect } from 'react';
import { Fund, getBal } from './operations.js';




export default function Home() {
  
  return (
    <>

      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl ml-10 my-5"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Raise Funds</span> for a noble cause.</h1>
      <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 ml-20">We are raising funds to help the needy and less fortunate.</p>

      <div class="container mx-10 px-4">

        <ConnectWallet />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold   text-center md:ml-52 sm:ml-36 ml-72 p-2 mt-32 rounded-full" onClick={async () => { await getBal(); }} id='getBalButton'>
          Check total funds raised
        </button>
        <br />


        <label htmlFor="fund" className='m-10 text-sky-500'>Enter Contribution Amount </label>
        <input id="amt" placeholder='0.1' className='text-center m-5 text-black' />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold   text-center md:ml-5 sm:ml-3 ml-5 p-2 mt-32 rounded-full" onClick={() => { Fund(); }} id='fund'>
          Fund
        </button>
        <br />
      </div>
    </>
  )
}
