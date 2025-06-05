import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMessageSquare, FiUser, FiHome } from 'react-icons/fi';

const HistoricoChatIdoso = () => {
  const navigate = useNavigate();
  const [conversas, setConversas] = useState([]);

  useEffect(() => {
    const fetchConversas = async () => {
      const idUsuario = localStorage.getItem('idUsuario');
      if (!idUsuario) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/mensagens/historico/${idUsuario}`);
        const mensagens = response.data;

        const conversasFormatadas = mensagens.map((mensagem) => ({
          id: mensagem.outroUsuarioId,
          nome: mensagem.nomeOutroUsuario,
          foto: mensagem.fotoOutroUsuario
            ? `http://localhost:5000/uploads/${mensagem.fotoOutroUsuario}`
            : 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
          ultimaMensagem: mensagem.conteudo,
          horario: new Date(mensagem.dataEnvio).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),
        }));

        setConversas(conversasFormatadas);
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    };

    fetchConversas();
  }, []);

  const abrirChat = (idCuidador) => {
    navigate(`/chat/${idCuidador}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Histórico de Conversas</h1>

      <div style={styles.lista}>
        {conversas.map((chat) => (
          <div key={chat.id} style={styles.item} onClick={() => abrirChat(chat.id)}>
            <img src={chat.foto} alt={chat.nome} style={styles.foto} />
            <div style={styles.textos}>
              <div style={styles.nomeHora}>
                <span style={styles.nome}>{chat.nome}</span>
                <span style={styles.horario}>{chat.horario}</span>
              </div>
              <p style={styles.mensagem}>{chat.ultimaMensagem}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.navbar}>
        <FiHome size={24} onClick={() => navigate('/home')} />
        <FiMessageSquare size={24} />
        <FiUser size={24} onClick={() => navigate('/perfilIdoso')} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#FDFDFD',
    height: '100vh',
    maxWidth: 375,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4682B4',
    textAlign: 'center',
    padding: 20,
    margin: 0,
    flexShrink: 0,
  },
  lista: {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: 80, // espaço reservado para a navbar
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
  },
  foto: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: 12,
  },
  textos: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  nomeHora: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nome: {
    fontWeight: '600',
    fontSize: 16,
    color: '#4682B4',
  },
  horario: {
    fontSize: 12,
    color: '#999',
  },
  mensagem: {
    fontSize: 14,
    color: '#444',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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

export default HistoricoChatIdoso;
