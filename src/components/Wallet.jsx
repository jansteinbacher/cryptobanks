import { useState, useEffect } from "react";
import axios from "axios";
import Web3 from 'web3';




function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [ethereumPrice, setEthereumPrice] = useState(null);


// fetch the current ethereum price from coingecko api
  async function getEthereumPrice() {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    return response.data.ethereum.usd;
  }

  // set the ethereum price
  useEffect(() => {
    async function fetchData() {
      const ethereumPrice = await getEthereumPrice();
      setEthereumPrice(ethereumPrice);
    }

    fetchData();
  }, []);

 
  // connect the app with the metamask plugin and get the ethereum balance and wallet address
  const connectToMetamask = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const balanceWei = await web3.eth.getBalance(accounts[0]);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        setBalance(balanceEth);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Please install Metamask');
    }
  };

  const disconnectFromMetamask = () => {
    setAccount('');
    setBalance('');
  };

  return (
    <div id="wallet-section">
      <div class="max-w-7xl mx-auto border-t-2 border-white pt-5"></div>

      <label className='flex items-center justify-center text-3xl text-white font-semibold gap-15'>Connect you Wallet</label>
      <label className='flex items-center justify-center text-xl text-white font-semibold gap-24'>See the address of your Metamask-Wallet and the current Ethereum Balance in Ξ & $ </label>
  
      <div className="container mx-auto max-w-lg p-4 bg-white rounded-lg shadow my-8 ">
        {account === '' ? (
          <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={connectToMetamask}
          >
            Connect to Metamask
          </button>
          </div>
        ) : (
          <>
            <p className="text-lg font-bold mb-4 flex justify-center items-center">Wallet Address:</p>
            <p className="mb-4 flex justify-center items-center">{account}</p>
            <p className="text-lg font-bold mb-4 flex justify-center items-center">Balance:</p>
            <p className="mb-4 flex justify-center items-center">{balance !== '' ? `${balance} ETH` : ''}</p>
            <p className="text-lg font-bold mb-4 flex justify-center items-center">Balance in $: </p>
            <p className="mb-4 flex justify-center items-center">{balance !== '' ? `${balance * ethereumPrice} $` : ''}</p>
  
            <div className="flex justify-center items-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={disconnectFromMetamask}
            >
              Disconnect from Metamask
            </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
}

export default App;
