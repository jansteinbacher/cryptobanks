import React from 'react';
import { Link } from 'react-router-dom';




const Learn = () => {
  


  return(
    <div id="learn-section">
      <div class="max-w-7xl mx-auto border-t-2  border-white pt-5"></div>

      <label className='flex items-center justify-center text-3xl text-white font-semibold gap-15'>Learn about the world of blockchain!</label>
    <div className="flex items-center p-10 grid grid-cols-3 gap-10 text-white font-bold ">
      <a href = "/blog"><p className="flex items-center justify-center border border-white rounded p-2">Introduction to Bitcoin</p></a>
      <p className="flex items-center justify-center border border-white rounded p-2">Introduction to Ethereum</p>
      <p className="flex items-center justify-center border border-white rounded p-2">Introduction to Solana</p>
      <p className="flex items-center justify-center border border-white rounded p-2">Introduction to Blockchain</p>
      <p className="flex items-center justify-center border border-white rounded p-2">Introduction to NFT</p>
    </div>
    </div>

);
};

export default Learn;