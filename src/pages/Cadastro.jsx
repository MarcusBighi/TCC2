import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CuidadorContext } from '../context/CuidadorContext';
import '@fontsource/poppins';

const Cadastro = () => {
  const navigate = useNavigate();
  const { atualizarDadosCuidador } = useContext(CuidadorContext);
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    idade: '',
    formacao: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizarDadosCuidador(formData);
    console.log('Dados enviados:', formData);
    navigate('/cadastro2');
  };

  return (
    <div style={styles.container}>
      <img
        src="https://i.postimg.cc/m2z1j32H/Logo-do-aplicativo.png"
        alt="Logo do Aplicativo"
        style={styles.logo}
      />
      <h1 style={styles.titulo}>Cadastro</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={formData.nome}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="idade"
          placeholder="Idade"
          value={formData.idade}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="formacao"
          placeholder="Formação Acadêmica"
          value={formData.formacao}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.botao}>PRÓXIMO</button>
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
    color: '#98FB98',
    fontSize: 32,
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: '#98FB98',
    border: 'none',
    borderRadius: 10,
    padding: '12px 20px',
    fontSize: 16,
    marginBottom: 15,
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
  },
  loginText: {
    marginTop: 20,
    fontSize: 14,
  },
  loginLink: {
    color: '#87CEEB',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Cadastro;