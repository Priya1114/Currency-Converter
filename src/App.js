import React, {useState} from 'react';
import './App.css';
import Login from './components/Login';
import Converter from './components/Converter';

export default function App() {
  const [loggedIn, handleLogin] = useState(false);

  function onFormSubmit(e) {
    e.preventDefault();
    handleLogin(true);
  }

  return (
    <div>
      {
        !loggedIn ?
        <Login
          onFormSubmit={onFormSubmit}
        /> :
        <Converter />
      }

    </div>
  )
}
