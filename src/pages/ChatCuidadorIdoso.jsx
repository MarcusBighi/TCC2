import React, { useState, useContext, useEffect } from 'react';
import { IdosoContext } from '../context/IdosoContext';
import { FiPhoneCall, FiHome, FiMessageSquare, FiUser, FiPlus } from 'react-icons/fi';

const ChatCuidadorIdoso = () => {
  const { dadosIdoso } = useContext(IdosoContext);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');

  useEffect(() => {
    if (dadosIdoso.fotoPerfil) {
      const url = URL.createObjectURL(dadosIdoso.fotoPerfil);
      setPreviewFoto(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [dadosIdoso.fotoPerfil]);

  const handleEnviar = () => {
    if (novaMensagem.trim() !== '') {
      setMensagens([...mensagens, { texto: novaMensagem, autor: 'cuidador' }]);
      setNovaMensagem('');
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
            <p style={styles.nome}>{dadosIdoso.nome || 'Nome do Idoso'}</p>
            <p style={styles.idade}>{dadosIdoso.idade ? `${dadosIdoso.idade} anos` : 'Idade'}</p>
          </div>
        </div>
        <button style={styles.botaoChamada}>
          <FiPhoneCall size={20} color="#fff" />
        </button>
      </div>

      {/* Área de mensagens */}
      <div style={styles.chatArea}>
        {mensagens.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.mensagem,
              alignSelf: msg.autor === 'cuidador' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.autor === 'cuidador' ? '#98FB98' : '#fff',
              color: '#000',
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
              <video
                controls
                style={{ maxWidth: 200, marginTop: 6, borderRadius: 8 }}
              >
                <source src={msg.video} type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
            )}
            {msg.pdf && (
              <a
                href={msg.pdf}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 6, display: 'block', color: '#000', fontWeight: 'bold' }}
              >
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
        <FiHome size={24} color="#0C0B55" />
        <FiMessageSquare size={24} color="#0C0B55" />
        <FiUser size={24} color="#0C0B55" />
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#98FB98',
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
    border: '2px solid #98FB98',
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
    backgroundColor: '#98FB98',
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
    backgroundColor: '#98FB98',
    color: '#000',
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


