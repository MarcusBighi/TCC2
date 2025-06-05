import React, { useState } from 'react';
import '@fontsource/poppins';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login sucesso:', response.data);
  
      // Salvar token no localStorage ou contexto
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('tipoUsuario', response.data.tipo);
      localStorage.setItem('idUsuario', response.data.usuario.id);
  
      alert(`Bem-vindo, ${response.data.usuario.nome}!`);
  
      // Redirecionar conforme o tipo de usuário
      if (response.data.tipo === 'cuidador') {
        navigate('/PerfilCuidador');
      } else {
        navigate('/PerfilIdoso');
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert(error.response?.data?.message || "Erro ao fazer login.");
    }
  };
  

  return (
    <div style={styles.container}>
      <img
        src="https://i.postimg.cc/m2z1j32H/Logo-do-aplicativo.png"
        alt="Logo do Aplicativo"
        style={styles.logo}
      />
      <h1 style={styles.titulo}>OLD +</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
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
        <button type="submit" style={styles.botao}>ENTRAR</button>
      </form>

      <p style={styles.loginText}>Ou entre com:</p>
      <div style={styles.socialContainer}>
        <button style={styles.socialButton}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png"
            alt="Google"
            style={styles.icon}
          />
          Google
        </button>
        <button style={styles.socialButton}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
            alt="Facebook"
            style={styles.icon}
          />
          Facebook
        </button>
      </div>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  titulo: {
    color: '	#87CEEB',
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
    backgroundColor: '#D3D3D3',
    border: 'none',
    borderRadius: 10,
    padding: '12px 20px',
    fontSize: 16,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '	#87CEEB',
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
    color: '#0C0B55',
  },
  socialContainer: {
    display: 'flex',
    gap: 10,
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: 10,
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    fontSize: 14,
  },
  icon: {
    width: 20,
    height: 20,
  },
};

export default Login;
