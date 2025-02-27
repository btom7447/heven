import React from 'react';
import ReactDOM from 'react-dom/client';
import "./Styles/index.css";
import "./Styles/mobile.css";
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
