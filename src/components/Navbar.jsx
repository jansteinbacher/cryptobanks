import React from "react";

import logo from "../images/logo.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4 border-b-2 border-white">
      <div className="md:flex-[0.5] flex-initial justify-start items-center">
        <a href="/">
          <img src={logo} link="/" alt="logo" className="w-1/3 cursor-pointer flex items-center " />
        </a>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial ">
        <a href="/#market-section" className="hover:font-bold">
          <NavBarItem title="Market" link="/market" />
        </a>
        <a href="/blog" className="hover:font-bold">
          <NavBarItem title="Learn" link="/learn" />
        </a>
        <a href="/#wallet-section" className="hover:font-bold">
          <NavBarItem title="Wallet" link="/wallet" />
        </a>
        <a href="/" className="hover:font-bold">
          <NavBarItem title="NFT" link="/nft" />
        </a>
        <a href="/" className="hover:font-bold">
          <NavBarItem title="Earn" link="/earn" />
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
