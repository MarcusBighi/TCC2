import React, { useContext, useState } from 'react';
import { CuidadorContext } from '../context/CuidadorContext';
import { useNavigate } from 'react-router-dom';

const EditarPerfilCuidador = () => {
  const { dadosCuidador, atualizarDadosCuidador } = useContext(CuidadorContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: dadosCuidador.nome || '',
    cpf: dadosCuidador.cpf || '',
    idade: dadosCuidador.idade || '',
    formacao: dadosCuidador.formacao || '',
    especialidade: dadosCuidador.especialidade || '',
    telefone: dadosCuidador.telefone || '',
    email: dadosCuidador.email || '',
    senha: dadosCuidador.senha || '',
    confirmarSenha: dadosCuidador.confirmarSenha || '',
    experiencias: dadosCuidador.experiencias || '',
    metodos: dadosCuidador.metodos || '',
    anexos: dadosCuidador.anexos || [],
    fotoPerfil: dadosCuidador.fotoPerfil || null,
  });

  const [previewFoto, setPreviewFoto] = useState(
    formData.fotoPerfil ? URL.createObjectURL(formData.fotoPerfil) : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, fotoPerfil: file }));
      setPreviewFoto(URL.createObjectURL(file));
    }
  };

  const handleAnexosChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      anexos: [...(prev.anexos || []), ...files.map((f) => f.name)],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizarDadosCuidador(formData);
    navigate('/perfilCuidador');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.titulo}>Editar Perfil do Cuidador</h1>

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

        {[
          { name: 'nome', placeholder: 'Nome completo' },
          { name: 'cpf', placeholder: 'CPF' },
          { name: 'idade', placeholder: 'Idade', type: 'number' },
          { name: 'formacao', placeholder: 'Formação Acadêmica' },
          { name: 'especialidade', placeholder: 'Especialidade' },
          { name: 'telefone', placeholder: 'Telefone' },
          { name: 'email', placeholder: 'E-mail', type: 'email' },
          { name: 'senha', placeholder: 'Senha', type: 'password' },
          { name: 'confirmarSenha', placeholder: 'Confirmar Senha', type: 'password' },
        ].map(({ name, placeholder, type = 'text' }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            style={styles.input}
          />
        ))}

        <textarea
          name="experiencias"
          placeholder="Descreva suas experiências de trabalho"
          value={formData.experiencias}
          onChange={handleChange}
          style={styles.textarea}
        />

        <textarea
          name="metodos"
          placeholder="Descreva seu método de trabalho"
          value={formData.metodos}
          onChange={handleChange}
          style={styles.textarea}
        />

        <label style={styles.labelArquivo}>
          Anexar arquivos:
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

        <button type="submit" style={styles.botaoSalvar}>
          Salvar Alterações
        </button>
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
    backgroundColor: '#98FB98',
    color: '#000',
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
    border: '4px solid #98FB98',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    color: '#98FB98',
    cursor: 'pointer',
  },
  mais: {
    fontSize: 48,
    marginTop: -4,
  },
};

export default EditarPerfilCuidador;
