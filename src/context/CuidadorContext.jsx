import React, { createContext, useState, useEffect } from 'react';

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
    disponibilidade: '',
    anexos: [],
  });

  // ✅ Carregar dados do localStorage quando o app inicia
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('dadosCuidador');
    if (dadosSalvos) {
      setDadosCuidador(JSON.parse(dadosSalvos));
    }
  }, []);

  // ✅ Salvar no localStorage sempre que os dados forem atualizados
  useEffect(() => {
    if (dadosCuidador) {
      localStorage.setItem('dadosCuidador', JSON.stringify(dadosCuidador));
    }
  }, [dadosCuidador]);

  const atualizarDadosCuidador = (novosDados) => {
    setDadosCuidador((prev) => ({ ...prev, ...novosDados }));
  };

  return (
    <CuidadorContext.Provider value={{ dadosCuidador, atualizarDadosCuidador }}>
      {children}
    </CuidadorContext.Provider>
  );
};

