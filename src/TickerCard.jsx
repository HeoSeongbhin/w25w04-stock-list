import React, { useEffect, useState } from 'react'

const TickerCard = ({ ticker }) => {
    const [stockData, setStockData] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`)}`
                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error('네트워크 응답이 정상적이지 않습니다.')
                }

                const data = await response.json()
                // console.log(data.chart.result[0])
                setStockData(data.chart.result[0])
            } catch (err) {
                console.error("데이터를 가져오는 데 실패했습니다:", err)
                setError(`${ticker} 데이터를 가져오는 데 실패했습니다.`)
            }
        }

        fetchStockData()
    }, [ticker])

    if (!stockData || !stockData.meta) {
        return (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative w-80 mx-auto">
                <strong className="font-bold">경고!</strong>
                <div className="block sm:inline ml-2">주식 데이터가 없습니다.</div>
            </div>
        )
    }

    const meta = stockData.meta
    const name = meta.longName
    const currentPrice = meta.regularMarketPrice
    const previousClose = meta.chartPreviousClose
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