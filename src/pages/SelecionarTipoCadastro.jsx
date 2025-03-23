import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/poppins';

const SelecionarTipoCadastro = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Parte de cima - Cuidador */}
      <div style={styles.superior}>
        <button
          style={styles.botaoCuidador}
          onClick={() => navigate('/cadastro')}
        >
          CUIDADOR
        </button>
      </div>

      {/* Divisória com texto */}
      <div style={styles.divisoria}>
        <span style={styles.textoDivisoria}>Você deseja se cadastrar como?</span>
      </div>

      {/* Parte de baixo - Idoso */}
      <div style={styles.inferior}>
        <button
          style={styles.botaoIdoso}
          onClick={() => navigate('/cadastro-idoso')} // ainda será implementado
        >
          IDOSO
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100%',
    fontFamily: 'Poppins, sans-serif',
  },
  superior: {
    backgroundColor: '#98FB98',
    height: '45%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inferior: {
    backgroundColor: '#87CEEB',
    height: '45%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divisoria: {
    height: '10%',
    backgroundColor: '#808000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoDivisoria: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoCuidador: {
    backgroundColor: '#3CB371',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 10,
    padding: '12px 32px',
    cursor: 'pointer',
  },
  botaoIdoso: {
    backgroundColor: '#1E90FF',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 10,
    padding: '12px 32px',
    cursor: 'pointer',
  },
};

export default SelecionarTipoCadastro;
