import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CuidadorContext } from '../context/CuidadorContext';
import axios from 'axios';
import BotaoVoltar from '../components/BotaoVoltar';
import '@fontsource/poppins';

const Cadastro3 = () => {
  const { dadosCuidador, atualizarDadosCuidador } = useContext(CuidadorContext);
  const navigate = useNavigate();

  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [experiencias, setExperiencias] = useState('');
  const [arquivosExperiencia, setArquivosExperiencia] = useState([]);
  const [metodos, setMetodos] = useState('');
  const [arquivosMetodos, setArquivosMetodos] = useState([]);
  const [disponibilidade, setDisponibilidade] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const etapa3 = {
      fotoPerfil: fotoPerfil?.name || null,
      experiencias,
      metodos,
      disponibilidade,
      anexos: [
        ...Array.from(arquivosExperiencia).map(file => file.name),
        ...Array.from(arquivosMetodos).map(file => file.name),
      ],
    };
  
    const dadosCompletos = { ...dadosCuidador, ...etapa3 };
    atualizarDadosCuidador(dadosCompletos);
  
    try {
      await axios.post('http://localhost:5000/api/cuidadores', dadosCompletos);
      alert("Cadastro do cuidador finalizado com sucesso!");
      navigate('/login');
    } catch (error) {
      console.error("Erro ao enviar dados do cuidador:", error);
      alert("Erro ao finalizar cadastro.");
    }
  };

  return (
    <div style={styles.container}>
      <BotaoVoltar cor="#98FB98" />
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.perfilContainer}>
          <label htmlFor="fotoPerfil" style={styles.perfilLabel}>
            <div style={styles.circulo}>
              <span style={styles.mais}>+</span>
            </div>
            <span style={styles.adicionarTexto}>Adicionar Foto de Perfil</span>
          </label>
          <input
            type="file"
            id="fotoPerfil"
            accept="image/*"
            onChange={(e) => setFotoPerfil(e.target.files[0])}
            style={{ display: 'none' }}
          />
        </div>

        <label style={styles.label}>Experiências:</label>
        <textarea
          placeholder="Descreva suas experiências de trabalho"
          value={experiencias}
          onChange={(e) => setExperiencias(e.target.value)}
          style={styles.textarea}
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          onChange={(e) => setArquivosExperiencia(e.target.files)}
          style={styles.inputArquivo}
        />

        <label style={styles.label}>Métodos de Trabalho</label>
        <textarea
          placeholder="Descreva seu método de trabalho..."
          value={metodos}
          onChange={(e) => setMetodos(e.target.value)}
          style={styles.textarea}
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          onChange={(e) => setArquivosMetodos(e.target.files)}
          style={styles.inputArquivo}
        />

        <label style={styles.label}>Disponibilidade</label>
        <textarea
          placeholder="Informe seus horários e dias disponíveis..."
          value={disponibilidade}
          onChange={(e) => setDisponibilidade(e.target.value)}
          style={styles.textarea}
          required
        />

        <button type="submit" style={styles.botao}>Finalizar Cadastro</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Poppins, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  perfilContainer: {
    textAlign: 'center',
  },
  perfilLabel: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  circulo: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    backgroundColor: '#98FB98',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    color: '#00000',
  },
  mais: {
    fontSize: 40,
    lineHeight: '0',
  },
  adicionarTexto: {
    marginTop: 10,
    color: '#98FB98',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textarea: {
    backgroundColor: '#98FB98',
    borderRadius: 10,
    border: 'none',
    padding: 12,
    fontSize: 16,
    resize: 'vertical',
    minHeight: 100,
  },
  inputArquivo: {
    fontSize: 14,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#98FB98',
  },
  botao: {
    backgroundColor: '#00FF00',
    border: 'none',
    borderRadius: 10,
    padding: '12px 20px',
    fontSize: 16,
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: 10,
  }
};

export default Cadastro3;


