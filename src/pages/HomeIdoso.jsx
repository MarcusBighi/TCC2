import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiCheck, FiUser, FiMessageSquare, FiHome } from 'react-icons/fi';

const mockIdosos = [
  {
    id: 1,
    nome: 'Sebastião Gomes',
    idade: 76,
    cidade: 'Cariacica - ES',
    foto: 'https://i.pravatar.cc/300?img=5',
    desafios: 'Dificuldade de locomoção e audição.',
    telefone: '(27) 98888-1111',
  },
  {
    id: 2,
    nome: 'Maria das Graças',
    idade: 81,
    cidade: 'Linhares - ES',
    foto: 'https://i.pravatar.cc/300?img=6',
    desafios: 'Necessita de ajuda para tomar medicação.',
    telefone: '(27) 97777-2222',
  },
];

const HomeIdoso = () => {
  const [indexAtual, setIndexAtual] = useState(0);
  const idoso = mockIdosos[indexAtual];
  const navigate = useNavigate();

  const avancarCard = () => {
    setIndexAtual((indexAtual + 1) % mockIdosos.length);
  };

  const verMais = () => {
    navigate('/visualizarPerfilIdoso'); // ajuste conforme sua rota real
  };

  return (
    <div style={styles.container}>
      <div style={styles.scrollArea}>
        <h1 style={styles.titulo}>OLD+</h1>

        {idoso && (
          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <img src={idoso.foto} alt={idoso.nome} style={styles.foto} />
              <div style={styles.info}>
                <h2 style={styles.nome}>{idoso.nome}, {idoso.idade}</h2>
                <p style={styles.local}>{idoso.cidade}</p>
                <div style={styles.detalhes}>
                  <p><strong>Desafios:</strong> {idoso.desafios}</p>
                  <p><strong>Contato:</strong> {idoso.telefone}</p>
                </div>
                <button style={styles.botaoInfo} onClick={verMais}>
                  + Info
                </button>
              </div>
            </div>

            <div style={styles.acoes}>
              <button style={styles.botaoNao} onClick={avancarCard}>
                <FiX size={24} />
              </button>
              <button style={styles.botaoSim} onClick={avancarCard}>
                <FiCheck size={24} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={styles.navbar}>
  <FiHome size={24} />
  <FiMessageSquare size={24} onClick={() => navigate('/historicoChatCuidador')} />
  <FiUser size={24} />
</div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#FDFDFD',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  scrollArea: {
    flex: 1,
    width: '100%',
    overflowY: 'auto',
    paddingBottom: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    color: '#32CD32',
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 20,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    width: 300,
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
  },
  foto: {
    width: '100%',
    height: 240,
    objectFit: 'cover',
  },
  info: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#32CD32',
    marginBottom: 4,
  },
  local: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  detalhes: {
    fontSize: 14,
    color: '#333',
    lineHeight: 1.4,
    marginBottom: 12,
  },
  botaoInfo: {
    backgroundColor: '#32CD32',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    alignSelf: 'center',
    fontWeight: '600',
  },
  acoes: {
    display: 'flex',
    justifyContent: 'space-around',
    width: 200,
    marginTop: 20,
  },
  botaoSim: {
    backgroundColor: '#32CD32',
    border: 'none',
    borderRadius: '50%',
    padding: 16,
    color: '#fff',
    cursor: 'pointer',
  },
  botaoNao: {
    backgroundColor: '#FF6B6B',
    border: 'none',
    borderRadius: '50%',
    padding: 16,
    color: '#fff',
    cursor: 'pointer',
  },
  navbar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    maxWidth: 375,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
    padding: 12,
    zIndex: 10,
  },
};

export default HomeIdoso;
