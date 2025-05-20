import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPhoneCall, FiHome, FiMessageSquare, FiUser, FiPlus } from 'react-icons/fi';

const ChatCuidadorIdoso = () => {
  const { id } = useParams(); // ID do idoso
  const navigate = useNavigate();
  const [idoso, setIdoso] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');

  const cuidadorId = localStorage.getItem('idUsuario');

  useEffect(() => {
    const buscarIdoso = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/idosos/${id}`);
        setIdoso(response.data);
        if (response.data.fotoPerfil) {
          setPreviewFoto(`http://localhost:5000/uploads/${response.data.fotoPerfil}`);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar idoso:", error.response?.data || error.message);
      }
    };
    buscarIdoso();
  }, [id]);

  useEffect(() => {
    const buscarMensagens = async () => {
      if (!cuidadorId || cuidadorId.length !== 24 || !id) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/mensagens/${cuidadorId}/${id}`);
        const mensagensFormatadas = response.data.map((msg) => ({
          texto: msg.conteudo,
          autor: msg.remetenteId === cuidadorId ? 'cuidador' : 'idoso',
        }));
        setMensagens(mensagensFormatadas);
      } catch (error) {
        console.error("❌ Erro ao carregar mensagens:", error.response?.data || error.message);
      }
    };

    buscarMensagens();
  }, [id, cuidadorId]);

  const handleEnviar = async () => {
    if (novaMensagem.trim() === '') return;
    if (!cuidadorId || cuidadorId.length !== 24) {
      alert('ID do cuidador inválido.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/mensagens', {
        remetenteId: cuidadorId,
        destinatarioId: id,
        conteudo: novaMensagem,
        tipo: 'texto',
      });

      setMensagens((prev) => [...prev, {
        texto: novaMensagem,
        autor: 'cuidador',
      }]);

      setNovaMensagem('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
      alert('Erro ao enviar a mensagem.');
    }
  };

  const handleArquivo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tipo = file.type;
    const url = URL.createObjectURL(file);

    if (tipo.startsWith('image/')) {
      setMensagens([...mensagens, { imagem: url, nome: file.name, autor: 'cuidador' }]);
    } else if (tipo === 'application/pdf') {
      setMensagens([...mensagens, { pdf: url, nome: file.name, autor: 'cuidador' }]);
    } else if (tipo.startsWith('video/')) {
      setMensagens([...mensagens, { video: url, nome: file.name, autor: 'cuidador' }]);
    } else {
      alert('Tipo de arquivo não suportado.');
    }
  };

  if (!idoso) return <p>Carregando...</p>;

  return (
    <div style={styles.container}>
      {/* Cabeçalho */}
      <div style={styles.header}>
        <div style={styles.cuidadorInfo}>
          <img
            src={previewFoto || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
            alt="Foto idoso"
            style={styles.foto}
          />
          <div>
            <p style={styles.nome}>{idoso.nome}</p>
            <p style={styles.idade}>{idoso.idade} anos</p>
          </div>
        </div>
        <button style={styles.botaoChamada}>
          <FiPhoneCall size={20} color="#fff" />
        </button>
      </div>

      {/* Mensagens */}
      <div style={styles.chatArea}>
        {mensagens.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.mensagem,
              alignSelf: msg.autor === 'cuidador' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.autor === 'cuidador' ? '#32CD32' : '#fff',
              color: msg.autor === 'cuidador' ? '#fff' : '#000',
            }}
          >
            {msg.texto && <span>{msg.texto}</span>}
            {msg.imagem && (
              <img src={msg.imagem} alt="Imagem" style={{ maxWidth: 150, marginTop: 6, borderRadius: 8 }} />
            )}
            {msg.video && (
              <video controls style={{ maxWidth: 200, marginTop: 6, borderRadius: 8 }}>
                <source src={msg.video} type="video/mp4" />
                Seu navegador não suporta vídeo.
              </video>
            )}
            {msg.pdf && (
              <a href={msg.pdf} target="_blank" rel="noopener noreferrer" style={{ marginTop: 6, display: 'block', color: '#fff', fontWeight: 'bold' }}>
                📄 Visualizar PDF
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Campo de digitação */}
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          style={styles.input}
        />
        <input
          type="file"
          accept="image/*,video/*,application/pdf"
          id="uploadArquivo"
          style={{ display: 'none' }}
          onChange={handleArquivo}
        />
        <label htmlFor="uploadArquivo" style={styles.enviarIcone}>
          <FiPlus size={20} />
        </label>
        <button onClick={handleEnviar} style={styles.enviar}>Enviar</button>
      </div>

      {/* Navegação inferior */}
      <div style={styles.navBar}>
        <FiHome size={24} onClick={() => navigate('/homeIdoso')} />
        <FiMessageSquare size={24} onClick={() => navigate('/historicoChatCuidador')} />
        <FiUser size={24} onClick={() => navigate('/perfilCuidador')} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#90EE90', // verde claro
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Poppins, sans-serif',
  },
  header: {
    backgroundColor: '#fff',
    padding: '10px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
  },
  cuidadorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  foto: {
    width: 45,
    height: 45,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #32CD32',
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 0,
  },
  idade: {
    fontSize: 12,
    color: '#888',
    margin: 0,
  },
  botaoChamada: {
    backgroundColor: '#32CD32',
    border: 'none',
    padding: 8,
    borderRadius: '50%',
    cursor: 'pointer',
  },
  chatArea: {
    flex: 1,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    overflowY: 'auto',
  },
  mensagem: {
    maxWidth: '70%',
    padding: '10px 14px',
    borderRadius: 12,
    fontSize: 14,
  },
  inputArea: {
    backgroundColor: '#fff',
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    borderTop: '1px solid #ccc',
  },
  input: {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: '10px',
    fontSize: 14,
  },
  enviar: {
    backgroundColor: '#32CD32',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 8,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  enviarIcone: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: '10px',
    cursor: 'pointer',
  },
  navBar: {
    backgroundColor: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-around',
    borderTop: '1px solid #ccc',
  },
};

export default ChatCuidadorIdoso;
