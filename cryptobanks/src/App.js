import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const CryptoPrices = () => {
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('bitcoin');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${selectedCurrency}/market_chart?vs_currency=usd&days=${selectedTimeRange}`
      );
      setCryptoPrices(response.data.prices);
    };
    fetchData();
  }, [selectedCurrency, selectedTimeRange]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleTimeRangeChange = (timeRange) => {
    setSelectedTimeRange(timeRange);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleDateString();
  };

  return (
    <div className={`crypto-prices ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <h1>Crypto Prices</h1>
        <button className="dark-mode-button" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="chart-container">
        <LineChart width={800} height={400} data={cryptoPrices}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="0"
            tickFormatter={formatXAxis}
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip
            labelFormatter={(timestamp) =>
              new Date(timestamp).toLocaleDateString()
            }
            formatter={(value) =>
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(value)
            }
          />
          <Legend />
          <Line
            type="linear"
            dataKey="1"
            name={selectedCurrency.toUpperCase()}
            stroke={
              selectedCurrency === 'bitcoin'
                ? '#F7931A'
                : selectedCurrency === 'ethereum'
                ? '#3C3C3D'
                : '#00CFD7'
            }
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
        <div className="buttons-container">
          <div className="currency-buttons">
            <button
              className={`currency-button ${
                selectedCurrency === 'bitcoin' ? 'active' : ''
              }`}
              onClick={() => handleCurrencyChange('bitcoin')}
            >
              Bitcoin
            </button>
            <button
              className={`currency-button ${
                selectedCurrency === 'ethereum' ? 'active' : ''
              }`}
              onClick={() => handleCurrencyChange('ethereum')}
            >
              Ethereum
            </button>
            <button
              className={`currency-button ${
                selectedCurrency === 'solana' ? 'active' : ''
              }`}
              onClick={() => handleCurrencyChange('solana')}
            >
              Solana
            </button>
          </
