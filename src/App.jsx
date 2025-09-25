import React from 'react'

const stocks = [
  { ticker: 'NVDA', name: '엔비디아', currentPrice: 178.43, previousClose: 181.40 },
  { ticker: 'TSLA', name: '테슬라', currentPrice: 425.85, previousClose: 439.95 },
  { ticker: 'GOOGL', name: '알파벳', currentPrice: 251.66, previousClose: 253.22 },
  //  { ticker: '005930.KS', name: '삼성전자', currentPrice: 85400, previousClose: 84700 },
]

function App() {
  return (
    <div className='bg-gray-100 min-h-screen p-8 flex flex-col items-center'>
      <h1 className="text-4xl font-bold text-gray-800 mb-10">오늘의 주식 시세</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {
          stocks.map(stock => (
            <TickerCard
              key={stock.ticker}
              ticker={stock.ticker}
              name={stock.name}
              currentPrice={stock.currentPrice}
              previousClose={stock.previousClose}
            />
          ))
        }
      </div>
    </div>
  )
}

const TickerCard = ({ ticker, name, currentPrice, previousClose }) => {
  const priceChange = currentPrice - previousClose
  const isPositive = priceChange >= 0

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-80 transform transition duration-500 hover:scale-105">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <div className="text-sm font-semibold text-gray-500">{ticker}</div>
      </div>
      <div className="border-b border-gray-200 mb-4"></div>

      <div className={`text-4xl font-extrabold mb-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        ${currentPrice.toFixed(2)}
      </div>

      <div className={`text-base font-semibold ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
        {isPositive ? '▲' : '▼'} {priceChange.toFixed(2)}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        전일 종가: ${previousClose.toFixed(2)}
      </div>
    </div>
  )
}

export default TickerCard