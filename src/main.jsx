import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // <-- aqui
import { BrowserRouter } from 'react-router-dom';
import { IdosoProvider } from './context/IdosoContext';
import { CuidadorProvider } from './context/CuidadorContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CuidadorProvider>
        <IdosoProvider>
          <App />
        </IdosoProvider>
      </CuidadorProvider>
    </BrowserRouter>
  </React.StrictMode>
);
