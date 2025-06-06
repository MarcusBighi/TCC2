import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFolder } from 'react-icons/fa';
import { CuidadorContext } from '../context/CuidadorContext';
import BotaoVoltar from '../components/BotaoVoltar';

const VisualizarPerfilCuidador = () => {
  const { atualizarDadosCuidador } = useContext(CuidadorContext);
  const location = useLocation();
  const navigate = useNavigate();

  const cuidador = location.state?.cuidador;
  const [previewFoto, setPreviewFoto] = useState(null);

  useEffect(() => {
    if (cuidador?.fotoPerfil) {
      setPreviewFoto(`http://localhost:5000/uploads/${cuidador.fotoPerfil}`);
    }
  }, [cuidador]);

  const irParaChat = () => {
    localStorage.setItem('dadosCuidador', JSON.stringify(cuidador));
    navigate('/chat');
  };

  return (
    <div style={styles.container}>
      <BotaoVoltar cor="#98FB98" />
      <div style={styles.card}>
        <h1 style={styles.titulo}>Perfil do Cuidador</h1>

        {/* Foto de perfil */}
        <div style={styles.fotoContainer}>
          <div style={styles.circulo}>
            {previewFoto ? (
              <img src={previewFoto} alt="Foto" style={styles.fotoPreview} />
            ) : (
              <span style={styles.mais}>+</span>
            )}
          </div>
        </div>

        {/* Dados principais */}
        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Nome:</p>
            <p style={styles.valor}>{cuidador?.nome}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Formação Acadêmica:</p>
            <p style={styles.valor}>{cuidador?.formacao}</p>
          </div>
        </div>

        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Idade:</p>
            <p style={styles.valor}>{cuidador?.idade}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Telefone:</p>
            <p style={styles.valor}>{cuidador?.telefone}</p>
          </div>
        </div>

        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Especialidade:</p>
            <p style={styles.valor}>{cuidador?.especialidade}</p>
          </div>
          <div style={{ ...styles.coluna, textAlign: 'right' }}>
            <p style={styles.label}>E-mail:</p>
            <p style={styles.valor}>{cuidador?.email}</p>
          </div>
        </div>

        {/* Experiências */}
        <div style={styles.secao}>
          <h2 style={styles.subtitulo}>Experiências de Trabalho</h2>
          <p>{cuidador?.experiencias}</p>
          {cuidador?.anexos?.length > 0 && (
            <div style={styles.anexoLinha}>
              <FaFolder style={styles.icone} />
              <span>{cuidador.anexos[0]}</span>
            </div>
          )}
        </div>

        {/* Métodos */}
        <div style={styles.secao}>
          <h2 style={styles.subtitulo}>Métodos de Trabalho</h2>
          <p>{cuidador?.metodos}</p>
          {cuidador?.anexos?.length > 1 && (
            <div style={styles.anexoLinha}>
              <FaFolder style={styles.icone} />
              <span>{cuidador.anexos[1]}</span>
            </div>
          )}
        </div>

        <div style={styles.enviarMensagemContainer}>
          <button style={styles.enviarMensagemBotao} onClick={irParaChat}>
            Enviar Mensagem
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#EAF5EB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    fontFamily: 'Poppins, sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    maxWidth: 500,
    width: '100%',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    color: '#32CD32',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 700,
    color: '#0C0B55',
    textAlign: 'left',
    marginBottom: 20,
  },
  fotoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  circulo: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: '4px solid #98FB98',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    color: '#87CEEB',
    cursor: 'pointer',
  },
  mais: {
    fontSize: 48,
    marginTop: -4,
  },
  fotoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
  },
  linha: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  coluna: {
    flex: 1,
    fontSize: 14,
    lineHeight: 1.5,
  },
  label: {
    fontWeight: '600',
    color: '#0C0B55',
    marginBottom: 4,
  },
  valor: {
    color: '#32CD32',
  },
  secao: {
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 600,
    color: '#0C0B55',
    marginBottom: 6,
  },
  anexoLinha: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
    fontSize: 14,
  },
  icone: {
    fontSize: 16,
    color: '#0C0B55',
  },
  enviarMensagemContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  },
  enviarMensagemBotao: {
    backgroundColor: '#87CEEB',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    padding: '10px 24px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default VisualizarPerfilCuidador;
