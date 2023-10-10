import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CoresContextProvider } from './context/CoreContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CoresContextProvider>
      <App />

    </CoresContextProvider>
  </React.StrictMode>
);


