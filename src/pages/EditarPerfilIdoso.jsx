import React, { useContext, useState } from 'react';
import { IdosoContext } from '../context/IdosoContext';
import { useNavigate } from 'react-router-dom';

const EditarPerfilIdoso = () => {
  const { dadosIdoso, atualizarDadosIdoso } = useContext(IdosoContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: dadosIdoso.nome || '',
    idade: dadosIdoso.idade || '',
    endereco: dadosIdoso.endereco || '',
    telefone: dadosIdoso.telefone || '',
    enderecoResponsavel: dadosIdoso.enderecoResponsavel || '',
    telefoneEmergencia: dadosIdoso.telefoneEmergencia || '',
    desafios: dadosIdoso.desafios || '',
    observacoes: dadosIdoso.observacoes || '',
    anexos: dadosIdoso.anexos || [],
    fotoPerfil: dadosIdoso.fotoPerfil || null,
  });

  const [previewFoto, setPreviewFoto] = useState(
    dadosIdoso.fotoPerfil ? URL.createObjectURL(dadosIdoso.fotoPerfil) : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewFoto(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, fotoPerfil: file }));
    }
  };

  const handleAnexosChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      anexos: [...(prev.anexos || []), ...files.map(file => file.name)],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizarDadosIdoso(formData);
    navigate('/PerfilIdoso');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.titulo}>Editar Perfil</h1>

        <div style={styles.fotoContainer}>
          <label htmlFor="fotoUpload" style={styles.circulo}>
            {previewFoto ? (
              <img src={previewFoto} alt="Foto" style={styles.fotoPreview} />
            ) : (
              <span style={styles.mais}>+</span>
            )}
            <input
              id="fotoUpload"
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: 'none' }}
              onChange={handleFotoChange}
            />
          </label>
        </div>

        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome completo"
          style={styles.input}
          required
        />
        <input
          type="number"
          name="idade"
          value={formData.idade}
          onChange={handleChange}
          placeholder="Idade"
          style={styles.input}
          required
        />
        <input
          type="text"
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          placeholder="Endereço"
          style={styles.input}
          required
        />
        <input
          type="text"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          placeholder="Telefone"
          style={styles.input}
          required
        />
        <input
          type="text"
          name="enderecoResponsavel"
          value={formData.enderecoResponsavel}
          onChange={handleChange}
          placeholder="Endereço do Responsável"
          style={styles.input}
        />
        <input
          type="text"
          name="telefoneEmergencia"
          value={formData.telefoneEmergencia}
          onChange={handleChange}
          placeholder="Telefone de Emergência"
          style={styles.input}
        />
        <textarea
          name="desafios"
          value={formData.desafios}
          onChange={handleChange}
          placeholder="Desafios do cotidiano"
          rows={3}
          style={styles.textarea}
        />
        <textarea
          name="observacoes"
          value={formData.observacoes}
          onChange={handleChange}
          placeholder="Observações sobre saúde"
          rows={3}
          style={styles.textarea}
        />

        <label style={styles.labelArquivo}>
          Anexar arquivos (PDF/Imagens):
          <input
            type="file"
            multiple
            onChange={handleAnexosChange}
            style={{ marginTop: 8 }}
          />
        </label>

        {formData.anexos?.length > 0 && (
          <ul style={styles.lista}>
            {formData.anexos.map((a, i) => (
              <li key={i} style={styles.itemLista}>{a}</li>
            ))}
          </ul>
        )}

        <button type="submit" style={styles.botaoSalvar}>Salvar Alterações</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#EAF5EB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    fontFamily: 'Poppins, sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    maxWidth: 500,
    width: '100%',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 700,
    color: '#0C0B55',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 14,
  },
  textarea: {
    padding: 10,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 14,
    resize: 'none',
  },
  labelArquivo: {
    fontWeight: 600,
    color: '#0C0B55',
    fontSize: 14,
    marginTop: 10,
  },
  lista: {
    paddingLeft: 18,
    listStyleType: 'disc',
  },
  itemLista: {
    fontSize: 14,
    color: '#0C0B55',
    marginBottom: 4,
  },
  botaoSalvar: {
    backgroundColor: '#87CEEB',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    padding: '10px 24px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    marginTop: 10,
    alignSelf: 'center',
  },
  fotoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
  fotoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  circulo: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: '4px solid #87CEEB',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    color: '#87CEEB',
    cursor: 'pointer',
  },
  mais: {
    fontSize: 48,
    marginTop: -4,
  },
};

export default EditarPerfilIdoso;
