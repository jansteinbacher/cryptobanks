import { useState, useEffect } from "react";
import axios from "axios";
import Web3 from 'web3';



function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [ethereumPrice, setEthereumPrice] = useState(null);

  async function getEthereumPrice() {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    return response.data.ethereum.usd;
  }

  useEffect(() => {
    async function fetchData() {
      const ethereumPrice = await getEthereumPrice();
      setEthereumPrice(ethereumPrice);
    }

    fetchData();
  }, []);

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
    <div className="container mx-auto max-w-lg p-4 bg-white rounded-lg shadow">
      <p className="text-lg font-bold mb-4">Wallet Address:</p>
      <p className="mb-4">{account}</p>
      <p className="text-lg font-bold mb-4">Balance:</p>
      <p className="mb-4">{balance !== '' ? `${balance} ETH` : ''}</p>
      <p className="text-lg font-bold mb-4">Balance in $:</p>
      <p className="mb-4">{balance !== '' ? `${balance*ethereumPrice} $` : ''}</p>

      {account !== '' ? (
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={disconnectFromMetamask}
        >
          Disconnect from Metamask
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={connectToMetamask}
        >
          Connect to Metamask
        </button>
      )}
    </div>
  );
}

export default App;
