import React from 'react';

export default function CurrencyOption(props) {
  const {
    amount,
    currenyOptions,
    selectedCurrency,
    onChangeAmount,
    onChangeCurrency,
  } = props;

  return (
    <div>
      <div className="container">
        <input
          className="input-field "
          type="number"
          placeholder="Enter value"
          value={amount}
          onChange={onChangeAmount}
        />
        <select
          className="input-field"
          value={selectedCurrency}
          onChange={onChangeCurrency}
        >
          {
            currenyOptions.map((option, index) => {
              return (
              <option key={index}>
                {option}
              </option>)
            })
          }
        </select>
      </div>
    </div>
  )
}
