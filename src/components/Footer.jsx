import React from "react";

import logo from "../images/logo.png";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 ">
     <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
      <a href="/"> <img src={logo} alt="logo" className="w-32" /></a>
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <a href="/#market-section"><p className="text-white text-base text-center mx-2 cursor-pointer">Market</p></a>
        <a href="/blog" ><p className="text-white text-base text-center mx-2 cursor-pointer">Learn</p></a>
        <a href="/#wallet-section"><p className="text-white text-base text-center mx-2 cursor-pointer">Wallet</p></a>
        <a href="/"><p className="text-white text-base text-center mx-2 cursor-pointer">NFT</p></a>
        <a href="/"><p className="text-white text-base text-center mx-2 cursor-pointer">Earn</p></a>
      </div>
    </div>

  </div>
);

export default Footer;