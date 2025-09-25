import React from 'react'

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