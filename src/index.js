import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './styles/index.css';
window.Buffer = require('buffer/').Buffer;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

{ 
  /* 
  <React.StrictMode>
    <App />
  </React.StrictMode>
  */}