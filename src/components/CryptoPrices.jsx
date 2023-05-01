import { useState, useEffect } from "react";
import axios from "axios";
import { AreaClosed, Line, Bar } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";

const margin = { top: 20, right: 20, bottom: 60, left: 80 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;




function App() {
    const [data, setData] = useState([]);
    const [currency, setCurrency] = useState('bitcoin');
    const [coins, setCoins] = useState([]);
    const [coinName, setCoinName] = useState(currency);
    const [bitcoinPrice, setBitcoinPrice] = useState(null);
    const [ethereumPrice, setEthereumPrice] = useState(null);
    const [solanaPrice, setSolanaPrice] = useState(null);


    const handleChange = (event) => {
      const selectedIndex = event.target.selectedIndex;
      setCurrency(event.target.value);
      setCoinName(coins[selectedIndex].name);
    };

    const [timespan, setTimespan] = useState('30');
    const handleTimespanChange = (event) => {
        setTimespan(event.target.value);
    };
    // fetches 50 biggest cryptocurrencies from coingecko API using Axios and safes it in a map object
    useEffect(() => {
      async function fetchData() {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=50&page=1&sparkline=false');
        const coins = response.data.map(coin => {
          return { id: coin.id, name: coin.name };
        });
        setCoins(coins);
      }
      fetchData();
    }, []);
  
// fetches price data from current chosen currency in the current timespan from coingecko API using Axios 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=usd&days=${timespan}`
      );
      setData(result.data.prices);
    };
    fetchData();
  }, [currency, timespan]);

  // fetches current bitcoin price from coingecko
  async function getBitcoinPrice() {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    );
    return response.data.bitcoin.usd;
  }

  // fetches current ethereum price from coingecko
  async function getEthereumPrice() {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    return response.data.ethereum.usd;
  }

  // fetches current solana price from coingecko
  async function getSolanaPrice() {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
    );
    return response.data.solana.usd;
  }

  
  // set bitcoinprice
    useEffect(() => {
      async function fetchData() {
        const bitcoinPrice = await getBitcoinPrice();
        setBitcoinPrice(bitcoinPrice);
      }
  
      fetchData();
    }, []);


    // set ethereum price
    useEffect(() => {
        async function fetchData() {
          const ethereumPrice = await getEthereumPrice();
          setEthereumPrice(ethereumPrice);
        }
    
        fetchData();
      }, []);

      // set solana price
      useEffect(() => {
        async function fetchData() {
          const solanaPrice = await getSolanaPrice();
          setSolanaPrice(solanaPrice);
        }
    
        fetchData();
      }, []);
  


  // set the x axis depending on the chosen timespan
  const xScale = scaleTime({
    domain: [new Date(data[0]?.[0]), new Date(data[data.length - 1]?.[0])],
    range: [0, width],
  });

  // sets y axis depending on data from chosen coin
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d[1]))],
    range: [height, 0],
    nice: true,
  });

  return (
    
    <div id="market-section" className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
            <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
            <h1 className="text-3xl mx-auto sm:text-5xl text-white py-1">
            {coinName} price over the last {timespan} days
            <br></br>
          </h1>
      
          {/* displays chart of the coin */}
          <svg className="flex flex-1 justify-start items-start flex-col mf:mr-10" width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
            <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom top={height} scale={xScale} numTicks={width > 520 ? 10 : 5} stroke="#fff" 
             tickLabelProps={() => ({
            fill: "#fff",
            fontSize: "12px",
            textAnchor: "middle",
             })}/>
        <AxisLeft scale={yScale} stroke="#fff" 
        tickLabelProps={() => ({
            fill: "#fff",
            fontSize: "12px",
            textAnchor: "end",
          })}/>
        <AreaClosed
          data={data}
          x={(d) => xScale(new Date(d[0])) ?? 0}
          y={(d) => yScale(d[1]) ?? 0}
          yScale={yScale}
          fill="url('#gradient')"
        />
        <Line
          data={data}
          x={(d) => xScale(new Date(d[0])) ?? 0}
          y={(d) => yScale(d[1]) ?? 0}
          stroke="#fff"
          strokeWidth={1.5}
        />
        <Bar
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url('#gradient')"
          fillOpacity={0.1}
          rx={14}
        />
      </g>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9F00FF" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#9F00FF" stopOpacity={0.1} />
        </linearGradient>
      </defs>
    </svg>

         
         

            
        </div>
    </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            

            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center ">

      
            {/* dropdown menu for coins with coinmap object */}
            <label htmlFor="crypto-dropdown" className="text-m sm:text-L text-white py-1">Select a currency:</label>
                <select className="rounded-full" id="crypto-dropdown" key={coinName} value={currency} onChange={handleChange}>
                  {coins.map(coin => (
                    <option key={coin.name} value={coin.id}>
                    {coin.name}
                    </option>
                  ))}
                </select>
            
                {/* dropdown menu for timespan */}
             <label htmlFor="timespan-dropdown" className="text-m sm:text-L text-white py-1">Select a timespan:</label>
                <select className="rounded-full" id="timespan-dropdown" value={timespan} onChange={handleTimespanChange}>
                    <option value="30">30 days</option>
                    <option value="365">1 year</option>
                    <option value="1096">3 years</option>
                </select>

                <br></br>


                <label htmlFor="timespan-dropdown" className="text-m sm:text-L text-white py-1">
                  data from <a href="https://www.coingecko.com" target="_blank" className="font-bold" rel="noreferrer">coingecko.com</a>
                  </label>

               

            </div>

            <br></br>

            
            {/* display current coin prices */}


            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center ">
                <label className="text-XL sm:text-2XL text-white py-1 font-bold">Current prices</label>

                <p className="text-m sm:text-L text-white py-1">₿ Bitcoin (BTC) {bitcoinPrice} $</p>
                <p className="text-m sm:text-L text-white py-1">Ξ Ethereum (ETH) {ethereumPrice} $</p>
                <p className="text-m sm:text-L text-white py-1">S Solana (SOL) {solanaPrice} $</p>

            </div>

           
     
        </div>


</div>



    
    );
}

export default App;
