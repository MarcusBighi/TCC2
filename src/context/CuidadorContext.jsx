import React, { createContext, useState } from 'react';

export const CuidadorContext = createContext();

export const CuidadorProvider = ({ children }) => {
  const [dadosCuidador, setDadosCuidador] = useState({
    nome: '',
    cpf: '',
    idade: '',
    endereco: '',
    formacao: '',
    especialidade: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    fotoPerfil: null,
    experiencias: '',
    metodos: '',
    anexos: [],
  });

  const atualizarDadosCuidador = (novosDados) => {
    setDadosCuidador((prev) => ({ ...prev, ...novosDados }));
  };

  return (
    <CuidadorContext.Provider value={{ dadosCuidador, atualizarDadosCuidador }}>
      {children}
    </CuidadorContext.Provider>
  );
};
