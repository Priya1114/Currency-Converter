import React, { useState, useEffect } from 'react';
import CurrencyOption from './CurrencyOption';
import {getFromLocalStorage} from '../utils/storageUtils';

const BASE_URL  = 'https://api.exchangeratesapi.io/latest';

function App() {
  const [currenyOptions, getCurrenyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurr, setAmountInFrommCurr] = useState(true);

  let toAmount, fromAmount;

  if(amountInFromCurr) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  }
  else {
    toAmount= amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      let firstCurr = Object.keys(data.rates)[0];
      getCurrenyOptions([data.base, ...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(firstCurr);
      setExchangeRate(data.rates[firstCurr]);
    });
  }, []);

  useEffect(() => {
    if(fromCurrency && toCurrency) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data.rates[toCurrency]);
      });
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange (e) {
    setAmount(e.target.value);
    setAmountInFrommCurr(true);
  }

  function handleToAmountChange (e) {
    setAmount(e.target.value);
    setAmountInFrommCurr(false);
  }

  return (
    <div className="App">
      <h1>Welcome {getFromLocalStorage('email')}</h1>
      <h1>Convert</h1>
      <CurrencyOption
        amount={fromAmount}
        selectedCurrency={fromCurrency}
        currenyOptions={currenyOptions}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
      />
        <h1>=</h1>
      <CurrencyOption
        amount={toAmount}
        selectedCurrency={toCurrency}
        currenyOptions={currenyOptions}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
