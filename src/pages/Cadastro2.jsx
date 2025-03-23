import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/poppins';

const Cadastro2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    especialidade: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados da segunda etapa:', formData);
    navigate('/cadastro3')
    // Aqui você pode redirecionar para uma tela de confirmação ou próxima etapa
    // Exemplo: navigate('/confirmacao');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Cadastro - Etapa 2</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="especialidade"
          placeholder="Especialidade"
          value={formData.especialidade}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="tel"
          name="telefone"
          placeholder="Telefone de Contato"
          value={formData.telefone}
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
    backgroundColor: '#98FB98',
    border: 'none',
    borderRadius: 10,
    padding: '12px 20px',
    fontSize: 16,
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: 10,
  }
};

export default Cadastro2;
