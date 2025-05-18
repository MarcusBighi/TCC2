import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VisualizarPerfilIdoso = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [idoso, setIdoso] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);

  useEffect(() => {
    const fetchIdoso = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/idosos/${id}`);
        setIdoso(response.data);
        setPreviewFoto(`http://localhost:5000/uploads/${response.data.fotoPerfil}`);
      } catch (error) {
        console.error("Erro ao buscar idoso:", error);
      }
    };
    fetchIdoso();
  }, [id]);

  if (!idoso) return <p>Carregando...</p>;

  const telefoneEmergencia = idoso.telefoneEmergencia?.replace(/\D/g, '');

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Perfil do Idoso</h1>

        <div style={styles.fotoContainer}>
          <label style={styles.circulo}>
            {previewFoto ? (
              <img src={previewFoto} alt="Foto" style={styles.fotoPreview} />
            ) : (
              <span style={styles.mais}>+</span>
            )}
          </label>
        </div>

        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Nome:</p>
            <p style={styles.valor}>{idoso.nome}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Endereço:</p>
            <p style={styles.valor}>{idoso.endereco}</p>
          </div>
        </div>

        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Idade:</p>
            <p style={styles.valor}>{idoso.idade}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Telefone:</p>
            <p style={styles.valor}>{idoso.telefone}</p>
          </div>
        </div>

        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Endereço do responsável:</p>
            <p style={styles.valor}>{idoso.enderecoResponsavel}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Telefone de emergência:</p>
            <p style={styles.valor}>{idoso.telefoneEmergencia}</p>

            {idoso.telefoneEmergencia && (
              <a href={`tel:${telefoneEmergencia}`} style={styles.botaoContato}>
                Entrar em Contato
              </a>
            )}
          </div>
        </div>

        <div style={styles.secao}>
          <h2 style={styles.subtitulo}>Desafios do cotidiano</h2>
          <p>{idoso.desafios}</p>
        </div>

        <div style={styles.secao}>
          <h2 style={styles.subtitulo}>Observações sobre saúde</h2>
          <p>{idoso.observacoes}</p>
        </div>

        {idoso.anexos?.length > 0 && (
          <div style={styles.secao}>
            <h2 style={styles.subtitulo}>Exames:</h2>
            <ul style={styles.lista}>
              {idoso.anexos.map((arquivo, index) => (
                <li key={index} style={styles.itemLista}>{arquivo}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={styles.enviarMensagemContainer}>
          <button
            style={styles.enviarMensagemBotao}
             onClick={() => navigate(`/ChatCuidadorIdoso/${id}`)} //
          >
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

export default VisualizarPerfilIdoso;




