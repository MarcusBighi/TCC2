import React, { useContext, useState } from 'react';
import { CuidadorContext } from '../context/CuidadorContext';
import { FaFolder } from 'react-icons/fa'; // Ícone de pasta

const VisualizarPerfilCuidador = () => {
  const { dadosCuidador } = useContext(CuidadorContext);
  const [previewFoto, setPreviewFoto] = useState(
    dadosCuidador.fotoPerfil ? URL.createObjectURL(dadosCuidador.fotoPerfil) : null
  );

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewFoto(URL.createObjectURL(file));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Perfil do Cuidador</h1>

        {/* Foto de perfil */}
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

        {/* Dados principais */}
        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Nome:</p>
            <p style={styles.valor}>{dadosCuidador.nome}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Formação Acadêmica:</p>
            <p style={styles.valor}>{dadosCuidador.formacao}</p>
          </div>
        </div>

        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Idade:</p>
            <p style={styles.valor}>{dadosCuidador.idade}</p>
          </div>
          <div style={styles.coluna}>
            <p style={styles.label}>Telefone:</p>
            <p style={styles.valor}>{dadosCuidador.telefone}</p>
          </div>
        </div>

        <div style={styles.linha}>
          <div style={styles.coluna}>
            <p style={styles.label}>Especialidade:</p>
            <p style={styles.valor}>{dadosCuidador.especialidade}</p>
          </div>
          <div style={{ ...styles.coluna, textAlign: 'right' }}>
            <p style={styles.label}>E-mail:</p>
            <p style={styles.valor}>{dadosCuidador.email}</p>
          </div>
        </div>

        {/* Experiências */}
        <div style={styles.secao}>
          <h2 style={styles.subtitulo}>Experiências de Trabalho</h2>
          <p>{dadosCuidador.experiencias}</p>
          {dadosCuidador.anexos?.length > 0 && (
            <div style={styles.anexoLinha}>
              <FaFolder style={styles.icone} />
              <span>{dadosCuidador.anexos[0]}</span>
            </div>
          )}
        </div>

        {/* Métodos */}
        <div style={styles.secao}>
          <h2 style={styles.subtitulo}>Métodos de Trabalho</h2>
          <p>{dadosCuidador.metodos}</p>
          {dadosCuidador.anexos?.length > 1 && (
            <div style={styles.anexoLinha}>
              <FaFolder style={styles.icone} />
              <span>{dadosCuidador.anexos[1]}</span>
            </div>
          )}
        </div>

        <div style={styles.enviarMensagemContainer}>
          <button style={styles.enviarMensagemBotao}>Enviar Mensagem</button>
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
    color: '#32CD32', // ✅ cor dos textos
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
    border: '4px solid #98FB98', // ✅ cor da borda
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
