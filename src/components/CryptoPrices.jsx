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
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const [timespan, setTimespan] = useState('30');
    const handleTimespanChange = (event) => {
        setTimespan(event.target.value);
    };
  

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=usd&days=${timespan}`
      );
      setData(result.data.prices);
    };
    fetchData();
  }, [currency, timespan]);

  async function getBitcoinPrice() {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    );
    return response.data.bitcoin.usd;
  }

  async function getEthereumPrice() {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    return response.data.ethereum.usd;
  }

  async function getSolanaPrice() {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
    );
    return response.data.solana.usd;
  }

    const [bitcoinPrice, setBitcoinPrice] = useState(null);
    const [ethereumPrice, setEthereumPrice] = useState(null);
    const [solanaPrice, setSolanaPrice] = useState(null);
  
    useEffect(() => {
      async function fetchData() {
        const bitcoinPrice = await getBitcoinPrice();
        setBitcoinPrice(bitcoinPrice);
      }
  
      fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
          const ethereumPrice = await getEthereumPrice();
          setEthereumPrice(ethereumPrice);
        }
    
        fetchData();
      }, []);

      useEffect(() => {
        async function fetchData() {
          const solanaPrice = await getSolanaPrice();
          setSolanaPrice(solanaPrice);
        }
    
        fetchData();
      }, []);
  



  const xScale = scaleTime({
    domain: [new Date(data[0]?.[0]), new Date(data[data.length - 1]?.[0])],
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d[1]))],
    range: [height, 0],
    nice: true,
  });

  return (
    
    <div id="market-section" className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
            <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white py-1">
            {currency} price for the last {timespan} days
          </h1>
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
          <stop offset="0%" stopColor="#00c3ff" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#00c3ff" stopOpacity={0.1} />
        </linearGradient>
      </defs>
    </svg>

         
         

            
        </div>
    </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            

            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">

            <label htmlFor="crypto-dropdown" className="text-m sm:text-L text-white py-1">Select a currency:</label>
                <select className="rounded-full" id="crypto-dropdown" value={currency} onChange={handleChange}>
                    <option value="bitcoin">₿ Bitcoin (BTC)</option>
                    <option value="ethereum">Ξ Ethereum (ETH)</option>
                    <option value="solana">S Solana (SOL)</option>
                </select>
            
             <label htmlFor="timespan-dropdown" className="text-m sm:text-L text-white py-1">Select a timespan:</label>
                <select className="rounded-full" id="timespan-dropdown" value={timespan} onChange={handleTimespanChange}>
                    <option value="30">30 days</option>
                    <option value="365">1 year</option>
                    <option value="1095">3 years</option>
                </select>

               

            </div>

            <br></br>

            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
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
