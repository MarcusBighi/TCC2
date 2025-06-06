import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const BotaoVoltar = ({ cor = '#98FB98', posicao = { top: 20, left: 20 }, tamanho = 28 }) => {
  const navigate = useNavigate();

  const estiloBotao = {
    position: 'absolute',
    top: posicao.top,
    left: posicao.left,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
  };

  return (
    <button onClick={() => navigate(-1)} style={estiloBotao}>
      <FiArrowLeft size={tamanho} color={cor} />
    </button>
  );
};

export default BotaoVoltar;
