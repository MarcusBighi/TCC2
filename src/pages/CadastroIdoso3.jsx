import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdosoContext } from '../context/IdosoContext';
import '@fontsource/poppins';

const CadastroIdoso3 = () => {
  const navigate = useNavigate();
  const { setDadosIdoso } = useContext(IdosoContext);

  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [desafios, setDesafios] = useState('');
  const [saude, setSaude] = useState('');
  const [arquivosSaude, setArquivosSaude] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Salva os dados no contexto global
    setDadosIdoso(prev => ({
      ...prev,
      fotoPerfil,
      desafios,
      observacoes: saude,
      anexos: arquivosSaude && Array.from(arquivosSaude).map(arquivo => arquivo.name),
    }));

    alert("Cadastro do idoso finalizado com sucesso!");
    navigate('/visualizarPerfilIdoso'); // Redireciona para o perfil
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Cadastro - Etapa 3</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Foto de perfil */}
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

        {/* Desafios */}
        <textarea
          placeholder="Descreva os principais desafios que você enfrenta no dia a dia"
          value={desafios}
          onChange={(e) => setDesafios(e.target.value)}
          style={styles.textarea}
          required
        />

        {/* Observações sobre saúde */}
        <label style={styles.label}>Adicione observações sobre sua saúde:</label>
        <textarea
          placeholder="Ex: remédios, tratamentos diários, etc."
          value={saude}
          onChange={(e) => setSaude(e.target.value)}
          style={styles.textarea}
          required
        />

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          onChange={(e) => setArquivosSaude(e.target.files)}
          style={styles.inputArquivo}
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
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    color: '#87CEEB',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    backgroundColor: '#EAF0FD',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    color: '#0C0B55',
  },
  mais: {
    fontSize: 40,
    lineHeight: '0',
  },
  adicionarTexto: {
    marginTop: 10,
    color: '#87CEEB',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textarea: {
    backgroundColor: '#EAF0FD',
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
    color: '#87CEEB',
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
    marginTop: 10,
  }
};

export default CadastroIdoso3;
