import React, { useContext, useState, useEffect } from 'react';
import { IdosoContext } from '../context/IdosoContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiX, FiCheck, FiUser, FiMessageSquare, FiHome } from 'react-icons/fi';



const PerfilIdoso = () => {
  const [perfil, setPerfil] = useState(null);
  const { dadosIdoso } = useContext(IdosoContext);
  const navigate = useNavigate();
  const [previewFoto, setPreviewFoto] = useState(null);

  useEffect(() => {
    const buscarPerfil = async () => {
      try {
        const id = localStorage.getItem('idUsuario'); // ou de outro local que salvou
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/idosos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPerfil(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };
  
    buscarPerfil();
  }, []);

  useEffect(() => {
    if (perfil?.fotoPerfil) {
      const url = `http://localhost:5000/uploads/${perfil.fotoPerfil}`;
      console.log("✅ URL da foto:", url);
      setPreviewFoto(url);
    }
  }, [perfil]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewFoto(url);
    }
  };

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
            <p style={styles.valor}>{perfil?.nome}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Endereço:</p>
            <p style={styles.valor}>{perfil?.endereco}</p>
          </div>
        </div>

        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Idade:</p>
            <p style={styles.valor}>{perfil?.idade}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Telefone:</p>
            <p style={styles.valor}>{perfil?.telefone}</p>
          </div>
        </div>

        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Endereço do responsável:</p>
            <p style={styles.valor}>{perfil?.enderecoResponsavel}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Telefone de emergência:</p>
            <p style={styles.valor}>{perfil?.telefoneEmergencia}</p>

            {perfil?.telefoneEmergencia && (
              <a href={`tel:${perfil.telefoneEmergencia.replace(/\D/g, '')}`} style={styles.botaoContato}>
                Entrar em Contato
              </a>
            )}
          </div>
        </div>

        <div style={styles.secao}>
          <h2 style={styles.subtitulo}>Desafios do cotidiano</h2>
          <p>{perfil?.desafios}</p>
        </div>

        <div style={styles.secao}>
          <h2 style={styles.subtitulo}>Observações sobre saúde</h2>
          <p>{perfil?.observacoes}</p>
        </div>

        {perfil?.anexos?.length > 0 && (
          <div style={styles.secao}>
            <h2 style={styles.subtitulo}>Exames:</h2>
            <ul style={styles.lista}>
              {perfil?.anexos.map((arquivo, index) => (
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
      <div style={styles.navbar}>
              <FiHome size={24} onClick={() => navigate('/home')} />
              <FiMessageSquare size={24} onClick={() => navigate('/historicoChatIdoso')} />
              <FiUser size={24} onClick={() => navigate('/perfilIdoso')}/>
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
