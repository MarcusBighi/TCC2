// src/context/IdosoContext.jsx
import React, { createContext, useState } from 'react';

export const IdosoContext = createContext();

export const IdosoProvider = ({ children }) => {
  const [dadosIdoso, setDadosIdoso] = useState({});

  return (
    <IdosoContext.Provider value={{ dadosIdoso, setDadosIdoso }}>
      {children}
    </IdosoContext.Provider>
  );
};

