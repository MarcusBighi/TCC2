import React, { useContext, useState } from 'react';
import { CuidadorContext } from '../context/CuidadorContext';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiUser } from 'react-icons/fi';

const PerfilCuidador = () => {
  const { dadosCuidador } = useContext(CuidadorContext);
  const navigate = useNavigate();
  const [previewFoto, setPreviewFoto] = useState(
    dadosCuidador.fotoPerfil ? URL.createObjectURL(dadosCuidador.fotoPerfil) : null
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Perfil do Cuidador</h1>

        <div style={styles.fotoContainer}>
          <label htmlFor="fotoUpload" style={styles.circulo}>
            {previewFoto ? (
              <img src={previewFoto} alt="Foto" style={styles.fotoPreview} />
            ) : (
              <span style={styles.mais}>+</span>
            )}
          </label>
        </div>

        <p><strong>CPF:</strong> {dadosCuidador.cpf}</p>    
        <p><strong>Nome:</strong> {dadosCuidador.nome}</p>
        <p><strong>Idade:</strong> {dadosCuidador.idade}</p>
        <p><strong>E-mail:</strong> {dadosCuidador.email}</p>
        <p><strong>Telefone:</strong> {dadosCuidador.telefone}</p>
        <p><strong>Endereço:</strong> {dadosCuidador.endereco}</p>
        <p><strong>Formação:</strong> {dadosCuidador.formacao}</p>
        <p><strong>Especialidade:</strong> {dadosCuidador.especialidade}</p>


        <div style={styles.secao}>
          <h2>Experiências</h2>
          <p>{dadosCuidador.experiencias}</p>
        </div>

        <div style={styles.secao}>
          <h2>Métodos de Trabalho</h2>
          <p>{dadosCuidador.metodos}</p>
        </div>

        <div style={styles.secao}>
          <h2>Disponibilidade</h2>
          <p>{dadosCuidador.disponibilidade}</p> {/* <-- adicionado aqui */}
        </div>

        {dadosCuidador.anexos?.length > 0 && (
          <div style={styles.secao}>
            <h2>Anexos:</h2>
            <ul>
              {dadosCuidador.anexos.map((arquivo, index) => (
                <li key={index}>{arquivo}</li>
              ))}
            </ul>
          </div>
        )}

        <button style={styles.botao} onClick={() => navigate('/editarPerfilCuidador')}>
          Editar Perfil
        </button>
      </div>

      <div style={styles.navBar}>
        <FiHome size={24} onClick={() => navigate('/homeIdoso')} color="#0C0B55" />
        <FiMessageSquare size={24} onClick={() => navigate('/historicoChatCuidador')} color="#0C0B55" />
        <FiUser size={24} color="#0C0B55" />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  fotoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
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
    color: '#98FB98',
  },
  fotoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  mais: {
    fontSize: 48,
    marginTop: -4,
  },
  secao: {
    marginTop: 16,
  },
  botao: {
    marginTop: 20,
    padding: '10px 20px',
    backgroundColor: '#98FB98',
    border: 'none',
    borderRadius: 8,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  navBar: {
    backgroundColor: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-around',
    borderTop: '1px solid #ccc',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    maxWidth: 500,
  }
};

export default PerfilCuidador;

