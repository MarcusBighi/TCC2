import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdosoContext } from '../context/IdosoContext'; // ✅ Import do contexto
import '@fontsource/poppins';

const CadastroIdoso2 = () => {
  const navigate = useNavigate();
  const { setDadosIdoso } = useContext(IdosoContext); // ✅ Acesso ao context

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

    setDadosIdoso(prev => ({ ...prev, ...formData })); // ✅ Salvando no contexto
    console.log('Etapa 2 - Idoso:', formData);
    navigate('/cadastroIdoso3');
  };

  return (
    <div style={styles.container}>
      <img
        src="https://i.postimg.cc/m2z1j32H/Logo-do-aplicativo.png"
        alt="Logo do Aplicativo"
        style={styles.logo}
      />
      <h1 style={styles.titulo}>Cadastro - Etapa 2</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="nomeContato"
          placeholder="Nome do contato de emergência"
          value={formData.nomeContato}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="enderecoResponsavel"
          placeholder="Endereço do responsável"
          value={formData.enderecoResponsavel}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="confirmarSenha"
          placeholder="Confirmar Senha"
          value={formData.confirmarSenha}
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
