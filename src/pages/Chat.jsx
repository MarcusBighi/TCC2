import React, { useState, useContext, useEffect } from 'react';
import { CuidadorContext } from '../context/CuidadorContext';
import { FiPhoneCall, FiHome, FiMessageSquare, FiUser, FiPlus } from 'react-icons/fi';
import axios from 'axios';

const Chat = () => {
  const { dadosCuidador } = useContext(CuidadorContext);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');

  // Recupera dados do cuidador do localStorage se atualizar a página
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('dadosCuidador');
    if (dadosSalvos && !dadosCuidador.nome) {
      const parsed = JSON.parse(dadosSalvos);
      Object.assign(dadosCuidador, parsed);
    }
  }, []);

  // Carrega preview da foto
  useEffect(() => {
    if (dadosCuidador.fotoPerfil) {
      setPreviewFoto(`http://localhost:5000/uploads/${dadosCuidador.fotoPerfil}`);
    } else {
      const dadosSalvos = JSON.parse(localStorage.getItem('dadosCuidador'));
      if (dadosSalvos?.fotoPerfil) {
        setPreviewFoto(`http://localhost:5000/uploads/${dadosSalvos.fotoPerfil}`);
      }
    }
  }, [dadosCuidador.fotoPerfil]);

  // Recupera mensagens salvas
  useEffect(() => {
    const mensagensSalvas = localStorage.getItem('mensagensChat');
    if (mensagensSalvas) {
      setMensagens(JSON.parse(mensagensSalvas));
    }
  }, []);

  // Salva mensagens no localStorage sempre que mudarem
  useEffect(() => {
  const buscarMensagens = async () => {
    const idosoId = localStorage.getItem('idUsuario');
    const cuidadorSalvo = JSON.parse(localStorage.getItem('dadosCuidador'));
    const cuidadorId = cuidadorSalvo?._id || dadosCuidador._id;

    if (!idosoId || !cuidadorId) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/mensagens/${idosoId}/${cuidadorId}`);
      const msgs = response.data.map(msg => ({
        texto: msg.conteudo,
        autor: msg.remetenteId === idosoId ? 'idoso' : 'cuidador'
      }));
      setMensagens(msgs);
    } catch (err) {
      console.error('Erro ao buscar mensagens:', err);
    }
  };

  buscarMensagens();
}, []);

  const handleEnviar = async () => {
  if (novaMensagem.trim() === '') return;

  const remetenteId = localStorage.getItem('idUsuario');
  const cuidadorSalvo = JSON.parse(localStorage.getItem('dadosCuidador'));
  const destinatarioId = cuidadorSalvo?._id || dadosCuidador._id;

  if (!remetenteId || !destinatarioId || remetenteId.length !== 24 || destinatarioId.length !== 24) {
    alert('ID inválido para envio de mensagem.');
    return;
  }

  try {
    await axios.post('http://localhost:5000/api/mensagens', {
      remetenteId,
      destinatarioId,
      conteudo: novaMensagem,
      tipo: 'texto',
    });

    setMensagens((prev) => [...prev, {
      texto: novaMensagem,
      autor: 'idoso'
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
      setMensagens([...mensagens, { imagem: url, nome: file.name, autor: 'idoso' }]);
    } else if (tipo === 'application/pdf') {
      setMensagens([...mensagens, { pdf: url, nome: file.name, autor: 'idoso' }]);
    } else if (tipo.startsWith('video/')) {
      setMensagens([...mensagens, { video: url, nome: file.name, autor: 'idoso' }]);
    } else {
      alert('Tipo de arquivo não suportado.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.cuidadorInfo}>
          <img
            src={previewFoto || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}
            alt="Foto cuidador"
            style={styles.foto}
          />
          <div>
            <p style={styles.nome}>{dadosCuidador.nome || 'Nome do Cuidador'}</p>
            <p style={styles.especialidade}>{dadosCuidador.especialidade || 'Especialidade'}</p>
          </div>
        </div>
        <button style={styles.botaoChamada}>
          <FiPhoneCall size={20} color="#fff" />
        </button>
      </div>

      <div style={styles.chatArea}>
        {mensagens.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.mensagem,
              alignSelf: msg.autor === 'idoso' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.autor === 'idoso' ? '#4169E1' : '#fff',
              color: msg.autor === 'idoso' ? '#fff' : '#000',
            }}
          >
            {msg.texto && <span>{msg.texto}</span>}
            {msg.imagem && (
              <img
                src={msg.imagem}
                alt="Imagem enviada"
                style={{ maxWidth: 150, marginTop: 6, borderRadius: 8 }}
              />
            )}
            {msg.video && (
              <video controls style={{ maxWidth: 200, marginTop: 6, borderRadius: 8 }}>
                <source src={msg.video} type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
            )}
            {msg.pdf && (
              <a
                href={msg.pdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 6, display: 'block', color: msg.autor === 'idoso' ? '#fff' : '#0C0B55', fontWeight: 'bold' }}
              >
                📄 Visualizar PDF
              </a>
            )}
          </div>
        ))}
      </div>

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
      <div style={styles.navBar}>
        <FiHome size={24} color="#0C0B55" />
        <FiMessageSquare size={24} color="#0C0B55" />
        <FiUser size={24} color="#0C0B55" />
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ADD8E6',
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
    border: '2px solid #87CEEB',
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 0,
  },
  especialidade: {
    fontSize: 12,
    color: '#888',
    margin: 0,
  },
  botaoChamada: {
    backgroundColor: '#87CEEB',
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
    backgroundColor: '#87CEEB',
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

export default Chat;
