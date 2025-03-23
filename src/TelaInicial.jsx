import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/poppins';

const TelaInicial = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <img 
       src="https://i.postimg.cc/m2z1j32H/Logo-do-aplicativo.png"
       alt="Logo OldPlus"
       style={styles.logo}
/>
      <h1 style={styles.titulo}>OLD+</h1>
      <div style={styles.botoes}>
        <button style={styles.botao} onClick={() => navigate('/login')}>Entrar</button>
        <button style={styles.botao} onClick={() => navigate('/selecionarTipoCadastro')}>Inscrever-se</button>
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
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  titulo: {
    color: '#87CEEB',
    fontSize: 32,
    marginBottom: 40,
  },
  botoes: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  botao: {
    backgroundColor: '#98FB98',
    border: 'none',
    borderRadius: 10,
    padding: '12px 24px',
    fontSize: 16,
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default TelaInicial;