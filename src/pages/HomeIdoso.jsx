import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiX, FiCheck, FiUser, FiMessageSquare, FiHome } from 'react-icons/fi';

const HomeIdoso = () => {
  const [idosos, setIdosos] = useState([]);
  const [indexAtual, setIndexAtual] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarIdosos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/idosos');
        setIdosos(response.data);
      } catch (error) {
        console.error('Erro ao carregar idosos:', error);
      }
    };

    carregarIdosos();
  }, []);

  const avancarCard = () => {
    setIndexAtual((indexAtual + 1) % idosos.length);
  };

  const verMais = (id) => {
  navigate(`/visualizarPerfilIdoso/${id}`);
};

  const idoso = idosos[indexAtual];

  return (
    <div style={styles.container}>
      <div style={styles.scrollArea}>
        <h1 style={styles.titulo}>OLD+</h1>

        {idoso && (
          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <img
                src={`http://localhost:5000/uploads/${idoso.fotoPerfil}`}
                alt={idoso.nome}
                style={styles.foto}
              />
              <div style={styles.info}>
                <h2 style={styles.nome}>{idoso.nome}, {idoso.idade}</h2>
                <p style={styles.local}>{idoso.endereco}</p>
                <div style={styles.detalhes}>
                  <p><strong>Desafios:</strong> {idoso.desafios}</p>
                  <p><strong>Contato:</strong> {idoso.telefone}</p>
                </div>
                <button style={styles.botaoInfo} onClick={() => verMais(idoso._id)}>
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
        <FiUser size={24} onClick={() => navigate('/perfilCuidador')} />
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
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: 375,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderTop: '1px solid #ddd',
  padding: 12,
  zIndex: 10,
  borderRadius: '12px 12px 0 0', // opcional: deixa visualmente mais bonito
},
};

export default HomeIdoso;
