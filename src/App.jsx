import axios from 'axios'
import React, { useEffect, useState } from 'react'

export function App() {
  // const [currencyType, setCurrencyType] = useState('USD')
  const [currencyAmount, setCurrencyAmount] = useState(1.0)
  const [currencyResults, setCurrencyResults] = useState({})

  // @ts-ignore
  useEffect(async () => {
    const response = await axios.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=50c29782e3cbea408daa31fd91fc1290`
    )
    console.log(response.data)
    setCurrencyResults(response.data.rates)
  }, [])

  return (
    <div>
      <header>
        <h1>Currency Converter</h1>
        <section className="input-bar">
          <h5> Enter a Amount:</h5>
          {/* function circumference(r) {
              if (Number.isNaN(Number.parseFloat(r))) {
                return 0;
              }
            } */}
          <input
            type="text"
            placeholder="USD"
            value={currencyAmount}
            onChange={(event) => {
              const getCurrency = Number.parseFloat(event.target.value)
              if (Number.isNaN(getCurrency) || getCurrency <= 0.01) {
                setCurrencyAmount(1.0)
                return
              }
              setCurrencyAmount(getCurrency)
            }}
          />
        </section>
      </header>
      <ul className="conversion">
        {Object.keys(currencyResults).map((currency, index) => (
          <li key={index}>
            {currency}:{' '}
            {Number.parseFloat(
              currencyResults[currency] * currencyAmount
            ).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}
