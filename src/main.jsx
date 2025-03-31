import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { IdosoProvider } from './context/IdosoContext';
import { CuidadorProvider } from './context/CuidadorContext'; // ✅ novo provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CuidadorProvider> {/* ✅ Cuidador vem por fora */}
        <IdosoProvider>
          <App />
        </IdosoProvider>
      </CuidadorProvider>
    </BrowserRouter>
  </React.StrictMode>
);
