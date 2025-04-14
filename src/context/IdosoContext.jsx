import React, { createContext, useState } from 'react';

export const IdosoContext = createContext();

export const IdosoProvider = ({ children }) => {
  const [dadosIdoso, setDadosIdoso] = useState({});

  const atualizarDadosIdoso = (novosDados) => {
    setDadosIdoso(prev => ({ ...prev, ...novosDados }));
  };

  return (
    <IdosoContext.Provider value={{ dadosIdoso, setDadosIdoso, atualizarDadosIdoso }}>
      {children}
    </IdosoContext.Provider>
  );
};


