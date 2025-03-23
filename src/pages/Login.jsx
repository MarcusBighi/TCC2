import React from 'react';

export default function Login() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Senha" />
      <button>Entrar</button>
    </div>
  );
}