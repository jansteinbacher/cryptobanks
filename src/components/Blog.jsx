import React from "react";
import Bitcoin from "../images/Bitcoin.png";

function Blog() {


  return (
    <div className="py-12 gradient-bg-welcome">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-medium mb-4 text-white">Cryptobanks Learn</h2>
          <p className="text-lg text-gray-700 text-white">
            Learn about the basics of cryptocurrencies, blockchain and test your knowledge in quizzes.
          </p>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4">
            <a href="/blogarticlebitcoin">
            <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-center items-center">
            <img src={Bitcoin} link="/" alt="Bitcoin" className="mb-4 rounded-mb w-1/2" />
            </div>
              <h3 className="text-xl font-medium mb-4">Introduction to Bitcoin</h3>
              <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum arcu nec sapien congue, 
              eget commodo justo convallis. Nam quis massa eget lacus volutpat tristique eu vitae nisi.
              </p>
            </div>
            </a>
          </div>
         
          <div className="w-full md:w-1/3 p-4">
            <a href="/quiz">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-center items-center">
            <img src={Bitcoin} link="/" alt="Bitcoin" className="mb-4 rounded-mb w-1/2" />
            </div>

              <h3 className="text-xl font-medium mb-4">Bitcoin Quiz?</h3>
              <p className="text-gray-700">
                Answer a short Quiz about the cryptocurrency Bitcoin and see how much you know.
              </p>
            </div>
            </a>
          </div>
          <div className="w-full md:w-1/3 p-4">
          
            <div className="bg-white rounded-lg shadow-lg p-4">
            
            <div className="flex justify-center items-center">
            <img src={Bitcoin} link="/" alt="Bitcoin" className="mb-4 rounded-mb w-1/2" />
            </div>
              <h3 className="text-xl font-medium mb-4">Introduction to Ethereum</h3>
              <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum arcu nec sapien congue, 
              eget commodo justo convallis. Nam quis massa eget lacus volutpat tristique eu vitae nisi.
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
