import React from "react";
import Bitcoin from "../images/Bitcoin.png";

const Blog = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ">
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-4 ">
        Bitcoin: The Future of Money?
      </h1>
      <p className="text-1xl text-white mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non quam
        id augue consequat convallis. Nullam molestie semper libero, eu
        consectetur nibh pharetra sed.
      </p>
      <img src={Bitcoin} link="/" alt="Bitcoin" className="w-1/4 cursor-pointer mx-auto" />
      <br></br>


      <p className="text-white mb-4">
        Bitcoin has been in the news a lot lately, and for good reason. This
        innovative digital currency has the potential to revolutionize the way
        we think about money and transactions.
      </p>
      <p className="text-white mb-4">
        At its core, Bitcoin is a decentralized digital currency that allows
        users to make transactions without the need for a central authority,
        such as a bank or government. Instead, transactions are verified by a
        network of computers and recorded on a public ledger called the
        blockchain.
      </p>
      <p className="text-white mb-4">
        One of the biggest advantages of Bitcoin is its security. Because
        transactions are recorded on a public ledger, it's virtually impossible
        for someone to manipulate the system or steal funds. Additionally,
        Bitcoin is designed to be inflation-proof, meaning that its value is not
        subject to the same fluctuations as traditional currencies.
      </p>
      <p className="text-white mb-4">
        Of course, Bitcoin is not without its challenges. Critics have pointed
        out that the currency is highly volatile, and that it may be vulnerable
        to hacking and other security threats. However, many experts believe
        that these issues can be addressed over time as the technology matures
        and more users adopt the currency.
      </p>
      <p className="text-white mb-4">
        Despite these challenges, it's clear that Bitcoin has the potential to
        be a game-changer in the world of finance. Whether you're a casual
        observer or a seasoned investor, it's worth keeping an eye on this
        innovative digital currency and the many possibilities it offers.
      </p>
    </div>
  );
};

export default Blog;
