import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiCheck, FiUser, FiMessageSquare, FiHome } from 'react-icons/fi';

const mockPessoas = [
  {
    id: 1,
    nome: 'Ana Clara',
    idade: 28,
    cidade: 'Vitória - ES',
    foto: 'https://i.pravatar.cc/300?img=1',
    formacao: 'Enfermagem - UFES',
    especialidade: 'Cuidados Paliativos',
    disponibilidade: 'Diária', // <-- adicionado
  },
  {
    id: 2,
    nome: 'João Paulo',
    idade: 35,
    cidade: 'Vila Velha - ES',
    foto: 'https://i.pravatar.cc/300?img=2',
    formacao: 'Fisioterapia - UVV',
    especialidade: 'Reabilitação Física',
    disponibilidade: '3 vezes na semana', // <-- adicionado
  },
];

const Home = () => {
  const [indexAtual, setIndexAtual] = useState(0);
  const pessoa = mockPessoas[indexAtual];
  const navigate = useNavigate();

  const avancarCard = () => {
    setIndexAtual((indexAtual + 1) % mockPessoas.length);
  };

  const verMais = () => {
    navigate('/visualizarPerfilCuidador');
  };

  return (
    <div style={styles.container}>
      <div style={styles.scrollArea}>
        <h1 style={styles.titulo}>OLD+</h1>

        {pessoa && (
          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <img src={pessoa.foto} alt={pessoa.nome} style={styles.foto} />
              <div style={styles.info}>
                <h2 style={styles.nome}>{pessoa.nome}, {pessoa.idade}</h2>
                <p style={styles.local}>{pessoa.cidade}</p>
                <div style={styles.detalhes}>
                  <p><strong>Formação:</strong> {pessoa.formacao}</p>
                  <p><strong>Especialidade:</strong> {pessoa.especialidade}</p>
                  <p><strong>Disponibilidade:</strong> {pessoa.disponibilidade}</p> {/* <-- trocado */}
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
        <FiMessageSquare size={24} onClick={() => navigate('/historicoChatIdoso')} />
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
    color: '#4682B4',
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
    color: '#4682B4',
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
    backgroundColor: '#4682B4',
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
    backgroundColor: '#4682B4',
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

export default Home;


