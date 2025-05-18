import React from "react";
import {Routes, Route } from "react-router-dom";
import { IdosoProvider } from './context/IdosoContext';
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
import PerfilIdoso from './pages/PerfilIdoso';
import EditarPerfilIdoso from "./pages/EditarPerfilIdoso";
import PerfilCuidador from './pages/PerfilCuidador';
import EditarPerfilCuidador from "./pages/EditarPerfilCuidador";
import Home from './pages/Home';
import HomeIdoso from './pages/HomeIdoso';
import HistoricoChatIdoso from './pages/HistoricoChatIdoso';
import HistoricoChatCuidador from './pages/HistoricoChatCuidador';
import "./index.css";

function App() {
  return (
  
    <IdosoProvider> 
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
      <Route path="/visualizarPerfilIdoso/:id" element={<VisualizarPerfilIdoso />} />
      <Route path="/visualizarPerfilCuidador" element={<VisualizarPerfilCuidador />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/ChatCuidadorIdoso/:id" element={<ChatCuidadorIdoso />} />
      <Route path="/perfilIdoso" element={<PerfilIdoso />} />
      <Route path="/EditarPerfilIdoso" element={<EditarPerfilIdoso />} />
      <Route path="/perfilCuidador" element={<PerfilCuidador />} />
      <Route path="/EditarPerfilCuidador" element={<EditarPerfilCuidador />} />
      <Route path="/home" element={<Home />} />
      <Route path="/homeIdoso" element={<HomeIdoso />} />
      <Route path="/historicoChatIdoso" element={<HistoricoChatIdoso />} />
      <Route path="/historicoChatCuidador" element={<HistoricoChatCuidador />} />
      </Routes>
      </IdosoProvider>
  );
}

export default App;