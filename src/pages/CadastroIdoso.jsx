import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdosoContext } from '../context/IdosoContext'; // ✅ Contexto importado
import BotaoVoltar from '../components/BotaoVoltar';
import '@fontsource/poppins';

const CadastroIdoso = () => {
  const navigate = useNavigate();
  const { setDadosIdoso } = useContext(IdosoContext); // ✅ Usando o contexto

  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    idade: '',
    telefone: '',
    telefoneEmergencia: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setDadosIdoso(prev => ({ ...prev, ...formData })); // ✅ Salvando no contexto
    console.log('Etapa 1 - Idoso:', formData);
    navigate('/cadastroIdoso2');
  };

  return (
    <div style={styles.container}>
      <BotaoVoltar cor="#87CEEB" />
      <img
        src="https://i.postimg.cc/m2z1j32H/Logo-do-aplicativo.png"
        alt="Logo do Aplicativo"
        style={styles.logo}
      />
      <h1 style={styles.titulo}>Cadastro - Etapa 1</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} style={styles.input} required />
        <input type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} style={styles.input} required />
        <input type="number" name="idade" placeholder="Idade" value={formData.idade} onChange={handleChange} style={styles.input} required />
        <input type="tel" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} style={styles.input} required />
        <input type="tel" name="telefoneEmergencia" placeholder="Telefone de emergência" value={formData.telefoneEmergencia} onChange={handleChange} style={styles.input} required />
        <button type="submit" style={styles.botao}>Próximo</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Poppins, sans-serif',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
  },
  titulo: {
    color: '#87CEEB',
    fontSize: 28,
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: '#EAF0FD',
    border: 'none',
    borderRadius: 10,
    padding: '12px 20px',
    fontSize: 16,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#87CEEB',
    border: 'none',
    borderRadius: 10,
    padding: '12px 20px',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    cursor: 'pointer',
  }
};

export default CadastroIdoso;

