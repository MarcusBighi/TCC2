import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/poppins';

const CadastroIdoso2 = () => {

  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    nomeContato: '',
    enderecoResponsavel: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Etapa 2 - Idoso:', formData);
    navigate('/cadastroIdoso3')
    // Aqui você pode redirecionar ou enviar dados para o backend
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Cadastro - Etapa 2</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="nomeContato" placeholder="Nome do contato de emergência" value={formData.nomeContato} onChange={handleChange} style={styles.input} required />
        <input type="text" name="enderecoResponsavel" placeholder="Endereço do responsável" value={formData.enderecoResponsavel} onChange={handleChange} style={styles.input} required />
        <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} style={styles.input} required />
        <input type="password" name="confirmarSenha" placeholder="Confirmar Senha" value={formData.confirmarSenha} onChange={handleChange} style={styles.input} required />
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

export default CadastroIdoso2;
