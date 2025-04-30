import React, { useContext, useState, useEffect } from 'react';
import { IdosoContext } from '../context/IdosoContext';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiUser } from 'react-icons/fi';

const PerfilIdoso = () => {
  const { dadosIdoso } = useContext(IdosoContext);
  const navigate = useNavigate();
  const [previewFoto, setPreviewFoto] = useState(null);

  useEffect(() => {
    // Só tenta criar uma URL se for um objeto File
    if (dadosIdoso.fotoPerfil instanceof File) {
      const url = URL.createObjectURL(dadosIdoso.fotoPerfil);
      setPreviewFoto(url);

      return () => URL.revokeObjectURL(url); // limpeza
    }

    // Se for string (nome do arquivo), você pode carregar de um caminho estático ou remoto
    if (typeof dadosIdoso.fotoPerfil === 'string') {
      setPreviewFoto(`/uploads/${dadosIdoso.fotoPerfil}`); // ajuste conforme seu backend
    }
  }, [dadosIdoso.fotoPerfil]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewFoto(url);
    }
  };

  const telefoneEmergencia = dadosIdoso.telefoneEmergencia?.replace(/\D/g, '');

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Perfil do Idoso</h1>

        <div style={styles.fotoContainer}>
          <label htmlFor="fotoUpload" style={styles.circulo}>
            {previewFoto ? (
              <img src={previewFoto} alt="Foto" style={styles.fotoPreview} />
            ) : (
              <span style={styles.mais}>+</span>
            )}
            <input
              id="fotoUpload"
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: 'none' }}
              onChange={handleFotoChange}
            />
          </label>
        </div>

        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Nome:</p>
            <p style={styles.valor}>{dadosIdoso.nome}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Endereço:</p>
            <p style={styles.valor}>{dadosIdoso.endereco}</p>
          </div>
        </div>

        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Idade:</p>
            <p style={styles.valor}>{dadosIdoso.idade}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Telefone:</p>
            <p style={styles.valor}>{dadosIdoso.telefone}</p>
          </div>
        </div>

        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Endereço do responsável:</p>
            <p style={styles.valor}>{dadosIdoso.enderecoResponsavel}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Telefone de emergência:</p>
            <p style={styles.valor}>{dadosIdoso.telefoneEmergencia}</p>

            {dadosIdoso.telefoneEmergencia && (
              <a href={`tel:${telefoneEmergencia}`} style={styles.botaoContato}>
                Entrar em Contato
              </a>
            )}
          </div>
        </div>

        <div style={styles.secao}>
          <h2 style={styles.subtitulo}>Desafios do cotidiano</h2>
          <p>{dadosIdoso.desafios}</p>
        </div>

        <div style={styles.secao}>
          <h2 style={styles.subtitulo}>Observações sobre saúde</h2>
          <p>{dadosIdoso.observacoes}</p>
        </div>

        {dadosIdoso.anexos?.length > 0 && (
          <div style={styles.secao}>
            <h2 style={styles.subtitulo}>Exames:</h2>
            <ul style={styles.lista}>
              {dadosIdoso.anexos.map((arquivo, index) => (
                <li key={index} style={styles.itemLista}>{arquivo}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={styles.enviarMensagemContainer}>
          <button
            style={styles.enviarMensagemBotao}
            onClick={() => navigate('/editarPerfilIdoso')}
          >
            Editar Perfil
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
  },
  titulo: {
    fontSize: 22,
    fontWeight: 700,
    color: '#0C0B55',
    textAlign: 'left',
    marginBottom: 20,
  },
  fotoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
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
    border: '4px solid #87CEEB',
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
    fontWeight: 600,
    color: '#0C0B55',
    marginBottom: 4,
  },
  valor: {
    color: '#000',
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
  lista: {
    paddingLeft: 18,
    listStyleType: 'disc',
  },
  itemLista: {
    fontSize: 14,
    color: '#0C0B55',
    marginBottom: 4,
  },
  botaoContato: {
    display: 'inline-block',
    marginTop: 8,
    backgroundColor: '#87CEEB',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: 14,
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

export default PerfilIdoso;
