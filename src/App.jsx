import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelaInicial from "./TelaInicial";
import Login from "./pages/Login"; // crie esse componente depois
import Cadastro from "./pages/Cadastro"; // crie esse também
import Cadastro2 from "./pages/Cadastro2"; // crie esse também
import Cadastro3 from "./pages/Cadastro3"; // crie esse também
import SelecionarTipoCadastro from './pages/SelecionarTipoCadastro';
import CadastroIdoso from './pages/CadastroIdoso';
import CadastroIdoso2 from './pages/CadastroIdoso2';
import CadastroIdoso3 from './pages/CadastroIdoso3';
import VisualizarPerfilIdoso from './pages/VisualizarPerfilIdoso';
import VisualizarPerfilCuidador from './pages/VisualizarPerfilCuidador';
import Chat from './pages/Chat';
import ChatCuidadorIdoso from './pages/ChatCuidadorIdoso';
import "./index.css";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="/login" element={<Login />} />
      <Route path="/selecionarTipoCadastro" element={<SelecionarTipoCadastro />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/cadastro2" element={<Cadastro2 />} />
      <Route path="/cadastro3" element={<Cadastro3 />} />
      <Route path="/cadastroIdoso" element={<CadastroIdoso />} />
      <Route path="/cadastroIdoso2" element={<CadastroIdoso2 />} />
      <Route path="/cadastroIdoso3" element={<CadastroIdoso3 />} />
      <Route path="/visualizarPerfilIdoso" element={<VisualizarPerfilIdoso />} />
      <Route path="/visualizarPerfilCuidador" element={<VisualizarPerfilCuidador />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/ChatCuidadorIdoso" element={<ChatCuidadorIdoso />} />

      </Routes>
  );
}

export default App;