import React from 'react';
import {setToLocalStorage} from '../utils/storageUtils';

export default function Login(props) {
  const {onFormSubmit} = props;

  function handleEmailChange (e) {
    setToLocalStorage('email', e.target.value);
  }
  return (
    <div className="container">
      <form onSubmit={onFormSubmit}>
        <label style={{marginRight: '10px'}}>Email Id  </label>
        <input
          className="input-field"
          type="email"
          required
          onChange={handleEmailChange}
        />
        <br/>
        <label>Password</label>
        <input
          className="input-field"
          type="password"
          required
        />
        <br/>
        <input
          className="submit-btn"
          type="submit"
        />
      </form>
    </div>
  )
}
